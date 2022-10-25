import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { CircularProgress } from "@mui/material";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { createCustomEqual } from "fast-equals";
import AppCtx from "../../context/context";

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

const MapModal = ({ show, setShowModal }) => {
  // states
  const [clicks, setClicks] = React.useState([]);
  const [zoom, setZoom] = React.useState(4); // initial zoom
  const [center, setCenter] = React.useState({
    lat: 39.8097343,
    lng: -98.5556199,
  });

  // ctx
  const { selectedAirports } = React.useContext(AppCtx).state;

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

  return (
    <Modal
      open={show}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box style={style}>
        <Wrapper
          apiKey={"AIzaSyD5KziAEbtPoQ33K1QcpgaS_5a9r3PyxEo"}
          render={render}
        >
          {show ? (
            <Map
              center={center}
              onClick={onClick}
              onIdle={onIdle}
              zoom={zoom}
              style={{ flexGrow: "1", height: "100%" }}
            >
              {selectedAirports.length == 2
                ? selectedAirports.map((ap) => (
                    <Marker
                      key={ap.id}
                      position={{ lat: ap.lat, lng: ap.lon }}
                    ></Marker>
                  ))
                : null}
            </Map>
          ) : null}
        </Wrapper>
      </Box>
    </Modal>
  );
};

MapModal.propTypes = {
  show: PropTypes.bool,
  setShowModal: PropTypes.func,
};

const Map = ({ onClick, onIdle, children, style, ...options }) => {
  // [START maps_react_map_component_add_map_hooks]
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();
  const { state } = React.useContext(AppCtx);

  // sets up the map, and polyline
  React.useEffect(() => {
    if (ref.current && !map) {
      const map = new window.google.maps.Map(ref.current, {});

      const { selectedAirports } = state;

      const flightPlanCoordinates = [
        { lat: selectedAirports[0].lat, lng: selectedAirports[0].lon },
        { lat: selectedAirports[1].lat, lng: selectedAirports[1].lon },
      ];

      const flightPath = new window.google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });

      flightPath.setMap(map);
      setMap(map);
    }
  }, [ref, map]);

  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);
  // [END maps_react_map_component_options_hook]

  // [START maps_react_map_component_event_hooks]
  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        window.google.maps.event.clearListeners(map, eventName)
      );
      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);
  // [END maps_react_map_component_event_hooks]
  // [START maps_react_map_component_return]

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

const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
  if (
    isLatLngLiteral(a) ||
    a instanceof window.google.maps.LatLng ||
    isLatLngLiteral(b) ||
    b instanceof window.google.maps.LatLng
  ) {
    return new window.google.maps.LatLng(a).equals(
      new window.google.maps.LatLng(b)
    );
  }
  // TODO extend to other types
  // use fast-equals for other objects
  return deepEqual(a, b);
});

function useDeepCompareMemoize(value) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}

function useDeepCompareEffectForMaps(callback, dependencies) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export default React.memo(MapModal);
