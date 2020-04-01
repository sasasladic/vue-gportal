<template>
  <div class="col-md-3">
    <div class="panel panel-success">
      <div class="panel-header">
        <div class="price">
          <img :src="url + game.image" class="image">
          <div class="overlay">
            <a href="#"><div class="text"><i class="fa fa-shopping-bag"></i> Order now</div></a>
          </div>
        </div>
      </div>
      <div class="panel-body">
        <h1>{{ game.name }}</h1>
        <p>${{ game.sloth_per_month }}/slot per month</p>
      </div>
    </div>
  </div>
</template>

<script>
  import variables from "../../core/variables";
    export default {
      props: [
        'game'
      ],
      data() {
        return {
          url : variables.URL
        }
      },
      name: "Game"
    }
</script>

<style scoped>

</style>
