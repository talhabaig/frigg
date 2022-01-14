<template>
  <div>
    <v-card class="d-flex justify-space-around align-center mb-10">
      <v-card-text>
        <p class="text-h4 text--primary mb-0">
          <i class="fas fa-stream Orders mr-2 main_color"></i>
          Machine
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
            <v-btn dark color="main_bg_color" v-bind="attrs" v-on="on">
              <i class="fas fa-plus mr-2"></i>Add Machine</v-btn
            >
          </template>
          <template v-if="dialog" v-slot:default="dialog">
            <v-card>
              <v-toolbar color="main_bg_color" dark class="mb-2">
                <span v-if="isEdit == false"
                  ><i class="fas fa-stream Orders mr-2"></i>Add Machine</span
                >
                <span v-else
                  ><i class="fas fa-stream Orders mr-2"></i>Edit Machine</span
                >
              </v-toolbar>
              <v-card-text>
                <addMachine @closeIt="closeModel"></addMachine>
              </v-card-text>
            </v-card>
          </template>
        </v-dialog>
      </v-card-actions>
    </v-card>
    <v-card>
      <v-card-title>
        Machine List
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
          <v-icon class="mr-2 edit_btn" @click.stop="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon @click="warningModel(item._id)" class="del_btn">
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
import addMachine from "../../components/machine/addMachine.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    addMachine,
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
          text: "Name",
          align: "start",
          sortable: true,
          value: "name",
        },
        {
          text: "Machine Code",
          align: "start",
          sortable: true,
          value: "Machine_Code",
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
      debugger; // eslint-disable-line no-debugger
      this.isfetching = true;
      await this.$store.dispatch("getcanteensList");
      this.search = this.search == null ? "" : this.search;
      await this.$store
        .dispatch("machinesList")
        .then((response) => {
          debugger; // eslint-disable-line no-debugger
          console.log(response);
          this.isfetching = false;
          this.items = this.getmachineList;
        })
        .catch((ex) => {
          this.isfetching = false;
          console.log(ex);
        });
    },

    editItem(obj) {
      debugger; // eslint-disable-line no-debugger
      this.$store.dispatch("getmachineById", obj);
      this.dialog = true;
      this.isEdit = true;
    },

    closeModel() {
      this.fetchData();
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
      this.$store.dispatch("removemachine", this.itemId).then((response) => {
        Swal.fire({
          title: "",
          text: "success",
          icon: "success",
        });
      });
      this.delDialog = false;
      this.itemId = "";

      this.fetchData().catch((error) => {
        console.error(error);
      });
    },
  },
  destroyed() {
    this.$store.dispatch("resetmachineListState");
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    ...mapGetters(["getmachineList"]),
  },
};
</script>
