import * as React from "react";
import Board from "../components/Board";
import PrimarySearchAppBar from "../components/Search";
import MapModal from "../components/MapModal/MapModal";

import { getAllAirports } from "../api/api";
import AppCtx from "../context/context";
import {
  createFetchAllAction,
} from "../context/airports-reducer";
import SelectedShowBox from "../components/SelectedShowBox";
import Loading from "../components/Loading";

export const Main = () => {
  const [ isLoaded, setIsLoaded ] = React.useState(false);
  const { state, dispatch } = React.useContext(AppCtx);
  const [showModal, setShowModal] = React.useState(false);

  const { selectedAirports } = state;

  React.useEffect(() => {
    const fetchData = async () => {
      const airports = await getAllAirports();
      dispatch(createFetchAllAction(airports));
      setIsLoaded(true);
    };

    fetchData().catch(console.error);
  }, []);

  return isLoaded?(
  <Board>
  {
    selectedAirports.length > 0 && (
      <SelectedShowBox setShowModal={setShowModal}></SelectedShowBox>
    )
  }
    < PrimarySearchAppBar />
  {/* <AirportList
        airports={state.airports}
        searchedAirport={searchedAirport}
        setShowModal={setShowModal}
      /> */}

  {
    showModal && (
      <MapModal showModal={showModal} setShowModal={setShowModal} />
    )
  }
  </Board >) : <Loading/>

};
