import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const DisplayList = ({CrashData, filterItem, CrashDataDate}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {CrashData?.length === 0 ? (
        <Typography className={classes.typography}>
          NO DATA AVAILABLE ON {moment(CrashDataDate).format("YYYY-MM-DD")}
        </Typography>
      ) : (
        CrashData?.map((each, key) => {
          return (
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button>
                <ListItemText 
                    primary={`${each.vehicle_type_code1} collided ${each.vehicle_type_code2}`} 
                    secondary={`${moment(each.crash_date).format('YYYY_MM_DD')} at ${each.crash_time} Hours`} 
                    />
              </ListItem>
            </List>
          );
        })
      )}
    </div>
  );
}

export default DisplayList

