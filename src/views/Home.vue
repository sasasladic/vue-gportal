<template>
  <div>
    <vue-agile :dots="false" :nav-buttons="false" :autoplay-speed="5000" :speed="2500" fade="fade" autoplay="autoplay">
<!--      <img v-for="(game, index) in games" :key="index" class="slide" :src="url + game.image"/>-->
      <img src="../assets/images/slider-img-1.png"/>
      <img src="../assets/images/slider-img-2.png"/>
      <img src="../assets/images/slider-img-3.png"/>
    </vue-agile>
        <div class="offers">
          <div class="col-md-9">
            <h1>We have a great range of awesome game servers available within minutes!</h1>
            <p>Powered by Intel Xeon E5 and Intel Core i7 6700k with Solid State technology</p>
          </div>
          <div class="col-md-3">
            <router-link to="/game/all" class="btn btn-hero btn-lg"><i class="fa fa-gamepad"></i> View Games</router-link>
          </div>
        </div>

    <list></list>

    <div class="row">
      <div class="maps">
        <div class="col-md-3">
          <div class="all-loc">
            <p class="location"><img src="../assets/images/US.png">Los Angeles , California <span class="red"> 50 ping</span></p>
            <p class="location"><img src="../assets/images/DE.png">Frankfurt , Germany <span class="yellow"> 35 ping</span></p>
            <p class="location"><img src="../assets/images/RS.png">Belgrade , Serbia <span class="green"> 20 ping</span></p>
          </div>
        </div>
        <div class="col-md-6">
          <img src="../assets/images/map.png" class="map">
          <a class="dallas" data-toggle="tooltip" title="Los Angeles , California"></a>
          <a class="belgrade" data-toggle="tooltip" title="Serbia , Belgrade"></a>
          <a class="moscow" data-toggle="tooltip" title="Frankfurt , Germany"></a>
        </div>
        <div class="col-md-3">
          <img src="../assets/images/decoration.png" class="hidden-xs" style="float: right;margin-top:20px;">
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import {VueAgile} from 'vue-agile';
  import GamesList from "../components/game/GamesList.vue";
  import variables from "../core/variables";

  export default {
    components: {
      VueAgile,
      list: GamesList
    },
    data() {
      return {
        url : variables.URL
      }
    },
    computed: {
      games() {
        return (this.$route.path === '/') ?
          this.$store.getters.allGames.slice(0, 4) : this.$store.getters.allGames;
      }
    },
    name: "Home",
  }
</script>

<style>

</style>
