import React from 'react';
import { Container, Grid, Paper } from '@material-ui/core';


import ButtonContent from './ButtonContent';

import { Outlet } from 'react-router-dom';

import usesStyles from 'style/style_Content';



function СontentMain(){

    const classes = usesStyles();
    
    return (
        <>
            <Container maxWidth="lg" className={classes.mainContent}>
                <Grid container spacing={4} className={classes.mainGrid}>
                    <Grid item sm={3} md={3} className={classes.displa}>
                        <Paper className={classes.paper}>
                            <ButtonContent/>
                        </Paper>
                    </Grid>

                    <Grid item sm={9} md={9} xs={12} className={classes.root}> 
                        <Paper className={classes.paper}>
                            <Outlet/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default СontentMain;