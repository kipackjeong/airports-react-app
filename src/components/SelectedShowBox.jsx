import React, { useContext, useCallback, useState, useEffect } from "react";
import AppCtx from "../context/context";
import { Box, Button } from "@mui/material";
import AirportCard from "./AirportCard";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import PropTypes from "prop-types";
import { calculateDistance } from "../helpers/dist-calculator";

const SelectedShowBox = ({ setShowModal }) => {
  const { state } = useContext(AppCtx);
  const { selectedAirports } = state;
  const [ap1, ap2] = selectedAirports;
  const [airportsDistance, setAirportsDistance] = useState(0);

  useEffect(() => {
    if (ap1 && ap2) {
      setAirportsDistance(calculateDistance(ap1, ap2));
    }
  }, [ap1, ap2]);

  const handleShowMapButtonClick = useCallback(() => {
    setShowModal((prev) => !prev);
  }, [setShowModal]);

  const ShowMapButton = () => {
    return (
      <Button
        onClick={handleShowMapButtonClick}
        sx={{ width: "60px", height: "60px", borderRadius: 50, margin: "auto" }}
      >
        <ArrowCircleRightIcon
          style={{
            width: 50,
            height: 50,
            margin: "auto",
            color: "skyblue",
          }}
        />
      </Button>
    );
  };

  return (
    <Box
      sx={{
        position:"absolute",
        top:"25%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",

        width: "600px",
        marginBottom: "30px",
      }}
    >
      {ap1 && (
        <AirportCard
          key={ap1.id}
          name={ap1.name}
          region={ap1.region}
        ></AirportCard>
      )}
      {ap2 && (
        <>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <ShowMapButton />
            {airportsDistance}M
          </Box>
          <AirportCard
            key={ap2.id}
            name={ap2.name}
            region={ap2.region}
          ></AirportCard>
        </>
      )}
    </Box>
  );
};
SelectedShowBox.propTypes = {
  setShowModal: PropTypes.func,
};
export default SelectedShowBox;
