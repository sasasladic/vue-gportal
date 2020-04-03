<template>
  <div>
    <div class="contact-us">
      <div class="col-md-6 col-md-offset-4">
        <div v-if="checkFormAndMessage()" class="contact-text"><span class="bold">Reset your password</span> </div>
        <div v-if="showForm">
          <form @submit.prevent="submitMail">
            <div class="row">
              <div class="col-md-8">
                <p>Enter your user account's verified email address and we will send you a password reset link.</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <input v-model="email" placeholder="Enter your email address" type="email"  data-msg-required="Please enter your email address." data-msg-email="Please enter a valid email address." maxlength="100" class="form-control" name="email" id="email">
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <input type="submit" value="Send password reset email" class="btn btn-primary btn-block pass-reset">
              </div>
            </div>
          </form>
        </div>
        <div class="row" v-if="showMessage">
          <div class="col-md-8">
            <p>Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.</p>
          </div>
        </div>
        <div v-if="!checkFormAndMessage()">
          <div class="contact-text"><span class="bold">Change your password</span> </div>
          <form @submit.prevent="changePassword">
            <div class="row">
              <div class="col-md-6">
                <label>Password</label>
                <input v-model="password" type="password"  maxlength="100" class="form-control" name="password">
              </div>
            </div>
            <div class="row password_confirmation">
              <div class="col-md-6">
                <label>Password confirmation</label>
                <input v-model="password_confirmation" type="password"  maxlength="100" class="form-control" name="password_confirmation">
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <input type="submit" value="Change password" class="btn btn-primary btn-block pass-reset">
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import router from "../../core/routes";

    export default {
      data() {
        return {
          showForm: true,
          showMessage: false,
          password: '',
          password_confirmation: '',
          email: '',
          token: null
        }
      },
      created() {
        if(this.$route.params.token) {
          this.showForm = false;
          this.token = this.$route.params.token;
        }
      },
      methods: {
        checkFormAndMessage() {
          return this.showForm || this.showMessage;
        },
        submitMail () {
          this.$store.commit('loading');

          let form = new Form({
            email: this.email
          });
          form.post('password/email').then(res =>{
              this.$store.commit('loading');

              this.showForm = false;
              this.showMessage = true;
              localStorage.setItem('reset_email', this.email);
          }).catch(error =>{
            this.$store.commit('loading');

            let content = {
              title: 'Reset password',
              type: 'error'
            };
            this.$notification.showNotification({content} , {error: error.errors});
          });
        },
        changePassword() {
          this.$store.commit('loading');

          let form = new Form({
            email: localStorage.getItem('reset_email'),
            token: this.token,
            password: this.password,
            password_confirmation: this.password_confirmation,
          });

          let content = {
            title : 'Reset password'
          };
          form.post('password/reset').then(res =>{
            this.$store.commit('loading');

            content.type = 'success';
            content.text = res.message;
            this.$notification.showNotification({content});

            router.push({ name: "home"});
          }).catch(error =>{
            this.$store.commit('loading');

            content.type='error';
            if(error.errors) {
              this.$notification.showNotification({content} , {error: error.errors});
            }else{
              content.text = error.message;
              this.$notification.showNotification({content});
            }
          });
        },
      },

      name: "ForgotPassword",
    }
</script>

<style scoped>
  .contact-text{
    margin-bottom: 30px;
  }
  .pass-reset{
    margin-top: 20px;
  }
  .password_confirmation{
    margin-top: 10px;
  }
</style>
