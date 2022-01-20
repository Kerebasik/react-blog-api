import { Box, Container } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core';

const usesStyles = makeStyles(theme => ({

}))

function Post(){
    const defaultsImgForPost = 'https://cdn.vuetifyjs.com/images/cards/mountain.jpg';
    const params = useParams();
    const postId = params.id;
    const cssStyle = usesStyles();

    useEffect(()=>{

    },[])

    return(<>
    <Container maxWidth='md' className={cssStyle.wrapper}>
        <Box className={cssStyle.header}>
            {postId}
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

export default Post