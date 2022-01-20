import React, { useEffect, useState } from 'react';
import {Dialog, DialogActions, Button, DialogContent,  DialogTitle, Box, TextField} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import axiosInstance from 'services/createApiInstance';

import { useDispatch } from 'react-redux';

import usesStyles from 'style/style_ButtonContent';

function LogIn(){
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState('Login не должне быть пустым');
    const [passwordError, setPasswordError] = useState('password не должен быть пустым');

    const [formValid, setFormValid] = useState(false);

    const cssStyle = usesStyles();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () =>{
        setOpen(true);
    }

    const handleClose = () =>{
        setOpen(false);
    }

    const blurHandler = (e) =>{
        switch (e.target.id){
            case 'email':
                    setEmailDirty(true);
                break;
            case 'password':
                    setPasswordDirty(true);
                break;
            default:{}
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value).toLowerCase())){
            setEmailError('Not validaten');
        }
        else{
            setEmailError('');
        }
    }

    useEffect(()=>{
        if ( emailError || passwordError ){
            setFormValid(false);
        }
        else{
            setFormValid(true)
        }

    },[emailError, passwordError]);



const handleAuth = function(){
        const user = {
            email: email, //'test@gmail.com', //email
            password: password // '12345'  // password
        }

        axiosInstance.post('/auth', user).then((res)=>{
            dispatch({type:'ADD_USER', payload:res.data})
            localStorage.setItem('token', `${res.data.token}`)
            
            axiosInstance.get('/auth/user').then((response)=>{
                console.log(res)
                dispatch({type:'ADD_USER_NAME', payload:response.data.name})
                localStorage.setItem('name', `${response.data.name}`)
                document.location.reload()

            })
        })
        handleClose()
    }



    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 8){
            setPasswordError('Пароль должен быть длиннее 3 и меньше 8 символов')
            if(!e.target.value){
                setPasswordError('пароль не должен быть пустым')
            }
        }
        else {
            setPasswordError('')
        }
    }
    
    

    return(

        <>
            <Button color="primary" className = {cssStyle.size} size="large" onClick={handleClickOpen}  variant="contained"> Log in</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title"> 
                Log in 
            </DialogTitle>
            <DialogContent>
            { 

                (( emailDirty && emailError) || (passwordDirty && passwordError))&& 

                <Box  className={cssStyle.errorMessage}>
                    <Alert severity="error">
                    
                    <AlertTitle> Error </AlertTitle>
                        <Box>
                            { 
                                ( emailDirty && emailError ) && emailError
                            }
                        </Box>
                        
                        <Box>
                            {
                                ( passwordDirty && passwordError ) &&  passwordError
                            }
                        </Box>
                    </Alert>
                </Box>

            }

                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email Adress"
                    type="email"
                    fullWidth
                    onBlur={ (e) => blurHandler(e) }
                    onChange={ (e) => emailHandler(e) }
                    value={ email }
                />
                <TextField
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    onBlur={ (e) => blurHandler(e) }
                    value={ password }
                    onChange={ (e) => passwordHandler(e) }
                />
            </DialogContent> 
            <DialogActions>
                <Button onClick = { handleAuth } disabled={!formValid}>Log in</Button>
                <Button onClick = { handleClose }>Cancel</Button>
            </DialogActions>       
        </Dialog>
        
        </>
       
    );
}

export default LogIn;