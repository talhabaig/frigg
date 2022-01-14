<template>
  <form>
    <v-row>
      <v-col class="col-6">
        <v-select
          :items="getproductList"
          item-value="_id"
          item-text="name"
          v-model="inventoryModel.productId"
          :error-messages="productErrors"
          label="Product"
          required
          color="blue darken-3"
          @input="$v.inventoryModel.productId.$touch()"
          @blur="$v.inventoryModel.productId.$touch()"
        ></v-select>
      </v-col>
      <v-col class="col-6">
        <v-text-field
          v-model="inventoryModel.quantity"
          :error-messages="quantityErrors"
          label="Quantity"
          required
          type="number"
          color="blue darken-3"
          @input="$v.inventoryModel.quantity.$touch()"
          @blur="$v.inventoryModel.quantity.$touch()"
        ></v-text-field>
      </v-col>
     
      <v-col class="col-12">
        <v-btn class="mr-4" dark color="main_bg_color" @click="submit">
          submit
        </v-btn>
        <v-btn @click="clear"> Close </v-btn>
      </v-col>
    </v-row>
  </form>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

import Swal from "sweetalert2";
export default {
  mixins: [validationMixin],
  validations: {
    inventoryModel: {
      quantity: { required },
      productId: { required }, 
    },
  },
  data: () => ({
    inventoryModel: {
      quantity: "",
      productId: "", 
    },
  }),
  computed: {
    ...mapGetters(["getproductList", "getinventoryById"]),

    quantityErrors() {
      const errors = [];
      if (!this.$v.inventoryModel.quantity.$dirty) return errors;
      !this.$v.inventoryModel.quantity.required && errors.push("quantity is required.");
      return errors;
    },
    productErrors() {
      const errors = [];
      if (!this.$v.inventoryModel.productId.$dirty) return errors;
      !this.$v.inventoryModel.productId.required &&
        errors.push("product is required.");
      return errors;
    }, 
  },

  methods: {
    fetchData() {
      this.items = this.getproductList;
    },
    submit() {
      debugger; // eslint-disable-line no-debugger
      this.$v.$touch();
       if(!this.$v.$invalid){
      if (this.inventoryModel._id == null) {
        this.$store.dispatch("addinventory", this.inventoryModel).then((res) => {
          if (res.success) {
            Swal.fire({
              title: "",
              text: res.message,
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: res.message,
              icon: "error",
            });
          }
        });
      } else {
        this.$store.dispatch("updateinventory", this.inventoryModel).then((res) => {
          if (res.success) {
            Swal.fire({
              title: "",
              text: res.message,
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: res.message,
              icon: "error",
            });
          }
        });
      }
      this.$emit("closeIt");}
    },
    clear() {
      this.$v.$reset();
      (this.inventoryModel = {
        quantity: "", 
      }),
        this.$emit("closeIt");
    },
  },
  mounted() {
    this.fetchData();
    debugger;
    if (this.getinventoryById) {
      this.inventoryModel = this.getinventoryById;
    }
  },
  destroyed() {
    // debugger; // eslint-disable-line no-debugger
    this.$store.dispatch("resetinventoryState");
  },
};
</script>
