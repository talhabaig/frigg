<template>
  <form>
    <v-row>
      <v-col class="col-6">
        <v-text-field
          v-model="patientModel.medicalRecordNo"
          :error-messages="medicalRecordNoErrors"
          label="Medical Record No."
          required
          color="blue darken-3"
          @input="$v.patientModel.medicalRecordNo.$touch()"
          @blur="$v.patientModel.medicalRecordNo.$touch()"
        ></v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-text-field
          v-model="patientModel.encounterNo"
          :error-messages="encounterNoErrors"
          label="Encounter No."
          required
          color="blue darken-3"
          @input="$v.patientModel.encounterNo.$touch()"
          @blur="$v.patientModel.encounterNo.$touch()"
        ></v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-text-field
          v-model="patientModel.firstName"
          :error-messages="firstNameErrors"
          label="First Name"
          required
          color="blue darken-3"
          @input="$v.patientModel.firstName.$touch()"
          @blur="$v.patientModel.firstName.$touch()"
        ></v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-text-field
          v-model="patientModel.lastName"
          :error-messages="lastNameErrors"
          label="Last Name"
          required
          color="blue darken-3"
          @input="$v.patientModel.lastName.$touch()"
          @blur="$v.patientModel.lastName.$touch()"
        ></v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-text-field
          v-model="patientModel.socialSecurityNo"
          :error-messages="socialSecurityNoErrors"
          label="Social Security No."
          required
          color="blue darken-3"
          @input="$v.patientModel.socialSecurityNo.$touch()"
          @blur="$v.patientModel.socialSecurityNo.$touch()"
        ></v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-text-field
          v-model="patientModel.phone"
          :error-messages="phoneErrors"
          label="Phone"
          required
          color="blue darken-3"
          @input="$v.patientModel.phone.$touch()"
          @blur="$v.patientModel.phone.$touch()"
        ></v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-radio-group row v-model="patientModel.gender">
          <v-radio label="Male" value="0" color="blue darken-3"></v-radio>
          <v-radio label="Female" value="1" color="blue darken-3"></v-radio>
          <v-radio label="Other" value="2" color="blue darken-3"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col class="col-6">
        <v-menu
          v-model="datepickerMenu1"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="patientModel.dateOfBirth"
              label="Date Of Birth"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              color="blue darken-3"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            color="blue darken-3"
            v-model="patientModel.dateOfBirth"
            @input="datepickerMenu1 = false"
            @change="concatDateTime()"
          ></v-date-picker>
        </v-menu>
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
              v-model="patientModel.date"
              label="Visit Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              color="blue darken-3"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            color="blue darken-3"
            v-model="patientModel.date"
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
          :return-value.sync="patientModel.time"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
          color="blue darken-3"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="patientModel.time"
              label="Visit Time"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-bind="attrs"
              v-on="on"
              color="blue darken-3"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="timepickerMenu"
            v-model="patientModel.time"
            full-width
            color="blue darken-3"
            @click:minute="$refs.timepickerMenu.save(patientModel.time)"
            @change="concatDateTime()"
          ></v-time-picker>
        </v-menu>
      </v-col>
      <v-col class="col-6">
        <v-select
          v-model="patientModel.doctorToAssigned"
          :items="getuserList"
          item-text="firstName"
          item-value="id"
          :error-messages="doctorToAssignedErrors"
          label="Doctor To Assigned"
          required
          color="blue darken-3"
          @change="$v.patientModel.doctorToAssigned.$touch()"
          @blur="$v.patientModel.doctorToAssigned.$touch()"
        ></v-select>
      </v-col>
      <v-col class="col-12">
        <v-textarea
          label="Reason To Visit"
          :error-messages="reasonToVisitErrors"
          color="blue darken-3"
          @change="$v.patientModel.reasonToVisit.$touch()"
          @blur="$v.patientModel.reasonToVisit.$touch()"
          v-model="patientModel.reasonToVisit"
        ></v-textarea>
      </v-col>
      <v-col class="col-12">
        <v-btn class="mr-4" dark color="main_bg_color" @click="submit">
          Submit
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
    patientModel: {
      medicalRecordNo: { required },
      encounterNo: { required },
      socialSecurityNo: { required },
      firstName: { required },
      lastName: { required },
      phone: { required },
      dateOfBirth: { required },
      dateTime: { required },
      visitDateTime: { required },
      reasonToVisit: { required },
      doctorToAssigned: { required },
      gender: { required },
    },
  },

  data: () => ({
    patientModel: {
      medicalRecordNo: "",
      encounterNo: "",
      socialSecurityNo: "",
      firstName: "",
      lastName: "",
      phone: "",
      dateOfBirth: "",
      visitDateTime: "",
      reasonToVisit: "",
      doctorToAssigned: "",
      gender: "",
      date: "",
      time: null,
    },

    timepickerMenu: false,
    datepickerMenu: false,
    datepickerMenu1: false,
  }),

  computed: {
    ...mapGetters(["getuserList", "getPatientById"]),

    medicalRecordNoErrors() {
      const errors = [];
      if (!this.$v.patientModel.medicalRecordNo.$dirty) return errors;
      !this.$v.patientModel.medicalRecordNo.required &&
        errors.push("Medical Record No. is required.");
      return errors;
    },
    encounterNoErrors() {
      const errors = [];
      if (!this.$v.patientModel.encounterNo.$dirty) return errors;
      !this.$v.patientModel.encounterNo.required &&
        errors.push("Encounter No. is required.");
      return errors;
    },
    socialSecurityNoErrors() {
      const errors = [];
      if (!this.$v.patientModel.socialSecurityNo.$dirty) return errors;
      !this.$v.patientModel.socialSecurityNo.required &&
        errors.push("Social Security No. is required.");
      return errors;
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.patientModel.firstName.$dirty) return errors;
      !this.$v.patientModel.firstName.required &&
        errors.push("First Name is required.");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.patientModel.lastName.$dirty) return errors;
      !this.$v.patientModel.lastName.required &&
        errors.push("Last Name is required.");
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.patientModel.phone.$dirty) return errors;
      !this.$v.patientModel.phone.required && errors.push("Phone is required.");
      return errors;
    },
    dateOfBirthErrors() {
      const errors = [];
      if (!this.$v.patientModel.dateOfBirth.$dirty) return errors;
      !this.$v.patientModel.dateOfBirth.required &&
        errors.push("Date Of Birth is required.");
      return errors;
    },
    reasonToVisitErrors() {
      const errors = [];
      if (!this.$v.patientModel.reasonToVisit.$dirty) return errors;
      !this.$v.patientModel.reasonToVisit.required &&
        errors.push("Reason To Visit is required.");
      return errors;
    },
    doctorToAssignedErrors() {
      const errors = [];
      if (!this.$v.patientModel.doctorToAssigned.$dirty) return errors;
      !this.$v.patientModel.doctorToAssigned.required &&
        errors.push("Doctor To Assigned is required.");
      return errors;
    },
    genderErrors() {
      const errors = [];
      if (!this.$v.patientModel.gender.$dirty) return errors;
      !this.$v.patientModel.gender.required &&
        errors.push("Gender is required.");
      return errors;
    },
  },

  methods: {
    concatDateTime() {
      this.patientModel.visitDateTime = "";
      this.patientModel.visitDateTime =
        this.patientModel.date + "T" + this.patientModel.time;
    },

    submit() {
      debugger; // eslint-disable-line no-debugger

      this.$v.$touch();
      if (this.patientModel.id == null) {
        this.$store.dispatch("addPatient", this.patientModel);
      } else {
        // this.$store.dispatch("updateOrder", this.patientModel);
      }
      this.$emit("closeIt");
    },
    clear() {
      this.$v.$reset();
      (this.patientModel = {
        medicalRecordNo: "",
        encounterNo: "",
        socialSecurityNo: "",
        firstName: "",
        lastName: "",
        phone: "",
        dateOfBirth: "",
        visitDateTime: "",
        reasonToVisit: "",
        doctorToAssigned: "",
        gender: "",
        date: "",
        time: null,
      }),
        this.$emit("closeIt");
    },
  },
  mounted() {
    if (this.getPatientById) {
      this.patientModel = this.getPatientById;
    //   this.patientModel.orderDoctorId = this.getOrderById.userId;
    //   this.patientModel.date = this.getOrderById.dateTime.split("T")[0];
    //   this.patientModel.time = this.getOrderById.dateTime.split("T")[1];
    }
  },
  destroyed() {
    // debugger; // eslint-disable-line no-debugger
    this.$store.dispatch("resetPatientState");
  },
};
</script>
