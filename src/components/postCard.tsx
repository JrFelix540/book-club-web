import { Box, Button, Card, CardContent, makeStyles, Typography } from '@material-ui/core'
import React, { Fragment } from 'react'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import { RegularPostFragment, useJoinCommunityMutation, useMeQuery } from '../generated/graphql'
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

    },
    postContainer: {
        display: "flex"
    },
    postContent: {
        width: "100%"
    },
    postContentRight: {
        display: "flex",
        justifyContent: "space-between"
    },
    postedBy: {
        display: "flex",
        alignItems: "center"
    },
    joined: {
        display: "flex"
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
                    <div className={classes.postContainer}>
                        <div  className={classes.upVoteBox}>
                            <ArrowDropUpIcon color="primary" fontSize="large"/>
                                <Typography>{post.points}</Typography>
                            <ArrowDropDownIcon color="secondary" fontSize="large"/>
                        </div>
                        <div className={classes.postContent}>
                            <div className={classes.postContentRight}>
                                <div className={classes.postedBy}>
                                    <Typography className={classes.secondaryTitle}>
                                        c/{post.community.name}
                                    </Typography>
                                    <Typography className={classes.text}>
                                        Posted by u/{post.creator.username}
                                    </Typography>
                                </div>
                                
                                {
                                    post.joinStatus ? 
                                    (
                                        <div className={classes.joined}>
                                            <Typography color="primary">Joined</Typography>
                                            <BeenhereIcon color="primary" />
                                        </div>
                                        

                                    ):

                                    (<Button color="primary" variant="contained" onClick={ async () => {
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

                                        }}
                                    >
                                        Join
                                    </Button>)
                                }
                            </div>
                            <div>
                                <Typography variant="h6">
                                    {post.title}
                                </Typography>
                                <Typography>
                                    {post.content}
                                </Typography>
                            </div>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </Fragment>
    )
}


export default PostCard