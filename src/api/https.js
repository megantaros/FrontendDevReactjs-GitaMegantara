import axios from "axios";

const BASE_URL = `https://travel-advisor.p.rapidapi.com/restaurants/`;

const https = () => {
  const client = axios.create({
    baseURL: BASE_URL,
    headers: {
      "X-RapidAPI-Key": "140ae37239mshf3d902456c2c427p1cd937jsn8b7846af21e5",
      "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
    },
  });
  return client;
};

export default https;
