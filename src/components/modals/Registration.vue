<template>
  <div class="dblock modal" id="register" role="dialog">
    <div class="register-box">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" @click="$emit('close')">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">Registration</h4>
        </div>
        <div class="modal-body">
          <form @submit.prevent="onSubmit">
            <div class="col-md-6">
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Name"
                       v-model="first_name" name="first_name">
              </div>
              <div class="form-group">
                <input type="email" class="form-control" placeholder="E-mail"
                       v-model="email" name="email">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Surname"
                       v-model="last_name" name="last_name">
              </div>
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Username"
                       v-model="username" name="username">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <input type="password" class="form-control" placeholder="Password"
                       v-model="password" name="password">
              </div>
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Country"
                       v-model="country" name="country">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <input type="password" class="form-control" placeholder="Confirm password"
                       v-model="password_confirmation" name="password_confirmation">
              </div>
            </div>
            <div class="col-md-12">
              <div class="pull-right">
                <button type="submit" class="btn btn-blue">Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        country: ''
      }
    },
    methods: {
      onSubmit() {
        const formData = {
          first_name: this.first_name,
          last_name: this.last_name,
          username: this.username,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          country: this.country
        };

        this.$store.dispatch('register',formData);

        this.$emit('close');
      }
    },
    name: "Register",

  }
</script>

<style scoped>
  .dblock{
    display: block;
  }
  .register-box{
    width: 639px;
  }
</style>
