import JwtService from "../jwt";
import { apiCall } from "../request";
const axios = require("axios");

export default {
  state: {
    product: null,
    singleproduct: null,
  },
  getters: {
    getproductList(state) {
      debugger; // eslint-disable-line no-debugger
      return state.product;
    },
    getproductById(state) {
      debugger;
      return state.singleproduct;
    },
  },
  actions: {
    async productsList({ commit }, payload) {
      debugger;

      return await axios
        .get(`${process.env.VUE_APP_API_URL}api/v1/product`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then((response) => {
          if (response.data.success) {
            commit("setproductList", response.data.product);
          }
          return response.data.product;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    getproductById({ commit }, data) {
      debugger; // eslint-disable-line no-debugger
      commit("setSingleproduct", data);
    },

    async addproduct({ commit }, payload) {
      debugger; // eslint-disable-line no-debugger

      var formData = new FormData();
      formData.append("name", payload.name);
      formData.append("price", payload.price);
      formData.append("description", payload.description);
      formData.append("recipe", payload.recipe);
      formData.append("allergic", payload.allergic);
      formData.append("VAT", payload.VAT);
      formData.append("Image", payload.Image);
      formData.append("expiry_date", payload.expiry_date);
    return  await axios
        .post(`${process.env.VUE_APP_API_URL}api/v1/product`, formData, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then((response) => {
          debugger;
          return response.data;
          if (response.status) {
            // commit("setproduct", payload.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async updateproduct({ commit }, payload) {
      return await axios
        .put(
          `${process.env.VUE_APP_API_URL}api/v1/product/${payload._id}`,
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
          return response;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async removeproduct({ commit }, productId) {
      debugger; // eslint-disable-line no-debugger
      return await axios
        .delete(`${process.env.VUE_APP_API_URL}api/v1/product/${productId}`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    resetproductState({ commit }) {
      commit("setSingleproduct", null);
    },
  },
  mutations: {
    setproduct(state, payload) {
      state.product.unshift(payload);
    },
    setproductList(state, payload) {
      state.product = payload;
    },
    setSingleproduct(state, payload) {
      state.singleproduct = payload;
    },
  },
};
