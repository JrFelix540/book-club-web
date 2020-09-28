import { Container, Avatar, Typography, Button, makeStyles, Grid, Link } from '@material-ui/core'
import { Formik, Form } from 'formik'
import React, { Fragment } from 'react'
import BookIcon from '@material-ui/icons/Book'
import InputTextField from '../src/components/textField'
import { formatErrorMessage } from '../utils/formatError'
import { useLoginMutation } from '../src/generated/graphql'
import { useRouter } from 'next/dist/client/router'
import { withApollo } from '../utils/apollo'
import NextLink from 'next/link'


const useStyles = makeStyles((theme) => ({
    wrapper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        background: theme.palette.primary.main

    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}))


interface LoginFormValues{
    usernameOrEmail: string
    password: string
}




const LoginPage: React.FC = () => {
    const classes = useStyles()
    const initialValues: LoginFormValues = {
        usernameOrEmail: "",
        password: ""
    }

    const router = useRouter()

    const [login, {}] = useLoginMutation()

    return (
        <Fragment>
            <Container maxWidth="sm">
                <div className={classes.wrapper}>

                    <Avatar className={classes.avatar}>    
                        <BookIcon />
                    </Avatar>
                    <Typography variant="h5" color="textPrimary" >
                        Sign in to Book Club
                    </Typography>
                    <Formik
                    initialValues={initialValues}
                    onSubmit={async (values, { setErrors }) => {
                        const response = await login({variables: {
                            userInput: values
                        }})

                        if(response.data.login.errors){
                            setErrors(formatErrorMessage(response.data.login.errors))
                        }
                        if(response.data.login.user){
                            router.push('/')
                        }
                        
                    }}
                    >

                       { 
                           ({isSubmitting}) =>
                        (
                            <Form>
                                <InputTextField name="usernameOrEmail" type="text" label="Username" />
                                <InputTextField name="password" type="password" label="Password"/>
                                <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={isSubmitting}
                                >
                                    Login
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        
                                        <Link href="/forgot-password" variant="body2">
                                            Forgot password?
                                        </Link>
                                        
                                        
                                    </Grid>
                                    <Grid item>
                                        <Link href="/register" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            
                            </Form>
                        )}
                    </Formik>
                </div>
            </Container>
        </Fragment>
    )
}


export default withApollo() (LoginPage)