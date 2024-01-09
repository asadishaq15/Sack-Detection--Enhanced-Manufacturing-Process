import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Upload from './components/upload';
import { BrowserRouter as Router } from 'react-router-dom';
import SideDrawer from './components/sideDrawer';
import ResponsiveDrawer from './components/responsiveDrawer';
import VideoQuality from './components/tools/videoQuality';
import Camera from './components/database/camera';
import EnhanceComponent from './components/tools/enhance';
import LiveStream from './components/tools/liveStream';
import AddCamera from './components/database/addCamera';
import CamMap from './components/database/camMap';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <App />
    {/* <Upload/> */}
    {/* <SideDrawer/>
    <ResponsiveDrawer/> */}
    {/* <VideoQuality/> */}
    {/* <Camera/> */}
    {/* <EnhanceComponent/> */}
    {/* <LiveStream/> */}
    {/* <AddCamera/> */}
  

 
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
