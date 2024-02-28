import React, { useEffect, useState } from "react";
import {
    Grid,
    Button,
    Paper,
    IconButton,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputAdornment,
    TextField,
  } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import CancelIcon from "@material-ui/icons/Cancel";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker,
  } from "@material-ui/pickers";


import LocationOnIcon from "@material-ui/icons/LocationOn";
import SearchIcon from "@material-ui/icons/Search";
  import MomentUtils from '@date-io/moment';
import ResponsiveDrawer from "../responsiveDrawer";

const useStyles = makeStyles((theme) => ({
  
    filePaper: {
      background: "#2a3f73",
      border: "1px solid #4f619a",
    },
    verticalText: {
      minHeight: "60px",
      lineHeight: "60px",
      textAlign: "center",
    },
    verticalSpan: {
      display: "inline-block",
      verticalAlign: "middle",
      lineHeight: "normal",
    },
    chooseLocation: {
      padding: "20px",
    },
    locationPaper: {
      height: "100%",
      background: "#2a3f73",
      border: "1px solid #4f619a",
    },
    locationButton: {
      paddingBottom: "10px",
      background: "#2a3f73",
      border: "1px solid #4f619a",
      textAlign: "center",
      cursor: "pointer",
      "&:hover": {
        background: "#0a045e",
        border: "1px solid #0a045e",
      },
    },
    uploadButton: {
      width: "100%",
      background: "#30a3f2",
      "&:hover": {
        background: "#0a045e",
        color: "#fff",
      },
    },
  }));
  const LocationItem = (props) => {
    const classes = useStyles();
  
    const changeLocation = () => {
      props.setLocation({
        oid: props.oid,
        latitude: props.latitude,
        longitude: props.longitude,
        name: props.name,
      });
      props.setTitle(props.name);
    };
  
    return (
      <ResponsiveDrawer>
      <Grid
        className={classes.locationChooser}
        onClick={changeLocation}
        item
        lg={2}
        md={2}
        sm={4}
        xs={6}
      >
         <Grid container>
          <Grid item xs={6}>
            <div className={classes.verticalContainer}>
              <div className={classes.verticalDiv}>
                <LocationOnIcon fontSize="large" />
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div style={{ fontSize: "12px", wordWrap: "break-word" }}>
              {props.name}
            </div>
            <div style={{ marginTop: "5px" }}>
              <span style={{ fontSize: "12px" }}>Lat : </span>
              <span style={{ color: "#fff" }}>
                {parseFloat(props.latitude).toFixed(3)}
              </span>
            </div>
            <div>
              <span style={{ fontSize: "12px" }}>Lon : </span>
              <span style={{ color: "#fff" }}>
                {parseFloat(props.longitude).toFixed(3)}
              </span>
            </div>
          </Grid>
        </Grid>
      </Grid>
      </ResponsiveDrawer>
    );
  };
  
  const LocationDialog = (props) => {
    const classes = useStyles();
    const [locationData, setLocationData] = useState([]);
  //   const auth = useContext(AuthContext);
    const [searchData, setSearchData] = useState([]);
    const [title, setTitle] = useState("Choose a Location");
    const [searchText, setSearchText] = useState("");
  
  //   const { isLoading, error, sendRequest, clearError } = useHttpClient();
  
  //   useEffect(() => {
  //     const fetchLocations = async () => {
  //       try {
  //         const responseData = await sendRequest(
  //           process.env.REACT_APP_BACKEND_URL + "/cctv/getcctv",
  //           "GET",
  //           null,
  //           {
  //             Authorization: "Bearer " + auth.token,
  //           }
  //         );
  //         setLocationData(responseData);
  //         setSearchData(responseData);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     if (props.open) {
  //       fetchLocations();
  //     }
  //   }, [props.open, sendRequest, auth.token]);
  
    const clearLocation = () => {
      props.setLocation({});
      setTitle("Choose a Location");
    };
  
    const searchHandler = (event) => {
      setSearchText(event.target.value);
      let search = event.target.value;
      let items = locationData;
      if (search) {
        let filterItems = [];
        for (let i = 0; i < items.length; i++) {
          if (
            items[i].formatted_address
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            items[i].latitude.toString().includes(search) ||
            items[i].longitude.toString().includes(search)
          ) {
            filterItems.push(items[i]);
          }
        }
        setSearchData(filterItems);
      } else {
        setSearchData(items);
      }
    };
  
    return (
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="max-width-dialog-title"
      >
          <DialogTitle>
          <Grid container>
            <Grid item md={8} xs={12}>
              {title}
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                className={classes.margin}
                id="input-with-icon-textfield"
                label="Search"
                value={searchText}
                onChange={searchHandler}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          {/* {isLoading && (
            <div className={classes.loader}>
              <LoadingSpinner />
            </div>
          )} */}
          <Grid container>
            {searchData &&
              searchData.map((location, index) => (
                <LocationItem
                  key={index}
                  oid={location._id.$oid}
                  latitude={location.latitude}
                  longitude={location.longitude}
                  name={location.formatted_address}
                  setLocation={props.setLocation}
                  setTitle={setTitle}
                />
              ))}
          </Grid>
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={clearLocation} color="primary">
                Clear
            </Button>
            {props.handleClose && ( 
                <Button onClick={props.handleClose} color="primary" autoFocus>
                Ok
                </Button>
            )}
</DialogActions>
      </Dialog>
    );
  };
  
  
const UploadVideo = () => {
  const classes = useStyles();
  const [videoFile, setVideoFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [location, setLocation] = useState({});
  const [open, setOpen] = useState(false);
  const clearVideoFile = () => {
    setVideoFile(null);
  };



  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const clearSuccess = () => {
    setUploading(false);
    setSuccess(false);
    setProgress(0);
  };
  return (
    <>
      <LocationDialog
        open={open}
        handleClose={handleClose}
        setLocation={setLocation}
      />
     <Grid item md={5} sm={12} xs={12}>
              <div style={{ padding: "20px" }}>
                <Paper className={classes.filePaper} variant="outlined" square>
                  {videoFile ? (
                    <Grid container>
                      <Grid className={classes.verticalText} item xs={10}>
                        <span className={classes.verticalSpan}>
                          {videoFile.name}
                        </span>
                      </Grid>
                      <Grid className={classes.verticalText} item xs={2}>
                        <IconButton aria-label="clear" onClick={clearVideoFile}>
                          <CancelIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid container>
                      <Grid className={classes.verticalText} item xs={12}>
                        No video uploaded
                      </Grid>
                    </Grid>
                  )}
                </Paper>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Typography variant="h5" style={{ color: "#758cd1" }}>
                      Date
                    </Typography>
                    <KeyboardDateTimePicker
    variant="inline"
    ampm={false}
    label="Select Date and Timestamp"
    value={selectedDate}
    onChange={handleDateChange}
    onError={console.log}
    format="yyyy/MM/dd HH:mm"
  />
                  </MuiPickersUtilsProvider>
                </div>
              </div>
              <div>
                <Grid container className={classes.chooseLocation}>
                  <Grid item xs={6}>
                    <Paper square className={classes.locationPaper}>
                      {Object.keys((location)).length > 0 ? (
                        <div style={{ padding: "5px" }}>
                          <div style={{ fontSize: "12px" }}>Latitude</div>
                          <div style={{ color: "#fff" }}>
                            {location.latitude}
                          </div>
                          <div style={{ fontSize: "12px" }}>Longitude</div>
                          <div style={{ color: "#fff" }}>
                            {location.longitude}
                          </div>
                        </div>
                      ) : (
                        <Typography
                          style={{
                            marginTop: "14%",
                            fontSize: "18px",
                            textAlign: "center",
                          }}
                        >
                          No Location selected
                        </Typography>
                      )}
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper
                      square
                      className={classes.locationButton}
                      onClick={handleClickOpen}
                    >
                      <div style={{ margin: "10px" }}>
                        <MyLocationIcon fontSize="large" />
                      </div>
                      Choose Location
                    </Paper>
                  </Grid>
                </Grid>
              </div>
              <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                {/* {error && (
                  <Alert
                    variant="outlined"
                    style={{ color: "#f44336", marginBottom: "10px" }}
                    severity="error"
                    onClose={clearError}
                  >
                    {error}
                  </Alert>
                )} */}
                {success && (
                  <Alert severity="success" onClose={clearSuccess}>
                    <AlertTitle>Success</AlertTitle>
                    <span>
                      <strong>Camera</strong>
                    </span>{" "}
                    location has been succesfully updated.
                  </Alert>
                )}
              </div>
              {uploading && (
                <Grid style={{ padding: "20px" }} container>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      Uploading Video {progress} %
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="cssProgress">
                      <div className="progress4">
                        <div
                          className="cssProgress-bar cssProgress-glow-active cssProgress-lg"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </Grid>
                </Grid>
              )}
              <div
                style={{
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  marginBottom: "10px",
                  textAlign: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="default"
                  className={classes.uploadButton}
                  startIcon={<CloudUploadIcon />}
                //   onClick={uploadHandler}
                  disabled={uploading}
                >
                  Upload
                </Button>
              </div>
            </Grid>
    </>
  );
};

export default UploadVideo;
