<template>
  <div>
    <v-card class="d-flex justify-space-around align-center mb-10">
      <v-card-text>
        <p class="text-h4 text--primary mb-0">
          <i class="fas fa-stream Orders mr-2 main_color"></i>
          Orders
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
              ><i class="fas fa-plus mr-2"></i>Add Order</v-btn
            >
          </template>
          <template v-if="dialog" v-slot:default="dialog">
            <v-card>
              <v-toolbar color="main_bg_color" dark class="mb-2">
                <span v-if="isEdit == false"
                  ><i class="fas fa-stream Orders mr-2"></i>Add Order</span
                >
                <span v-else
                  ><i class="fas fa-stream Orders mr-2"></i>Edit Order</span
                >
              </v-toolbar>
              <v-card-text>
                <addOrder @closeIt="closeModel"></addOrder>
              </v-card-text>
            </v-card>
          </template>
        </v-dialog>
      </v-card-actions>
    </v-card>
    <v-card>
      <v-card-title>
        Order List
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
        <template v-slot:[`item.orderType`]="{ item }">
          {{ item.orderType.name }}
        </template>
        <template v-slot:[`item.doctorName`]="{ item }">
          {{ item.user.firstName + " " + item.user.lastName }}
        </template>
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
import addOrder from "../../components/order/addOrder.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    addOrder,
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
          text: "Order Type",
          align: "start",
          sortable: true,
          value: "orderType",
        },
        {
          text: "Doctor",
          align: "start",
          sortable: true,
          value: "doctorName",
        },
        {
          text: "Provider Order",
          align: "start",
          sortable: true,
          value: "providerOrder",
        },
        {
          text: "Out patient In Bed",
          align: "start",
          sortable: true,
          value: "outpatientInBed",
        },
        {
          text: "As Observation",
          align: "start",
          sortable: true,
          value: "asObservation",
        },
        {
          text: "Date & Time",
          align: "start",
          sortable: true,
          value: "dateTime",
        },
        {
          text: "Technician Acknowledging",
          align: "start",
          sortable: true,
          value: "technicianAcknowledging",
        },
        {
          text: "File Path",
          align: "start",
          sortable: true,
          value: "filePath",
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
      this.search = this.search == null ? "" : this.search;
      await this.$store
        .dispatch("getOrdersList")
        .then((response) => {
          debugger; // eslint-disable-line no-debugger
          console.log(response);
          this.isfetching = false;
          this.items = this.getOrderList;
        })
        .catch((ex) => {
          this.isfetching = false;
          console.log(ex);
        });
    },

    editItem(obj) {
      console.log(obj);
      debugger; // eslint-disable-line no-debugger
      this.$store.dispatch("getOrderById", obj);
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
      this.$store.dispatch("removeOrder", this.itemId);
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
    this.$store.dispatch("getUserList");
    this.$store.dispatch("getOrderTypesList");
  },
  computed: {
    ...mapGetters(["getOrderList"]),
  },
};
</script>

