import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { CircularProgress } from "@mui/material";

import AppCtx from "../../context/context";
import useMap from "../../hooks/useMap";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const render = (status) => {
  switch (status) {
    case Status.LOADING:
      return <CircularProgress />;
    case Status.FAILURE:
      break;
    case Status.SUCCESS:
      break;
  }
};

const MapModal = ({ showModal, setShowModal }) => {
  // ctx
  const { selectedAirports } = React.useContext(AppCtx).state;
  const centerLat = (selectedAirports[0].lat + selectedAirports[1].lat) / 2;
  const centerLng = (selectedAirports[0].lng + selectedAirports[1].lng) / 2;
  // states
  const [clicks, setClicks] = React.useState([]);
  const [zoom, setZoom] = React.useState(5); // initial zoom
  const [center, setCenter] = React.useState({
    lat: centerLat,
    lng: centerLng,
  });

  //#region behavior handlers
  const onClose = (e) => {
    setShowModal(false);
  };

  const onClick = (e) => {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng]);
  };

  const onIdle = (m) => {
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };
  //#endregion

  const markersLoc = selectedAirports.map((ap) => {
    return { lat: ap.lat, lng: ap.lng };
  });

  console.log(markersLoc);

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box style={style}>
        {/* eslint-disable-next-line no-undef */}
        <Wrapper apiKey={process.env.REACT_APP_GOOGLE_API_KEY} render={render}>
          <Map
            markersLoc={markersLoc}
            center={center}
            onClick={onClick}
            onIdle={onIdle}
            zoom={zoom}
            style={{ flexGrow: "1", height: "100%" }}
          >
            {selectedAirports.map((ap) => (
              <Marker
                key={ap.id}
                position={{ lat: ap.lat, lng: ap.lng }}
              ></Marker>
            ))}
          </Map>
        </Wrapper>
      </Box>
    </Modal>
  );
};

MapModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
};

const Map = ({ onClick, onIdle, children, style, markersLoc, ...options }) => {
  const { ref, map } = useMap({
    onClick,
    onIdle,
    children,
    style,
    markersLoc,
    ...options,
  });

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
  // [END maps_react_map_component_return]
};

Map.propTypes = {
  onClick: PropTypes.any,
  onIdle: PropTypes.any,
  style: PropTypes.any,
  children: PropTypes.node,
  markersLoc: PropTypes.object,
};

const Marker = (options) => {
  const [marker, setMarker] = React.useState();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

export default React.memo(MapModal);
