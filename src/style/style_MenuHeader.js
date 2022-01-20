import { makeStyles } from '@material-ui/core/styles';

const usesStyles = makeStyles((theme)=>({
    boxCenter:{
        display:"flex",
        flexDirection:"column",
        width:"200px",
    },

    [theme.breakpoints.up('sm')]:{
        logsign:{
            display:"none",
        },
    },

    butContent:{
        borderTop: "3px solid grey",
        borderBottom: "3px solid grey",
    },

    [theme.breakpoints.down('xs')]:{
        logsign:{
            marginBottom:"10px",
        },
    },

    logsign:{
      width:"100%",
      marginBottom:"20px",
    }
}));

export default usesStyles;
