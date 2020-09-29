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
        background: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    title: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
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
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Box display="flex" alignItems="center" className={classes.title}>
                        <Avatar className={classes.avatar}>    
                            <BookIcon />
                        </Avatar>
                        <Typography variant="h6" color="primary">
                            BookClub
                        </Typography>

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
        </Fragment>
    )
}


export default NavBar