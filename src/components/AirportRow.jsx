import React, { useContext, useState } from "react";
import AppCtx from "../context/context";
import { createAirportSelectedAction } from "../context/airports-reducer";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";

const AirportRow = ({ airport }) => {
  const { dispatch } = useContext(AppCtx);
  const [selected, setSelected] = useState(false);

  const handleAirportRowSelect = (airport) => {
    setSelected((prev) => !prev);
    dispatch(createAirportSelectedAction(airport));
  };

  return (
    <TableRow
      key={airport.id}
      hover={true}
      selected={selected}
      onClick={() => handleAirportRowSelect(airport)}
    >
      <TableCell component="th" scope="airport">
        {airport.name}
      </TableCell>
      <TableCell align="right">{airport.region}</TableCell>
      <TableCell align="right">{airport.country}</TableCell>
      <TableCell align="right">{airport.type} </TableCell>
    </TableRow>
  );
};

AirportRow.propTypes = {
  airport: PropTypes.object,
};

export default AirportRow;
