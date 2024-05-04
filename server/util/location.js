const axios = require('axios');
const HttpError = require('../models/http-error');

const API_KEY = "";

// NO API
const getCoordinatesForAddress = () => ({ lat: 67.0034, lng: -45.9996 });

// WITH API
// const getCoordinatesForAddress = async (address) => {
//     const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`);
//     const responseData = response.data;

//     if (!responseData || responseData.status === "ZERO_RESULTS") {
//         throw new HttpError("Could not find location for the specified address!", 422);
//     }

//     const coordinates = responseData.results[0].geometry.location;

//     return coordinates;
// };

module.exports = getCoordinatesForAddress;