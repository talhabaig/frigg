import JwtService from "../jwt";
const axios = require("axios");

export default {
  state: {
    users: [],
    singleUser: null,
  },
  getters: {
    getuserList(state) {
      return state.users;
    },
    getUserById(state) {
      return state.singleUser;
    },
  },
  actions: {
    async getUserList({ commit }) {
      debugger;
      return await axios
        .get(`${process.env.VUE_APP_API_URL}api/v1/users`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status) {
            commit("setUserList", response.data.allUser);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },

    async getUserById({ commit }, data) {
      commit("setSingleUser", data);
    },

    async addUser({ commit }, payload) {
      debugger; // eslint-disable-line no-debugger
      return await axios
        .post(`${process.env.VUE_APP_API_URL}api/v1/users/`, payload,
        {
          headers: { Authorization: `Bearer ${JwtService.getToken()}`},
        })
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          debugger
          return error;
        });
    },

    async updateUser({ commit }, payload) {
      debugger; // eslint-disable-line no-debugger
      return await axios
        .put(`${process.env.VUE_APP_API_URL}api/v1/users/${payload._id}`,
          {
            name: payload.name,
            role: payload.role,
            phone: payload.phone,
            password: payload.password,
          },
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async removeUser({ commit }, userId) {
      return await axios.delete(`${process.env.VUE_APP_API_URL}api/v1/users/${userId}`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    resetUserState({ commit }) {
      commit("setSingleUser", null);
    },
  },
  mutations: {
    setUsers(state, payload) {
      state.user.unshift(payload);
    },
    setUserList(state, payload) {
      state.users = payload;
    },
    setSingleUser(state, payload) {
      state.singleUser = payload;
    },
  },
};
