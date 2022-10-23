import React, { Component } from "react";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
const Board = ({ children }) => {
  // const cancelSearch = () => {
  //   setSearched("");
  //   requestSearch(searched);
  // };

  return <Paper>{children}</Paper>;
};
Board.propTypes = {
  children: PropTypes.node,
};
export default Board;
