<template>
  <v-card class="mx-auto" max-width="344">
    <v-card-text>
      <div class="mb-3" style="color: #f8932d">
        <h1>WELCOME</h1>
      </div>
      <div>
        <h3>Login to your Account</h3>
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <form>
        <v-text-field
          v-model="loginForm.email"
          :error-messages="emailErrors"
          label="E-mail Address"
          required
          color="blue darken-3"
          @input="$v.loginForm.email.$touch()"
          @blur="$v.loginForm.email.$touch()"
        ></v-text-field>

        <v-text-field
          v-model="loginForm.password"
          :error-messages="passwordErrors"
          color="blue darken-3"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          required
          @input="$v.loginForm.password.$touch()"
          @blur="$v.loginForm.password.$touch()"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-btn block class="mt-4" color="main_bg_color" dark @click="submit">
          Login
        </v-btn>
        <v-btn
          block
          class="mt-4"
          color="main_bg_color"
          dark
          @click="redirectToForgot()"
        >
          Forget Password
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
        @click="redirectToSignUp()"
      >
        Sign Up
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
export default {
  mixins: [validationMixin],

  validations: {
    loginForm: {
      email: { required, email },
      password: { required },
    },
  },

  data: () => ({
    showPassword: false,

    loginForm: {
      email: "",
      password: "",
    },
  }),

  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.loginForm.password.$dirty) return errors;
      !this.$v.loginForm.password.required &&
        errors.push("Password is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.loginForm.email.$dirty) return errors;
      !this.$v.loginForm.email.email && errors.push("Must be valid e-mail");
      !this.$v.loginForm.email.required && errors.push("E-mail is required");
      return errors;
    },
  },

  methods: {
    submit() {
      debugger; // eslint-disable-line no-debugger
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.dispatch("signInUser", this.loginForm).then((response) => {
          debugger; // eslint-disable-line no-debugger
          if (response.success) { 
            this.$router.push({ name: "userList" });
          } else {
            Swal.fire({
              title: "Error!",
              text: response.message,
              icon: "error",
            });
          }
          // this.clear();
        });
      }
    },

    redirectToSignUp() {
      this.$router.push({ name: "signup" });
    },
    redirectToForgot() {
      this.$router.push({ name: "forgot" });
    },

    clear() {
      this.$v.$reset();
      this.loginForm = {
        userName: "jams",
        password: "123456",
      };
    },
  },
};
</script>
