<template>
  <div>
    <v-card class="d-flex justify-space-around align-center mb-10">
      <v-card-text>
        <p class="text-h4 text--primary mb-0">
          <i class="fas fa-stream Orders mr-2 main_color"></i>
          Product
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
              <i class="fas fa-plus mr-2"></i>Add Product</v-btn
            >
          </template>
          <template v-if="dialog" v-slot:default="dialog">
            <v-card>
              <v-toolbar color="main_bg_color" dark class="mb-2">
                <span v-if="isEdit == false"
                  ><i class="fas fa-stream Orders mr-2"></i>Add Product</span
                >
                <span v-else
                  ><i class="fas fa-stream Orders mr-2"></i>Edit Product</span
                >
              </v-toolbar>
              <v-card-text>
                <addProduct @closeIt="closeModel"></addProduct>
              </v-card-text>
            </v-card>
          </template>
        </v-dialog>
      </v-card-actions>
    </v-card>
    <v-card>
      <v-card-title>
        Product List
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
import addProduct from "../../components/product/addProduct.vue";
import { mapGetters } from "vuex";
import Swal from "sweetalert2";

export default {
  components: {
    addProduct,
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
          text: "Price",
          align: "start",
          sortable: true,
          value: "price",
        },
        {
          text: "Recipe",
          align: "start",
          sortable: true,
          value: "recipe",
        },
        {
          text: "Allergic",
          align: "start",
          sortable: true,
          value: "allergic",
        },
        {
          text: "Quantity",
          align: "start",
          sortable: true,
          value: "quantity",
        },
        {
          text: "Category",
          align: "start",
          sortable: true,
          value: "category",
        },
        {
          text: "VAT",
          align: "start",
          sortable: true,
          value: "VAT",
        },
        {
          text: "Expiry Date",
          align: "start",
          sortable: true,
          value: "expiry_date",
        },
        {
          text: "Status",
          align: "start",
          sortable: true,
          value: "Status",
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

      await this.$store
        .dispatch("productsList")
        .then((response) => {
          debugger; // eslint-disable-line no-debugger
          console.log(response);
          this.isfetching = false;
          this.items = this.getproductList;
        })
        .catch((ex) => {
          this.isfetching = false;
          console.log(ex);
        });
    },

    editItem(obj) {
      debugger; // eslint-disable-line no-debugger
      this.$store.dispatch("getproductById", obj);
      this.dialog = true;
      this.isEdit = true;
    },

    async  closeModel() {
        await this.fetchData();
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

  async  deleteItem() {
      debugger; // eslint-disable-line no-debugger
      this.$store.dispatch("removeproduct", this.itemId).then((response) => {
        
        Swal.fire({
          title: "",
          text: "success",
          icon: "success",
        });
         this.fetchData().catch((error) => {
        console.error(error);
      });
      });
        await this.fetchData();
      this.delDialog = false;
      this.itemId = ""; 

    },
    
  },
  destroyed() {
    this.$store.dispatch("resetproductListState");
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    ...mapGetters(["getproductList"]),
  },
};
</script>
