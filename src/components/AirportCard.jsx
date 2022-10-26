import React from "react";
import { Card, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

const AirportCard = ({ name, region }) => {
  return (
    <Card
      sx={{
        width: 250,
        height: 150,
        borderRadius: "45%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          fontWeight={"10px"}
          variant="h7"
          component="div"
          sx={{
            height: "fit-content",
            width: "100%",
            overflow: "visible",
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="h7"
          noWrap
          component="div"
          sx={{ marginTop: "5px" }}
        >
          {region.split("-")[1]}
        </Typography>
      </Box>
    </Card>
  );
};

AirportCard.propTypes = {
  name: PropTypes.string,
  region: PropTypes.string,
};

export default AirportCard;
