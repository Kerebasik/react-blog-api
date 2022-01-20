import React, { useEffect, useState } from 'react';
import {Typography, Box, TextField, Container, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import axiosInstance from 'services/createApiInstance';
import { Link } from 'react-router-dom';
import moment from 'moment';


import { Pagination } from '@material-ui/lab';

const usesStyles = makeStyles(theme => ({
    wrapper:{
        minHeight:'100%',
        display:'flex',
        flexDirection:'column', 
    },

    columnTitleGrid:{
        display:'flex',
        justifyContent:'center',
    },

    linkTitle:{
    //  wordWrap:'break-word',  
        padding:'3px 0px',
        textDecoration:'none',
        color:'black',
    },
    gridContainer:{
        borderBottom:'dashed 1px gray',
    },

    containerLinkTitle:{
        height:30,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
    },
    
    header:{
        paddingTop:'10px',
    },

    columnDateCreate:{
        display:'flex',
        justifyContent:'center',
        padding:'3px 0px',
    },

    contant:{
        flex:'1 1 auto',
        padding:'15px 0px',
    },

    pagination:{
        display:'flex',
        justifyContent:'center',
        padding:'10px 0px',
        matginBottom:'10px',
    },

    gridTitle:{
        margin:'20px 0px',
    },
}));

function Profile(){
   const cssStyle = usesStyles();

   const [posts, setPosts] = useState([]);
   const [query, setQuery] = useState('');
   const [page, setPage] = useState(1);
   const [pageQty, setPageQty] = useState(0);

   const limit = 12;



   useEffect(()=>{
        axiosInstance.get(`/posts?search=${query}&limit=${limit}&skip=${(page - 1)*limit}`).then(
           ({data})=>{
                setPosts(data.data)
                setPageQty(Math.ceil(data.pagination.total/limit))
           }
      )
   }, [query, page]);

   return(
       <Container maxWidth='md' className={cssStyle.wrapper}>

            <Box className={cssStyle.header}>
                <Grid container>
                    <Grid item md={6}>
                        <Typography variant="h4">Posts:</Typography>
                    </Grid>

                    <Grid item md={6}>
                        <TextField
                        fullWidth
                        label="Search"
                        value={query}
                        
                        onChange={(event) => setQuery(event.target.value)}/>  
                    </Grid>
                </Grid>
               
                
               
            </Box>
            
            <Box className={cssStyle.contant}>
                    <Box className = {cssStyle.gridTitle}>
                        <Grid container>
                            <Grid md={10} xs={9} item>
                                <Box className = { cssStyle.columnTitleGrid }>
                                    <Typography variant='h5'>Posts' title</Typography>
                                </Box>
                            </Grid>

                            <Grid md={2} xs={3} item>
                                <Box className = { cssStyle.columnTitleGrid } >
                                    <Typography >Date create</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                {
                
                   posts.map(post=>(
                    <Box key={post._id}>
                       
                       <Grid container className={cssStyle.gridContainer}>
                            <Grid md={10} xs={9} item className={cssStyle.containerLinkTitle}>
                                <Link to={post._id} className={cssStyle.linkTitle}>
                                    <Typography noWrap = {true}>
                                        {post.description}
                                    </Typography>
                                </Link>
                            </Grid>

                            <Grid md={2} xs={3} item>
                                <Box className={cssStyle.columnDateCreate}> { moment(post.dateCreated.split("T")[0], 'YYYY-MM-DD').format('DD.MM.YYYY') } </Box>
                            </Grid>
                       </Grid>
                       
                    </Box>
                   ))
                   
                }
            </Box>
            
            <Box className={cssStyle.pagination}>
                <Box>
                    {

                    !!pageQty && (

                        <Pagination
                            count={pageQty}
                            page={page}
                            onChange={(_, num) => setPage(num)}
                        />
                    
                        )

                    }
                </Box>

            </Box>

       </Container>
   );
}

export default Profile;