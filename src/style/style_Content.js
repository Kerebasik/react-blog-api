import { makeStyles } from '@material-ui/core/styles';

const usesStyles = makeStyles((theme) => ({
    
    root:{
        flexGrow:1,
        justifyContent:"center",
    },
    
    paper:{
        height:"100%",
        width:"100%",
        border:'solid 1px black'
    },

    mainGrid:{
        minHeight:660,
    },

    control:{
        padding: theme.spacing(2),
    },

    displa:{
        flexGrow:1,
        justifyContent:"center",
        
    },

    [theme.breakpoints.down('xs')]: {
        displa:{
            display:"none",
        },
    },
    
    mainContent:{
        position: "static",
        marginTop:40,
    },

    profile:{
       maxWidth:"80%",
       margin:"25px auto",
       height:"100%",
    },

    
}));

export default usesStyles;
