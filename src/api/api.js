import axios from "axios";
export async function getAllAirports() {
  // eslint-disable-next-line no-undef
  let url = process.env.REACT_APP_API_URL;

  let requestConfig = {
    baseURL: url,
    method: "get",
  };
  let airports = (await axios.request(requestConfig)).data;
  console.log(airports);
  return airports;
}
