<template>
  <div>
    <v-card class="d-flex justify-space-around align-center mb-10">
      <v-card-text>
        <p class="text-h4 text--primary mb-0">
          <i class="fas fas fa-user-tag mr-2 main_color"></i>Roles
        </p>
      </v-card-text>
      <v-card-actions class="pa-5">
        <v-dialog
          v-model="dialog"
          transition="dialog-top-transition"
          scrollable
          width="1024px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark color="main_bg_color" v-bind="attrs" v-on="on"
              ><i class="fas fa-plus mr-2"></i>Add Role</v-btn
            >
          </template>
          <template v-if="dialog" v-slot:default="dialog">
            <v-card>
              <v-toolbar color="main_bg_color" dark class="mb-2">
                <span v-if="isEdit == false"
                  ><i class="fas fas fa-user-tag mr-2"></i>Add Role</span
                >
                <span v-else
                  ><i class="fas fas fa-user-tag mr-2"></i>Edit Role</span
                >
              </v-toolbar>
              <v-card-text>
                <addRoleWithPermission @closeIt="closeModel"></addRoleWithPermission>
              </v-card-text>
            </v-card>
          </template>
        </v-dialog>
      </v-card-actions>
    </v-card>
    <v-card>
      <v-card-title>
        Role List
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          color="blue darken-3"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="items" :search="search">
        <!-- @click="" -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            class="mr-2 edit_btn"
            @click.stop="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon @click="warningModel(item.id)" class="del_btn">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <template>
      <v-dialog v-model="delDialog" max-width="400">
        <v-card>
          <v-card-title class="text-h5 orange lighten-1 text-white">
            Warning
          </v-card-title>

          <v-card-text class="pt-10 text-h6">
            Do you want to delete entry?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="closeWarningModel()">
              Disagree
            </v-btn>

            <v-btn color="deep-orange darken-4" text @click="deleteItem()">
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>
<script>
import addRoleWithPermission from "../../components/role/addRoleWithPermission.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    addRoleWithPermission,
  },
  data() {
    return {
      isEdit: false,
      dialog: false,
      delDialog: false,
      allowDel: false,
      itemId: "",
      isfetching: false,
      search: "",
      headers: [
        {
          text: "Role Name",
          align: "start",
          sortable: true,
          value: "roleName",
        },
        {
          value: "actions",
          text: "Action",
          sortable: false,
        },
      ],
      items: [],
    };
  },
  methods: {
    async fetchData() {
      this.isfetching = true;
      this.search = this.search == null ? "" : this.search;
      await this.$store
        .dispatch("getRoles")
        .then((response) => {
          this.isfetching = false;
          this.items = this.getRoles;
        })
        .catch((ex) => {
          this.isfetching = false;
          console.log(ex);
        });
    },

    editItem(obj) {
      console.log(obj);
      debugger; // eslint-disable-line no-debugger
      this.$store.dispatch("getRolebyId", obj);
      this.dialog = true;
      this.isEdit = true;
    },

    closeModel() {
      this.dialog = false;
      this.isEdit = false;
    },

    warningModel(id) {
      debugger; // eslint-disable-line no-debugger
      console.log(id);
      this.delDialog = true;
      this.itemId = id;
    },

    closeWarningModel() {
      this.delDialog = false;
      this.itemId = "";
    },

    deleteItem() {
      debugger; // eslint-disable-line no-debugger
      this.$store.dispatch("removeRole", this.itemId);
      this.delDialog = false;
      this.itemId = "";

      this.fetchData().catch((error) => {
        console.error(error);
      });
    },
  },
  mounted() {
    this.fetchData().catch((error) => {
      console.error(error);
    });
    this.$store.dispatch("getRoles");
    this.$store.dispatch("getPermission");
  },
  computed: {
    ...mapGetters(["getPermission", "getRoles"]),
  },
};
</script>