import { AppBar, Box, Typography, Avatar, Link, Button, Toolbar, makeStyles, IconButton, Menu, MenuItem } from '@material-ui/core'
import BookIcon from '@material-ui/icons/Book'
import React, { Fragment, useState } from 'react'
import { isServer } from '../../utils/isServer'
import { useMeQuery } from '../generated/graphql'
import NavAuthSection from './navAuthSection'


const useStyles = makeStyles((theme) => ({
    avatar: {
        background: theme.palette.primary.main,
        marginRight: theme.spacing(1)
    },
    appBar: {
        background: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    title: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    logo: {
        textDecoration: "none"
    }
}))




const NavBar: React.FC = () => {
    
    const {data, loading } = useMeQuery({
        skip: isServer(),
    })

    let authSection: JSX.Element
    if (loading){
        
    } else if (!data?.me){
        authSection =  <NavAuthSection isAuth={false} />
    } else {
        authSection =  <NavAuthSection isAuth={true}/>
    }

    
    

    

    



    const classes = useStyles()
    return (
        <Fragment>
            <Box position="relative" height="80px">
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Box className={classes.title}>
                        <Link href="/" className={classes.logo}>
                            <Box display="flex" alignItems="center">
                                <Avatar className={classes.avatar}>    
                                    <BookIcon />
                                </Avatar>
                                <Typography variant="h6" color="primary">
                                    BookClub
                                </Typography>
                            </Box>
                        </Link>
                    </Box>
                    
                    <nav>
                        <Link variant="button" color="textPrimary" href="/" className={classes.link}>
                            Top Trending
                        </Link>
                        <Link variant="button" color="textPrimary" href="/" className={classes.link}>
                            Top Trending
                        </Link>
                        <Link variant="button" color="textPrimary" href="/" className={classes.link}>
                            Top Trending
                        </Link>
                    </nav>
                    {authSection}
                    
                </Toolbar>
            </AppBar>
            </Box>
        </Fragment>
    )
}


export default NavBar