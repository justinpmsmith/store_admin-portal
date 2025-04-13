<template>
  <br />
  <div>
    <navbar></navbar>

    <div>
      <div class="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
        <div class="tm-bg-primary-dark tm-block tm-block-h-auto">
          <div>
            <div class="col-12 d-flex justify-content-center">
              <h2 class="tm-block-title d-inline-block">View Sold Product</h2>
            </div>
          </div>
          <div class="row tm-edit-product-row d-flex justify-content-center">
            <div class="col-xl-6 col-lg-6 col-md-12" v-if="product">
              <div class="tm-edit-product-form">
                <!-- Customer Information Section -->
                <h4 class="text-white mb-4">Customer Information</h4>
                <div class="form-group mb-3">
                  <label for="customerName">Customer Name</label>
                  <input
                    id="customerName"
                    type="text"
                    class="form-control"
                    v-model="product.customerName"
                    disabled
                  />
                </div>
                <div class="form-group mb-3">
                  <label for="customerEmail">Customer Email</label>
                  <input
                    id="customerEmail"
                    type="email"
                    class="form-control"
                    v-model="product.customerEmail"
                    disabled
                  />
                </div>
                <div class="form-group mb-3">
                  <label for="customerAddress">Customer Address</label>
                  <input
                    id="customerAddress"
                    type="text"
                    class="form-control"
                    v-model="product.customerAddress"
                    disabled
                  />
                </div>
                <div class="form-group mb-3">
                  <label for="dateSold">Date Sold</label>
                  <input
                    id="dateSold"
                    type="text"
                    class="form-control"
                    v-model="formattedDate"
                    disabled
                  />
                </div>

                <!-- Product Information Section -->
                <h4 class="text-white mb-4 mt-5">Product Information</h4>
                <div class="form-group mb-3">
                  <label for="name">Product Name</label>
                  <input
                    id="name"
                    type="text"
                    class="form-control"
                    v-model="product.name"
                    disabled
                  />
                </div>
                <div class="form-group mb-3">
                  <label for="prodCode">Product Code</label>
                  <input
                    id="prodCode"
                    type="text"
                    class="form-control"
                    v-model="product.prodCode"
                    disabled
                  />
                </div>
                <div class="form-group mb-3">
                  <label for="category">Category</label>
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    v-model="product.category"
                    disabled
                  />
                </div>
                <div class="form-group mb-3">
                  <label for="price">Price</label>
                  <input
                    id="price"
                    type="text"
                    class="form-control"
                    :value="`$${parseFloat(product.price).toFixed(2)}`"
                    disabled
                  />
                </div>
                <div class="form-group mb-3">
                  <label for="description">Description</label>
                  <textarea
                    id="description"
                    class="form-control"
                    rows="3"
                    v-model="description"
                    disabled
                  ></textarea>
                </div>
                
                <!-- Product Image Section -->
                <div class="col-md-12 mx-auto mb-4" v-if="productImage">
                  <label>Product Image</label>
                  <div class="tm-product-img-display mx-auto mt-3">
                    <img
                      :src="productImage"
                      alt="Product Image"
                      class="img-fluid img-thumbnail mx-auto"
                    />
                  </div>
                </div>
                
                <div class="col-12 mt-4">
                  <button
                    class="btn btn-primary btn-block text-uppercase"
                    @click="goBack"
                  >
                    Back to Sold Products
                  </button>
                </div>
              </div>
            </div>
            <div v-else class="col-12 text-center text-white">
              <p>Loading product information...</p>
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
      productId: null,
      product: null,
      description: "",
      productImage: null
    };
  },
  computed: {
    formattedDate() {
      if (!this.product || !this.product.dateSold) return "";
      const date = new Date(this.product.dateSold);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  },
  async mounted() {
    this.session = useSessionStore();
    this.productId = this.$route.query.id;
    await this.fetchSoldProduct();
  },
  methods: {
    async fetchSoldProduct() {
      try {
        const response = await Product.getSoldProductById(this.productId);
        if (response && response.meta.success) {
          this.product = response.data;
          
          if (this.product) {
            // Parse the info JSON string to get description
            try {
              const info = JSON.parse(this.product.info);
              this.description = info.description || "";
            } catch (error) {
              console.error("Error parsing product info:", error);
              this.description = "";
            }
            
            // Parse the photos JSON string to get the first image
            try {
              if (this.product.photos) {
                const photos = JSON.parse(this.product.photos);
                if (Array.isArray(photos) && photos.length > 0) {
                  this.productImage = photos[0];
                }
              }
            } catch (error) {
              console.error("Error parsing product photos:", error);
              this.productImage = null;
            }
          } else {
            toast.error("Product not found", { 
              autoClose: 3000, 
              hideProgressBar: true 
            });
            setTimeout(() => {
              this.goBack();
            }, 3000);
          }
        } else {
          toast.error("Failed to load product details", { 
            autoClose: 3000, 
            hideProgressBar: true 
          });
        }
      } catch (error) {
        console.error("Error fetching sold product:", error);
        toast.error("Error loading product details", { 
          autoClose: 3000, 
          hideProgressBar: true 
        });
      }
    },
    goBack() {
      this.$router.push("/admin/soldProducts");
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
input:disabled, textarea:disabled {
  background-color: #2d3748 !important;  /* Dark background */
  color: #cbd5e0 !important;             /* Light gray text */
  opacity: 0.8;                          /* Slight opacity to indicate disabled state */
  cursor: not-allowed;                   /* Show not-allowed cursor */
  border-color: #4a5568 !important;      /* Darker border */
}

.tm-product-img-display {
  height: auto;
  width: 100%;
  max-height: 300px;
  padding: 1rem;
  margin-top: 1rem;
  background-color: #292e3a;
  border-radius: 0.5rem;
  text-align: center;
}
</style>