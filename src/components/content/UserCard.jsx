import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, Avatar } from '@material-ui/core';
import moment from 'moment';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    margin:'10px 0px',
    border:'dashed 1px gray',
  },
  
}));

function RecipeReviewCard(props) {
  const defaultsImg = 'https://cdn.vuetifyjs.com/images/cards/mountain.jpg';
  const classes = useStyles();

  //const getImageApiUser = (object) => {
  //  if(object.data.avatar) {
  //    return object.data.avatar;
  //  }
  //  return defaultsImg;
  //}


  return (
      <Card className={classes.root}>
        <CardHeader
          avatar = {
            <Avatar 
              aria-label = "recipe" 
              src = {defaultsImg} 
              className = {classes.avatar} 
              />  
          }
          title = {props.data.name}
          subheader = { "Date create: " + moment(props.data.dateCreated.split("T")[0], 'YYYY-MM-DD').format('DD.MM.YYYY') }
        />
      </Card>
  );
}

export default RecipeReviewCard;