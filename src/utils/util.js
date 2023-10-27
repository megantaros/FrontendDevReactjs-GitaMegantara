const options = async (location_id) => {
  const options = {
    method: "GET",
    url: "https://travel-advisor.p.rapidapi.com/restaurants/get-details",
    params: {
      location_id: location_id,
      currency: "USD",
      lang: "en_US",
    },
    headers: {
      "X-RapidAPI-Key": "140ae37239mshf3d902456c2c427p1cd937jsn8b7846af21e5",
      "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
    },
  };
  return options;
};

export { options };
