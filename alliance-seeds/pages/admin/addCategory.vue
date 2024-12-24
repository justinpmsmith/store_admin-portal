<template>
    <br>
  <div >
    <div >
      <div class="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
        <div class="tm-bg-primary-dark tm-block tm-block-h-auto ">
          <div  >
            <div class="col-12 d-flex justify-content-center">
              <h2 class="tm-block-title d-inline-block">Add Category</h2>
            </div>
          </div>
          <div class="row tm-edit-product-row d-flex justify-content-center" >
            <div class="col-xl-6 col-lg-6 col-md-12">
              <form action="" class="tm-edit-product-form">
                <div class="form-group mb-3">
                  <label for="name">Category Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    class="form-control validate"
                    required
                  />
                </div>

                <div class=" col-md-12 mx-auto mb-4">
                  <div class="tm-product-img-dummy mx-auto">
                    <i
                      class="fas fa-cloud-upload-alt tm-upload-icon"
                      onclick="document.getElementById('fileInput').click();"
                    ></i>
                  </div>
                  <div class="custom-file mt-3 mb-3">
                    <input id="fileInput" type="file" style="display: none" />
                    <input
                      type="button"
                      class="btn btn-primary btn-block mx-auto"
                      value="UPLOAD CATEGORY IMAGE"
                      onclick="document.getElementById('fileInput').click();"
                    />
                  </div>
                </div>
                <div class="col-12">
                  <button
                    type="submit"
                    class="btn btn-primary btn-block text-uppercase"
                  >
                    Add Category Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "~/components/admin/navbar.vue";
import useSessionStore from "~/stores/session";
// import { useHead } from '@vueuse/head';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "IndexPage",
  components: {
    navbar,
  },
  data() {
    return {
      session: null,
    };
  },
  mounted() {
    this.session = useSessionStore();
  },
  methods: {},
};
</script>

<style scoped>
#footer {
  position: fixed;
  bottom: 0;
}
</style>
