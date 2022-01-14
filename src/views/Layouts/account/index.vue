<template>
  <v-app id="inspire">
    <v-main>
      <!-- <div class="father"> 
            <div class="child">
              <div>
               <img
                  src="../../../assets/logos/Frigg_Logo_F_Tekst_Vertikal_gul.png"
                  class="my-5"
                  alt="Symphony"
                  width="auto"
                  height="130px"
                /> 
                <router-view />
              </div>
            </div>
          </div> -->
      <v-row class="ma-0" style="min-height: 100% !important">
        <v-col class="col-4 pa-0">
          <div class="father">
            <div class="child">
              <div>
                <img
                  src="../../../assets/logos/Frigg_Logo_F_Tekst_Vertikal_gul.png"
                  class="my-10"
                  alt="Symphony"
                  width="auto"
                  height="130px"
                />
                <router-view />
              </div>
            </div>
          </div>
        </v-col>
        <v-col class="col-8 pa-0">
          <img
            src="../../../assets/banner/frigg.jpg"
            class="banner"
            alt="Symphony"
          />
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data: () => ({}),
};
</script>
<style>
.banner {
  min-width: 100% !important;
  min-height: 100% !important;
}
.father {
  position: relative;
  text-align: center;
}

.child {
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
