<template>
  <form>
    <v-row>
      <v-col class="col-6">
        <v-text-field
          v-model="productModel.name"
          :error-messages="nameErrors"
          label="Name"
          required
          color="blue darken-3"
          @input="$v.productModel.name.$touch()"
          @blur="$v.productModel.name.$touch()"
        ></v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-text-field
          v-model="productModel.price"
          :error-messages="priceErrors"
          label="Price"
          required
          type="number"
          color="blue darken-3"
          @input="$v.productModel.price.$touch()"
          @blur="$v.productModel.price.$touch()"
        ></v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-text-field
          v-model="productModel.recipe"
          :error-messages="recipeErrors"
          label="Recipe"
          required
          color="blue darken-3"
          @input="$v.productModel.recipe.$touch()"
          @blur="$v.productModel.recipe.$touch()"
        ></v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-text-field
          v-model="productModel.allergic"
          :error-messages="allergicErrors"
          label="Allergic"
          required
          color="blue darken-3"
          @input="$v.productModel.allergic.$touch()"
          @blur="$v.productModel.allergic.$touch()"
        ></v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-text-field
          v-model="productModel.VAT"
          :error-messages="VATErrors"
          label="VAT"
          required
          color="blue darken-3"
          @input="$v.productModel.VAT.$touch()"
          @blur="$v.productModel.VAT.$touch()"
        ></v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="productModel.expiry_date"
              label="Expiry Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="productModel.expiry_date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="menu = false"> OK </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <!-- <v-col class="col-6">
        <v-text-field
          v-model="productModel.category"
          :error-messages="categoryErrors"
          label="Category"
          required
          color="blue darken-3"
          @input="$v.productModel.category.$touch()"
          @blur="$v.productModel.category.$touch()"
        ></v-text-field>
      </v-col> -->
        <!-- <v-col class="col-6">
        <v-text-field
          v-model="productModel.quantity"
          :error-messages="quantityErrors"
          label="Quanity"
          required
          type="number"
          color="blue darken-3"
          @input="$v.productModel.quantity.$touch()"
          @blur="$v.productModel.quantity.$touch()"
        ></v-text-field>
      </v-col>  -->

      <v-col class="col-6">
        <strong>Select Image</strong>
        <br />
        <img :src="productModel.Image" alt="" />
        <input
          type="file"
          id="file"
          ref="file"
          accept="application/pdf,application/docx,application/xlsx,application/xlsx ,application/csv ,application/txt,application/rtf,application/doc,image/jpg, image/jpeg, image/png"
          v-on:change="handleFileUpload()"
        />
        <!-- <v-file-input
          @change="Preview_image"
          v-model="image"
          accept="image/png, image/jpeg, image/bmp"
          prepend-icon="mdi-camera"
        ></v-file-input> -->
      </v-col>
      <v-col class="col-6">
        <strong>Status</strong>

        <v-radio-group v-model="productModel.Status" row>
          <v-radio label="Active" value="Active"></v-radio>
          <v-radio label="InActive" value="InActive"></v-radio>
        </v-radio-group>
      </v-col>

        <v-col class="col-6">
        <v-text-field
          v-model="productModel.description"
          :error-messages="descriptionErrors"
          label="Description"
          required
          color="blue darken-3"
          @input="$v.productModel.description.$touch()"
          @blur="$v.productModel.description.$touch()"
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
      // quantity: { required },
      // category: { required },
      VAT: { required },
      Status: { required },
    },
  },
  data: () => ({
    menu: false,
    image: null,
    productModel: {
      name: "",
      price: "",
      recipe: "",
      allergic: "",
      VAT: "",
      description: "", 
      // quantity: 0,
      // category: "",
      Status: "Active",
      Image: "",
    },
  }),
  computed: {
    ...mapGetters(["getcanteenList", "getproductById"]),

    nameErrors() {
      const errors = [];
      if (!this.$v.productModel.name.$dirty) return errors;
      !this.$v.productModel.name.required && errors.push("Name is required.");
      return errors;
    },
    priceErrors() {
      const errors = [];
      if (!this.$v.productModel.price.$dirty) return errors;
      !this.$v.productModel.price.required && errors.push("price is required.");
      return errors;
    },
    allergicErrors() {
      const errors = [];
      if (!this.$v.productModel.allergic.$dirty) return errors;
      !this.$v.productModel.allergic.required &&
        errors.push("allergic is required.");
      return errors;
    },
    recipeErrors() {
      const errors = [];
      if (!this.$v.productModel.recipe.$dirty) return errors;
      !this.$v.productModel.recipe.required &&
        errors.push("recipe is required.");
      return errors;
    },
    VATErrors() {
      const errors = [];
      if (!this.$v.productModel.VAT.$dirty) return errors;
      !this.$v.productModel.VAT.required && errors.push("VAT is required.");
      return errors;
    },
    categoryErrors() {
      const errors = [];
      if (!this.$v.productModel.category.$dirty) return errors;
      !this.$v.productModel.category.required && errors.push("category is required.");
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.productModel.description.$dirty) return errors;
      !this.$v.productModel.description.required &&
        errors.push("description is required.");
      return errors;
    },
    quantityErrors() {
      const errors = [];
      if (!this.$v.productModel.quantity.$dirty) return errors;
      !this.$v.productModel.quantity.required &&
        errors.push("quantity is required.");
      return errors;
    },
    
  },

  methods: {
    handleFileUpload() {
      this.productModel.Image = this.$refs.file.files[0];
    },

   async submit() {
      debugger; // eslint-disable-line no-debugger
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (this.productModel._id == null) {
        await  this.$store.dispatch("addproduct", this.productModel).then((res) => {
            debugger
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
