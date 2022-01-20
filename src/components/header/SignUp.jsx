import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, Button, DialogContent,  DialogTitle, TextField, Box } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useDispatch } from 'react-redux';

import axiosInstance from 'services/createApiInstance';

import usesStyles from 'style/style_ButtonContent';

function SignUp(){

    const cssStyle = usesStyles();

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState('email не должен быть пустым');
    const [passwordError, setPasswordError] = useState('пароль не должен быть пустым');
    const [formValid, setFormValid] = useState(false);
    const [login, setLogin] = useState('');
    const [loginDirty, setLoginDirty] = useState(false);
    const [loginError, setLoginError] = useState('login не должен быть пустым');
    
    const handleClickOpen = () => {
        setOpen(true);
    }

    const loginHandler = (e) => {
        setLogin(e.target.value)
        const re = /^[a-zA-Z1-9]+$/;
        if (!re.test(String(e.target.value).toLowerCase())){
            setLoginError('Логин не валидный')
        }
        else{
            setLoginError('')
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value).toLowerCase())){
            setEmailError('email не валидный');
        }
        else{
            setEmailError('');
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 8){
            setPasswordError('Пароль должен быть длиннее 3 и меньше 8 символов');
            if(!e.target.value){
                setPasswordError('пароль не должен быть пустым');
            }
        }
        else {
            setPasswordError('');
        }
    }
 
    const blurHandler = (e) =>{
        switch (e.target.id){
            case 'email':
                setEmailDirty(true)
            break
            
            case 'password':
                setPasswordDirty(true)
            break
            
            case 'login':
                setLoginDirty(true)
            break
            default:{}
        }
    }

    const handleClose = () =>{
        setOpen(false);
    }

    const handleSubmit = () =>{
        
        const user = {
            name: login, //'kerebasik', //login // deniska
            email: email, //'test@gmail.com', //email // deniskaTest@gmail.com
            password: password, //'12345'  // password // 12345
        }

        const userData = { 
            email:user.email, 
            password:user.password,
        }

        axiosInstance.post('/users', user).then(()=>{
            
            axiosInstance.post('/auth', userData).then((res)=>{
                console.log(res.data);
                dispatch({type:'ADD_USER', payload:res.data})
                localStorage.setItem('token', `${res.data.token}`)
                axiosInstance.get('/auth/user').then((response)=>{
                    console.log(res)
                    dispatch({type:'ADD_USER_NAME', payload:response.data.name})
                    localStorage.setItem('name', `${response.data.name}`)
                    document.location.reload()
                })
                
            })
        
        })

   

        

        handleClose()
        
    }

    useEffect(() => {
        if(emailError || passwordError || loginError){
            setFormValid(false)
        }
        else{
            setFormValid(true)
        }

    },[emailError, passwordError, loginError]);
    
    return(
        <>
        <Button color="secondary" className = {cssStyle.size} size="large" onClick={handleClickOpen} variant="contained">Sign up</Button>
        <Dialog open={open} onClose={handleClose} onSubmit = { handleSubmit } aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title"> 
                Sign Up
            </DialogTitle>
            <DialogContent>
                <Box>
                {
                    ( ( loginDirty && loginError ) || ( emailDirty && emailError ) || ( passwordDirty && passwordError ) ) && 
                
                    <Box  className={cssStyle.errorMessage}>
                        
                        <Alert severity="error">
                        
                        <AlertTitle> Error </AlertTitle>

                            <Box>
                            { 
                                (loginDirty && loginError) && loginError 
                            }
                            </Box>

                            <Box>
                            {
                                 (emailDirty && emailError) && emailError
                            }
                            </Box>

                            <Box>
                            {
                                (passwordDirty && passwordError) && passwordError
                            }
                            </Box> 

                        </Alert>
                        
                    </Box>
     
                }
               
                <TextField
                    autoFocus
                    margin="dense"
                    id="login"
                    label="Login"
                    value={ login }
                    type="login"
                    fullWidth
                    onBlur={ (e) => blurHandler(e) }
                    onChange={ (e) => loginHandler(e) }
                />

                </Box>
                       
                <TextField
                    margin="dense"
                    id="email"
                    value={ email }
                    label="Email Adress"
                    type="email"
                    fullWidth
                    onBlur={ (e) => blurHandler(e) }
                    onChange={ (e) => emailHandler(e) }
                />
    
                 <TextField
                    margin="dense"
                    id="password"
                    type="password"
                    value={ password }
                    label="Password"
                    fullWidth
                    onBlur={ (e) => blurHandler(e) }
                    onChange={ (e) => passwordHandler(e) }
                />
                
            </DialogContent> 
            <DialogActions>
                <Button type='submit'  onClick = { handleSubmit} disabled={!formValid}>Sing up</Button>
                <Button onClick = {  handleClose  }> Cancel</Button>
            </DialogActions>       
        </Dialog>
        </>
    );
}

export default SignUp;