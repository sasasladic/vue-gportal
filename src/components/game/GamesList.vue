<template>
  <div class="games">
    <div class="container">
      <div class="row">
        <div class="space"></div>
        <game v-for="(game, index) in games" :key="index" :game="game"></game>
      </div>
    </div>
  </div>
</template>

<script>
  import Game from "./Game";

  export default {
    components: {
      game: Game
    },
    name: "GamesList",
    computed: {
      games() {
        return (this.$route.path === '/') ?
          this.$store.getters.allGames.slice(0, 4) : this.$store.getters.allGames;
      }
    },
  }
</script>

<style scoped>

</style>
