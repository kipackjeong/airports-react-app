import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import PropTypes from "prop-types";

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
            <TableRow key={airport.id}>
              <TableCell component="th" scope="airport">
                {airport.name}
              </TableCell>
              <TableCell align="right">{airport.region}</TableCell>
              <TableCell align="right">{airport.country}</TableCell>
              <TableCell align="right">{airport.type} </TableCell>
            </TableRow>
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
