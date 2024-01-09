import React from "react";
import MapGL, { Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface Location {
  oid: string;
  latitude: number | null;
  longitude: number | null;
  address: string | null;
}

interface Props {
  width: string;
  height: string;
  viewState: {
    latitude: number;
    longitude: number;
    zoom?: number;
    pitch?: number;
    bearing?: number;
  };
  onViewStateChange: (params: { viewState: any }) => void;
}

const CamMap: React.FC<Props> = ({ width, height, viewState, onViewStateChange }) => {
  const location: Location = {
    oid: "",
    latitude: null,
    longitude: null,
    address: "",
  };

  const clearPopUp = () => {
    // Implement clearing logic if needed
  };

  return (
    <MapGL
      width={width}
      height={height}
      viewState={viewState}
      onViewStateChange={(e) => onViewStateChange({ viewState: e })}
      mapStyle="mapbox://styles/gisfeedback/cjvod9hc909kh1eo9nj23g33k"
    >
      {location.oid && location.latitude && location.longitude && (
        <Popup
          style={{ background: "#000000" }}
          longitude={Number(location.longitude)}
          latitude={Number(location.latitude)}
          onClose={clearPopUp}
        >
          <div>
            <p>{location.address}</p>
          </div>
        </Popup>
      )}
    </MapGL>
  );
};

export default CamMap;
