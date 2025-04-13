<template>
  <br />
  <div>
    <navbar></navbar>

    <div>
      <div class="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
        <div class="tm-bg-primary-dark tm-block tm-block-h-auto">
          <div>
            <div class="col-12 d-flex justify-content-center">
              <h2 class="tm-block-title d-inline-block">Edit Category</h2>
            </div>
          </div>
          <div class="row tm-edit-product-row d-flex justify-content-center">
            <div class="col-xl-6 col-lg-6 col-md-12">
              <form
                @submit.prevent="updateCategory"
                class="tm-edit-product-form"
              >
                <div class="col-md-12 mx-auto mb-4">
                  <div class="form-group mb-3">
                    <label for="name">Category Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      class="form-control validate"
                      v-model="categoryName"
                      disabled
                    />
                  </div>

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
                    <v-btn
                      class="mt-2 mr-2 mb-2"
                      onclick="document.getElementById('fileInput').click();"
                    >
                      UPLOAD CATEGORY IMAGE
                    </v-btn>
                    <v-btn
                      v-if="categoryImage"
                      class="mt-2 mr-2 mb-2"
                      @click="categoryImage = null"
                    >
                      Remove image
                    </v-btn>
                  </div>
                </div>
                <div class="col-12">
                  <button
                    type="submit"
                    class="btn btn-primary btn-block text-uppercase mt-10"
                  >
                    Update Category
                  </button>
                  <button
                    class="btn btn-danger btn-block text-uppercase mt-4"
                    @click.prevent="deleteCategory"
                  >
                    Delete Category
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
      category: null,
    };
  },
  async mounted() {
    this.session = useSessionStore();
    this.dummyImageHeight = this.$refs.dummyImage.clientHeight;
    this.categoryName = this.$route.query.category;
    let catResp = await Product.getCategoryByName(this.categoryName);

    if (catResp != null && catResp.meta.success) {
      this.category = catResp.data;
      this.categoryImage = this.category.photo;

      console.log("Category image", this.categoryImage);
    }
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.categoryImage = e.target.result;
          console.log("chosen image", this.categoryImage);
        };
        reader.readAsDataURL(file);
      }
    },
    async updateCategory() {
      let data = {
        name: this.categoryName,
        photo: this.categoryImage,
      };

      let response = await Product.updateCategory(data);

      if (response != null && response.meta.success) {
        toast.success("Category Updated", {
          autoClose: 3000,
          hideProgressBar: true,
        });
        setTimeout(() => {
          this.$router.replace("/admin/products");
        }, 3000);
        return;
      }
      toast.error("There was an error updating category", {
        autoClose: 3000,
        hideProgressBar: true,
      });
    },

    async deleteCategory() {
      let response = await Product.deleteCategory(this.categoryName);

      if (response != null && response.meta.success) {
        toast.success("Category Deleted", {
          autoClose: 3000,
          hideProgressBar: true,
        });
        setTimeout(() => {
          this.$router.replace("/admin/products");
        }, 3000);
        return;
      } else {
        toast.error("There was an error deleting category", {
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    },
  },
};
</script>

<style>
input:disabled {
  background-color: #2d3748 !important;  /* Dark background */
  color: #cbd5e0 !important;             /* Light gray text */
  opacity: 0.8;                          /* Slight opacity to indicate disabled state */
  cursor: not-allowed;                   /* Show not-allowed cursor */
  border-color: #4a5568 !important;      /* Darker border */
}
</style>
