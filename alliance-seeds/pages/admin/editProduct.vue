<template>
  <br />
  <div>
    <navbar></navbar>

    <div>
      <div class="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
        <div class="tm-bg-primary-dark tm-block tm-block-h-auto">
          <div>
            <div class="col-12 d-flex justify-content-center">
              <h2 class="tm-block-title d-inline-block">Edit Product</h2>
            </div>
          </div>
          <div class="row tm-edit-product-row d-flex justify-content-center">
            <div class="col-xl-6 col-lg-6 col-md-12">
              <form @submit.prevent="updateProduct" class="tm-edit-product-form">
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
                      disabled
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
                <!-- Document Upload Section -->
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
                    Update Product
                  </button>
                  <button
                    class="btn btn-danger btn-block text-uppercase mt-4"
                    @click.prevent="deleteProduct"
                  >
                    Delete Product
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
      prodCode: "",
      product: null,
      productName: "",
      categoryNames: [],
      description: "",
      quantity: 1,
      images: [],
      category: "",
      price: 0,
      document: null,
      documentName: "",
    };
  },
  async mounted() {
    // toast("Loading Product", { autoClose: 3000});

    this.session = useSessionStore();
    this.prodCode = this.$route.query.prodCode;
    
    // Get category names for dropdown
    let getCategoryNameResp = await Product.getCategoryNames();
    if (getCategoryNameResp != null) {
      this.categoryNames = getCategoryNameResp.data;
    }

    // Get product details

    let getProductResp = await Product.getProductByProdCode(this.prodCode);
    if (getProductResp != null && getProductResp.meta.success) {
      this.product = getProductResp.data;
      // Populate form fields with product data
      this.productName = this.product.name;
      this.category = this.product.category;
      
      // Parse the info JSON string to get description
      const info = JSON.parse(this.product.info);
      this.description = info.description;
      
      // Parse the photos JSON string
      this.images = JSON.parse(this.product.photos);
      
      // Parse the document JSON string
      if (this.product.document) {
        const docData = JSON.parse(this.product.document);
        this.document = docData.content;
        this.documentName = docData.name;
      }
      
      this.quantity = this.product.quantity;
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
    onImageChange(event) {
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
    async updateProduct() {
      let data = {
        name: this.productName,
        prodCode: this.prodCode,
        category: this.category,
        info: JSON.stringify({description: this.description}),
        photos: JSON.stringify(this.images),
        quantity: this.quantity,
        document: JSON.stringify({name: this.documentName, content: this.document}),
      };

      let response = await Product.updateProduct(data);

      if(response != null && response.meta.success) {
        toast.success("Product Updated", { autoClose: 3000, hideProgressBar: true });
        setTimeout(() => {
          this.$router.replace("/admin/products");
        }, 3000);
        return;
      }

      if(response != null) {
        toast.error(response.meta.message, { autoClose: 3000, hideProgressBar: true });
        return;
      }
      toast.error("There was an error updating product", { autoClose: 3000, hideProgressBar: true });
    },
    async deleteProduct() {
      let response = await Product.deleteProductByProdCode(this.prodCode);

      if(response != null && response.meta.success) {
        toast.success("Product Deleted", { autoClose: 3000, hideProgressBar: true });
        setTimeout(() => {
          this.$router.replace("/admin/products");
        }, 3000);
        return;
      }
      toast.error("There was an error deleting product", { autoClose: 3000, hideProgressBar: true });
    }
  }
};
</script>

<style scoped>
#footer {
  position: fixed;
  bottom: 0;
}

.img-thumbnail {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
}

/* Style for disabled input field */
input:disabled {
  background-color: #2d3748 !important;  /* Dark background */
  color: #cbd5e0 !important;             /* Light gray text */
  opacity: 0.8;                          /* Slight opacity to indicate disabled state */
  cursor: not-allowed;                   /* Show not-allowed cursor */
  border-color: #4a5568 !important;      /* Darker border */
}
</style>