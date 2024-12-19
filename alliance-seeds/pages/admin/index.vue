<template>
  <div>
    <!-- <navbar></navbar> -->

    <div class="container tm-mt-big tm-mb-big">
      <div class="row">
        <div class="col-12 mx-auto tm-login-col">
          <div class="tm-bg-primary-dark tm-block tm-block-h-auto">
            <div class="row">
              <div class="col-12 text-center">
                <h2 class="tm-block-title mb-4">Admin Portal Login</h2>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-12">
                <form @submit.prevent="authenticate" class="tm-login-form">
                  <div class="form-group">
                    <label for="username">Username</label>
                    <input
                      name="username"
                      type="text"
                      class="form-control validate"
                      id="username"
                      v-model="username"
                      required
                    />
                  </div>
                  <div class="form-group mt-3">
                    <label for="password">Password</label>
                    <input
                      name="password"
                      type="text"
                      class="form-control validate"
                      id="password"
                      v-model="password"
                      required
                    />
                  </div>
                  <div class="form-group mt-4">
                    <button
                      type="submit"
                      class="btn btn-primary btn-block text-uppercase"

                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <footer class="tm-footer row tm-mt-small">
      <div class="col-12 font-weight-light">
        <p class="text-center text-white mb-0 px-4 small">
          Copyright &copy; <b>2020</b> All rights reserved. Design:
          <a
            rel="nofollow noopener"
            href="https://templatemo.com"
            class="tm-footer-link"
            >Template Mo</a
          >
        </p>
      </div>
    </footer> -->
  </div>
</template>

<script>
import navbar from '~/components/admin/navbar.vue';
import CryptoJS from 'crypto-js';
import user from "@/services/server/user";
import { onMounted } from 'vue';
import useSessionStore from "~/stores/session";

export default {
  name: "IndexPage",
  head() {
    return {
      title: "Admin",
    };
  },
  components: {
    navbar,
  },
  data() {
    return {
      username: "",
      password: "",
      session: null, // Placeholder for the store
    };
  },
  mounted() {
    this.session = useSessionStore();
  },
  methods: {
    async authenticate() {
      let passwordHash = CryptoJS.SHA256(this.password).toString(CryptoJS.enc.Hex);

      let auth = {
        name: this.username,
        passwordHash: passwordHash,
      };

      let authResponse = await user.authUser(auth);
      console.log("response: ", authResponse);

      let accessToken = authResponse.data;
      this.session.setApiToken(accessToken);

      let temp = this.session.getApiToken;
      console.log("token: " + temp);
    },
  },

};
</script>


<style scoped>
#footer {
  position: fixed;
  bottom: 0;
}
</style>
