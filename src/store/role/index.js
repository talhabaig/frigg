import JwtService from "../jwt";
const axios = require("axios");

export default {
  state: {
    roles: [],
    singleRole: null,
  },
  getters: {
    getRoles(state) {
      return state.roles;
    },
    getRolebyId(state) {
      return state.singleRole;
    },
  },
  actions: {
    async getRoles({ commit }) {
      await axios
        .get(`${process.env.VUE_APP_API_URL}GetRoles`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then(function (response) {
          console.log(response);
          if (response.status == 200) {
            console.log(response.data.data);
            commit("setRolesList", response.data.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },

    async getRolebyId({ commit }, data) {
      commit("setSingleRole", data);
    },

    async addRoleWithPermissions({ commit }, payload) {
      debugger; // eslint-disable-line no-debugger 
    //  var paramsvalue= {
    //     roleName:payload.roleName 
    //   }

      
    //     payload.permissions.forEach(element=>{
    //       debugger; // eslint-disable-line no-debugger 
    //       paramsvalue['permissions'] = element; 

    //     })

     var paramsvalue = payload.permissions.reduce((a, v) => ({ ...a, [v]: v}), {})
     paramsvalue['roleName'] = payload.roleName; 


     paramsvalue.map(function(item){
      debugger; // eslint-disable-line no-debugger 
      return {[item]: 'permissions'}
    });


      return await axios
        .post(`${process.env.VUE_APP_API_URL}AddRoleWithPermissions`, null, {
          params: paramsvalue,
        })
        .then(function (response) {
          console.log(response);
          if (response.status == 200) {
            commit("setRoles", payload.data.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async addRole({ commit }, payload) {
      debugger; // eslint-disable-line no-debugger
      return await axios
        .post(`${process.env.VUE_APP_API_URL}api/User/AddUser`, payload)
        .then(function (response) {
          console.log(response);
          if (response.status) {
            commit("setUsers", payload.data.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async updateRole({ commit }, payload) {
      debugger; // eslint-disable-line no-debugger

      return await axios
        .put(`${process.env.VUE_APP_API_URL}api/User/UpdateUser`, payload, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async removeRole({ commit }, userId) {
      return await axios
        .post(
          `${process.env.VUE_APP_API_URL}api/User/RemoveUser?Id=${userId}`,
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

    resetRoleState({ commit }) {
      commit("setSingleRole", null);
    },
  },
  mutations: {
    setRoles(state, payload) {
      state.roles.unshift(payload);
    },
    setRolesList(state, payload) {
      state.roles = payload;
    },
    setSingleRole(state, payload) {
      state.singleRole = payload;
    },
  },
};
