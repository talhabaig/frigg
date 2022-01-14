import JwtService from "../jwt";
const axios = require("axios");
import { apiCall } from "../request";

export default {
  state: {
    patient: null,
    singlePatient: null,
  },
  getters: {
    getPatientList(state) {
      return state.patient;
    },
    getPatientById(state) {
      return state.singlePatient;
    },
  },
  actions: {
    async getPatientList({ commit }) {
      debugger; // eslint-disable-line no-debugger
      return await axios
        .get(`${process.env.VUE_APP_API_URL}api/Patient/GetPatients`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status) {
            commit("setPatientList", response.data.data);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },

    async getPatientById({ commit }, data) {
      debugger; // eslint-disable-line no-debugger
      commit("setSinglePatient", data);
    },

    async addPatient({ commit }, payload) {
      debugger; // eslint-disable-line no-debugger
      return await axios
        .post(
          `${process.env.VUE_APP_API_URL}api/Patient/AddPatient`,
          payload,
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then(function (response) {
          console.log(response);
          if (response.status) {
            commit("setPatient", payload.data.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async updatePatient({ commit }, payload) {
      debugger; // eslint-disable-line no-debugger

      return await axios
        .post(
          `${process.env.VUE_APP_API_URL}UpdateOrder`,
          null,
          {
            params: {
              Id: payload.id,
              OrderTypeId: payload.orderTypeId,
              UserId: payload.orderDoctorId,
              ProviderOrder: payload.providerOrder,
              OutpatientInBed: payload.outpatientInBed,
              AsObservation: payload.asObservation,
              DateTime: payload.dateTime,
              TechnicianAcknowledging: payload.technicianAcknowledging,
              FilePath: payload.filePath,
              Notes: payload.notes,
            },
          },
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async removePatient({ commit }, patientId) {
      debugger; // eslint-disable-line no-debugger
      return await axios
        .post(
          `${process.env.VUE_APP_API_URL}api/Patient/RemovePatient?patientId=${patientId}`,
          {},
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    resetPatientState({ commit }) {
      commit("setSinglePatient", null);
    },
  },
  mutations: {
    setPatient(state, payload) {
      state.patient.unshift(payload);
    },
    setPatientList(state, payload) {
      debugger; // eslint-disable-line no-debugger
      state.patient = payload;
    },
    setSinglePatient(state, payload) {
      state.singlePatient = payload;
    },
  },
};
