import React, { useState } from "react";

import {Button, Dialog, DialogTitle, DialogActions} from '@material-ui/core';

import { Link } from "react-router-dom";

import axiosInstance from 'services/createApiInstance';

function DeleteAccount(props){
    const [open, setOpen] = useState(false);

    const handleClickOpen = () =>{
        setOpen(true);
    }

    const handleClose = () =>{
        setOpen(false);
    }

    const accounDelete = () =>{
        axiosInstance.delete(`/users/${props.idUser}`)
        localStorage.clear();
        window.location.reload();
        handleClose()
    }
    
    return(
        <>
             <Button  variant="contained" onClick={handleClickOpen} color="secondary">Delete profile</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            
            <DialogTitle id="form-dialog-title"> 
                Are you sure you want to delete your account?
            </DialogTitle>
 
            <DialogActions>
                <Link to="/"><Button onClick = { accounDelete }>Yes</Button></Link>
                <Button onClick = { handleClose }>No</Button>
            </DialogActions>       
        </Dialog>
        
        </>
    )
}

export default DeleteAccount;