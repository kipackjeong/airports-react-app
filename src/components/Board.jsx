import React, { Component } from "react";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import { flexbox } from "@mui/system";
const Board = ({ children }) => {
  // const cancelSearch = () => {
  //   setSearched("");
  //   requestSearch(searched);
  // };

  return (
    <Paper
      style={{
        height: "98vh",
        display: flexbox,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "none",
      }}
    >
      {children}
    </Paper>
  );
};
Board.propTypes = {
  children: PropTypes.node,
};
export default Board;
