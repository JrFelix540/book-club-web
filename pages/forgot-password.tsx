import { Avatar, Box, Button, Container, Link, makeStyles, Typography } from '@material-ui/core'
import { Form, Formik } from 'formik'
import React, { Fragment, useState } from 'react'
import InputTextField from '../src/components/textField'
import { useForgorPasswordMutation } from '../src/generated/graphql'
import BookIcon from '@material-ui/icons/Book';
import { withApollo } from '../utils/apollo'
import Alert from '@material-ui/lab/Alert'


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



const ForgotPassword: React.FC = () => {
    const classes = useStyles()
    const [forgotPassword, {}] = useForgorPasswordMutation()
    const [complete, setComplete] = useState<Boolean>(false)


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
                {
                    complete ? 
                    <Alert severity="success">
                        Email sent! Check your mail for reset link
                    </Alert> : null
                    
                }
                <Formik
                initialValues = {{email: ""}}
                onSubmit={async (values) => {
                    await forgotPassword({
                        variables: {
                            email: values.email
                        }
                    })

                    setComplete(true)
                    

                }}

                >
                    {
                        ({isSubmitting}) => (
                            <Form>
                                <InputTextField name="email" type="email" label="Email" />
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
                                <Box>
                                <Link href="/" variant="body2">
                                    Go back home ?
                                </Link>
                                </Box>
                                        
                                        
                                        
                                        
                                   
                               
                            </Form>
                        )
                    }

                </Formik>
                </Box>
            </Container>
            
        </Fragment>
    )
}


export default withApollo() (ForgotPassword)