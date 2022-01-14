<template>
  <v-card class="mx-auto" max-width="344">
     <v-card-text>
      <div   style="color: #f8932d">
        <h1>Register</h1>
      </div> 
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <form>
        <v-text-field
          v-model="signUpForm.name"
          :error-messages="nameErrors"
          :counter="10"
          label="Name"
          required
          color="blue darken-3"
          @input="$v.signUpForm.name.$touch()"
          @blur="$v.signUpForm.name.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="signUpForm.email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          color="blue darken-3"
          @input="$v.signUpForm.email.$touch()"
          @blur="$v.signUpForm.email.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="signUpForm.phone"
          label="Phone Number."
          required
          color="blue darken-3"
          :error-messages="phoneNumberErrors"
          type="tel"
          @input="$v.signUpForm.phone.$touch()"
          :counter="15"
          @blur="$v.signUpForm.phone.$touch()"
        ></v-text-field>

        <v-text-field
          v-model="signUpForm.role"
          :error-messages="roleErrors"
          :counter="10"
          label="role"
          required
          color="blue darken-3"
          @input="$v.signUpForm.role.$touch()"
          @blur="$v.signUpForm.role.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="signUpForm.password"
          :error-messages="passwordErrors"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          required
          color="blue darken-3"
          @input="$v.signUpForm.password.$touch()"
          @blur="$v.signUpForm.password.$touch()"
          @click:append="showPassword = !showPassword"
        ></v-text-field>

        <v-btn block class="mt-4" color="main_bg_color" dark @click="submit">
          Sign Up
        </v-btn>
      </form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        color="main_bg_color"
        block
        dark
        class="pa-5"
        @click="redirectToLogin()"
      >
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email, sameAs } from "vuelidate/lib/validators";
import Swal from "sweetalert2";

export default {
  mixins: [validationMixin],

  validations: {
    signUpForm: {
      name: { required, maxLength: maxLength(10) },
      role: { required },
      phone: { required, maxLength: maxLength(15) },
      email: { required, email },
      password: { required },
    },
  },

  data: () => ({
    showPassword: false,

    signUpForm: {
      name: "",
      role: "",
      phone: "",
      email: "",
      password: "",
    },
  }),

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.signUpForm.name.$dirty) return errors;
      !this.$v.signUpForm.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.signUpForm.name.required && errors.push("Name is required.");
      return errors;
    },
    roleErrors() {
      const errors = [];
      if (!this.$v.signUpForm.role.$dirty) return errors;
      !this.$v.signUpForm.role.required && errors.push("role is required.");
      return errors;
    },
    phoneNumberErrors() {
      const errors = [];
      if (!this.$v.signUpForm.phone.$dirty) return errors;
      !this.$v.signUpForm.phone.maxLength &&
        errors.push("Phone Number must be at most 14 characters long");
      !this.$v.signUpForm.phone.required &&
        errors.push("Phone Number is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.signUpForm.email.$dirty) return errors;
      !this.$v.signUpForm.email.email && errors.push("Must be valid e-mail");
      !this.$v.signUpForm.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.signUpForm.password.$dirty) return errors;
      !this.$v.signUpForm.password && errors.push("Must be valid Password");
      !this.$v.signUpForm.password.required &&
        errors.push("Password is required");
      return errors;
    },
    confrimPasswordlErrors() {
      const errors = [];
      if (!this.$v.signUpForm.password.$dirty) return errors;
      !this.$v.signUpForm.password.password &&
        errors.push("Must be same as Password");
      !this.$v.signUpForm.Password.required &&
        errors.push("Confrim Password is required");
      return errors;
    },
  },

  methods: {
    submit() { 
      this.$v.$touch();
      if(!this.$v.$invalid){ 
      this.$store.dispatch("signUpUser", this.signUpForm)
        .then((response) => {
          debugger
          if (response.success) {
            Swal.fire({
              title: "",
              text: response.message,
              icon: "success", 
            });
          }
          else{
            Swal.fire({
              title: "Error!",
              text: response.message,
              icon: "error", 
            });
          }
        })
        .catch(function (error) {
          return error;
        });
    }},

    redirectToLogin() {
      this.$router.push({ name: "login" });
    },

    clear() {
      this.$v.$reset();
      this.signUpForm = {
        name: "",
        role: "",
        phone: "",
        email: "",
        password: "",
      };
    },
  },
};
</script>
