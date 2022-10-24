import { functionCalled } from "../helpers/test";

export const airportAction = Object.freeze({
  fetchAll: 0,
  select: 1,
});

export function createFetchAllAction(airports) {
  //ANCHOR - TEST
  console.log("Creating FetchAllAction");

  return {
    type: airportAction.fetchAll,
    payload: airports,
  };
}
export function createAirportSelectedAction(airport) {
  console.log("Called createFetchAllAction");

  return {
    type: airportAction.select,
    payload: airport,
  };
}

function airportsReducer(state, action) {
  functionCalled(airportsReducer);

  const newState = { ...state };
  let airports = [...state.airports];
  let selectedAirports = [...state.selectedAirports];

  switch (action.type) {
    case airportAction.fetchAll:
      airports = [...action.payload];
      break;

    case airportAction.select:
      handleAirportSelect(action.payload);
      break;
  }

  newState.airports = airports;
  newState.selectedAirports = selectedAirports;

  return newState;

  function handleAirportSelect(airport) {
    // if selectedAirports list already has to airport
    //    delete airport
    // else
    //    if selectedAirports is at
    //    add

    if (isAlreadySelected(airport)) {
      console.log(`${airport.name} already selected`);
      removeAirport(airport);
      return;
    }
    addAirport(airport);
  }

  function isAlreadySelected(airport) {
    return selectedAirports.find((ap) => ap.id === airport.id) !== undefined;
  }
  function removeAirport(airport) {
    selectedAirports = selectedAirports.filter((ap) => ap.id !== airport.id);
    console.log(`Removed airport: ${airport.name} from the selected list.`);
  }
  function addAirport(airport) {
    if (selectedAirports.length == 2) {
      console.log(
        `Already two airport selected, will remove the first one: ${selectedAirports[0].name} from the selected list, then push airport: ${airport.name}.`
      );

      selectedAirports.shift();
    }
    selectedAirports.push(airport);
  }
}

export default airportsReducer;
