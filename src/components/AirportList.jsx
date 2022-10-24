import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import AppCtx from "../context/context";
import AirportRow from "./AirportRow";

const AirportList = ({ airports, searchedAirport }) => {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">State</TableCell>
            <TableCell align="right">Country&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {airports.map((airport) => (
            <AirportRow key={airport.id} airport={airport} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
AirportList.propTypes = {
  airports: PropTypes.array,
  searchedAirport: PropTypes.string,
};

export default AirportList;
