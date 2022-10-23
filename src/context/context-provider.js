import React, { useReducer } from "react";
import airportDataReducer from "./airport-data-reducer";
import AppCtx from "./context";
import PropTypes from "prop-types";

const defaultState = {
  airports: [],
};

const AppContextProvider = (props) => {
  const children = props.children;
  const [state, dispatch] = useReducer(airportDataReducer, defaultState);
  return (
    <AppCtx.Provider value={{ state: state, dispatch: dispatch }}>
      {" "}
      {children}{" "}
    </AppCtx.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AppContextProvider;
