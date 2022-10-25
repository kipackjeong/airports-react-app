import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import AppCtx from "../../context/context";
import AirportRow from "./AirportRow";
import SelectedDialog from "./SelectedDialog";

const AirportList = ({ airports, searchedAirport, setShowModal }) => {
  const [showDialog, setShowDialog] = useState(false);
  const { selectedAirports } = useContext(AppCtx).state;

  return (
    <>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">State</TableCell>
              <TableCell align="left">Country&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {airports.map((airport) => (
              <AirportRow
                key={airport.id}
                airport={airport}
                setShowDialog={setShowDialog}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SelectedDialog
        selectedAirports={selectedAirports}
        show={showDialog}
        setShow={setShowDialog}
        setShowModal={setShowModal}
      />
    </>
  );
};
AirportList.propTypes = {
  airports: PropTypes.array,
  searchedAirport: PropTypes.string,
  setShowModal: PropTypes.func,
};

export default AirportList;
