import * as React from "react";
import Board from "../components/Board";
import AirportList from "../components/AirportList";
import PrimarySearchAppBar from "../components/Search";
import MapModal from "../components/MapModal";

import { getAllAirports } from "../api/api";
import AppContextProvider from "../context/context-provider";
import AppCtx from "../context/context";
import {
  airportAction,
  createFetchAllAction,
} from "../context/airports-reducer";

export const Main = () => {
  const { state, dispatch } = React.useContext(AppCtx);

  const [searchedAirport, setSearchedAirport] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const airports = await getAllAirports();

      //ANCHOR - TEST
      console.log("Fetched aiports from api.");

      dispatch(createFetchAllAction(airports));

      //ANCHOR - TEST
      console.log("Context state after fetchall dispatch");
      console.log(`state: ${state}`);
    };

    fetchData().catch(console.error);
  }, []);

  console.log(state);

  return (
    <Board>
      <PrimarySearchAppBar setShowModal={setShowModal} />
      <AirportList
        airports={state.airports}
        searchedAirport={searchedAirport}
      />
      <MapModal show={showModal} />
    </Board>
  );
};
