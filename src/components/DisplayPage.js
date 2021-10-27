import React, { useState, useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import moment from "moment";
import DisplayCards from "./DisplayCards";
import { Grid } from "@material-ui/core";
import DisplayDetail from "./DisplayDetail";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import DisplayList from "./DisplayList";

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

const PAGINATION_LIMIT = 4;
const CRASH_DATE = moment("2014-06-06").format("YYYY-MM-DDTHH:mm:ss.SSS");
console.log(CRASH_DATE);
const DisplayPage = ({cardView}) => {
    const classes = useStyles();
  const [CrashData, setCrashData] = useState([]);
  const [AllCrashData, setAllCrashData] = useState([]);
  const [ItemToShow, setItemToShow] = useState()
  const [pageNr, setPageNr] = useState(1);
  const [CrashDataDate, setCrashDataDate] = useState(CRASH_DATE)
  const CRASH_DATA_TARGET_URL = `https://data.cityofnewyork.us/resource/h9gi-nx95.json?crash_date=${CrashDataDate}&vehicle_type_code2=PASSENGER%20VEHICLE&$offset=${(pageNr-1)*PAGINATION_LIMIT}&$limit=${PAGINATION_LIMIT}`;
  const CRASH_DATA_ALL_URL = `https://data.cityofnewyork.us/resource/h9gi-nx95.json`
  const getCrashData = async () => {
    await axios.get(CRASH_DATA_TARGET_URL).then((res) => setCrashData(res.data));
    await axios.get(CRASH_DATA_ALL_URL).then((res) => setAllCrashData(res.data));  //to get count of paginations from data available
  };

  const filterItem = (parameter) => {
    console.log(parameter)
    setItemToShow(parameter)
}

  useEffect(() => {
    getCrashData();
  }, [CrashDataDate]);
  
  useEffect(() => {
    getCrashData();
  }, [pageNr]);

  return (
    <>
      <Grid
        container
        spacing={10}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
          <Grid item xs={12}><form className={classes.container} noValidate>
        <TextField
          id="date"
          label="Select Date"
          type="date"
          defaultValue={moment(CrashDataDate).format('YYYY-MM-DD')}
          className={classes.textField}
          style={{paddingTop: '20px'}}
          onChange={e=>setCrashDataDate(moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss.SSS'))}
          InputLabelProps={{
            shrink: true,
          }}
        /></form></Grid>
        <Grid item xs={12}>
          {cardView && <DisplayCards CrashData={CrashData} filterItem={filterItem} CrashDataDate={CrashDataDate} />}
          {!cardView && <DisplayList CrashData={CrashData} filterItem={filterItem} CrashDataDate={CrashDataDate} />}
        </Grid>
        <Grid item xs={12}>
          <Pagination
            count={AllCrashData?.length-1}
            // count={CrashData?.length-1}
            variant="outlined"
            color="primary"
            onChange={(e, page) => setPageNr(page)}
          />
        </Grid>
        {ItemToShow !== undefined && <DisplayDetail ItemToShow={ItemToShow} />}
      </Grid>
    </>
  );
};

export default DisplayPage;
