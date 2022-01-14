<template>
  <form>
    <v-row>
      <v-col class="col-6">
        <v-select
          :items="getcanteenList"
          item-value="_id"
          item-text="name"
          v-model="machineModel.canteenId"
          :error-messages="canteenErrors"
          label="Canteen"
          required
          color="blue darken-3"
          @input="$v.machineModel.canteenId.$touch()"
          @blur="$v.machineModel.canteenId.$touch()"
        ></v-select>
      </v-col>
      <v-col class="col-6">
        <v-text-field
          v-model="machineModel.name"
          :error-messages="nameErrors"
          label="Name"
          required
          color="blue darken-3"
          @input="$v.machineModel.name.$touch()"
          @blur="$v.machineModel.name.$touch()"
        ></v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-text-field
          v-model="machineModel.Machine_Code"
          :error-messages="Machine_CodeErrors"
          label="Machine_Code"
          required
          color="blue darken-3"
          @input="$v.machineModel.Machine_Code.$touch()"
          @blur="$v.machineModel.Machine_Code.$touch()"
        ></v-text-field>
      </v-col>
      <v-col class="col-6">
        <strong>Status</strong>
        <v-radio-group v-model="machineModel.Status" row>
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
    machineModel: {
      name: { required },
      canteenId: { required },
      Machine_Code: { required },
      Status: { required },
    },
  },
  data: () => ({
    machineModel: {
      name: "",
      canteenId: "",
      Machine_Code: "",
      Status: "Active",
    },
  }),
  computed: {
    ...mapGetters(["getcanteenList", "getmachineById"]),

    nameErrors() {
      const errors = [];
      if (!this.$v.machineModel.name.$dirty) return errors;
      !this.$v.machineModel.name.required && errors.push("Name is required.");
      return errors;
    },
    canteenErrors() {
      const errors = [];
      if (!this.$v.machineModel.canteenId.$dirty) return errors;
      !this.$v.machineModel.canteenId.required &&
        errors.push("canteen is required.");
      return errors;
    },
    Machine_CodeErrors() {
      const errors = [];
      if (!this.$v.machineModel.Machine_Code.$dirty) return errors;
      !this.$v.machineModel.Machine_Code.required &&
        errors.push("Machine_Code is required.");
      return errors;
    },
  },

  methods: {
    fetchData() {
      this.items = this.getcanteenList;
    },
    submit() {
      debugger; // eslint-disable-line no-debugger
      this.$v.$touch();
       if(!this.$v.$invalid){
      if (this.machineModel._id == null) {
        this.$store.dispatch("addmachine", this.machineModel).then((res) => {
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
        this.$store.dispatch("updatemachine", this.machineModel).then((res) => {
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
      (this.machineModel = {
        name: "",
        Machine_Code: "",
      }),
        this.$emit("closeIt");
    },
  },
  mounted() {
    this.fetchData();
    debugger;
    if (this.getmachineById) {
      this.machineModel = this.getmachineById;
    }
  },
  destroyed() {
    // debugger; // eslint-disable-line no-debugger
    this.$store.dispatch("resetmachineState");
  },
};
</script>
