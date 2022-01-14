<template>
  <form>
    <v-row>
      <v-col class="col-6">
        <v-select
          v-model="orderModel.orderTypeId"
          :items="getOrderTypeList"
          item-text="name"
          item-value="id"
          :error-messages="orderTypeErrors"
          label="Select Order type"
          required
          color="blue darken-3"
          @change="$v.orderModel.orderTypeId.$touch()"
          @blur="$v.orderModel.orderTypeId.$touch()"
        ></v-select>
      </v-col>
      <v-col class="col-6">
        <v-select
          v-model="orderModel.orderDoctorId"
          :items="getuserList"
          item-text="firstName"
          item-value="id"
          :error-messages="doctorErrors"
          label="Select Doctor"
          required
          color="blue darken-3"
          @change="$v.orderModel.orderDoctorId.$touch()"
          @blur="$v.orderModel.orderDoctorId.$touch()"
        ></v-select>
      </v-col>
      <v-col class="col-6">
        <v-text-field
          v-model="orderModel.providerOrder"
          :error-messages="providerOrderErrors"
          label="Provider Order"
          required
          color="blue darken-3"
          @input="$v.orderModel.providerOrder.$touch()"
          @blur="$v.orderModel.providerOrder.$touch()"
        ></v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-text-field
          v-model="orderModel.outpatientInBed"
          :error-messages="outpatientInBedErrors"
          label="Out Patient In Bed"
          required
          color="blue darken-3"
          @input="$v.orderModel.outpatientInBed.$touch()"
          @blur="$v.orderModel.outpatientInBed.$touch()"
        ></v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-text-field
          v-model="orderModel.asObservation"
          :error-messages="asObservationErrors"
          label="As Observation"
          required
          color="blue darken-3"
          @input="$v.orderModel.asObservation.$touch()"
          @blur="$v.orderModel.asObservation.$touch()"
        ></v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-text-field
          v-model="orderModel.technicianAcknowledging"
          :error-messages="technicianAcknowledgingErrors"
          label="Technician Acknowledging"
          required
          color="blue darken-3"
          @input="$v.orderModel.technicianAcknowledging.$touch()"
          @blur="$v.orderModel.technicianAcknowledging.$touch()"
        ></v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-menu
          v-model="datepickerMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="orderModel.date"
              label="Select Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              color="blue darken-3"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            color="blue darken-3"
            v-model="orderModel.date"
            @input="datepickerMenu = false"
            @change="concatDateTime()"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col class="col-6">
        <v-menu
          ref="timepickerMenu"
          v-model="timepickerMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="orderModel.time"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
          color="blue darken-3"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="orderModel.time"
              label="Select Time"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-bind="attrs"
              v-on="on"
              color="blue darken-3"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="timepickerMenu"
            v-model="orderModel.time"
            full-width
            color="blue darken-3"
            @click:minute="$refs.timepickerMenu.save(orderModel.time)"
            @change="concatDateTime()"
          ></v-time-picker>
        </v-menu>
      </v-col>
      <v-col class="col-12">
        <v-file-input
          v-model="orderModel.filePath"
          color="blue darken-3"
          label="File"
        ></v-file-input>
      </v-col>
      <v-col class="col-12">
        <v-textarea
          label="Notes"
          color="blue darken-3"
          v-model="orderModel.notes"
        ></v-textarea>
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
    orderModel: {
      orderTypeId: { required },
      orderDoctorId: { required },
      providerOrder: { required },
      outpatientInBed: { required },
      asObservation: { required },
      dateTime: { required },
      technicianAcknowledging: { required },
      // filePath: { required },
      notes: { required },
    },
  },

  data: () => ({
    // time: null,
    // date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    //   .toISOString()
    //   .substr(0, 10),

    orderModel: {
      orderTypeId: "",
      orderDoctorId: "",
      providerOrder: "",
      outpatientInBed: "",
      asObservation: "",
      date: "",
      time: null,
      dateTime: "",
      technicianAcknowledging: "",
      // filePath: "",
      notes: "",
    },

    timepickerMenu: false,
    datepickerMenu: false,
  }),

  computed: {
    ...mapGetters(["getOrderTypeList", "getuserList", "getOrderById"]),

    orderTypeErrors() {
      const errors = [];
      if (!this.$v.orderModel.orderTypeId.$dirty) return errors;
      !this.$v.orderModel.orderTypeId.required &&
        errors.push("Order Type is required.");
      return errors;
    },
    doctorErrors() {
      const errors = [];
      if (!this.$v.orderModel.orderDoctorId.$dirty) return errors;
      !this.$v.orderModel.orderDoctorId.required &&
        errors.push("Doctor is required.");
      return errors;
    },
    providerOrderErrors() {
      const errors = [];
      if (!this.$v.orderModel.providerOrder.$dirty) return errors;
      !this.$v.orderModel.providerOrder.required &&
        errors.push("Provider Order is required.");
      return errors;
    },
    outpatientInBedErrors() {
      const errors = [];
      if (!this.$v.orderModel.outpatientInBed.$dirty) return errors;
      !this.$v.orderModel.outpatientInBed.required &&
        errors.push("Out Patient In Bed is required.");
      return errors;
    },
    asObservationErrors() {
      const errors = [];
      if (!this.$v.orderModel.asObservation.$dirty) return errors;
      !this.$v.orderModel.asObservation.required &&
        errors.push("As Observation is required.");
      return errors;
    },
    technicianAcknowledgingErrors() {
      const errors = [];
      if (!this.$v.orderModel.technicianAcknowledging.$dirty) return errors;
      !this.$v.orderModel.technicianAcknowledging.required &&
        errors.push("Technician Acknowledging is required.");
      return errors;
    },
  },

  methods: {
    concatDateTime() {
      this.orderModel.dateTime = "";
      this.orderModel.dateTime =
        this.orderModel.date + "T" + this.orderModel.time;
    },

    submit() {
      debugger; // eslint-disable-line no-debugger

      this.$v.$touch();
      if (this.orderModel.id == null) {
        this.$store.dispatch("addOrder", this.orderModel);
      } else {
        this.$store.dispatch("updateOrder", this.orderModel);
      }
        this.$emit("closeIt");
    },
    clear() {
      this.$v.$reset();
      (this.orderModel = {
        orderTypeId: "",
        orderDoctorId: "",
        providerOrder: "",
        outpatientInBed: "",
        asObservation: "",
        dateTime: "",
        date: "",
        time: null,
        technicianAcknowledging: "",
        filePath: "",
        noates: "",
      }),
        this.$emit("closeIt");
    },
  },
  mounted() {
    if (this.getOrderById) {
      this.orderModel = this.getOrderById;
      this.orderModel.orderDoctorId = this.getOrderById.userId;
      this.orderModel.date = this.getOrderById.dateTime.split("T")[0];
      this.orderModel.time = this.getOrderById.dateTime.split("T")[1];
    }
  },
  destroyed() {
    // debugger; // eslint-disable-line no-debugger
    this.$store.dispatch("resetOrderState");
  },
};
</script>
