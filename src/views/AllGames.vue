<template>
    <div>
<!--      <vue-agile :dots="false" :nav-buttons="false" :autoplay-speed="5000" :speed="2500" fade="fade" autoplay="autoplay">-->
<!--        &lt;!&ndash;      <img v-for="(game, index) in games" :key="index" class="slide" :src="url + game.image"/>&ndash;&gt;-->
<!--        <img src="../assets/images/slider-img-1.png"/>-->
<!--        <img src="../assets/images/slider-img-2.png"/>-->
<!--        <img src="../assets/images/slider-img-3.png"/>-->
<!--      </vue-agile>-->
      <list></list>
    </div>
</template>

<script>
  import GamesList from "../components/game/GamesList.vue";
  import {VueAgile} from 'vue-agile'
  export default {
    components: {
      VueAgile,
      list: GamesList
    },
    name: "AllGames"
  }
</script>

<style scoped>

</style>
