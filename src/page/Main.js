import * as React from "react";
import Board from "../components/Board";
import AirportList from "../components/AirportList/AirportList";
import PrimarySearchAppBar from "../components/Search";
import MapModal from "../components/MapModal/MapModal";

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
      dispatch(createFetchAllAction(airports));
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <Board>
      <PrimarySearchAppBar setSearchedAirport={setSearchedAirport} />
      {/* <AirportList
        airports={state.airports}
        searchedAirport={searchedAirport}
        setShowModal={setShowModal}
      /> */}

      {state.selectedAirports.length < 2 ? (
        ""
      ) : (
        <MapModal show={showModal} setShowModal={setShowModal} />
      )}
    </Board>
  );
};
