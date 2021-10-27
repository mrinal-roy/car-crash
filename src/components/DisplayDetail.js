import React from 'react'
import {Card, CardContent, Typography, CardActionArea} from '@material-ui/core';

const DisplayDetail = ({ItemToShow}) => {
    console.log(ItemToShow)
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {ItemToShow.collision_id}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default DisplayDetail
