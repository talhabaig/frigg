<template>
  <form>
    <v-row>
      <v-col class="col-6">
        <v-select
          :items="getmachineList"
          item-value="_id"
          item-text="name"
          v-model="productassignModel.machineId" 
          label="Machine"
          required
          color="blue darken-3" 
        ></v-select>
      </v-col>
      <v-col class="col-6">
        <v-select
          :items="getproductList"
          item-value="_id"
          item-text="name"
          v-model="productassignModel.productId" 
          label="Product"
          required
          color="blue darken-3" 
        ></v-select>
      </v-col>
   
      <v-col class="col-6">
        <v-text-field
          v-model="productassignModel.Machine_Code" 
          label="Quantity"
          required
          color="blue darken-3" 
        ></v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-text-field
          v-model="productassignModel.Machine_Code" 
          label="Channal"
          required
          color="blue darken-3" 
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
    productModel: {
      name: { required },
      price: { required },
      recipe: { required },
      allergic: { required },
      description: { required },
      quantity: { required },
      category: { required },
      VAT: { required },
      status: { required },
    },
  },
  data: () => ({
    menu: false,
    image: null,
    productassignModel: {
      name: "",
      price: "",
      recipe: "",
      allergic: "",
      VAT: "",
      description: "",
      quantity: 0,
      cescription: "",
      status: "Active",
      Image: "",
    },
  }),
  computed: { 
    ...mapGetters(["getproductList","getmachineList"]),  
      canteenErrors() {
      const errors = [];
      if (!this.$v.productassignModel.canteenId.$dirty) return errors;
      !this.$v.productassignModel.canteenId.required &&
        errors.push("canteen is required.");
      return errors;
    },
  },

  methods: {
    handleFileUpload() {
      this.productModel.Image = this.$refs.file.files[0];
    },

    submit() {
      debugger; // eslint-disable-line no-debugger
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (this.productModel._id == null) {
          this.$store.dispatch("addproduct", this.productModel).then((res) => {
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
          this.$store
            .dispatch("updateproduct", this.productModel)
            .then((res) => {
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
        this.$emit("closeIt");
      }
    },
    clear() {
      this.$v.$reset();

      this.$emit("closeIt");
    },
  },
  mounted() {
    debugger;
    if (this.getproductById) {
      this.productModel = this.getproductById;
    }
  },
  destroyed() {
    // debugger; // eslint-disable-line no-debugger
    this.$store.dispatch("resetproductState");
  },
};
</script>
