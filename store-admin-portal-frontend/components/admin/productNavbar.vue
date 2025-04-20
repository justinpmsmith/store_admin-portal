
Admin-portal-frontend /
You are an experienced js and frontend developer. I am busy with a nuxt project that uses bootstrap. I have attached one of the components in my project. I would like to amend the layout a bit. at the moment all of the categories are just being displayed directly in the navbar. I would like to have a 'categories' dropdown under which the categories will show, similarly to the 'add' dropdown. the click functionality should still be the same. can you please update this component for me

Edit
I'll help you update your component to show categories in a dropdown menu similar to the "Add" dropdown. Here's how we'll modify your productNavbar.vue component:


Updated productNavbar.vue
Code 
I've updated your productNavbar.vue component to include a Categories dropdown menu instead of displaying all categories directly in the navbar. Here are the key changes made:

Removed the individual category list items from the main navbar
Added a new "Categories" dropdown menu with the shopping cart icon
Moved the "All" option as the first item inside the dropdown menu
Added all categories from the props array as dropdown items
Maintained the same click functionality using the onCategoryClick method
The dropdown follows the same pattern as your existing "Add" dropdown, ensuring consistency in your UI. The click handlers will work the same way as before, just from within the dropdown menu instead.

Is there anything specific you'd like me to adjust about this implementation?







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
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="categoriesDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <Icon name="material-symbols:shopping-cart" mode="svg" style="color: white" size="2rem" />
              <span> Categories <i class="fas fa-angle-down"></i> </span>
            </a>
            <div class="dropdown-menu" aria-labelledby="categoriesDropdown">
              <a class="dropdown-item" href="#" @click="onCategoryClick('ALL')">All</a>
              <a class="dropdown-item" v-for="category in categories" :key="category" href="#" @click="onCategoryClick(category)">
                {{ category }}
              </a>
            </div>
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
