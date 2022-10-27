import axios from "axios";
import config from "../config.json";

export async function getAllAirports() {
  let accessKey = config.access_key;
  let url = "http://localhost:3001/airports";

  let requestConfig = {
    baseURL: url,
    method: "get",
  };
  let airports = (await axios.request(requestConfig)).data;
  console.log(airports);
  return airports;
}
