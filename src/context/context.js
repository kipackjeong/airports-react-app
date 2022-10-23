import { createContext } from "react";

const defaultValue = {
  state: {
    listDate: new Date(Date.now()),
    inCompTodos: [],
    compTodos: [],
  },
  dispatch: () => {},
};
const AppCtx = createContext(defaultValue);

export default AppCtx;
