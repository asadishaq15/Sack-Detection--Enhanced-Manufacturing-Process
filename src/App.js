import logo from './logo.svg';
import './App.css';
import { ThemeProvider, createTheme } from '@material-ui/core';
import customTheme from './theme/theme';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResponsiveDrawer from './components/responsiveDrawer';
import Upload from './components/upload';
import LiveStream from './components/tools/liveStream';
import EnhanceComponent from './components/tools/enhance';
import Camera from './components/database/camera';
import VideoQuality from './components/tools/videoQuality';

function App() {
  const theme = createTheme(customTheme);
  return (
    <ThemeProvider theme={theme}>
      <Router>
      <ResponsiveDrawer>
        <Routes>
      
          <Route path="cctv" element={<Camera />} />
          <Route path="enhance" element={<EnhanceComponent />} />
          <Route path="videoquality" element={<VideoQuality />} />
          <Route path="upload" element={<Upload />} />
          <Route path="livestream" element={<LiveStream />} />
          <Route path="/" element={<Upload />} />
        </Routes>
        </ResponsiveDrawer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
