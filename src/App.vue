<template>
  <div class="container">
    <div class="row">
      <div class="space"></div>
      <app-header></app-header>
      <router-view></router-view>
      <notifications group="main"></notifications>
      <app-footer></app-footer>
      <div class="space"></div>
    </div>
  </div>
</template>

<script>
  import Header from "./components/Header.vue";
  import Footer from "./components/Footer";
  import variables from "./core/variables";

  export default {
    components: {
      appHeader: Header,
      appFooter: Footer
    },
    name: 'app',
    computed : {
      url() {
        return variables.URL;
      }
    },
    created() {
      this.$store.dispatch('initGames');
      this.$store.dispatch('tryAutoLogin');
    },
  }
</script>

<style>
  @import "./assets/css/bootstrap.css";
  @import "./assets/css/varadero.css";
  @import "./assets/css/animate.css";


  .vue-notification-group{
    top:20px !important;
  }
</style>
