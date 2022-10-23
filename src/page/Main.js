import * as React from "react";
import Board from "../components/Board";
import AirportList from "../components/AirportList";
import PrimarySearchAppBar from "../components/Search";
import { getAllAirports } from "../api/api";

export const Main = () => {
  const [airports, setAirports] = React.useState([]);
  const [searchedAirport, setSearchedAirport] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      const aps = await getAllAirports();
      setAirports(aps);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <Board>
      <PrimarySearchAppBar />
      <AirportList airports={airports} searchedAirport = {searchedAirport}/>
    </Board>
  );
};
