<template>
  <div>
  <!-- NAVIGACIJA -->
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link to="/test" class="navbar-brand hidden-xs" rel="home" title="Varadero Hosting" exact>
            <img src="../assets/images/logo.png">
        </router-link>
        <a class="navbar-brand visible-xs" href="#">Varadero Hosting</a>
      </div>
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li :class="[currentPage === '/' ? activeClass : '']">
            <router-link to="/" class="navbar-link" exact>Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li :class="[currentPage.includes('forum') ? activeClass : '']">
            <router-link to="/forum" class="navbar-link" exact>Forum</router-link>
          </li>
          <li :class="[currentPage.includes('game-panel') ? activeClass : '']">
            <router-link to="/game-panel" class="navbar-link" exact><i class="fa fa-cogs"></i> Game panel</router-link>
          </li>
          <li :class="[currentPage.includes('order') ? activeClass : '']">
            <router-link to="/order" class="navbar-link" exact>Order</router-link>
          </li>
          <li :class="[currentPage.includes('contact-us') ? activeClass : '']">
            <router-link to="/contact-us" class="navbar-link" exact>Contact us</router-link>
          </li>
          <li style="display: none">
            <router-link to="/verified" class="navbar-link" exact>Contact us</router-link>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <template v-if="!auth">
            <li>
              <login v-if="showLogin" @close="showLogin = false"></login>
              <a href="#" @click="showLogin = true">Login</a>
            </li>
            <li>
              <p class="navbar-btn">
                <registration v-if="showRegistration" @close="showRegistration = false"></registration>
                <a href="#" @click="showRegistration = true" class="btn btn-blue">
                  <i class="fa fa-key"></i> Registration
                </a>
              </p>
            </li>
          </template>
              <li v-if="auth" class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{user.username}} <span class="caret"></span></a>
                <ul class="dropdown-menu">
                  <li><a href="#">Profile</a></li>
                  <li><a href="#">Ordered</a></li>
                  <li><a href="#">Settings</a></li>
                  <li><a @click="logout">Logout</a></li>
                </ul>
              </li>
        </ul>
      </div>
    </div>
  </nav>
  <div :class="{'modal-backdrop':showLogin, 'in': showLogin }"></div>
  <div :class="{'modal-backdrop':showRegistration, 'in': showRegistration }"></div>

  <!--      <ul v-if="isPanel" class="subnav">-->
<!--        <li><a class="active" href="gp-home.html">Vesti</a></li>-->
<!--        <li><a href="gp-servers.html">Serveri</a></li>-->
<!--        <li><a href="gp-billing.html">Plaćanja</a></li>-->
<!--        <li><a href="gp-support.html">Podrška</a></li>-->
<!--        <li><a href="gp-config.html">Podešavanja</a></li>-->
<!--        <li><a href="gp-logs.html">IP Logs</a></li>-->
<!--      </ul>-->
  </div>
</template>

<script>
  import Login from "./modals/Login";
  import Registration from "./modals/Registration.vue";
  import {mapGetters} from "vuex";
  export default {
    components: {
      login: Login,
      registration: Registration,
    },
    data() {
      return {
        activeClass: 'active',
        showLogin: false,
        showRegistration: false,
      }
    },
    computed: {
      ...mapGetters({
          auth: 'isAuthenticated',
          user: 'user'
        }
      ),
      currentPage() {
        return this.$route.path;
      },
    },
    methods: {
      logout() {
        this.$store.dispatch('logout');
        this.$notify({
          group: 'main',
          title: 'Login',
          text: 'You have successfully logged out!',
          duration: 3000,
          speed: 1000
        })
      },

    }
  }
</script>

<style>
  .active{
    color: #fff;
    background-color: #599ce9;
  }
</style>
