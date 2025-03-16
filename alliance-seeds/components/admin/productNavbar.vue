<template>
  <nav class="navbar navbar-expand-xl">
    <div class="container h-100">
      <a class="navbar-brand" href="/admin/products">
        <h1 class="tm-site-title mb-0">Product Admin</h1>
      </a>
      <button
        class="navbar-toggler ml-auto mr-0"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars tm-nav-icon"></i>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mx-auto h-100">
          <!-- <li class="nav-item">
                <a class="nav-link" style="color: white;">
                  <Icon name="ic:outline-question-answer" mode="svg" style="color: white" size="2rem"/>
                   Dashboard
                  <span class="sr-only">(current)</span>
                </a>
              </li> -->
          <!-- <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="far fa-file-alt"></i>
                  <span> Reports <i class="fas fa-angle-down"></i> </span>
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#">Daily Report</a>
                  <a class="dropdown-item" href="#">Weekly Report</a>
                  <a class="dropdown-item" href="#">Yearly Report</a>
                </div>
              </li> -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
            <Icon name="material-symbols:add-2" mode="svg" style="color: white" size="2rem" />
              <span> Add <i class="fas fa-angle-down"></i> </span>
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="/admin/addProduct">Product</a>
              <a class="dropdown-item" href="/admin/addCategory">Category</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/admin/soldProducts" >
                <Icon name="material-symbols:sell" mode="svg" style="color: white" size="2rem" /> Sold Products
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="onCategoryClick('ALL')">
                <Icon name="material-symbols:shopping-cart" mode="svg" style="color: white" size="2rem" /> All
            </a>
          </li>
          <li class="nav-item" v-for="category in categories" :key="category">
            <a class="nav-link" href="#" @click="onCategoryClick(category)">
                <Icon name="material-symbols:shopping-cart" mode="svg" style="color: white" size="2rem" /> {{ category }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true,
      default: () => [],
    },
    onCategorySelected: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    onCategoryClick(category) {
      this.onCategorySelected(category);
    },
  },
};
</script>

<style scoped></style>
