import React, { useCallback } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Dialog } from "@mui/material";
import PropTypes from "prop-types";

function SelectedDialog({ selectedAirports, show, setShow, setShowModal }) {
  const handleClose = useCallback(() => {
    setShow(false);
  }, [show]);

  const button = (
    <Button
      onClick={() => {
        setShowModal(true);
        setShow(false);
      }}
    >
      Show in the Map
    </Button>
  );

  const dialogContent =
    selectedAirports.length == 2 ? (
      <DialogTitle>
        {selectedAirports[0].name} to {selectedAirports[1].name}
      </DialogTitle>
    ) : null;
  return (
    <Dialog onClose={handleClose} open={show}>
      {dialogContent}
      {button}
    </Dialog>
  );
}

SelectedDialog.propTypes = {
  selectedAirports: PropTypes.array,
  show: PropTypes.bool,
  setShow: PropTypes.func,
  setShowModal: PropTypes.func,
};

export default SelectedDialog;
