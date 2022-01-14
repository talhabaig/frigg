import JwtService from "../jwt";
import { apiCall } from "../request";
const axios = require("axios");

export default {
  state: {
    order: null,
    singleOrder: null,
  },
  getters: {
    getOrderList(state) {
      debugger; // eslint-disable-line no-debugger
      return state.order;
    },
    getOrderById(state) {
      return state.singleOrder;
    },
  },
  actions: {
    async getOrdersList({ commit }) {
      debugger; // eslint-disable-line no-debugger
      return await apiCall("get", "api/Order/GetOrders", null, null)
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status) {
            commit("setOrderList", response.data.data);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },

    async getOrderById({ commit }, data) {
      debugger; // eslint-disable-line no-debugger
      commit("setSingleOrder", data);
    },

    async addOrder({ commit }, payload) {
      debugger; // eslint-disable-line no-debugger
      // return await apiCall("post", "api/Order/AddOrder", JSON.stringify(payload), '')
      
      await axios
        .post(
          `${process.env.VUE_APP_API_URL}api/Order/AddOrder`,
          payload,
          // {
          //   params: {
          //     OrderTypeId: payload.orderTypeId,
          //     UserId: payload.orderDoctorId,
          //     ProviderOrder: payload.providerOrder,
          //     OutpatientInBed: payload.outpatientInBed,
          //     AsObservation: payload.asObservation,
          //     DateTime: payload.dateTime,
          //     TechnicianAcknowledging: payload.technicianAcknowledging,
          //     FilePath: payload.filePath,
          //     Notes: payload.notes,
          //   },
          // },
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then(function (response) {
          console.log(response);
          if (response.status) {
            commit("setOrder", payload.data.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async updateOrder({ commit }, payload) {
      debugger; // eslint-disable-line no-debugger

      return await axios
        .put(
          `${process.env.VUE_APP_API_URL}api/Order/UpdateOrder`,
          payload,
          // {
          //   params: {
          //     Id: payload.id,
          //     OrderTypeId: payload.orderTypeId,
          //     UserId: payload.orderDoctorId,
          //     ProviderOrder: payload.providerOrder,
          //     OutpatientInBed: payload.outpatientInBed,
          //     AsObservation: payload.asObservation,
          //     DateTime: payload.dateTime,
          //     TechnicianAcknowledging: payload.technicianAcknowledging,
          //     FilePath: payload.filePath,
          //     Notes: payload.notes,
          //   },
          // },
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

    async removeOrder({ commit }, orderId) {
      debugger; // eslint-disable-line no-debugger
      return await axios
        .post(
          `https://localhost:44341/api/Order/RemoveOrder?Id=${orderId}`,
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

    resetOrderState({ commit }) {
      commit("setSingleOrder", null);
    },
  },
  mutations: {
    setOrder(state, payload) {
      state.order.unshift(payload);
    },
    setOrderList(state, payload) {
      debugger; // eslint-disable-line no-debugger
      state.order = payload;
    },
    setSingleOrder(state, payload) {
      state.singleOrder = payload;
    },
  },
};
