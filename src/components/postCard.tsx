import { Box, Button, Card, CardContent, makeStyles, Typography } from '@material-ui/core'
import React, { Fragment } from 'react'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { RegularPostFragment, useJoinCommunityMutation } from '../generated/graphql'
import { Router, useRouter } from 'next/dist/client/router';

interface PostCardProps{
    post: RegularPostFragment
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper
    },
    secondaryTitle: {
        fontSize: "14px",
        fontWeight: "bold",
        marginRight: 4
        
    },
    text: {
        fontSize: "12px"
    },
    upVoteBox: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 2

    }

}))

const PostCard: React.FC<PostCardProps> = ({post}) => {
    const classes = useStyles()
    const [joinCommunity, {}] = useJoinCommunityMutation()
    const router = useRouter()
    

    return (
        <Fragment>
            <Card variant="outlined">
                <CardContent>
                    <Box display="flex">
                        <Box  className={classes.upVoteBox}>
                            <ArrowDropUpIcon color="primary"/>
                            <Typography>0</Typography>
                            <ArrowDropDownIcon color="primary"/>
                        </Box>
                        <Box width="100%">
                            <Box display="flex" justifyContent="space-between">
                                <Box display="flex" alignItems="center">
                                    <Typography className={classes.secondaryTitle}>
                                        c/{post.community.name}
                                    </Typography>
                                    <Typography className={classes.text}>
                                        Posted by u/{post.creator.username}
                                    </Typography>
                                </Box>
                                
                                <Button color="primary" variant="contained" onClick={ async () => {
                                 const response = await joinCommunity({
                                        variables: {
                                            id: post.community.id
                                        }
                                })

                                if(response.data.joinCommunity.errors){
                                    router.push('/login')
                                }

                                if(response.data.joinCommunity.ok){
                                    
                                }

                                }}>
                                    Join
                                </Button>
                            </Box>
                            <Box>
                                <Typography variant="h6">
                                    {post.title}
                                </Typography>
                                <Typography>
                                    {post.content}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                </CardContent>
            </Card>
        </Fragment>
    )
}


export default PostCard