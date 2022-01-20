import React, { useState, useEffect}  from 'react';
import {Typography, Box,  Container, Grid} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { useParams } from 'react-router';

import createAvatarUrl from 'services/createApiImage';

import axiosInstance from 'services/createApiInstance'



//import usesStyles from 'style/style_Content';

const usesStyles = makeStyles((theme) => ({
    wrapper:{
        height:'100%',
        display:'flex',
        flexDirection:'column', 
        paddingTop:'10px',
    },

    main:{
        flex:'1 1 auto',
    },

    mainData:{
        paddingLeft:'10px'
    },
    img:{
        width:"100%",
    },
    
    input: {
        display: 'none',
    },

    dataLine:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        borderBottom:'solid 1px gray',
        wordWrap:'break-word', 
        padding:'10px 0px' 
        
    },

    longData:{
        borderBottom:'solid 1px gray',
        padding:'5px 0px',
        margin:'5px 0px',
        wordWrap:'break-word',  
        maxWidth:'100%'
    },
}));

function ProfileUsers(){ 

        const params = useParams();
        const userId = params.id;

        const [userData, setUserData] = useState({});
        const [profession, setProfession] = useState();
        const [name, setName] = useState();
        const [skills, setSkills] = useState();
        const [details, setDetails] = useState();
        const [extraDetails, setExtraDetails] = useState();

        const cssStyle = usesStyles();

        const checkKey = (key) =>{
            if ((key === undefined ) || (key === "")) {
                return <strong>undefined</strong>
            }
            return <strong>{key}</strong>
        }
    

        useEffect(()=>{
            axiosInstance.get(`http://test-blog-api.ficuslife.com/api/v1/users/${userId}`)
            .then(({data})=>{
                setUserData(data)
                setName(data.name)
                setSkills(data.skills)
                setDetails(data.details)
                setExtraDetails(data.extra_details)
                setProfession(data.profession)
                console.log(data)
            })
        },[userId])

        
        return(
        <>
            <Container maxWidth = 'md' className = { cssStyle.wrapper }>
                <Box className = { cssStyle.header }>
                    <Typography variant="h4">My Profile:</Typography>    
                </Box>

                <Box className = { cssStyle.main }>
                       <Grid container>
                           <Grid item md={4}> 
                                <img 
                                className={cssStyle.img}
                                src={createAvatarUrl(userData.avatar)}
                                alt={`User's logo ${userData.name}`} 
                                />
                            </Grid>

                            <Grid item md={8} className={cssStyle.mainData}>     
                                    <Box className={cssStyle.dataLine}>
                                        <Typography>ID: <strong>{userData._id}</strong></Typography>
                                    </Box>
                                    <Box className={cssStyle.dataLine}>
                                        <Typography>EMAIL: <strong>{userData.email}</strong></Typography>
                                    </Box> 
                                    <Box className={cssStyle.longData}>
                                        <Typography>NAME: {checkKey(name)}</Typography>
                                    </Box>
                                    
                                    <Box className={cssStyle.longData}>
                                        <Typography>PROFESSION: { checkKey(profession) }</Typography>
                                    </Box>
                                    <Box className={cssStyle.longData}>
                                       <Typography>SKILLS: { checkKey(skills) }</Typography>                       
                                    </Box> 
                                    <Box className={cssStyle.longData}>
                                        <Typography>DETAILS: {checkKey(details)}</Typography>                                
                                    </Box>

                                    <Box className={cssStyle.longData}>
                                        <Typography>EXTRA DETAILS: {checkKey(extraDetails)} </Typography>
                                    </Box>
                            </Grid>
                        </Grid> 
                </Box>
           
          

            </Container>
        </>
    )
}

export default ProfileUsers;