import React, { useContext, useState, useEffect } from "react";
import AppCtx from "../../context/context";
import { createAirportSelectedAction } from "../../context/airports-reducer";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";

const AirportRow = ({ airport, setShowDialog }) => {
  const { dispatch } = useContext(AppCtx);
  const { selectedAirports } = useContext(AppCtx).state;
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(selectedAirports.includes(airport));
  }, [selectedAirports]);

  const handleAirportRowOnClick = (airport) => {
    setSelected((prev) => !prev);
    dispatch(createAirportSelectedAction(airport));

    if (selectedAirports.length == 1) {
      setShowDialog(true);
    }
  };

  return (
    <TableRow
      key={airport.id}
      hover={true}
      selected={selected}
      onClick={() => handleAirportRowOnClick(airport)}
    >
      <TableCell component="th" scope="airport">
        {airport.name}
      </TableCell>
      <TableCell align="left">{airport.type}</TableCell>
      <TableCell align="left">{airport.region.split("-")[1]}</TableCell>
      <TableCell align="left">{airport.country} </TableCell>
    </TableRow>
  );
};

AirportRow.propTypes = {
  airport: PropTypes.object,
  setShowDialog: PropTypes.func,
};

export default AirportRow;
