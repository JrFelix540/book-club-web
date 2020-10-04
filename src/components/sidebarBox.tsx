import { Avatar, Box, Button, Card, makeStyles, Typography } from '@material-ui/core'
import BookIcon from '@material-ui/icons/Book'
import React, { Fragment } from 'react'
import theme from '../theme'

const useStyles = makeStyles((theme) => ({
    avatar: {
        background: theme.palette.primary.main,
        marginRight: 4
    },
    wrapper: {
        padding: 30
    },
    wrapperLogo: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5
    },
    actionButtons: {
        display: "flex",
        flexDirection: "column",
        margin: theme.spacing(2, 0, 2, 0)
    },
    buttonContainer: {
        marginBottom: 4,
        width: "100%"
    },
    buttonWidth: {
        width: "100%"
    }
    


}))


const SidebarBox: React.FC = () => {
    const classes = useStyles()

    return (
        <Fragment>
            <Card variant="outlined" className={classes.wrapper}>
                {/* <div className={classes.wrapperLogo}>
                    <Avatar className={classes.avatar}>
                        <BookIcon />
                    </Avatar>
                    <Typography>
                        Home
                    </Typography>
                   

                </div> */}
                <Box display="flex" justifyContent="center" alignItems="center" marginBottom={5}>
                <Avatar className={classes.avatar}>
                        <BookIcon />
                    </Avatar>
                    <Typography>
                        Home
                    </Typography>
                </Box>

                <div>
                    <Typography>
                        Your personal BookClub homepage. Catch up on your favorite communities and get custom book recommendations!
                    </Typography>
                </div>
                <div className={classes.actionButtons}>
                    <div className={classes.buttonContainer}>
                        <Button variant="contained" color="primary" href="/create-post" className={classes.buttonWidth}>
                            Create Post
                        </Button>
                    </div>
                    <div className={classes.buttonContainer}>
                        <Button variant="outlined" color="primary" href="/create-community" className={classes.buttonWidth}>
                            Create Community
                        </Button>
                    </div>
                    
                </div>
                
            </Card>
        </Fragment>
    )
}


export default SidebarBox