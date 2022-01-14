<template>
  <form>
    <v-row>
      <v-col class="col-6">
        <v-text-field
          v-model="companyModel.name"
          :error-messages="nameErrors"
          label="Name"
          required
          color="blue darken-3"
          @input="$v.companyModel.name.$touch()"
          @blur="$v.companyModel.name.$touch()"
        ></v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-text-field
          v-model="companyModel.location"
          :error-messages="locationErrors"
          label="Location"
          required
          color="blue darken-3"
          @input="$v.companyModel.location.$touch()"
          @blur="$v.companyModel.location.$touch()"
        ></v-text-field>
      </v-col>
     <v-col class="col-6"> 
        <strong>Status</strong>
        <v-radio-group v-model="companyModel.Status" row>
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
    companyModel: {
      name: { required },
      location: { required },
    },
  },
  data: () => ({
    companyModel: {
      name: "",
      location: "",
    },
  }),

  computed: {
    ...mapGetters(["getcompanyById"]),

    nameErrors() {
      const errors = [];
      if (!this.$v.companyModel.name.$dirty) return errors;
      !this.$v.companyModel.name.required && errors.push("Name is required.");
      return errors;
    },
    locationErrors() {
      const errors = [];
      if (!this.$v.companyModel.location.$dirty) return errors;
      !this.$v.companyModel.location.required &&
        errors.push("Location is required.");
      return errors;
    },
  },

  methods: {
    submit() {
      debugger; // eslint-disable-line no-debugger
      this.$v.$touch();
      if (this.companyModel._id == null) {
        this.$store.dispatch("addcompany", this.companyModel).then((res) => {
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
        this.$store.dispatch("updatecompany", this.companyModel).then((res) => {
          debugger
          if (res.data.success) {
            Swal.fire({
              title: "",
              text: res.data.success,
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: res.data.success,
              icon: "error",
            });
          }
        });
      }
      this.$emit("closeIt");
    },
    clear() {
      this.$v.$reset();
      (this.companyModel = {
        name: "",
        location: "",
      }),
        this.$emit("closeIt");
    },
  },
  mounted() {
    
    if (this.getcompanyById) {
      this.companyModel = this.getcompanyById;
      this.companyModel.name = this.companyModel.company_name;
    }
  },
  destroyed() {
    this.$store.dispatch("resetcompanyState");
  },
};
</script>
