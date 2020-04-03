<template>
    <div class="dblock modal" id="login" role="dialog">
        <div class="login-box">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" @click="$emit('close')">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">Login</h4>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="onSubmit">
                        <div class="form-group">
                            <input type="email" class="form-control" placeholder="E-mail" id="email"
                                   v-model="email">
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" placeholder="******"  id="password"
                                   v-model="password">
                        </div>
                        <div class="form-group">
                            <div class="pull-left">
                              <p @click="$emit('close')">
                                <router-link to="/password_reset">Forgot password?</router-link>
                              </p>
                            </div>
                            <div class="pull-right">
                                <button type="submit" class="btn btn-blue">Login</button>
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
        name: "Login",
        data () {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            onSubmit () {
              const formData = {
                email: this.email,
                password: this.password,
              };

              this.$store.dispatch('login', formData);

              this.$emit('close')
            }
        }
    }
</script>

<style scoped>
    .dblock{
        display: block;
    }
  .login-box{
    width: 339px;
  }
</style>
