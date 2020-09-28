import { Box, Button, IconButton, Menu, MenuItem } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import React, { Fragment } from 'react'
import { useMeQuery } from '../generated/graphql'

interface navAuthSectionProps {
    isAuth:  boolean
}

const NavAuthSection: React.FC<navAuthSectionProps> = ({isAuth}) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    let body: JSX.Element

    isAuth ? body = (
        <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
    ): body = (
        <Box flexDirection="row" display="flex">
            <Box marginRight={2}>
                <Button href="/login" color="primary" variant="outlined">
                    Login
                </Button>
            </Box>
            <Box>
                <Button href="/register" color="primary" variant="contained">
                    Sign Up
                </Button>
            </Box>
        </Box>
    )

    return body
}


export default NavAuthSection