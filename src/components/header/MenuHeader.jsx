import * as React  from 'react';
import {Button, Dialog, DialogActions, Box, DialogContent,  DialogTitle} from '@material-ui/core';


import SignUp from './SignUp';
import LogIn from './LogIn';
import ButtonContent from 'components/content/ButtonContent';
import AuthMenuXS from 'components/header/AuthMenuXS';

import usesStyles from 'style/style_MenuHeader';

function MenuHeader(props) {
    const [OpenForm, setOpenForm] = React.useState(false);

    const clickOpen = () =>{
        setOpenForm(true);
    }

    const clickClose = () =>{
        setOpenForm(false);
    }

    const cssStyle = usesStyles();
    
    return(
        <>
            <Button color="inherit" size="large" onClick={clickOpen} variant="outlined">Menu</Button>
            <Dialog open={OpenForm} onClose={clickClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title"> 
                Menu

                {
                    props.auth &&

                <Box flexGrow={1}>
                    <AuthMenuXS login="UserLogin" />
                </Box>
                }
            </DialogTitle>
            <DialogContent>
                <Box className={cssStyle.boxCenter}>

                    {
                        !props.auth &&  
                        <>
                            <Box className={cssStyle.logsign}>
                                <LogIn/>   
                            </Box>
                    
                            <Box className={cssStyle.logsign}>
                                <SignUp/>  
                            </Box> 
                        </>


                    } 
                    
                    <Box className={cssStyle.butContent}>
                        <ButtonContent/>
                    </Box>
                </Box>
                
            </DialogContent>

            <DialogActions>
                <Button onClick={clickClose}>Cancel</Button>
            </DialogActions>       
        </Dialog>
        </>
    ); 
}

export default MenuHeader;