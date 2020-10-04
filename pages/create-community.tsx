import { Box, Button, Card, Container, makeStyles } from '@material-ui/core'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/dist/client/router'
import React, { Fragment } from 'react'
import NavBar from '../src/components/navBar'
import InputTextField from '../src/components/textField'
import { useCreateCommunityMutation } from '../src/generated/graphql'
import { withApollo } from '../utils/apollo'
import { formatErrorMessage } from '../utils/formatError'

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2, 4, 2, 4)
    },

}
))



const CreateCommunity: React.FC = () => {
    const classes = useStyles()
    const router = useRouter()
    const [createCommunity, {}] = useCreateCommunityMutation()


    return (
        <Fragment>
            <NavBar />
            <Container maxWidth="sm">
            <Card>
                <Box className={classes.wrapper}>
                <Formik
                initialValues={{
                    name: "",
                    description: ""
                }}

                onSubmit={
                    async(values, {setErrors}) => {
                        const response = await createCommunity({
                            variables: values
                        })

                        if(response.data.createCommunity.errors){
                            setErrors(formatErrorMessage(response.data.createCommunity.errors))
                        }

                        if(response.data.createCommunity.community){
                            router.push('/')

                        }

                        
                    }
                }

                
                >

                    {
                        ({isSubmitting}) => (
                            <Form>
                                <InputTextField name="name" type="text" label="Community Name" />
                                <InputTextField name="description" type="text" label="description" multiline rows={4}/>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    >
                                        Create Community
                                </Button>
                            </Form>
                        )
                    }
                </Formik>
                </Box>
                
            </Card>
            </Container>
            
        </Fragment>
    )
}


export default withApollo() (CreateCommunity)