<template>
  <form>
    <v-row>
      <v-col class="col-12">
        <v-text-field
          v-model="orderTypeModel.name"
          :error-messages="nameErrors"
          label="Order Type"
          required
          color="blue darken-3"
          @input="$v.orderTypeModel.name.$touch()"
          @blur="$v.orderTypeModel.name.$touch()"
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

export default {
  mixins: [validationMixin],

  validations: {
    orderTypeModel: {
      name: { required },
    },
  },

  data: () => ({
    orderTypeModel: {
      name: "",
    },
  }),

  computed: {
    ...mapGetters(["getOrderTypeById"]),

    nameErrors() {
      const errors = [];
      if (!this.$v.orderTypeModel.name.$dirty) return errors;
      !this.$v.orderTypeModel.name.required &&
        errors.push("Order Type is required.");
      return errors;
    },
  },

  destroyed() {
    // debugger; // eslint-disable-line no-debugger
    this.$store.dispatch("resetOrderTypeState");
  },

  methods: {
    submit() {
      this.$v.$touch();
      if (this.orderTypeModel.id == null) {
        this.$store.dispatch("addOrderType", this.orderTypeModel);
      } else {
        this.$store.dispatch("updateOrderType", this.orderTypeModel);
      }
      this.$emit("closeIt");
    },
    clear() {
      this.$v.$reset();
      this.orderTypeModel = {
        name: "",
      };
      this.$emit("closeIt");
    },
  },
  mounted() {
    // debugger; // eslint-disable-line no-debugger
    if (this.getOrderTypeById) {
      this.orderTypeModel = this.getOrderTypeById;
    }
  },
};
</script>
