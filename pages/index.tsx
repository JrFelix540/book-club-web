import React, { Fragment } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box';
import ProTip from '../src/ProTip'
import Copyright from '../src/Copyright'
import { withApollo } from '../utils/apollo'
import NavBar from '../src/components/navBar'
import { CssBaseline } from '@material-ui/core'

const Index = () => {

  return (
    <Fragment>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Book Club
          </Typography>
          <ProTip />
          <Copyright />

        </Box>
      </Container>
    </Fragment>
  );
}


export default withApollo({ssr: true}) (Index)