import { Card, CardContent, Container, FormControl, InputLabel, makeStyles, MenuItem, Select, Button } from '@material-ui/core'
import { Form, Formik } from 'formik'
import React, { Fragment } from 'react'
import NavBar from '../src/components/navBar'
import { withApollo } from '../utils/apollo'
import { useCommunityWithIdsQuery, useCreatePostMutation } from '../src/generated/graphql'
import InputTextField from '../src/components/textField'
import SelectField from '../src/components/selectField'
import { useRouter } from 'next/dist/client/router'
import { formatErrorMessage } from '../utils/formatError'

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: "flex",
        flexDirection: "column"
    },
    formControl: {
        minWidth: 240,
        margin: theme.spacing(1)
    }
    

}))


interface IInitialValues {
    communityId: number | null
    title: string 
    content: string
}


const CreatePost: React.FC = () => {
    const classes = useStyles()
    const {data, loading } = useCommunityWithIdsQuery()
    const [createPost, {}] = useCreatePostMutation()
    const router = useRouter()

    if(loading){
        return(
            <>
                Communities fetching
            </>
        )
    }

    if(!loading && !data){
        return(
            <>
                Communities have not been fetched :)
            </>
        )
    }

  
    return (
        <Fragment>

            <NavBar />
            <Container maxWidth="sm">
                <Card>
                    <CardContent>
                        <Formik
                        initialValues ={{
                            communityId: undefined,
                            title: '',
                            content: ''
                        }}

                        onSubmit={async (values, {setErrors}) => {
                            console.log(values.communityId)

                            const response = await createPost({
                                variables: values
                            })

                            if(response.data.createPost.post){
                                router.push('/')
                            }

                            if(response.data.createPost.errors){
                                console.log(response.data.createPost.errors)
                            }

                            // actions.setSubmitting(false)
                        }}
                        
                        >
                            {
                                ({isSubmitting}) => (
                                    <Form className={classes.wrapper}>
                                        <SelectField communities={data?.allCommunities} name="communityId" label="Community"/>
                                        <FormControl>
                                            <InputTextField name="title" type="text" label="Title" />
                                        </FormControl>
                                        <FormControl>
                                            <InputTextField name="content" type="text" label="content" multiline rows={4}/>
                                        </FormControl>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            // disabled={isSubmitting}
                                            >
                                                Post
                                        </Button>
                                    </Form>
                                )
                            }
                        </Formik>
                    </CardContent>
                </Card>
            </Container>
        </Fragment>
    )
}


export default withApollo() (CreatePost)