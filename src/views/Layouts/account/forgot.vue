<template>
  <v-card class="mx-auto" max-width="344">
    <v-card-text>
      <div class="mb-3" style="color: #f8932d">
        <h1>Forgot Password</h1>
      </div>
      <div>
        <h3>Enter Your Email Address</h3>
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <form>
        <v-text-field
          v-model="forgotForm.email"
          :error-messages="emailErrors"
          label="E-mail Address"
          required
          color="blue darken-3"
          @input="$v.forgotForm.email.$touch()"
          @blur="$v.forgotForm.email.$touch()"
        ></v-text-field>

        
        <v-btn block class="mt-4" color="main_bg_color" dark @click="submit">
          Continue
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
import { required, maxLength, email } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
export default {
  mixins: [validationMixin],

  validations: {
    forgotForm: {
      email: { required, email }, 
    },
  },

  data: () => ({ 
    forgotForm: {
      email: "", 
    },
  }),

  computed: { 
    emailErrors() {
      const errors = [];
      if (!this.$v.forgotForm.email.$dirty) return errors;
      !this.$v.forgotForm.email.email && errors.push("Must be valid e-mail");
      !this.$v.forgotForm.email.required && errors.push("E-mail is required");
      return errors;
    },
  },

  methods: {
    submit() {
      debugger; // eslint-disable-line no-debugger
      this.$v.$touch();
          if(!this.$v.$invalid){ 
      this.$store.dispatch("forgotUser", this.forgotForm).then((response) => {
        debugger; // eslint-disable-line no-debugger
        if (response) {
          Swal.fire({
            title: "",
            text: response.message,
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "SomeThing Went Wrong!",
            icon: "error",
          });
        }
        // this.clear();

        // this.$router.push({ name: "userList" });
      });
    }},
 
    redirectToLogin() {
      this.$router.push({ name: "login" });
    },

    
  },
};
</script>
