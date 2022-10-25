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

const SearchBar = ({ setSearchedAirport }) => {
  const [airportName, setAirportName] = React.useState("");
  const [searchVal, setSearchVal] = React.useState("");
  const { state, dispatch } = React.useContext(AppCtx);

  //ANCHOR Test
  console.log(state.airports);
  const optionsList = state.airports.map((ap) => ({
    id: ap.id,
    label: ap.name,
    iata: ap.iata || "",
  }));

  const selectedAirports = state.selectedAirports;

  //#region handlers
  const handleSearchValueOnChange = (e) => {
    functionCalled(handleSearchValueOnChange);
    let searchVal = e.target.value;

    setAirportName(searchVal);
  };

  const handleSearchBarKeyDown = (e) => {
    functionCalled(handleSearchBarKeyDown);

    console.log("User pressed: ", e.key);

    if (e.key === "Enter") {
      e.preventDefault();
      setSearchVal(e.target.value);
      setSearchedAirport(e.target.value);
    }
  };

  //#endregion

  return (
    <Box sx={{ margin: "auto" }} position="relative">
      <Toolbar sx={{ margin: "auto", width: "100%" }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Airport
        </Typography>

        <SearchWrapper>
          <StyledInputBase
            disablePortal
            id="combo-box-demo"
            options={optionsList}
            sx={{ width: "60vw" }}
            isOptionEqualToValue={(option, value) =>
              option.label == value.name || option.iata == value.name
            }
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.id}>
                  {option.label} {option.iata || ""}
                </li>
              );
            }}
            renderInput={(params) => <TextField {...params} label="Airports" />}
            onKeyDown={handleSearchBarKeyDown}
          />
        </SearchWrapper>
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </Box>
  );
};

SearchBar.propTypes = {
  setSearchedAirport: PropTypes.func,
};

export default SearchBar;
