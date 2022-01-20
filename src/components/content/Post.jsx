import { Box, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core';
import axiosInstance from 'services/createApiInstance';

const usesStyles = makeStyles(theme => ({

}))

function Post(){
    const params = useParams();
    const postId = params.id;
    const cssStyle = usesStyles();
    const [postData, setPostData] = useState({});

    useEffect(()=>{
        axiosInstance.get(`/posts/${postId}`)
        .then((data)=>{
            console.log(data)
            setPostData(data.data)
        })
    },[postId])

    return(<>
    <Container maxWidth='md' className={cssStyle.wrapper}>
        <Box className={cssStyle.header}>
            <Grid container>
                <Grid item md={8}> 
                    <Typography>Post ID: {postId}</Typography>
                    <Typography variant='h3'>{postData.title}</Typography>
                </Grid>
                <Grid item md={4}></Grid>
            </Grid>
        </Box>
        <Box className={cssStyle.contant}>
            Basic text in post
        </Box>
        <Box className={cssStyle.comments}>
            all comments in post (use component)
        </Box>
    </Container>
    </>)

}

export default Post;