import React, { useReducer } from "react";
import airportsReducer from "./airports-reducer";
import AppCtx from "./context";
import PropTypes from "prop-types";

const AppContextProvider = (props) => {
  const children = props.children;
  const [state, dispatch] = useReducer(airportsReducer, {
    airports: [],
    selectedAirports: [],
  });
  return (
    <AppCtx.Provider value={{ state: state, dispatch: dispatch }}>
      {children}
    </AppCtx.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AppContextProvider;
