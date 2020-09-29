import { Avatar, Button, Container, makeStyles, Typography } from '@material-ui/core'
import React, { Fragment } from 'react'
import BookIcon from '@material-ui/icons/Book'
import InputTextField from '../src/components/textField';
import { Form, Formik } from 'formik';
import {withApollo} from '../utils/apollo'
import { useMeQuery, useRegisterUserMutation } from '../src/generated/graphql'
import { formatErrorMessage } from '../utils/formatError';
import { useRouter } from 'next/dist/client/router';


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

interface RegisterFormValues{
    email: string
    username: string
    password: string
}

const Register: React.FC = () => {
    const classes = useStyles()

    const [register, {}] = useRegisterUserMutation()

    const initialValues: RegisterFormValues = {
        email: "",
        username: "",
        password: ""
    } 

    const router = useRouter()
   

    
    return (
        <Fragment>
            <Container maxWidth="sm">
                <div className={classes.wrapper}>

                    <Avatar className={classes.avatar}>    
                        <BookIcon />
                    </Avatar>
                    <Typography variant="h5" color="textPrimary" >
                        Sign up for Book Club !
                    </Typography>
                    <Formik
                    initialValues={initialValues}
                    onSubmit={async (values, { setErrors }) => {
                        const response = await register({variables: {
                            userInput: values
                        }})

                        if(response.data.register.errors){
                            setErrors(formatErrorMessage(response.data.register.errors))
                        }
                        if(response.data.register.user){
                            router.push('/')
                        }
                        
                    }}
                    >

                       { 
                           ({isSubmitting}) =>
                        (
                            <Form>
                                <InputTextField name="username" type="text" label="Username" />
                                <InputTextField name="email" type="email" label="Email" />
                                <InputTextField name="password" type="password" label="Password"/>
                                <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={isSubmitting}
                                >
                                    Sign up
                                </Button>

                            </Form>
                        )}
                    </Formik>
                </div>
            </Container>
        </Fragment>
    )
}


export default withApollo() (Register)