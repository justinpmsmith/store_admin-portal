<template>
  <br />
  <div>
    <div>
      <div class="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
        <div class="tm-bg-primary-dark tm-block tm-block-h-auto">
          <div>
            <div class="col-12 d-flex justify-content-center">
              <h2 class="tm-block-title d-inline-block">Add Category</h2>
            </div>
          </div>
          <div class="row tm-edit-product-row d-flex justify-content-center">
            <div class="col-xl-6 col-lg-6 col-md-12">
              <form @submit.prevent="addCategory" class="tm-edit-product-form">
                <div class="form-group mb-3">
                  <label for="name">Category Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    class="form-control validate"
                    v-model="categoryName"
                    required
                  />
                </div>

                <div class="col-md-12 mx-auto mb-4">
                  <div
                    class="tm-product-img-dummy mx-auto"
                    v-if="!categoryImage"
                    ref="dummyImage"
                  >
                    <i
                      class="fas fa-cloud-upload-alt tm-upload-icon"
                      onclick="document.getElementById('fileInput').click();"
                    ></i>
                  </div>
                  <div class="tm-product-img-dummy mx-auto" v-else>
                    <img
                      :src="categoryImage"
                      alt="Selected Image"
                      class="img-fluid"
                      :style="{ height: dummyImageHeight + 'px' }"
                    />
                  </div>
                  <div class="custom-file mt-3 mb-3">
                    <input
                      id="fileInput"
                      type="file"
                      style="display: none"
                      @change="onFileChange"
                    />
                    <!-- <input
                      type="button"
                      class="btn btn-primary btn-block mx-auto"
                      value="UPLOAD CATEGORY IMAGE"
                      onclick="document.getElementById('fileInput').click();"
                    /> -->
                    <!-- <v-btn onclick="document.getElementById('fileInput').click();"> Delete Previous image </v-btn>
                    <br>
                    <br> -->
                    <v-btn onclick="document.getElementById('fileInput').click();"> UPLOAD CATEGORY IMAGE  </v-btn>
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
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import Product from "@/services/server/product";


export default {
  name: "IndexPage",
  components: {
    navbar,
  },
  data() {
    return {
      session: null,
      categoryName: "",
      categoryImage: null,
      dummyImageHeight: 0,
    };
  },
  mounted() {
    this.session = useSessionStore();
    this.dummyImageHeight = this.$refs.dummyImage.clientHeight;
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.categoryImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    async addCategory() {
      console.log("adding category");
      console.log("Category Name: " + this.categoryName);
      console.log("Category Image: " + this.categoryImage);

      let data = {
        name: this.categoryName,
        photo: this.categoryImage,
      }

      let response = await Product.addCtegory(data);

      if(response != null && response.meta.success){
        toast.success("Category Added", { autoClose: 3000, hideProgressBar: true });
        this.$router.back();
        return;
      }
      toast.error("There was an error adding category", { autoClose: 3000, hideProgressBar: true });

    },
  },
};
</script>

<style scoped>
#footer {
  position: fixed;
  bottom: 0;
}
.cat-image {
  height: 300px; /* Set your desired height here */
  width: auto;
  object-fit: contain;
}

.img-thumbnail {
  max-width: 100%;
  max-height: 300px; /* Adjust this value as needed */
  object-fit: contain;
}
</style>
