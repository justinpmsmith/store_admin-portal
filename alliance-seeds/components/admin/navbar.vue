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
          <li class="nav-item">
            <a class="nav-link" href="/admin/products">
              <Icon name="material-symbols:garage-home-rounded" mode="svg" style="color: white" size="2rem" />
              <span>Home</span>
            </a>
          </li>
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
          <li class="nav-item">
            <a class="nav-link" href="/admin/addProduct">
              <Icon name="material-symbols:shopping-cart" mode="svg" style="color: white" size="2rem" />
              <span>Add Product</span>
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link"  href="/admin/addCategory">
              <Icon name="tabler:category-plus" mode="svg" style="color: white" size="2rem" />
              Add Category
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/admin/soldProducts" >
                <Icon name="material-symbols:sell" mode="svg" style="color: white" size="2rem" /> Sold Products
            </a>
          </li>
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
              <i class="fas fa-cog"></i>
              <span> Settings <i class="fas fa-angle-down"></i> </span>
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Profile</a>
              <a class="dropdown-item" href="#">Billing</a>
              <a class="dropdown-item" href="#">Customize</a>
            </div>
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
    data(){
        return {
           
        }
    }

};
</script>

<style scoped>

</style>