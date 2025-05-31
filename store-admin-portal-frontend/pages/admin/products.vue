<template>
  <!-- <product-navbar 
    :categories="categoryNames"
    :onCategorySelected="setCategory"
  /> -->
  <product-Navbar
    :categories="categoryNames"
    :onCategorySelected="setCategory"
  ></product-Navbar>

  <div class="container mt-5">
    <div class="row tm-content-row">
      <div class="col-sm-12 col-md-12 col-lg-8 col-xl-8 tm-block-col">
        <div class="tm-bg-primary-dark tm-block tm-block-products">
          <!-- tm-block-products -->
          <h2 class="tm-block-title">{{ currentCategory }}</h2>
          
          <!-- Loading indicator -->
          <div v-if="loadingProducts" class="text-center mb-3">
            <div class="spinner-border text-light" role="status">
              <span class="sr-only">Loading products...</span>
            </div>
            <p class="text-light mt-2">Loading products...</p>
          </div>

          <!-- No products message -->
          <div v-if="products.length === 0 && !loadingProducts" class="text-center mb-3">
            <p class="text-light">No products found for this category.</p>
          </div>

          <div class="tm-product-table-container">
            <table class="table tm-table-small tm-product-table">
              <thead>
                <tr>
                  <th scope="col">&nbsp;</th>
                  <th scope="col">PRODUCT NAME</th>
                  <th scope="col">Product Code</th>
                  <th scope="col">Category</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">&nbsp;</th>
                  <!-- <th scope="col">&nbsp;</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in products" :key="product.prodCode">
                  <th scope="row">
                    <input
                      type="checkbox"
                      @change="toggleProductSelection(product.prodCode, $event)"
                    />
                  </th>
                  <td class="tm-product-name">{{ product.name }}</td>
                  <td>{{ product.prodCode }}</td>
                  <td>{{ product.category }}</td>
                  <td>{{ product.quantity }}</td>
                  <td>
                    <a
                      :href="`/admin/editProduct?prodCode=${product.prodCode}`"
                    >
                      <Icon
                        name="teenyicons:edit-circle-outline"
                        mode="svg"
                        style="color: white"
                        size="2rem"
                      />
                    </a>
                  </td>
                  <!-- <td>
                    <a href="#" class="tm-product-delete-link">
                      <i class="far fa-trash-alt tm-product-delete-icon"></i>
                    </a>
                  </td> -->
                </tr>
              </tbody>
            </table>
          </div>
          <!-- table container -->
          <a
            href="/admin/addProduct"
            class="btn btn-primary btn-block text-uppercase mb-3"
            >Add new product</a
          >
          <button
            v-if="selectedProdCodes.length > 0"
            class="btn btn-danger btn-block text-uppercase"
            @click="deleteSelectedProducts"
          >
            Delete selected products
          </button>
        </div>
      </div>
      <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 tm-block-col">
        <div class="tm-bg-primary-dark tm-block tm-block-products">
          <h2 class="tm-block-title">Product Categories</h2>
          <div class="tm-product-table-container">
            <table class="table table-hover tm-table-small tm-product-table">
              <tbody>
                <tr v-for="category in categoryNames">
                  <td class="tm-product-name" @click="setCategory(category)">
                    {{ category }}
                  </td>
                  <td></td>
                  <td>
                    <a :href="`/admin/editCategory?category=${category}`">
                      <Icon
                        name="teenyicons:edit-circle-outline"
                        mode="svg"
                        style="color: white"
                        size="2rem"
                      />
                    </a>
                  </td>
                  <!-- <td class="text-center">
                    <a href="#" class="tm-product-delete-link">
                      <i class="far fa-trash-alt tm-product-delete-icon"></i>
                    </a>
                  </td> -->
                </tr>
              </tbody>
            </table>
          </div>
          <!-- table container -->
          <a
            href="addCategory"
            class="btn btn-primary btn-block text-uppercase mb-3"
            >Add Category</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useSessionStore from "~/stores/session";
import Product from "~/services/server/product";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import ProductNavbar from "~/components/admin/productNavbar.vue";

export default {
  name: "IndexPage",
  head() {
    return {
      title: "Admin - products",
    };
  },
  components: {
    ProductNavbar,
  },
  data() {
    return {
      session: null,
      products: [],
      categoryNames: [],
      selectedProdCodes: [],
      currentCategory: "",
      loadingProducts: false,
    };
  },
  async mounted() {
    this.session = useSessionStore();
    await this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        this.loadingProducts = true;
        this.products = []; // Clear existing products
        this.selectedProdCodes = []; // Clear selected products when switching categories

        // Get categories and sort them alphabetically
        let getCategoryNameResp = await Product.getCategoryNames();
        if (getCategoryNameResp != null) {
          this.categoryNames = getCategoryNameResp.data.sort();
          
          // Set initial category based on last selected or first in list
          if (!this.currentCategory && this.categoryNames.length > 0) {
            const lastSelectedCategory = this.session.lastSelectedCategory;
            
            // Check if the last selected category still exists in the current category list
            if (lastSelectedCategory && this.categoryNames.includes(lastSelectedCategory)) {
              this.currentCategory = lastSelectedCategory;
            } else {
              // Fall back to first category if no valid last selected category
              this.currentCategory = this.categoryNames[0];
            }
          }
        }

        // Load products for the current category using lazy loading
        if (this.currentCategory) {
          await this.loadProductsByCategory(this.currentCategory);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Error loading products", {
          autoClose: 3000,
          hideProgressBar: true,
        });
      } finally {
        this.loadingProducts = false;
      }
    },

    async loadProductsByCategory(category) {
      try {
        // Step 1: Get all product codes for the category
        const prodCodesResponse = await Product.getProdCodesByCategory(category);

        if (
          !prodCodesResponse ||
          !prodCodesResponse.data ||
          !prodCodesResponse.data.length
        ) {
          console.log("No product codes found for this category.");
          return;
        }

        const prodCodes = prodCodesResponse.data;
        console.log(
          `Found ${prodCodes.length} products in category. Loading them individually...`
        );

        // Step 2: For each product code, fetch the product and add it to the list
        for (let i = 0; i < prodCodes.length; i++) {
          const prodCode = prodCodes[i];
          try {
            const productResponse = await Product.getProductByProdCode(prodCode);

            if (productResponse && productResponse.data) {
              const product = productResponse.data;
              
              // Add to products array (this will update the UI as each product comes in)
              this.products.push(product);

              console.log(
                `Loaded product ${i + 1}/${prodCodes.length}: ${prodCode}`
              );
            }
          } catch (productError) {
            console.error(`Error loading product ${prodCode}:`, productError);
            // Continue with next product even if this one fails
          }
        }

        console.log(`Completed loading ${this.products.length} products.`);
      } catch (error) {
        console.error("Error loading product codes:", error);
        toast.error("Error loading product codes", {
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    },

    toggleProductSelection(prodCode, event) {
      if (event.target.checked) {
        this.selectedProdCodes.push(prodCode);
      } else {
        this.selectedProdCodes = this.selectedProdCodes.filter(
          (code) => code !== prodCode
        );
      }
      console.log("Selected Products: ", this.selectedProdCodes);
    },

    async deleteSelectedProducts() {
      // TODO:loading spinner
      if (this.selectedProdCodes.length == 0) {
        return;
      }

      let prodCodeToDelete;
      while (this.selectedProdCodes.length > 0) {
        prodCodeToDelete = this.selectedProdCodes.pop();
        // delete product
        var deleteResp = await Product.deleteProductByProdCode(
          prodCodeToDelete
        );
        if (deleteResp == null) {
          toast.error("Network Error", {
            autoClose: 3000,
            hideProgressBar: true,
          });
          break;
        }
        if (!deleteResp.meta.success) {
          toast.warning("There was an issue deleting these products", {
            autoClose: 3000,
            hideProgressBar: true,
          });
        }
        toast.success("product deleted", {
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
      console.log("num selected products: ", this.selectedProdCodes.length);
      await this.fetchProducts();
    },

    async setCategory(category) {
      console.log("selected category: ", category);
      this.currentCategory = category;
      
      // Save the selected category to session store
      this.session.setLastSelectedCategory(category);
      
      await this.fetchProducts();
    },

    async editCategory(category) {
      console.log("edit: " + category);
      this.$router.push("/admin");
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