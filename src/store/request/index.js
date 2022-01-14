import JwtService from "../jwt";
const axios = require("axios");

export const apiCall = async (method, endpoints, payload, params) => {
  debugger; // eslint-disable-line no-debugger
  return await axios({
    method: method,
    url: `${process.env.VUE_APP_API_URL}${endpoints}`,
    payload,
    params,
    headers: {
      Authorization: `Bearer ${JwtService.getToken()}`,
      'Content-Type': "application/json"
    },
  });
};
