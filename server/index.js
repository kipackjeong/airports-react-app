const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const cors = require("cors");
const pino = require("express-pino-logger")();
const axios = require("axios");
const fs = require("fs");
const e = require("express");
const { nextTick } = require("process");

const port = 3001;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
app.use(cors());
app.get("/api", (req, res, next) => {
  try {
    // in prod
    // callRapidApiToGetUSAirports();

    // in development
    getDataFromLocalJson();
  } catch (error) {
    next(error);
  }

  function callRapidApiToGetUSAirports() {
    const options = {
      method: "GET",
      url: "https://ourairport-data-search.p.rapidapi.com/api/airports/us",
      headers: {
        "X-RapidAPI-Key": "bb7c540eafmsh899ae8ebf5b34fbp14f87bjsn2c5edbb60724",
        "X-RapidAPI-Host": "ourairport-data-search.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        let airports = response.data.results.filter(
          (a) =>
            a.type !== "heliport" &&
            a.type !== "closed" &&
            a.type !== "small_airport"
        );

        let resStr = JSON.stringify(airports);

        fs.writeFile("./airports.json", resStr, (err) => {
          if (err) {
            console.log("Error writing file", err);
          } else {
            console.log("Successfully wrote file");
          }
          next(err);
        });

        res.json(airports);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function getDataFromLocalJson() {
    fs.readFile("./airports.json", "utf8", (err, jsonString) => {
      if (err) {
        console.log("Error reading file from disk:", err);
        return;
      }
      try {
        const response = JSON.parse(jsonString);
        res.json(response);
      } catch (err) {
        console.log("Error parsing JSON string:", err);
      }
    });
  }
});

app.listen(port, () =>
  console.log("Express server is running on localhost:" + port)
);
