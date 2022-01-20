import { makeStyles } from '@material-ui/core/styles';

const usesStyles = makeStyles((theme) => ({
    containerButton:{
        height:"100%",
    },

    buttonCenter:{
        display:"block",
        margin:"20px auto",
        width:"80%",
        border:"1px solid black",
    },

    [theme.breakpoints.down('xs')]: {
        buttonCenter:{
            margin:"10px auto",
            width:"100%",
        },

        containerButton:{
            height:"40%",
        },
    },

    linkNone:{
        textDecoration:'none',
    },

    size:{
        width:'100%',
    },

    errorMessage: {
        width:'100%',
    },

    activeLink:{
        color:'red',
    }

}));


export default usesStyles;
