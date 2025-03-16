<template>
  <br />
  <div>
    <navbar></navbar>
    <div>
      <div class="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
        <div class="tm-bg-primary-dark tm-block tm-block-h-auto">
          <div>
            <div class="col-12 d-flex justify-content-center">
              <h2 class="tm-block-title d-inline-block">Add Product</h2>
            </div>
          </div>
          <div class="row tm-edit-product-row d-flex justify-content-center">
            <div class="col-xl-6 col-lg-6 col-md-12">
              <form @submit.prevent="addProduct" class="tm-edit-product-form">
                <div class="form-group mb-3">
                  <label for="name">Product Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    class="form-control validate"
                    v-model="productName"
                    required
                  />
                </div>
                <div class="form-group mb-3">
                  <label for="description">Description</label>
                  <textarea
                    class="form-control validate"
                    rows="3"
                    v-model="description"
                  ></textarea>
                </div>

                <div class="row">
                  <div class="form-group mb-3 col-xs-12 col-sm-6">
                    <label for="category">Category</label>
                    <select
                      class="custom-select tm-select-accounts"
                      id="category"
                      v-model="category"
                    >
                      <option
                        v-for="categoryName in categoryNames"
                        :value="categoryName"
                      >
                        {{ categoryName }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group mb-3 col-xs-12 col-sm-6">
                    <label for="price">Price </label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      class="form-control validate"
                      data-large-mode="true"
                      v-model="price"
                      required
                    />
                  </div>
                  <div class="form-group mb-3 col-xs-12 col-sm-6">
                    <label for="product_code">Product Code </label>
                    <input
                      id="product_code"
                      name="product_code"
                      type="text"
                      class="form-control validate"
                      data-large-mode="true"
                      v-model="prodCode"
                      required
                    />
                  </div>
                  <div class="form-group mb-3 col-xs-12 col-sm-6">
                    <label for="stock">Units In Stock </label>
                    <input
                      id="stock"
                      name="stock"
                      type="number"
                      class="form-control validate"
                      v-model="quantity"
                      required
                    />
                  </div>
                </div>
                <div class="col-md-12 mx-auto mb-4">
                  <div
                    class="tm-product-img-dummy mx-auto mt-3"
                    v-for="image in images"
                  >
                    <img
                      :src="image"
                      alt="Selected Image"
                      class="img-fluid tm-product-img-dummy mx-auto"
                    />
                  </div>
                  <div class="custom-file mt-3 mb-5">
                    <input
                      id="fileInput"
                      type="file"
                      style="display: none"
                      @change="onImageChange"
                    />
                    <v-btn
                      onclick="document.getElementById('fileInput').click();"
                      class="mr-2 mt-2"
                    >
                      {{ uploadImageButtonText }}
                    </v-btn>
                    <v-btn
                      v-if="images.length > 0"
                      class="mr-2 mt-2"
                      @click="removeImage"
                    >
                      Remove image
                    </v-btn>
                  </div>
                </div>
                <!-- New Document Upload Section -->
                <div class="col-md-12 mx-auto mb-4 mt-8">
                  <div v-if="documentName" class="mt-3">
                    
                   
                    <label style="color: aliceblue;"><b> {{ truncatedDocumentName }} </b></label>
                    
                  </div>
                  <div class="custom-file mb-3">
                    <input
                      id="documentInput"
                      type="file"
                      style="display: none"
                      @change="onDocumentChange"
                    />
                    <v-btn
                      onclick="document.getElementById('documentInput').click();"
                      class="mr-2 mt-2"
                    >
                      {{ uploadDocumentButtonText }}
                    </v-btn>
                    <v-btn
                      v-if="document"
                      class="mr-2 mt-2"
                      @click="removeDocument"
                    >
                      Remove Document
                    </v-btn>
                  </div>
                </div>
                <div class="col-12">
                  <button
                    type="submit"
                    class="btn btn-primary btn-block text-uppercase"
                  >
                    Add Product Now
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
  components: {
    navbar,
  },
  data() {
    return {
      session: null,
      productName: "",
      categoryNames: [],
      description: "sss",
      prodCode: "",
      quantity: 1,
      images: [],
      category: "",
      price: 0,
      document: null,
      documentName: "",
    };
  },
  async mounted() {
    this.session = useSessionStore();

    let getCategoryNameResp = await Product.getCategoryNames();
    if (getCategoryNameResp != null) {
      this.categoryNames = getCategoryNameResp.data;
    }
  },
  computed: {
    uploadImageButtonText() {
      if (this.images.length == 0) {
        return "Upload Image";
      }
      return "Upload Another Image";
    },
    uploadDocumentButtonText() {
      return this.document ? "Change Document" : "Upload Document";
    },
    truncatedDocumentName() {
      return this.documentName.length > 20 
        ? this.documentName.substring(0, 20) + '...' 
        : this.documentName;
    }
  },
  methods: {
    async onImageChange(event) {
    await this.test();

      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.images.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    onDocumentChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.documentName = file.name;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.document = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    removeImage() {
      this.images.pop();
    },
    removeDocument() {
      this.document = null;
      this.documentName = "";
    },
    async test(){
      let response = await Product.getSoldProducts();
      console.log("sold items: ", response)
    },
    async addProduct() {
      let data = {
        name: this.productName,
        prodCode: this.prodCode,
        price: this.price,
        category: this.category,
        info: JSON.stringify({description: this.description}),
        photos: JSON.stringify(this.images),
        quantity: this.quantity,
        document: JSON.stringify({name:this.documentName, content: this.document}),
      }

      console.log("data", data);

      let response = await Product.addProduct(data);

      if(response != null && response.meta.success){
        toast.success("Product Added", { autoClose: 3000, hideProgressBar: true });
        setTimeout(()=>{this.$router.replace("/admin/products");}, 3000);
        return;
      }

      if(response != null){
        console.error()
        toast.error(response.meta.message, { autoClose: 3000, hideProgressBar: true });
        return;
      }
      toast.error("There was an error adding product", { autoClose: 3000, hideProgressBar: true });
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