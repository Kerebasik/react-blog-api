import * as React from 'react';
import { AppBar, Typography, Toolbar, Grid, Box, Container } from '@material-ui/core';

import LogIn from './LogIn';
import SignUp from './SignUp';
import MenuHeader from 'components/header/MenuHeader';
import AuthMenu from './AuthMenu';
import { useDispatch } from 'react-redux';

import usesStyles from 'style/style_Header';

function ButtonAppBar() {
  const cssStyle = usesStyles();
  const dispatch = useDispatch();

  const auth = !!localStorage.getItem('token');

  return (
    <>
    <AppBar style={{ margin: 0 }} className={cssStyle.headerPosition}>
      <Container maxWidth="lg">
        <Toolbar className={cssStyle.toolBar}>
          <Box flexGrow={1}>
            <Typography variant="h6" >React Api Blog </Typography>
          </Box>
          <Box>

          <Grid container spacing={2}>
                <Grid item className={cssStyle.buttonMenu} >
                  <Box flexGrow={1}>
                    <MenuHeader auth={auth}/>
                  </Box>
                </Grid>


              {
                !auth ? 
                <>
                
                <Grid item className={cssStyle.headerButtons}>
                  <Box flexGrow={1}>
                    <LogIn/>
                  </Box>
                </Grid>
                
                <Grid item className={cssStyle.headerButtons}>
                  <Box flexGrow={1}>
                    <SignUp/>
                  </Box>
                </Grid>
                </>

                :

                <Grid item className={cssStyle.headerButtons}>
                  <Box flexGrow={1}>
                    <AuthMenu login="UserLogin" />
                  </Box>
                </Grid>

              }
          
          </Grid>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

    </>
  );
}

export default ButtonAppBar;
