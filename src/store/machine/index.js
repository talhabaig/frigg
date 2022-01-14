import JwtService from "../jwt";
import { apiCall } from "../request";
const axios = require("axios");

export default {
  state: {
    machine: null,
    singlemachine: null,
  },
  getters: {
    getmachineList(state) {
      debugger; // eslint-disable-line no-debugger
      return state.machine;
    },
    getmachineById(state) {
      return state.singlemachine;
    },
  },
  actions: {
   
    async machinesList({ commit }) {
        return await axios
              .get(`${process.env.VUE_APP_API_URL}api/v1/machine`, {
                headers: { Authorization: `Bearer ${JwtService.getToken()}` },
              })
      .then( (response)=> { 
          debugger
        if (response.data.success) {
          commit("setmachineList", response.data.machine);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    async getmachineById({ commit }, data) {
      debugger; // eslint-disable-line no-debugger
      commit("setSinglemachine", data);
    },

    async addmachine({ commit }, payload) {
      debugger; // eslint-disable-line no-debugger       
      await axios.post(`${process.env.VUE_APP_API_URL}api/v1/machine`,
          payload,         
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then((response)=> {
          debugger
          if (response.status) {
            commit("setmachine", payload.data);
          }
        })
        .catch(  (error)=>  {
          console.log(error);
        });
    },

    async updatemachine({ commit }, payload) {
      return await axios
      .put(
        `${process.env.VUE_APP_API_URL}api/v1/machine/${payload._id}`,
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

    async removemachine({ commit }, machineId) {
      debugger; // eslint-disable-line no-debugger
      return await axios.delete(`${process.env.VUE_APP_API_URL}api/v1/machine/${machineId}`, {
        headers: { Authorization: `Bearer ${JwtService.getToken()}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    resetmachineState({ commit }) {
      commit("setSinglemachine", null);
    },
    resetmachineListState({ commit }) {
      commit("emptymachineList", null);
    },
  },
  mutations: {
    setmachine(state, payload) {
      state.machine.unshift(payload);
    },
    setmachineList(state, payload) {
      debugger; // eslint-disable-line no-debugger
      state.machine = payload;
    },
    setSinglemachine(state, payload) {
      state.singlemachine = payload;
    },
    emptymachineList(state, payload) {
      state.machine = payload;
    },
  },
};
