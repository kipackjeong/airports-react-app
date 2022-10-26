import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { functionCalled } from "../helpers/test";
import PropTypes from "prop-types";
import AppCtx from "../context/context";
import { createAirportSelectedAction } from "../context/airports-reducer";

const SearchWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(Autocomplete)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    margin: "auto",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

const SearchBar = () => {
  const [airportName, setAirportName] = React.useState("");
  const [searchVal, setSearchVal] = React.useState("");
  const { state, dispatch } = React.useContext(AppCtx);

  const optionsList = state.airports.map((ap) => ({
    id: ap.id,
    name: ap.name + (ap.iata ? ` (${ap.iata})` : ""),
    region: ap.region,
    lat: ap.lat,
    lng: ap.lon,
  }));

  //#region handlers
  const handleOnChange = (e, targetValue) => {
    const selectedAirport = targetValue;

    if (selectedAirport) {
      dispatch(createAirportSelectedAction(selectedAirport));
    }
  };

  //#endregion

  return (
    <Box>
      <Toolbar sx={{ width: "100%" }}>
        <SearchWrapper>
          <StyledInputBase
            disablePortal
            id="combo-box-demo"
            options={optionsList}
            sx={{ width: "60vw" }}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) =>
              option.name == value.name && option.id == value.id
            }
            onChange={handleOnChange}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.id}>
                  {option.name}
                </li>
              );
            }}
            renderInput={(params) => <TextField {...params} label="Airports" />}
          />
        </SearchWrapper>
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </Box>
  );
};

SearchBar.propTypes = {};

export default SearchBar;
