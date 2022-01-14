<template>
  <form>
    <v-row>
      <v-col class="col-6">
        <v-text-field
          v-model="categoryModel.catagories"
          :error-messages="catagoriesErrors"
          label="category Name"
          required
          color="blue darken-3"
          @input="$v.categoryModel.catagories.$touch()"
          @blur="$v.categoryModel.catagories.$touch()"
        ></v-text-field>
      </v-col>
       <v-col class="col-6">
          <strong>status</strong>
          <v-radio-group v-model="categoryModel.Status" row>
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
    categoryModel: {
      catagories: { required }, 
    },
  },
  data: () => ({
    categoryModel: {
      catagories: "", 
    },
  }),

  computed: {
    ...mapGetters(["getcategoryById"]), 
    catagoriesErrors() {
      const errors = [];
      if (!this.$v.categoryModel.catagories.$dirty) return errors;
      !this.$v.categoryModel.catagories.required && errors.push("catagories is required.");
      return errors;
    }, 
  },

  methods: {
    submit() {
      debugger; // eslint-disable-line no-debugger
      this.$v.$touch();
      if (this.categoryModel._id == null) {
        this.$store.dispatch("addcategory", this.categoryModel).then((res) => {
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
             this.$emit("closeIt");
        });
      } else {
        this.$store.dispatch("updatecategory", this.categoryModel).then((res) => {
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
           this.$emit("closeIt");
      }
   
    },
    clear() {
      this.$v.$reset();
      (this.categoryModel = {
        catagories: "",
        location: "",
      }),
        this.$emit("closeIt");
    },
  },
  mounted() {
    debugger
    if (this.getcategoryById) {
      this.categoryModel = this.getcategoryById; 
      this.categoryModel.catagories = this.categoryModel.catagoriesName; 
    }
  },
  destroyed() {
    this.$store.dispatch("resetcategoryState");
  },
};
</script>
