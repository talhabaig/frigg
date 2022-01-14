<template>
  <router-view></router-view>
</template>
<script>
export default {
  destroyed() {
    debugger; // eslint-disable-line no-debugger
    this.$store.dispatch("logOut").then(() => {
      debugger; // eslint-disable-line no-debugger

      this.$router.push({ name: "login" });
    });
  },
};
</script>
<style>
.main_color {
  color: #f8932d !important;
}
.main_bg_color {
  background-color: #f8932d !important;
}
.edit_btn {
  cursor: pointer !important;
  color: #757575 !important;
}
.edit_btn:hover {
  color: #fb8c00 !important;
}
.del_btn {
  cursor: pointer !important;
  color: #757575 !important;
}
.del_btn:hover {
  color: #bf360c !important;
}
</style>
