<template>
  <v-app id="inspire">
    <v-navigation-drawer v-if="drawer" app class="main_bg_color">
      <asideMenu :drawerValue="drawer" />
    </v-navigation-drawer>
    <v-navigation-drawer v-else app mini-variant class="main_bg_color">
      <asideMenu :drawerValue="drawer" />
    </v-navigation-drawer>
    <v-app-bar app color="white">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="mr-auto"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="mr-auto">FRIGG KANTINE </v-toolbar-title>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="100"
        class="ml-auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-avatar color="main_color" size="50">
            <img
              dark
              v-bind="attrs"
              v-on="on"
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            />
          </v-avatar>
        </template>
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">My Profile</div>
              <v-list-item-title class="text-h5 mb-1">
                {{ userDetails.name }}
              </v-list-item-title>
              <v-list-item-subtitle>{{
                userDetails.email
              }}</v-list-item-subtitle>
              <v-list-item-subtitle
                >Role Name: {{ userDetails.role }}</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-avatar tile size="80">
              <img
                dark
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="John"
            /></v-list-item-avatar>
          </v-list-item>
          <v-card-actions>
            <v-btn class="main_bg_color" dark @click="logOut()"> Logout </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-main
      style="padding-top: 80px"
      :style="
        drawer == true
          ? 'padding-left: 258px !important'
          : 'padding-left: 58px !important'
      "
    >
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import asideMenu from "../Aside/Aside.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    asideMenu,
  },
  data: () => ({
    drawer: false,
    fav: true,
    menu: false,
    message: false,
    hints: true,
  }),
  methods: {
    logOut() {
      debugger; // eslint-disable-line no-debugger
      this.menu = false;
      this.$store.dispatch("logOut").then(() => {
        this.$router.push({ name: "login" });
      });
    },
  },
  computed: {
    ...mapGetters(["userDetails"]),
  },
};
</script>
