<template>
  <form>
    <v-row>
      <v-col class="col-12">
        <v-text-field
          v-model="roleWithPermissionModel.roleName"
          :error-messages="nameErrors"
          label="Role Name"
          required
          color="blue darken-3"
          @input="$v.roleWithPermissionModel.roleName.$touch()"
          @blur="$v.roleWithPermissionModel.roleName.$touch()"
        ></v-text-field>
      </v-col>
      <v-col class="col-4" v-for="premission in getPermission" :key="premission.id">
        <v-switch
          inset
          color="blue darken-3"
          @change="toggle(premission.id)"
          :name="premission.permissionName"
          :label="`Give access of ${premission.permissionName}`"
        ></v-switch>
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
    roleWithPermissionModel: {
      roleName: { required },
    },
  },

  data: () => ({
    roleWithPermissionModel: {
      roleName: "",
      permissions: [],
    },
  }),

  computed: {
    ...mapGetters(["getPermission", "getRolebyId"]),

    nameErrors() {
      const errors = [];
      if (!this.$v.roleWithPermissionModel.roleName.$dirty) return errors;
      !this.$v.roleWithPermissionModel.roleName.required &&
        errors.push("Role Name is required.");
      return errors;
    },
  },

  destroyed() {
    // debugger; // eslint-disable-line no-debugger
    this.$store.dispatch("resetRoleState");
  },

  methods: {
    toggle(value) {
      if (this.roleWithPermissionModel.permissions.includes(value)) {
        this.roleWithPermissionModel.permissions.splice(
          this.roleWithPermissionModel.permissions.indexOf(value),
          1
        );
      } else {
        this.roleWithPermissionModel.permissions.push(value);
      }
    },
    submit() {
      this.$v.$touch();
      if (this.roleWithPermissionModel.id == null) {
        this.$store.dispatch("addRoleWithPermissions", this.roleWithPermissionModel);
      } else {
        // this.$store.dispatch("updateOrderType", this.roleWithPermissionModel);
      }
      this.$emit("closeIt");
    },
    clear() {
      this.$v.$reset();
      this.roleWithPermissionModel = {
        roleName: "",
        permissions: [],
      };
      this.$emit("closeIt");
    },
  },
  mounted() {
    // debugger; // eslint-disable-line no-debugger
    // if (this.roleWithPermissionModel) {
    //   this.roleWithPermissionModel = this.getOrderTypeById;
    // }
  },
};
</script>
