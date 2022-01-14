import JwtService from "../jwt";
import { apiCall } from "../request";
const axios = require("axios");

export default {
  state: {
    canteen: null,
    singlecanteen: null,
  },
  getters: {
    getcanteenList(state) {
      debugger; // eslint-disable-line no-debugger
      return state.canteen;
    },
    getcanteenById(state) {
      return state.singlecanteen;
    },
  },
  actions: {
   
    async getcanteensList({ commit }) {
        return await axios
              .get(`${process.env.VUE_APP_API_URL}api/v1/canteen`, {
                headers: { Authorization: `Bearer ${JwtService.getToken()}` },
              })
      .then( (response)=> { 
          debugger
        if (response.data.success) {
          commit("setcanteenList", response.data.allCanteen);
        }
        return response.data.allCanteen;
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    async getcanteenById({ commit }, data) {
      debugger; // eslint-disable-line no-debugger
      commit("setSinglecanteen", data);
    },

    async addcanteen({ commit }, payload) {
      debugger; // eslint-disable-line no-debugger       
      await axios.post(`${process.env.VUE_APP_API_URL}api/v1/canteen`,
          payload,         
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then((response)=> {
          debugger
          if (response.status) {
            commit("setcanteen", payload.data);
          }
        })
        .catch(  (error)=>  {
          console.log(error);
        });
    },

    async updateCanteen({ commit }, payload) {
      return await axios
      .put(
        `${process.env.VUE_APP_API_URL}api/v1/canteen/${payload._id}`,
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

    async removecanteen({ commit }, canteenId) {
      debugger; // eslint-disable-line no-debugger
      return await axios.delete(`${process.env.VUE_APP_API_URL}api/v1/canteen/${canteenId}`, {
        headers: { Authorization: `Bearer ${JwtService.getToken()}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    resetcanteenState({ commit }) {
      commit("setSinglecanteen", null);
    },
  },
  mutations: {
    setcanteen(state, payload) {
      state.canteen.unshift(payload);
    },
    setcanteenList(state, payload) {
      debugger; // eslint-disable-line no-debugger
      state.canteen = payload;
    },
    setSinglecanteen(state, payload) {
      state.singlecanteen = payload;
    },
  },
};
