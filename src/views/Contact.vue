<template>
  <div>
    <div class="title-dark">
      <div class="col-md-6 contact-us-header">
        <h1><b>Get help with game portal</b></h1>
      </div>
      <div class="col-md-6">
        <h1 class="contact-us-support">Nsane Gaming Support</h1>
      </div>
    </div>
    <div class="contact-us">
      <div class="col-md-12">
        <div class="col-md-6 contact-text"><b><i class="fa fa-pencil"></i> Contact</b> Us</div>
      </div>
      <div class="col-md-12" v-show="showMessage">
        <div class="col-md-6">
          <div class="alert alert-success" role="alert" v-text="message"></div>
        </div>
      </div>
      <div class="col-md-6">
        <form @submit.prevent="submitContactUs()">
          <div class="row">
            <div class="form-group">
              <div class="col-md-6">
                <label>Your name *</label>
                <input type="text" v-model="form.name" maxlength="100" class="form-control" name="name">
                <span class="text-danger"
                      v-if="form.errors.has('name')"
                      v-text="form.errors.get('name')"></span>
              </div>
              <div class="col-md-6">
                <label>Your email address *</label>
                <input type="email" v-model="form.email" maxlength="100" class="form-control" name="email">
                <span class="text-danger"
                      v-if="form.errors.has('email')"
                      v-text="form.errors.get('email')"></span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="form-group">
              <div class="col-md-12">
                <label>Subject</label>
                <input type="text" v-model="form.subject" maxlength="100" class="form-control" name="subject" id="subject">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="form-group">
              <div class="col-md-12">
                <label>Message *</label>
                <textarea maxlength="5000" v-model="form.content" rows="10" class="form-control" name="message" id="message"></textarea>
                <span class="text-danger"
                      v-if="form.errors.has('content')"
                      v-text="form.errors.get('content')"></span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <input type="submit" value="Send Message" class="contact-btn btn btn-primary btn-lg" data-loading-text="Loading...">
            </div>
          </div>
        </form>
      </div>
      <div class="col-md-6">
        <h4 class="push-top">Get in <strong>touch</strong></h4>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
        <hr/>
        <h4>The <strong>Office</strong></h4>
        <ul class="list-unstyled">
          <li><i class="fa fa-map-marker"></i> <strong>Address:</strong> Knez Mihajlova 23 , Beograd 11000</li>
          <li><i class="fa fa-phone"></i> <strong>Phone:</strong> +381628581404</li>
          <li><i class="fa fa-envelope-o"></i> <strong>E-mail:</strong> radisic00@gmail.com</li>
        </ul>
        <hr/>
        <h4><i class="fa fa-clock-o"></i> Business <strong>Hours</strong></h4>
        <ul class="list-unstyled">
          <li>Monday - Friday 8am to 8pm</li>
          <li>Saturday - Closed</li>
          <li>Sunday - Closed</li>
          <li><br /></li>
          <li><i class="fa fa-life-ring"></i> 24/7 Support available</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: new Form({
          name: '',
          email: '',
          subject: '',
          content: '',
        }),
        message: '',
        showMessage: false,
      }
    },
    methods: {
      submitContactUs() {
        this.$store.commit('loading');

        this.form.post('/contact').then(res => {
          this.$store.commit('loading');
          this.showMessage = true;
          this.message = res.message;
        }).catch(error => {
          this.$store.commit('loading');
        });

      }
    }

  }
</script>

<style>
  .contact-us-header{
    text-align: center;
  }
  .contact-us-support{
    float: right;
  }
</style>
