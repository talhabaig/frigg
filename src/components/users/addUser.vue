<template>
  <form>
    <v-row>
      <v-col class="col-6">
        <v-text-field
          v-model="userModel.name"
          :error-messages="NameErrors"
          :counter="10"
          label="Name"
          required
          color="blue darken-3"
          @input="$v.userModel.name.$touch()"
          @blur="$v.userModel.name.$touch()"
        ></v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-select
          v-model="userModel.role"
          :items="items"
          :error-messages="roleErrors"
          label="Select role"
          required
          color="blue darken-3"
          @change="$v.userModel.role.$touch()"
          @blur="$v.userModel.role.$touch()"
        ></v-select>
      </v-col>

      <v-col class="col-6">
        <v-text-field
          v-model="userModel.phone"
          label="Phone Number."
          required
          color="blue darken-3"
          :error-messages="phoneNumberErrors"
          type="number"
          @input="$v.userModel.phone.$touch()"
          :counter="15"
          @blur="$v.userModel.phone.$touch()"
        ></v-text-field>
      </v-col>
      <v-col v-if="!this.userModel._id" class="col-6">
        <v-text-field
          v-model="userModel.email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          color="blue darken-3"
          @input="$v.userModel.email.$touch()"
          @blur="$v.userModel.email.$touch()"
        ></v-text-field>
      </v-col>
      <v-col v-if="!this.userModel._id" class="col-6">
        <v-text-field
          v-model="userModel.password"
          :error-messages="passwordErrors"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          required
          color="blue darken-3"
          @input="$v.userModel.password.$touch()"
          @blur="$v.userModel.password.$touch()"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </v-col>
        <v-col class="col-6"> 
        <strong>Status</strong>
        <v-radio-group v-model="userModel.status" row>
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
import { required, maxLength, email, sameAs } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

import Swal from "sweetalert2";
export default {
  mixins: [validationMixin],

  validations: {
    userModel: {
      name: { required, maxLength: maxLength(10) },
      role: { required },
      phone: { required, maxLength: maxLength(15) },
      email: { required, email },
      password: { required },
    },
  },

  data: () => ({
    showPassword: false,

    items: ["admin", "user", "Machine Filler"],

    userModel: {
      name: "",
      role: "",
      phone: "",
      email: "",
      password: "",
      status:"Active"
    },
  }),

  computed: {
    ...mapGetters(["getRoles", "getUserById"]),

    roleErrors() {
      const errors = [];
      if (!this.$v.userModel.role.$dirty) return errors;
      !this.$v.userModel.role.required && errors.push("Role is required");
      return errors;
    },

    NameErrors() {
      const errors = [];
      if (!this.$v.userModel.name.$dirty) return errors;
      !this.$v.userModel.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.userModel.name.required && errors.push("Name is required.");
      return errors;
    },

    phoneNumberErrors() {
      const errors = [];
      if (!this.$v.userModel.phone.$dirty) return errors;
      !this.$v.userModel.phone.maxLength &&
        errors.push("Phone Number must be at most 14 characters long");
      !this.$v.userModel.phone.required &&
        errors.push("Phone Number is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.userModel.email.$dirty) return errors;
      !this.$v.userModel.email.email && errors.push("Must be valid e-mail");
      !this.$v.userModel.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.userModel.password.$dirty) return errors;
      !this.$v.userModel.password && errors.push("Must be valid Password");
      !this.$v.userModel.password.required &&
        errors.push("Password is required");
      return errors;
    },
  },

  methods: {
    enforcePhoneFormat() {
      let x = this.userModel.phone
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.userModel.phone = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
    },
    submit() {
      debugger; // eslint-disable-line no-debugger
      this.$v.$touch();

      if (!this.userModel._id) {
        this.$store.dispatch("addUser", this.userModel).then((res) => {
          if (res.success) {
            Swal.fire({
              title: "",
              text: res.message,
              icon: "success",
            }); 
            this.$emit("closeIt");
          } else {
            Swal.fire({
              title: "Error!",
              text: res.message,
              icon: "error",
            });
          }
        });
      } else {
        this.$store.dispatch("updateUser", this.userModel).then((res)=>{
          if (res.success) {
            Swal.fire({
              title: "",
              text: res.message,
              icon: "success",
            }); 
            this.$emit("closeIt");
          } else {
            Swal.fire({
              title: "Error!",
              text: res.message,
              icon: "error",
            });
          }
        });
      }
    },
    clear() {
      this.$v.$reset();
      this.userModel = {
        name: "",
        role: "",
        phone: "",
        email: "",
        password: "",
      };
      this.$emit("closeIt");
    },
  },

  destroyed() {
    // debugger; // eslint-disable-line no-debugger
    this.$store.dispatch("resetUserState");
  },

  mounted() {
    debugger; // eslint-disable-line no-debugger
    if (this.getUserById) {
      this.userModel = this.getUserById; 
      this.userModel.status = this.getUserById.Status; 
    }
  },
};
</script>
