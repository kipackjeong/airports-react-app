import "./App.css";
import React from "react";
import { Main } from "./page/Main";
import AppContextProvider from "./context/context-provider";

function App() {
  return (
    <AppContextProvider>
      <Main></Main>;
    </AppContextProvider>
  );
}

export default App;
