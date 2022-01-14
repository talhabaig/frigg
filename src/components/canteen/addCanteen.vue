<template>
  <form>
    <v-row>
      <v-col class="col-6">
        <v-select
          :items="getcompanyList"
          item-value="_id"
          item-text="company_name"
          v-model="canteenModel.companyId"
          :error-messages="companyErrors"
          label="Company"
          required
          color="blue darken-3"
          @input="$v.canteenModel.companyId.$touch()"
          @blur="$v.canteenModel.companyId.$touch()"
        ></v-select>
      </v-col>
      <v-col class="col-6">
        <v-text-field
          v-model="canteenModel.name"
          :error-messages="nameErrors"
          label="Name"
          required
          color="blue darken-3"
          @input="$v.canteenModel.name.$touch()"
          @blur="$v.canteenModel.name.$touch()"
        ></v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-text-field
          v-model="canteenModel.location"
          :error-messages="locationErrors"
          label="Location"
          required
          color="blue darken-3"
          @input="$v.canteenModel.location.$touch()"
          @blur="$v.canteenModel.location.$touch()"
        ></v-text-field>
      </v-col> 
        <v-col class="col-6">
          <strong>status</strong>
          <v-radio-group v-model="canteenModel.status" row>
            <v-radio label="Active" value="Active"></v-radio>
            <v-radio label="InActive" value="InActive"></v-radio>
          </v-radio-group>
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
    canteenModel: {
      name: { required },
      companyId: { required },
      location: { required },
      status: { required },
    },
  },

  data: () => ({
    canteenModel: {
      name: "",
      companyId: "",
      location: "",
      status: "Active",
    },
  }),

  computed: {
    ...mapGetters(["getcanteenById", "getcompanyList"]),

    nameErrors() {
      const errors = [];
      if (!this.$v.canteenModel.name.$dirty) return errors;
      !this.$v.canteenModel.name.required && errors.push("Name is required.");
      return errors;
    },
    companyErrors() {
      const errors = [];
      if (!this.$v.canteenModel.companyId.$dirty) return errors;
      !this.$v.canteenModel.companyId.required &&
        errors.push("company is required.");
      return errors;
    },
    locationErrors() {
      const errors = [];
      if (!this.$v.canteenModel.location.$dirty) return errors;
      !this.$v.canteenModel.location.required &&
        errors.push("Location is required.");
      return errors;
    },
  },

  methods: {
    fetchData() {
      this.items = this.getcompanyList;
    },
    submit() {
      debugger; // eslint-disable-line no-debugger
      this.$v.$touch();
      if(!this.$v.$invalid){
if (this.canteenModel.id == null) {
        this.$store.dispatch("addcanteen", this.canteenModel).then((res) => {
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
        this.$store.dispatch("updateCanteen", this.canteenModel).then((res) => {
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
      (this.canteenModel = {
        name: "",
        location: "",
      }),
        this.$emit("closeIt");
    },
  },
  mounted() {   
     this.items = this.getcompanyList;
    if (this.getcanteenById) {
      this.canteenModel = this.getcanteenById;
    }
  },
  destroyed() {
    // debugger; // eslint-disable-line no-debugger
    this.$store.dispatch("resetcanteenState");
  },
};
</script>
