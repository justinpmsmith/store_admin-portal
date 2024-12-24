<template>
  <navbar></navbar>

  <div class="container mt-5">
    <div class="row tm-content-row">
      <div class="col-sm-12 col-md-12 col-lg-8 col-xl-8 tm-block-col">
        <div class="tm-bg-primary-dark tm-block tm-block-products">
          <div class="tm-product-table-container">
            <table class="table tm-table-small tm-product-table">
              <thead>
                <tr>
                  <th scope="col">&nbsp;</th>
                  <th scope="col">PRODUCT NAME</th>
                  <th scope="col">Product Code</th>
                  <th scope="col">Category</th>
                  <th scope="col">Packaing</th>
                  <th scope="col">&nbsp;</th>
                  <!-- <th scope="col">&nbsp;</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in products" :key="product.prodCode">
                  <th scope="row"><input type="checkbox" @change="toggleProductSelection(product.prodCode, $event)"/></th>
                  <td class="tm-product-name">{{ product.name }}</td>
                  <td>{{ product.prodCode }}</td>
                  <td>{{ product.category }}</td>
                  <td>{{ product.quantity }}</td>
                  <td>
                    <a href="#" >
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
            href="#"
            class="btn btn-primary btn-block text-uppercase mb-3"
            >Add new product</a
          >
          <button class="btn btn-primary btn-block text-uppercase" @click="deleteSelectedProducts">
            Delete selected products
          </button>
        </div>
      </div>
      <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 tm-block-col">
        <div class="tm-bg-primary-dark tm-block tm-block-product-categories">
          <h2 class="tm-block-title">Product Categories</h2>
          <div class="tm-product-table-container">
            <table  class="table table-hover tm-table-small tm-product-table">
              <tbody>
                <tr @click="setCategory('ALL')">
                  <td class="tm-product-name">All</td>
                  <td></td>
                  <td></td>
                  <td></td>

                </tr>

                <tr v-for="category in categoryNames" @click="setCategory(category)">
                  <td class="tm-product-name">{{ category }}</td>
                  <td></td>
                  <td>
                    <a href="#">
                      <Icon
                        name="teenyicons:edit-circle-outline"
                        mode="svg"
                        style="color: white"
                        size="2rem"
                      />
                    </a>
                  </td>
                  <td class="text-center">
                    <a href="#" class="tm-product-delete-link">
                      <i class="far fa-trash-alt tm-product-delete-icon"></i>
                    </a>
                  </td>
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
import navbar from "~/components/admin/navbar.vue";
import useSessionStore from "~/stores/session";
import Product from "~/services/server/product";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "IndexPage",
  head() {
    return {
      title: "Admin - products",
    };
  },
  components: {
    navbar,
  },
  data() {
    return {
      session: null,
      products: [],
      categoryNames: [],
      selectedProdCodes: [],
      currentCategory: "ALL",
    };
  },
  async mounted() {
    this.session = useSessionStore();
    await this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
    // get products 
      let getProductsResp;
      if (this.currentCategory.toUpperCase() == "ALL") {
        getProductsResp = await Product.getAllProducts();
      } else {
        // TODO:get products for selected category
        getProductsResp = await Product.getProductsByCategory(this.currentCategory);
      }

      // get categories 
      let getCategoryNameResp = await Product.getCategoryNames();

      if (getProductsResp != null) {
        this.products = getProductsResp.data;
      }

      if (getCategoryNameResp != null) {
        this.categoryNames = getCategoryNameResp.data;
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

    async deleteSelectedProducts(){
        // TODO:looading spinner 
        if(this.selectedProdCodes.length == 0 ){return}

        let prodCodeToDelete;
        while(this.selectedProdCodes.length > 0){
            prodCodeToDelete = this.selectedProdCodes.pop();
            // delet product 
            var deleteResp = await Product.deleteProductByProdCode(prodCodeToDelete);
            if (deleteResp == null){
                toast.error("Network Error", { autoClose: 3000, hideProgressBar: true });
                break;
            }
            if (!deleteResp.meta.success){
                toast.warning("There was an issue deleting these productsdocker", { autoClose: 3000, hideProgressBar: true });
            }
            toast.success("product deleted", { autoClose: 3000, hideProgressBar: true })
        }
        console.log("num selected products: ", this.selectedProdCodes.length);
        await this.fetchProducts();
    },

    async setCategory(category){
      console.log("selected category: ", category);
      this.currentCategory = category;
      await this.fetchProducts();
    }
  },
};
</script>

<style scoped>
#footer {
  position: fixed;
  bottom: 0;
}
</style>
