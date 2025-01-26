
<template>
    <nav class="navbar navbar-expand-xl">
        <div class="container h-100">
          <a class="navbar-brand" href="/admin/products">
            <h1 class="tm-site-title mb-0">PRODUCT ADMIN</h1>
          </a>
          <button
            class="navbar-toggler ml-auto mr-0"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            ref="navToggle"
          >
            <i class="fas fa-bars tm-nav-icon"></i>
          </button>
    
          <div 
            class="collapse navbar-collapse" 
            id="navbarSupportedContent" 
            ref="navContent"
          >
            <ul class="navbar-nav mx-auto h-100" ref="navList">
              <!-- Add dropdown -->
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="addDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fas fa-cog"></i>
                  <span> Add <i class="fas fa-angle-down"></i> </span>
                </a>
                <div class="dropdown-menu" aria-labelledby="addDropdown">
                  <a class="dropdown-item" href="#">Add Product</a>
                  <a class="dropdown-item" href="#">Add Category</a>
                </div>
              </li>
    
              <!-- All option -->
              <li class="nav-item">
                <a class="nav-link" @click="onCategoryClick('ALL')" style="color: white;">
                  <i class="fas fa-shopping-cart"></i>
                  All
                  <span class="sr-only">(current)</span>
                </a>
              </li>
    
              <!-- Dynamic category items -->
              <li class="nav-item" v-for="category in categories" :key="category">
                <a class="nav-link" @click="onCategoryClick(category)" style="color: white;">
                  <i class="fas fa-shopping-cart"></i>
                  {{ category }}
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
            default: () => []
        },
        onCategorySelected: {
            type: Function,
            required: true
        }
    },
    mounted() {
        document.addEventListener('click', this.handleOutsideClick);
    },
    unmounted() {
        document.removeEventListener('click', this.handleOutsideClick);
    },
    methods: {
        onCategoryClick(category) {
            this.onCategorySelected(category);
            this.closeNavbar();
        },
        handleOutsideClick(event) {
            const navContent = this.$refs.navContent;
            const navToggle = this.$refs.navToggle;
            
            if (navContent && navContent.classList.contains('show')) {
                if (!navContent.contains(event.target) && !navToggle.contains(event.target)) {
                    this.closeNavbar();
                }
            }
        },
        closeNavbar() {
            const navContent = this.$refs.navContent;
            if (navContent && navContent.classList.contains('show')) {
                navContent.classList.remove('show');
            }
        }
    }
};
</script>

<style scoped>
.navbar {
    height: 100px;
    padding: 0;
}

.navbar-brand {
    padding-left: 15px;
    white-space: nowrap;
}

/* Desktop styles - horizontal scroll */
@media (min-width: 1200px) {
    .navbar-collapse {
        flex: 1;
        overflow-x: auto;
        margin-left: 20px;
    }

    .navbar-nav {
        display: flex;
        flex-wrap: nowrap;
        margin: 0;
        padding: 0 20px;
    }

    .nav-item {
        flex: 0 0 auto;
        margin: 0 10px;
    }

    /* Hide scrollbar for Chrome, Safari and Opera */
    .navbar-collapse::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .navbar-collapse {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    .nav-link {
        white-space: nowrap;
    }
}

/* Mobile styles - original implementation */
@media (max-width: 1199px) {
    .navbar-nav {
        width: 100%;
    }

    .nav-item {
        width: 100%;
    }

    .nav-link {
        padding-left: 15px !important;
        justify-content: flex-start;
    }

    .nav-link i {
        margin-right: 10px;
        width: 20px;
    }
}

/* Common styles */
.nav-link {
    color: white;
    cursor: pointer;
}

.nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #f5a623 !important;
}

.nav-link i, 
.nav-link span {
    color: inherit;
}
</style>