import JwtService from "../jwt";
import { apiCall } from "../request";
const axios = require("axios");

export default {
  state: {
    inventory: null,
    singleinventory: null,
  },
  getters: {
    getinventoryList(state) {
      debugger; // eslint-disable-line no-debugger
      return state.inventory;
    },
    getinventoryById(state) {
      return state.singleinventory;
    },
  },
  actions: {
   
    async inventorysList({ commit }) {
        return await axios
              .get(`${process.env.VUE_APP_API_URL}api/v1/inventory`, {
                headers: { Authorization: `Bearer ${JwtService.getToken()}` },
              })
      .then( (response)=> { 
          debugger
        if (response.data.success) {
          commit("setinventoryList", response.data.allData);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    async getinventoryById({ commit }, data) {
      debugger; // eslint-disable-line no-debugger
      commit("setSingleinventory", data);
    },

    async addinventory({ commit }, payload) {
      debugger; // eslint-disable-line no-debugger       
      await axios.post(`${process.env.VUE_APP_API_URL}api/v1/inventory`,
          payload,         
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then((response)=> {
          debugger
          if (response.status) {
            commit("setinventory", payload.data);
          }
        })
        .catch(  (error)=>  {
          console.log(error);
        });
    },

    async updateinventory({ commit }, payload) {
      return await axios
      .put(
        `${process.env.VUE_APP_API_URL}api/v1/inventory/${payload._id}`,
        {
          name: payload.name,
          location: payload.location, 
          status: payload.status, 
        },
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then(function (response) {
          return response ;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async removeinventory({ commit }, inventoryId) {
      debugger; // eslint-disable-line no-debugger
      return await axios.delete(`${process.env.VUE_APP_API_URL}api/v1/inventory/${inventoryId}`, {
        headers: { Authorization: `Bearer ${JwtService.getToken()}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    resetinventoryState({ commit }) {
      commit("setSingleinventory", null);
    },
    resetinventoryListState({ commit }) {
      commit("emptyinventoryList", null);
    },
  },
  mutations: {
    setinventory(state, payload) {
      state.inventory.unshift(payload);
    },
    setinventoryList(state, payload) {
      debugger; // eslint-disable-line no-debugger
      state.inventory = payload;
    },
    setSingleinventory(state, payload) {
      state.singleinventory = payload;
    },
    emptyinventoryList(state, payload) {
      state.inventory = payload;
    },
  },
};
