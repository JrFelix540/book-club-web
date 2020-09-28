import { makeStyles, Container, Box, Avatar, Typography, Button } from '@material-ui/core'
import { Formik, Form } from 'formik'
import React, { Fragment } from 'react'
import InputTextField from '../../src/components/textField'
import BookIcon from '@material-ui/icons/Book'
import { useResetPasswordMutation } from '../../src/generated/graphql'
import { useRouter } from 'next/dist/client/router'
import { withApollo } from '../../utils/apollo'
import { formatErrorMessage } from '../../utils/formatError'

const useStyles = makeStyles((theme) => ({
    avatar: {
        margin: theme.spacing(1),
        background: theme.palette.primary.main

    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    wrapper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
    
    }
))


const ResetPassword: React.FC = () => {
    const classes = useStyles()
    const router = useRouter()
    const [resetPassword, {}] = useResetPasswordMutation()

    return (
        <Fragment>
            <Container maxWidth="sm">
                <Box className={classes.wrapper}>
                <Avatar className={classes.avatar}>    
                    <BookIcon />
                </Avatar>
                <Typography variant="h5" color="textPrimary" >
                    Reset Password
                </Typography>
                <Formik
                initialValues = {{password: ""}}
                onSubmit={async (values, {setErrors}) => {
                    const response = await resetPassword({
                        variables: {
                            password: values.password,
                            token: typeof router.query.token === `string` ?
                                router.query.token as string :
                                ''
                        }
                    })

                    if(response.data.resetPassword.errors){
                        setErrors(formatErrorMessage(response.data.resetPassword.errors))
                    }

                    if(response.data.resetPassword.user){
                        router.push('/login')
                    }
                }}

                >
                    {
                        ({isSubmitting}) => (
                            <Form>
                                <InputTextField name="password" type="password" label="New Password" />
                                <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={isSubmitting}
                                >
                                    Reset Password
                                </Button>
                            </Form>
                        )
                    }

                </Formik>
                </Box>
            </Container>
        </Fragment>
    )
}


export default withApollo() (ResetPassword)