import React, { Fragment } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box';
import { withApollo } from '../utils/apollo'
import NavBar from '../src/components/navBar'
import { CssBaseline, Grid } from '@material-ui/core'
import PostCard from '../src/components/postCard';
import SidebarBox from '../src/components/sidebarBox';
import { usePostsQuery } from '../src/generated/graphql';

const Index = () => {

  const {data, loading, error } = usePostsQuery()

  if (error){
    return (
      <Fragment>
        Posts have not been fetched :) {error}
      </Fragment>
    )
  }

  if (!loading && !data){
    return(
      <Fragment>
        You got no posts for some reason
      </Fragment>
    )
  }

  return (
    <Fragment>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="lg">
        <Box padding="40px">
        <Grid container spacing={3}>
              <Grid item xs={8}>
                {

                  data?.posts.map((post) => (
                    <PostCard post={post} key={post.id}/>
                  ))
                  
                  
                  
                  
                }
              </Grid>
              <Grid item xs={4}>
                <SidebarBox />
              </Grid>
          </Grid>
        </Box>
          
        
        
      </Container>
    </Fragment>
  );
}


export default withApollo({ssr: true}) (Index)