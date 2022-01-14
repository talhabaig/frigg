import JwtService from "../jwt";
const axios = require("axios");

export default {
  state: {
    permissions: null,
  },
  getters: {
    getPermission(state) {
      return state.permissions;
    },
  },
  actions: {
    async getPermission({ commit }) {
      await axios
        .get(`${process.env.VUE_APP_API_URL}GetPermissions`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then(function (response) {
          console.log(response);
          if (response.status == 200) {
            console.log(response.data.data);
            commit("setPermissions", response.data.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },

    // async getRolebyId({ commit }, data) {
    //   commit("setSingleRole", data);
    // },

    // async addRole({ commit }, payload) {
    //   debugger; // eslint-disable-line no-debugger
    //   return await axios
    //     .post(`${process.env.VUE_APP_API_URL}api/User/AddUser`, payload)
    //     .then(function (response) {
    //       console.log(response);
    //       if (response.status) {
    //         commit("setUsers", payload.data.data);
    //       }
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // },

    // async updateRole({ commit }, payload) {
    //   debugger; // eslint-disable-line no-debugger

    //   return await axios
    //     .put(`${process.env.VUE_APP_API_URL}api/User/UpdateUser`, payload, {
    //       headers: { Authorization: `Bearer ${JwtService.getToken()}` },
    //     })
    //     .then(function (response) {
    //       console.log(response);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // },

    // async removeRole({ commit }, userId) {
    //   return await axios
    //     .post(
    //       `${process.env.VUE_APP_API_URL}api/User/RemoveUser?Id=${userId}`,
    //       {},
    //       {
    //         headers: { Authorization: `Bearer ${JwtService.getToken()}` },
    //       }
    //     )
    //     .then(function (response) {
    //       console.log(response);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // },

    // resetUserState({ commit }) {
    //   commit("setSingleRole", null);
    // },
  },
  mutations: {
    setPermissions(state, payload) {
      state.permissions = payload;
    },
  },
};
