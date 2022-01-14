<template>
  <div>
    <v-list-item class="px-2" style="background-color: white; height: 64px">
      <v-img
        v-if="this.drawerValue"
        src="../../../assets/logos/Frigg_Logo_F_Tekst_Horisontal_gul (1).png"
        alt="FRIGG KANTINE"
        width="auto"
        height="50px"
      ></v-img>
      <v-img
        v-else
        src="../../../assets/logos/Frigg_Logo_F_gul.jpg"
        alt="FRIGG KANTINE"
        width="auto"
        height="40px"
      ></v-img>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dark>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.icon"
        no-action
        color="white"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          class="#f8932d"
          dark
        >
          <router-link
            :to="child.route"
            style="text-decoration: none; color: inherit"
          >
            <v-list-item-content color="white">
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </router-link>
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>
<script>
export default {
  props: {
    drawerValue: Boolean,
  },
  data() {
    return {
      items: [
        {
          icon: "fas fa-users",
          items: [
            { title: "User List", route: "userList" },
            // { title: "Role List", route: "roleList" }
          ],
          active: true,
          title: "Users",
          route: "userList",
        },
        {
          icon: "fas fa-building",
          items: [
            { title: "Company List", route: "companyList" },
            // { title: "Order Type List", route: "orderTypeList" },
          ],
          title: "Company",
          route: "companyList",
        },
        {
          icon: "fas fa-store-alt",
          items: [
            { title: "Canteen List", route: "canteenList" },
            // { title: "Order Type List", route: "orderTypeList" },
          ],
          title: "Canteen",
          route: "canteenList",
        },
         {
          icon: "fas fa-store-alt",
          items: [
            { title: "Category List", route: "categoryList" }, 
          ],
          title: "Category",
          route: "categoryList",
        },
        { 
           
          icon: "fas fa-tram",
          items: [
            { title: "Machine List", route: "machineList" },
            // { title: "Order Type List", route: "orderTypeList" },
          ],
          title: "Machine",
          route: "machineList",
        },
        { 
          icon: "fab fa-product-hunt",
          items: [
            { title: "Product List", route: "productList" }, 
            { title: "Inventory List", route: "inventoryList" }, 
            { title: "Assign Product", route: "assignProduct" }, 
          ],
          title: "Product",
          route: "productList",
        },
        // {
        //   icon: "fas fa-hospital-user",
        //   items: [{ title: "Patient List", route: "patientList" }],
        //   title: "Patient",
        //   route: "patientList",
        // },
      ],
    };
  },
};
</script>
