import React from "react";
import { Container, Grid } from "@material-ui/core";
import LiveCam from "./liveCam";

const LiveStream = () => {
  return (
    <Container style={{ paddingTop: "20px" }} maxWidth="xl">
      <Grid container>
        <LiveCam />
        <LiveCam />
        <LiveCam />
        <LiveCam />
      </Grid>
    </Container>
  );
};

export default LiveStream;
