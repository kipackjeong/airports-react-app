import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const render = (status) => {
  return <h1>{status}</h1>;
};

const Map = () => {
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);
  return <div ref={ref} />;
};

const MapModal = ({ show }) => {
  return (
    <>
      <Modal
        open={show}
        onClose={() => console.log("show")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Wrapper
          apiKey={"AIzaSyByoNfrXmQOD4E9Lgaz2UpAW4Eh6VMglcw"}
          render={render}
        >
          <Map />
        </Wrapper>

        {/* <Box sx={style}>
          <script
            async
            defer
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyByoNfrXmQOD4E9Lgaz2UpAW4Eh6VMglcw&callback=initMap"
          ></script>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box> */}
      </Modal>
    </>
  );
};

MapModal.propTypes = {
  show: PropTypes.bool,
};

export default MapModal;
