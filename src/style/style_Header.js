import { makeStyles } from '@material-ui/core/styles';

const usesStyles = makeStyles((theme) => ({
    toolBar:{
      maxWidth:1366,
    },
    
    headerPosition:{
      position:"static"
    },
  
    [theme.breakpoints.up('sm')]: {
      buttonMenu:{
        display:"none",
      }
    },
  
    [theme.breakpoints.down('xs')]: {
      headerButtons:{
        display:"none",
      }
    },  
}));
  

export default usesStyles;
