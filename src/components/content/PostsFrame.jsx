import React from 'react';
import { Outlet } from 'react-router';

function PostsFrame(){

    return(
        <>
            <Outlet/>
        </>
    )
}

export default PostsFrame;