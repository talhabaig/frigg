import Vue from "vue";
import Router from "vue-router";
import store from "../store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/userList",
      component: () => import("../views/Layouts/admin"),
      children: [
        {
          path: "/userList",
          name: "userList",
          component: () => import("../views/users"),
        },
        {
          path: "/roleList",
          name: "roleList", 
          component: () => import("../views/role"),
        },
      ],
    },
    {
      path: "/Company",
      redirect: "/companyList",
      component: () => import("../views/Layouts/admin"),
      children: [
        {
          path: "/companyList",
          name: "companyList",
          component: () => import("../views/company"),
        },
        // {
        //   path: "/orderTypeList",
        //   name: "orderTypeList",
        //   component: () => import("../views/orderType"),
        // },
        // {
        //   path: "/addOrderType",
        //   name: "addOrderType",
        //   component: () => import("../views/orderType/addOrderType.vue"),
        // },
      ],
    },
    {
      path: "/Canteen",
      redirect: "/canteenList",
      component: () => import("../views/Layouts/admin"),
      children: [
        {
          path: "/canteenList",
          name: "canteenList",
          component: () => import("../views/canteen"),
        },
       
      ],
    },
    {
      path: "/Machine",
      redirect: "/machineList",
      component: () => import("../views/Layouts/admin"),
      children: [
        {
          path: "/machineList",
          name: "machineList",
          component: () => import("../views/machine"),
        },
       
      ],
    },
    {
      path: "/Product",
      redirect: "/productList",
      component: () => import("../views/Layouts/admin"),
      children: [
        {
          path: "/productList",
          name: "productList",
          component: () => import("../views/product"),
        },
        {
          path: "/inventoryList",
          name: "inventoryList",
          component: () => import("../views/product/inventory"),
        },
       
      ],
    },
    {
      path: "/Category",
      redirect: "/categoryList",
      component: () => import("../views/Layouts/admin"),
      children: [
        {
          path: "/categoryList",
          name: "categoryList",
          component: () => import("../views/category"),
        },
       
      ],
    },
    {
      path: "/assignProduct",
      redirect: "/assignProduct",
      component: () => import("../views/Layouts/admin"),
      children: [
        {
          path: "/assignProduct",
          name: "assignProduct",
          component: () => import("../views/product/assignProducts"),
        },
       
      ],
    },



    {
      path: "/order",
      redirect: "/orderList",
      component: () => import("../views/Layouts/admin"),
      children: [
        {
          path: "/orderList",
          name: "orderList",
          component: () => import("../views/order"),
        },
        {
          path: "/orderTypeList",
          name: "orderTypeList",
          component: () => import("../views/orderType"),
        },
        {
          path: "/addOrderType",
          name: "addOrderType",
          component: () => import("../views/orderType/addOrderType.vue"),
        },
      ],
    },
    {
      path: "/patient",
      redirect: "/patientList",
      component: () => import("../views/Layouts/admin"),
      children: [
        {
          path: "/patientList",
          name: "patientList",
          component: () => import("../views/patient"),
        },
      ],
    },
    {
      path: "/login",
      redirect: "/login",
      component: () => import("../views/Layouts/account"),
      children: [
        {
          path: "/login",
          name: "login",
          component: () => import("../views/Layouts/account/login.vue"),
        },
        {
          path: "/signup",
          name: "signup",
          component: () => import("../views/Layouts/account/signup.vue"),
        },
        {
          path: "/forgot",
          name: "forgot",
          component: () => import("../views/Layouts/account/forgot.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  debugger
  var status = store.getters["isUserAuthenticated"]
  if (to.name === "login" && store.getters["isUserAuthenticated"]) {
    next(from.path);
  } else if (to.name === "signup" && store.getters["isUserAuthenticated"]) {
    next(from.path);
  } else if (to.name !== "login" && store.getters["isUserAuthenticated"]) {
    next();
  } else if (to.name === "login" && !store.getters["isUserAuthenticated"]) {
    next();
  } else if (to.name === "signup" && !store.getters["isUserAuthenticated"]) {
    next();
  } 
  else if (to.name === "forgot" && !store.getters["isUserAuthenticated"]) {
    next();
  } else {
    next({ name: "login" });
  }
});

export default router;
