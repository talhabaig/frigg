import JwtService from "../jwt";
const axios = require("axios");

export default {
  state: {
    user: [],
    jwtToken: null,
    permissions: [],
    role: null,
    email: null,
    name: null,
    userId: null,
    exp: 0,
    isAuthenticated: !!JwtService.getToken(),
  },
  getters: {
    userDetails(state) {
      return state;
    },
    getExpTime(state) {
      return state.exp;
    },
    isUserAuthenticated(state) {
      return state.isAuthenticated;
    },
  },
  actions: {
    async signUpUser({ commit }, data) {
      debugger; // eslint-disable-line no-debugger
      return await axios
        .post(`${process.env.VUE_APP_API_URL}api/v1/registration/signup`, data)
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          return error;
        });
    },

    async signInUser({ commit, getters }, data) {
      return await axios
        .post(`${process.env.VUE_APP_API_URL}api/v1/registration/login`, data)
        .then((response) => {
          commit("setSignInUsers", response.data.token);
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async forgotUser({ commit, getters }, data) {
      debugger; // eslint-disable-line no-debugger
      return await axios
        .post(`${process.env.VUE_APP_API_URL}api/v1/registration/forgot`, data)
        .then((response) => {
          return response.data;
         
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async logOut({ commit }) {
      debugger; // eslint-disable-line no-debugger
      await commit("resetStateOnLogOut");
    },
  },
  mutations: {
    setSignInUsers(state, payload) {
      debugger; // eslint-disable-line no-debugger

      JwtService.saveToken(payload);
      // state.jwtToken = payload.token;

      // var base64Url = payload.token.split(".")[1];
      // var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      // var jsonPayload = decodeURIComponent(
      //   atob(base64)
      //     .split("")
      //     .map(function (c) {
      //       return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      //     })
      //     .join("")
      // );

      // var parseToken = JSON.parse(jsonPayload);

      // var resultObject = [];
      // for (var i in parseToken) resultObject.push([i, parseToken[i]]);

      // state.permissions = resultObject[4][1];
      // state.role = resultObject[2][1];
      // state.email = resultObject[1][1];
      // state.name = resultObject[0][1];
      // state.userId = resultObject[3][1];
      // state.exp = resultObject[5][1];

      state.isAuthenticated = true;
    },

    resetStateOnLogOut(state) {
      debugger; // eslint-disable-line no-debugger
      JwtService.destroyToken();
      state.jwtToken = null;
      state.permissions = [];
      state.role = null;
      state.email = null;
      state.name = null;
      state.userId = null;
      state.exp = 0;
      state.isAuthenticated = false;
    },
  },
};
