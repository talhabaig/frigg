import JwtService from "../jwt";
import { apiCall } from "../request";
const axios = require("axios");

export default {
  state: {
    company: null,
    singlecompany: null,
  },
  getters: {
    getcompanyList(state) {
      debugger; // eslint-disable-line no-debugger
      return state.company;
    },
    getcompanyById(state) {
      return state.singlecompany;
    },
  },
  actions: {
    async getcompanysList({ commit }) {
      return await axios
        .get(`${process.env.VUE_APP_API_URL}api/v1/company`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then((response) => {
          debugger;

          if (response.data.success) {
            commit("setcompanyList", response.data.companyData);
          }
          return response.data.companyData;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async getcompanyById({ commit }, data) {
      debugger; // eslint-disable-line no-debugger
      commit("setSinglecompany", data);
    },

    async addcompany({ commit }, payload) {
      debugger; // eslint-disable-line no-debugger

      return await axios
        .post(`${process.env.VUE_APP_API_URL}api/v1/company`, payload, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then(function (response) {
          debugger;
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async updatecompany({ commit }, payload) {
      debugger; // eslint-disable-line no-debugger
      return await axios
        .put(
          `${process.env.VUE_APP_API_URL}api/v1/company/${payload._id}`,
          {
            name: payload.name,
            location: payload.location,
          },
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async removecompany({ commit }, companyId) {
      debugger; // eslint-disable-line no-debugger
      return await axios.delete(`${process.env.VUE_APP_API_URL}api/v1/company/${companyId}`, {
        headers: { Authorization: `Bearer ${JwtService.getToken()}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    resetcompanyState({ commit }) {
      commit("setSinglecompany", null);
    },
  },
  mutations: {
    setcompany(state, payload) {
      state.company.unshift(payload);
    },
    setcompanyList(state, payload) {
      debugger; // eslint-disable-line no-debugger
      state.company = payload;
    },
    setSinglecompany(state, payload) {
      state.singlecompany = payload;
    },
  },
};
