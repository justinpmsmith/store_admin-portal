<template>
  <br />
  <div>
    <navbar></navbar>

    <div class="container mt-5">
      <div class="row tm-content-row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 tm-block-col">
          <div class="tm-bg-primary-dark tm-block tm-block-products">
            <h2 class="tm-block-title">Sold Products</h2>
            <div class="tm-product-table-container">
              <table class="table tm-table-small tm-product-table">
                <thead>
                  <tr>
                    <th scope="col">&nbsp;</th>
                    <th scope="col">CUSTOMER</th>
                    <th scope="col">DATE SOLD</th>
                    <th scope="col">PROD CODE</th>
                    <th scope="col">PRODUCT</th>
                    <th scope="col">CATEGORY</th>
                    <th scope="col">PRICE</th>
                    <th scope="col">ADDRESS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in sortedProducts" :key="product.id">
                    <td>
                    <a
                      :href="`/admin/viewSoldProduct?id=${product.id}`"
                    >
                      <Icon
                        name="material-symbols:visibility-rounded"
                        mode="svg"
                        style="color: white"
                        size="2rem"
                      />
                    </a>
                  </td>
                    <td>{{ product.customerName }}</td>
                    <td>{{ formatDate(product.dateSold) }}</td>
                    <td>{{ product.prodCode }}</td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.category }}</td>
                    <td>${{ product.price.toFixed(2) }}</td>
                    <td>{{ product.customerAddress }}</td>

                  </tr>
                </tbody>
              </table>
            </div>
            <!-- table container -->
          </div>
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
  name: "SoldProductsPage",
  head() {
    return {
      title: "Admin - Sold Products",
    };
  },
  components: {
    navbar,
  },
  data() {
    return {
      session: null,
      soldProducts: [],
    };
  },
  computed: {
    sortedProducts() {
      // Sort by dateSold in descending order (most recent first)
      return [...this.soldProducts].sort((a, b) =>
        new Date(b.dateSold) - new Date(a.dateSold)
      );
    }
  },
  async mounted() {
    this.session = useSessionStore();
    await this.fetchSoldProducts();
  },
  methods: {
    async fetchSoldProducts() {
      try {
        const response = await Product.getSoldProducts();
        if (response && response.meta.success) {
          this.soldProducts = response.data;
        } else {
          toast.error("Failed to load sold products", { 
            autoClose: 3000, 
            hideProgressBar: true 
          });
        }
      } catch (error) {
        console.error("Error fetching sold products:", error);
        toast.error("Error loading sold products", { 
          autoClose: 3000, 
          hideProgressBar: true 
        });
      }
    },
    formatDate(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  },
};
</script>

<style scoped>
#footer {
  position: fixed;
  bottom: 0;
}

.tm-product-table-container {
  max-height: 465px;
  overflow-y: auto;
}

.tm-product-table tr {
  font-weight: 400;
}

.tm-product-name {
  font-weight: 500;
}

.tm-product-delete-icon {
  color: #fff;
  cursor: pointer;
}
</style>