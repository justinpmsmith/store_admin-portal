<template>
  <div>
    <navbar></navbar>

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
import navbar from "~/components/admin/navbar.vue";
import CryptoJS from "crypto-js";
import user from "@/services/server/user";
import useSessionStore from "~/stores/session";
// import { useHead } from '@vueuse/head';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// useHead({
//   title: "Admin Login",
//   meta: [
//     { charset: "UTF-8" },
//     { name: "viewport", content: "width=device-width, initial-scale=1.0" },
//     { "http-equiv": "X-UA-Compatible", content: "ie=edge" },
//   ],
// });

export default {
  name: "IndexPage",
  components: {
    navbar,
  },
  data() {
    return {
      username: "",
      password: "",
      session: null,
    };
  },
  mounted() {
    this.session = useSessionStore();
  },
  methods: {
    async authenticate() {
      const passwordHash = CryptoJS.SHA256(this.password).toString(CryptoJS.enc.Hex);
      const auth = { name: this.username, passwordHash };

      const authResponse = await user.authUser(auth);
      console.log("response: ", authResponse);

      if (authResponse == null) {
        toast.error("Network Error", { autoClose: 3000, hideProgressBar: true });
        return;
      }

      if (!authResponse.meta.success) {
        toast.error(authResponse.meta.message, { autoClose: 3000, hideProgressBar: true });
        return;
      }

      const accessToken = authResponse.data;
      this.session.setApiToken(accessToken);
      this.$router.push("/admin/products");
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
