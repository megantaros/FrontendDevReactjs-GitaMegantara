import axios from "axios";

const BASE_URL = `https://travel-advisor.p.rapidapi.com/restaurants/`;
const API_KEY = `b9cbdccdebmsh129a81d6baed230p1d5a76jsn6975ab6164b2`;

const https = () => {
  const client = axios.create({
    baseURL: BASE_URL,
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
    },
  });
  return client;
};

export default https;
