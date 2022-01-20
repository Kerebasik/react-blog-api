import React, { useState, useEffect } from 'react';
import {Typography, Box, Container, FormControl, InputLabel, Select, MenuItem, Grid} from '@material-ui/core';
import { Link } from 'react-router-dom';

import axios from 'axios';

import { Pagination } from '@material-ui/lab';

import { makeStyles } from '@material-ui/core/styles';

import UserCard from 'components/content/UserCard';

const usesStyles = makeStyles((theme) => ({
    wrapper:{
        display:'flex',
        flexDirection:'column',
        minHeight:'100%',
    },
    
    header:{
        paddingTop:'10px',
    },

    contant:{
        minHeight:'90%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        flex:'1 1 auto',
    },


    cardBox:{
        maxWidth: 350,
        display:'flex',
        alignItems:'center'
    },

    pagination:{
        display:'flex',
        justifyContent:'center',
        padding:'10px 0px',
        matginBottom:'10px',
    },
    
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
}))




function Profile(){
    const cssStyle = usesStyles();

    const [users, setUsers] = useState([]);
    const [usersQty, setUsersQty] = useState(0);
    const [page, setPage] = useState(1);
    const [skip, setSkip] = useState(0);

    const [countUsers, setCountUsers] = useState(10);
  
    const handleChange = (event) => {
        setCountUsers(event.target.value);
    };

    const scrollToTop = () =>{
        window.scrollTo(0, 0)
    }

    useEffect(()=>{
        setSkip((page-1)*countUsers);
        axios.get(`http://test-blog-api.ficuslife.com/api/v1/users?limit=${countUsers}&skip=${skip}`).then(
            ({data})=>{
                setUsers(data.data)
                setUsersQty(Math.ceil(data.pagination.total/countUsers))
                
            }
        )
    }, [page, countUsers, skip]);

   return(
    <Container maxWidth='md' className={cssStyle.wrapper}>

       <Box className={cssStyle.header}>
            
            <Grid container>
                <Grid item md={10}>
                    <Typography variant="h4">Users:</Typography>
                </Grid>


                <Grid item md={2}>

                    <FormControl className={cssStyle.formControl}>
                        <InputLabel id="demo-simple-select-label">Count users</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={countUsers}
                            onChange={handleChange}
                            >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                        </Select>
                    </FormControl>

                </Grid>
            
            </Grid>

       </Box>

       <Box className={cssStyle.contant}>

        {   
            
            users.map(user=>(
            
            <Box key={user._id} className={cssStyle.cardBox}>
                <Link to={user._id} ><UserCard data={user}/></Link>
            </Box>

            ))
        }

       </Box>

       <Box className={cssStyle.pagination}>
            <Box>
                {

                !!usersQty && (

                    <Pagination
                        count={usersQty}
                        page={page}
                        onChange={(_, num) => setPage(num)}
                        onClick={scrollToTop}
                    />
                    
                    )

                }
            </Box>
           
        </Box>

    </Container>
   );
}

export default Profile;