import JwtService from "../jwt";
const axios = require("axios");

export default {
  state: {
    orderType: [],
    singleOrderType: null,
  },
  getters: {
    getOrderTypeList(state) {
      return state.orderType;
    },
    getOrderTypeById(state) {
      return state.singleOrderType;
    },
  },
  actions: {
    async getOrderTypesList({ commit }) {
      return await axios
        .get(`${process.env.VUE_APP_API_URL}api/Order/GetOrderTypes`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status) {
            commit("setOrderTypeList", response.data.data);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },

    async getOrderTypeById({ commit }, data) {
      commit("setSingleOrderType", data);
    },

    async addOrderType({ commit }, payload) {
      debugger; // eslint-disable-line no-debugger
      return await axios
        .post(
          `${process.env.VUE_APP_API_URL}api/Order/AddOrderType?OrderTypeName=` + payload.name,
          {},
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then(function (response) {
          console.log(response);
          if (response.status) {
            commit("setOrderType", payload.data.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async updateOrderType({ commit }, payload) {
      debugger; // eslint-disable-line no-debugger

      return await axios
        .post(
          `${process.env.VUE_APP_API_URL}api/Order/UpdateOrderType`,
            payload,
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

    async removeOrderType({ commit }, orderTypeId) {
      return await axios
        .post(
          `${process.env.VUE_APP_API_URL}api/Order/RemoveOrderType?Id=${orderTypeId}`,
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

    resetOrderTypeState({ commit }) {
      commit("setSingleOrderType", null);
    },
  },
  mutations: {
    setOrderType(state, payload) {
      state.orderType.unshift(payload);
    },
    setOrderTypeList(state, payload) {
      state.orderType = payload;
    },
    setSingleOrderType(state, payload) {
      state.singleOrderType = payload;
    },
  },
};
