import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import DateFnsUtils from "@date-io/date-fns";


import MagicDropzone from "react-magic-dropzone";

import { makeStyles } from "@material-ui/core/styles";

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
import { Alert, AlertTitle } from "@material-ui/lab";
import upload from "./upload.svg";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SearchIcon from "@material-ui/icons/Search";

import "./upload.css";
import ResponsiveDrawer from "./responsiveDrawer";

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    margin: {
      margin: theme.spacing(1),
    },
    container: {
      padding: "30px",
    },
    dropzone: {
      margin: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      border: "2px dashed #1c233e",
      height: "100%",
      padding: "16px 11px",
      borderRadius: "5px",
    },
    dropzoneContainer: {
      textAlign: "center",
    },
    browseButton: {
      textTransform: "none",
      backgroundColor: "#1273eb",
      color: "#fff",
      padding: "10px",
      paddingLeft: "15px",
      paddingRight: "15px",
      "&:hover": {
        backgroundColor: "#0a045e",
      },
    },
    drag: {
      color: "#000",
      fontSize: "20px",
      fontWeight: 500,
    },
    or: {
      color: "#0a045e",
      fontSize: "15px",
      fontWeight: 400,
    },
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
  
    uploadButton: {
      width: "100%",
      background: "#30a3f2",
      "&:hover": {
        background: "#0a045e",
        color: "#fff",
      },
    },
 
 
    verticalDiv: {
      textAlign: "center",
      margin: 0,
      position: "absolute",
      top: "50%",
      msTransform: "translateY(-50%)",
      transform: "translateY(-50%)",
    },
    loader: {
      paddingTop: "50px",
      paddingBottom: "50px",
    },
    progressContainer: {
      height: "50px",
      position: "relative",
    },
    progressDiv: {
      margin: 0,
      position: "absolute",
      top: "50%",
      msTransform: "translateY(-50%)",
      transform: "translateY(-50%)",
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
        <Button onClick={props.handleClose} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Upload = () => {
  const classes = useStyles();
//   const auth = useContext(AuthContext);
  const [videoFile, setVideoFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [location, setLocation] = useState({});
  const [open, setOpen] = useState(false);
//   const { error, clearError, setErrorText } = useHttpClient();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onDrop = (accepted, rejected, links) => {
    if (accepted && accepted.length > 0) {
      setVideoFile(null);
      console.log(accepted[0]);
      setVideoFile(accepted[0]);
    }
  };

  const clearVideoFile = () => {
    setVideoFile(null);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

//   const uploadHandler = () => {
//     if (videoFile && selectedDate && Object.keys(location).length > 0) {
//       setUploading(true);
//       setProgress(0);

//       const headers = {
//         Authorization: "Bearer " + auth.token,
//       };

//       const config = {
//         onUploadProgress: function (progressEvent) {
//           let percentCompleted = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           setProgress(percentCompleted);
//         },
//         headers: headers,
//       };

//       let data = new FormData();
//       data.append("video", videoFile);
//       data.append("time", String(selectedDate));
//       data.append("location", location.oid);

//       axios
//         .post(
//           process.env.REACT_APP_BACKEND_URL + "/video/addvideo",
//           data,
//           config
//         )
//         .then((res) => {
//           console.log("Video Uploaded");
//           console.log(res);
//           clearError();
//           setLocation(undefined);
//           setVideoFile(null);
//           setSuccess(true);
//         })
//         .catch((err) => {
//           setErrorText(err.message);
//           setUploading(false);
//         });
//     } else {
//       setErrorText("Fields are empty! Please recheck provided params.");
//     }
//   };

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
      <div className={classes.container}>
        <Paper square>
        <Grid container>
            <Grid
              style={{ backgroundColor: "#d6dffe" }}
              item
              md={7}
              sm={12}
              xs={12}
            >
              <div>
                <MagicDropzone
                  className={classes.dropzone}
                  accept="video/mp4, video/x-m4v, video/*"
                  multiple={false}
                  onDrop={onDrop}
                >
                  <div className={classes.dropzoneContainer}>
                    <div style={{ marginTop: "30px", marginBottom: "30px" }}>
                      <img width="100" src={upload} alt="upload" />
                      <p className={classes.drag}>Drag and drop videos here</p>
                      <p className={classes.or}>or</p>
                      <Button className={classes.browseButton}>
                        Browse Videos
                      </Button>
                    </div>
                  </div>
                </MagicDropzone>
              </div>
            </Grid>
          
          </Grid>
        </Paper>
      </div>
    </>
  );
};

export default Upload;
