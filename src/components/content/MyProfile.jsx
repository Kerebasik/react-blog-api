import React from 'react';
import {Typography, Box, Grid, Container, TextField, IconButton, Fab} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/core/styles';

import DeleteAccount from 'components/content/DialogDeleteAccount';
import axiosInstance from 'services/createApiInstance';
import createAvatarUrl from 'services/createApiImage';
import { useEffect, useState } from 'react';

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

    img:{
        width:'100%',
    },

    input: {
        display: 'none',
    },

    deleteButton:{
        padding:'20px 30px',
        display:'flex',
        justifyContent:'end'
    },

    dataLine:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        borderBottom:'solid 1px gray',
        wordWrap:'break-word',
        padding:'10px 0px'

    },

    mainData:{
        paddingLeft:'10px'
    },

    longData:{
        borderBottom:'solid 1px gray',
        padding:'5px 0px',
        margin:'5px 0px'
    },

    da:{
        wordWrap:'break-word',
        maxWidth:'100%'
    }

}));


function Profile(){

    const cssStyle = usesStyles();

    const [myData, setMyData] = useState({});
    const [profession, setProfession] = useState();
    const [name, setName] = useState();
    const [skills, setSkills] = useState();
    const [details, setDetails] = useState();
    const [extraDetails, setExtraDetails] = useState();

    const [edit, setEdit] = useState(false);

    const handleClickOpenEdit = () =>{
        setEdit(true)
    }

    const professionHandler = (event) =>{
        setProfession(event.target.value)
    }

    const nameHandler = (event) =>{
        setName(event.target.value)
    }

    const skillsHandler = (event) =>{
        setSkills(event.target.value)
    }

    const detailsHandler = (event) =>{
        setDetails(event.target.value)
    }

    const extraDetailsHandler = (event) =>{
        setExtraDetails(event.target.value)
    }

    const handleClickCloseEdit = () =>{
        setName(name)
        setDetails(details)
        setExtraDetails(extraDetails)
        setProfession(profession)
        setSkills(skills)
        setEdit(false)

        const myNewData = {
            name:name,
            extra_details:extraDetails,
            skills:skills,
            profession:profession,
            details:details
        }
        axiosInstance.patch(`/users/${myData._id}`, myNewData)
    }

    async function check(){
        const formData = new FormData();
        const filedata = document.getElementById('icon-button-file').files[0];
        formData.append("avatar", filedata);

        axiosInstance.put(`/users/upload/61caff12b2686012c09c23a9`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        })
    }

    const checkKey = (key) =>{
        if (key === undefined) {
            return <strong>undefined</strong>
        }
        return <strong>{key}</strong>
    }

    useEffect(()=>{
        axiosInstance.get('/auth/user').then((response)=>{
            console.log(response)
            setMyData(response.data)
            setName(response.data.name)
            setSkills(response.data.skills)
            setDetails(response.data.details)
            setExtraDetails(response.data.extra_details)
            setProfession(response.data.profession)
        })
    },[])

    return(
            <Container maxWidth = 'md' className={cssStyle.wrapper}>

                <Box className = { cssStyle.header }>
                    <Grid container>
                        <Grid item xs={9} md={10}><Typography variant="h4">My Profile:</Typography></Grid>

                        <Grid item md={1}>
                            {
                                !edit &&
                            <>
                                <input
                                type="file"
                                accept="image/jpeg"
                                className={cssStyle.input}
                                id="icon-button-file"
                                onChange={check}
                                />
                                <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                            </>
                            }
                        </Grid>

                        <Grid item xs={3} md={1}>
                            {
                                !edit ?
                            <IconButton
                                onClick={handleClickOpenEdit}
                                color="primary">
                                <EditIcon />
                            </IconButton>

                                :

                            <Fab
                                color="primary"
                                aria-label="add"
                                onClick={handleClickCloseEdit}>
                                OK
                            </Fab>
                            }

                        </Grid>
                    </Grid>
                </Box>

                <Box className = { cssStyle.main }>
                       <Grid container>
                           <Grid item md={4}>
                                <img
                                className={cssStyle.img}
                                src={createAvatarUrl(myData.avatar)}
                                alt={`My Logo`}
                                />
                            </Grid>

                            <Grid item md={8} className={cssStyle.mainData}>
                                    <Box className={cssStyle.dataLine}>
                                        <Typography>ID: <strong>{myData._id}</strong></Typography>
                                    </Box>
                                    <Box className={cssStyle.dataLine}>
                                        <Typography>EMAIL: <strong>{myData.email}</strong></Typography>
                                    </Box>
                                    <Box className={cssStyle.longData}>
                                        <Typography>NAME: </Typography>
                                            {
                                                !edit ?
                                                <Typography className={cssStyle.da}>{checkKey(name)}</Typography>
                                                :
                                                <TextField
                                                    id="outlined-multiline-flexible"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={name}
                                                    maxLength={5}
                                                    onChange={(e) => nameHandler(e)}/>
                                            }
                                    </Box>

                                    <Box className={cssStyle.longData}>
                                        <Typography>PROFESSION: </Typography>
                                            {
                                                !edit ?
                                                <Typography className={cssStyle.da}>{ checkKey(profession) }</Typography>
                                                :
                                                <TextField
                                                id="outlined-multiline-flexible"
                                                multiline
                                                maxRows={2}
                                                fullWidth
                                                variant="outlined"
                                                value={profession}
                                                onChange={(e) => professionHandler(e)}/>
                                            }
                                    </Box>
                                   <Box className={cssStyle.longData}>
                                       <Typography>SKILLS: </Typography>
                                            {
                                                !edit ?
                                                   <Typography className={cssStyle.da}>{checkKey(skills)}</Typography>
                                                :
                                                <TextField
                                                id="outlined-multiline-static"
                                                fullWidth
                                                multiline
                                                rows={8}
                                                variant="outlined"
                                                value={skills}
                                                onChange={(e) => skillsHandler(e)}/>
                                            }
                                    </Box>
                                    <Box className={cssStyle.longData}>
                                        <Typography>DETAILS: </Typography>
                                            {
                                                !edit ?
                                                    <Typography className={cssStyle.da}>{checkKey(details)}</Typography>
                                                :
                                                <TextField
                                                id="outlined-multiline-static"
                                                fullWidth
                                                multiline
                                                rows={8}
                                                variant="outlined"
                                                value={details}
                                                onChange={(e) => detailsHandler(e)}/>
                                           }

                                    </Box>

                                    <Box className={cssStyle.longData}>
                                        <Typography>EXTRA DETAILS: </Typography>
                                            {
                                                !edit ?
                                                    <Typography className={cssStyle.da}>{checkKey(extraDetails)}</Typography>
                                                :
                                                <TextField
                                                id="outlined-multiline-static"
                                                fullWidth
                                                multiline
                                                rows={8}
                                                variant="outlined"
                                                value={extraDetails}
                                                onChange={(e) => extraDetailsHandler(e)}/>
                                            }
                                    </Box>
                            </Grid>
                        </Grid>
                </Box>
            { !edit &&
                <Box className = {cssStyle.deleteButton}>
                        <DeleteAccount idUser={myData._id}/>
                </Box>
            }
            </Container>
   );
}

export default Profile;