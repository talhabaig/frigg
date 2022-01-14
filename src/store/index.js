import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';
import users from "./user";
import account from "./account";
import orderType from "./orderType";
import order from "./order";
import patient from "./patient";
import role from "./role";
import company from "./company";
import canteen from "./canteen";
import machine from "./machine";
import product from "./product";
import category from "./category";
import inventory from "./inventory";
import rolePermission from "./rolePermission";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    account,
    orderType,
    order,
    patient,
    role,
    company,
    canteen,
    machine,
    product,
    category,
    inventory,
    rolePermission, 
  },
  plugins: [createPersistedState("account")],
});
