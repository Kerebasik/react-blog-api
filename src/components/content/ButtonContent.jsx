import React from 'react';
import { Button, Box} from '@material-ui/core';

import usesStyles from 'style/style_ButtonContent';

import { NavLink } from 'react-router-dom';





function ButtonContent(){
    
    const cssStyle = usesStyles();

    const BUTTONS = [
        { title:'Users', hrefTo:'/user' },
        { title:'Posts', hrefTo:'/post' },
        { title:'My Profile', hrefTo:'/profile' }
    ]

    return(
            <Box className={cssStyle.containerButton}>
                {
                    BUTTONS.map(({title, hrefTo}) => (
                        <NavLink className={cssStyle.linkNone} key={title} to={hrefTo}><Button className={cssStyle.buttonCenter} size="medium" variant="contained">{title}</Button></NavLink>
                    ))
                }

            </Box>   
    );
}

export default ButtonContent;