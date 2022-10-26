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
import SelectedShowBox from "../components/SelectedShowBox";

export const Main = () => {
  const { state, dispatch } = React.useContext(AppCtx);
  const [showModal, setShowModal] = React.useState(false);

  const { selectedAirports } = state;

  React.useEffect(() => {
    const fetchData = async () => {
      const airports = await getAllAirports();
      dispatch(createFetchAllAction(airports));
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <Board>
      {selectedAirports.length > 0 && (
        <SelectedShowBox setShowModal={setShowModal}></SelectedShowBox>
      )}
      <PrimarySearchAppBar />
      {/* <AirportList
        airports={state.airports}
        searchedAirport={searchedAirport}
        setShowModal={setShowModal}
      /> */}

      {showModal && (
        <MapModal showModal={showModal} setShowModal={setShowModal} />
      )}
    </Board>
  );
};
