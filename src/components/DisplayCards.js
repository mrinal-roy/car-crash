import React, {useState} from "react";
import { Card, CardContent, Button, Typography, Grid, CardActionArea} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

const useStyles = makeStyles({
    root: {
    //   maxWidth: 345,
    width: 'auto'
    },
    media: {
      height: 250
    },
    textpos: {
        textAlign: 'center',
    },
    cardAction: {
        display: 'block',
        textAlign: 'initial'
      },
      typography: {
          fontSize: 16,
          fontWeight: 'bold',
          color: 'red'
      }
  });
  
const DisplayCards = ({ CrashData, filterItem, CrashDataDate }) => {
    const [collisionID, setCollisionID] = useState()
  console.log("CrashData in Displaycards: ", CrashData);

  const classes = useStyles();

  const clickHandler = (each) => {
    console.log(each)
    filterItem(each.collision_id)
    setCollisionID(each.collision_id)
  }

  return (
    <>
      <Grid container justifyContent="center" spacing={2}>
        {CrashData?.length===0 ? <Typography className={classes.typography}>
                      NO DATA AVAILABLE ON {moment(CrashDataDate).format("YYYY-MM-DD")}
                    </Typography> : CrashData?.map((each, key) => {
          return (
            <Grid item xs justifyContent="center">
              <Card 
                className={classes.media}
                >
                <CardActionArea 
                    // component={RouterLink}
                    // onClick={each=>console.log(each)}
                    // to="/detail"
                >
                  <CardContent className={classes.textpos}>
                    <Typography className={classes.typography}>
                      {each.vehicle_type_code1}
                    </Typography>
                    collided
                    <Typography className={classes.typography}>
                      {each.vehicle_type_code2}
                    </Typography>
                    on
                    <Typography className={classes.typography}>
                      {moment(each.crash_date).format('YYYY-MM-DD')}
                    </Typography>
                    at
                    <Typography className={classes.typography}>
                      {each.crash_time} Hours
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Button id={key} onClick={clickHandler}>DETAILS HERE</Button>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default DisplayCards;
