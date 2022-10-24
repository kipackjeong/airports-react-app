import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { ButtonBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { functionCalled } from "../helpers/test";
import PropTypes from "prop-types";
import AppCtx from "../context/context";

const Search = styled("div")(({ theme }) => ({
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

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

const SelectedAirportsShowbox = styled(ButtonBase)(({ theme }) => ({
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

export default function PrimarySearchAppBar({ searchedAirport, setShowModal }) {
  const [airportName, setAirportName] = React.useState("");
  const { state, dispatch } = React.useContext(AppCtx);
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
      //TODO: call apiToSearchAirport(airportName)
    }
  };

  const handleSelectedAirportsShowBoxOnClick = (e) => {
    functionCalled(handleSelectedAirportsShowBoxOnClick);

    setShowModal((prev) => !prev);

    //TODO: show map modal
    console.log("Should show map modal.");
  };
  //#endregion

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Airport
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearchValueOnChange}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          {selectedAirports.length > 1 ? (
            <SelectedAirportsShowbox
              onClick={handleSelectedAirportsShowBoxOnClick}
            >
              {selectedAirports[0].name} to {selectedAirports[1].name}
            </SelectedAirportsShowbox>
          ) : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
PrimarySearchAppBar.propTypes = {
  searchedAirport: PropTypes.string,
  setShowModal: PropTypes.func,
};
