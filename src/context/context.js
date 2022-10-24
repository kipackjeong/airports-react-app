import { createContext } from "react";

const defaultValue = {
  state: {
    airports: [],
  },
  dispatch: () => {},
};
const AppCtx = createContext(defaultValue);

export default AppCtx;
