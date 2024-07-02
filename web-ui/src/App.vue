<template>
  <div>
    <title>Awazon Shop</title>
    <header>
      <div class="header-container">
        <h1 class="logo logo-tooltip">
          <router-link to='/'>Awazon</router-link>
          <span class="tooltip-text">Visit Awazon Home</span>
        </h1>

        <div class="search-bar">
          <input type="text" placeholder="Search..." v-model="searchQuery">
          <button type="submit" @click="handleSearch">
            <img src="./assets/search.png" alt="Search">
          </button>
          <span class="tooltip-text">Search Products</span>
        </div>

        <div class="user-actions">
      <div class="user-section" v-if="email">
        <img src="./assets/user.png" alt="User">
        <div class="user-info">
          <!-- Router link to user info page -->
          <router-link :to="`/useraccount/${email}`" class="welcome">{{ email }}</router-link>
          <div class="sign-in-up">
            <a href="#" @click="logout">Logout</a>
          </div>
        </div>
        <span class="tooltip-text">Account Actions</span>
      </div>
      <div class="user-section" v-else>
        <img src="./assets/user.png" alt="User">
        <div class="user-info">
          <div class="sign-in-up">
            <router-link to="/LoginPage">Sign in</router-link>
            <span class="divider">|</span>
            <router-link to="/SignupPage">Sign up</router-link>
          </div>
        </div>
        <span class="tooltip-text">Account Actions</span>
      </div>
          <!-- Adjusted router-link for cart section -->
          <router-link to="/ordermanagement" class="cart-section">
            <img src="./assets/cart.png" alt="Cart">
            <span class="tooltip-text">View Cart</span>
          </router-link>
        </div>
      </div>
    </header>
    <!-- Navigation section -->
    <div class="nav-container">
      <nav>
        <ul class="nav-menu">
          <li @click="toggleDropdown" class="dropdown">
              <a href="#Category-section">Category</a>
              <div class="dropdown-content" v-if="showDropdown">
                <router-link v-for="category in categories" :key="category.id" :to="`/products?category=${category.id}`">{{ category.name }}</router-link>
              </div>
          </li>
          <li><a href="#Bestsellers-section">Bestsellers</a></li>
          <li><a href="#TopBrand-section">Top Brand</a></li>
          <li><a href="#Promotion-section">Promotion</a></li>
        </ul>
      </nav>
    </div>

    <!-- Your router-view to render components based on routes -->
    <router-view/>

    <!-- Footer section -->
    <footer>
      <div class="footer-content">
        <div class="footer-section">
          <h3>About us</h3>
          <p>Official commercial page of Elon Musk - CEO. Always looking for products for customers.</p>
        </div>
        <div class="footer-section">
          <h3>Contact us</h3>
          <p>VD 4, Thới Hòa, Bến Cát, Bình Dương 75000</p>
          <p>0274 2220 990</p>
          <p>awazonshop@gmail.com</p>
        </div>
        <div class="footer-section">
          <h3>Customer Service</h3>
          <ul>
            <li><a href="#">Help center</a></li>
            <li><a href="#">Transaction Service</a></li>
            <li><a href="#">Take our feedback survey</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Shopping with us</h3>
          <ul>
            <li><a href="#">Making payments</a></li>
            <li><a href="#">Delivery options</a></li>
            <li><a href="#">Buyer options</a></li>
          </ul>
        </div>
      </div>
      <div class="copyright">
        <p>&copy; 2024 Awazon. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import store from './store'; // Ensure you import your store module here
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  setup() {
    const email = computed(() => store.state.email);
    const searchQuery = ref('');
    const categories = ref([]); // Defined categories here
    const showDropdown = ref(false);
    const router = useRouter();

    const logout = () => {
      store.actions.logout();
      window.location.reload();
    };

    const fetchCategories = () => {
      fetch('https://localhost/api/v1/categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if required (e.g., authentication headers)
        }
      })
      .then(response => response.json())
      .then(data => {
        categories.value = data;
      })
      .catch(error => console.error('Error fetching categories:', error));
    };

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    const handleSearch = () => {    
      const url = '/search/' + searchQuery.value;  
      router.replace(url);
    }

    onMounted(() => {
      fetchCategories();
      store.actions.initialize();
    });

    return {
      email,
      searchQuery,
      categories,
      logout,
      showDropdown,
      toggleDropdown,
      handleSearch
    };
  }
};

</script>

<style>
header {
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 1em 0;
}

.logo {
  margin-left: -50px;
  cursor: pointer;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 1200px; /* Adjust max-width as per your design */
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  padding: 5px;
  flex-grow: 1;
  margin: 0 20px;
  max-width: 500px;
}

.search-bar input {
  border: none;
  outline: none;
  font-size: 16px;
  padding: 5px;
  flex-grow: 1;
}

.search-bar button {
  background-color: #fdfdfd;
  border: none;
  border-radius: 6px;
  padding: 5px 10px;
  cursor: pointer;
}

.search-bar button img {
  height: 30px;
}

.user-actions {
  display: flex;
  align-items: center;
}

.user-section {
  display: flex;
  align-items: center;
  margin-left: 60px;
  margin-right: 100px;
}

.user-section img {
  height: 37px;
  margin-right: 10px;
}

.user-info .email {
  color: white;
}

.user-info .welcome {
  font-size: 18px;
  margin: 0;
}

.user-info .sign-in-up a {
  color: #fff;
  text-decoration: none;
  font-size: 18px;
}

.user-info .sign-in-up .divider {
  margin: 0 5px;
}

.cart-section img {
  height: 37px;
}

/* Tooltip adjustments */
.logo-tooltip,
.search-bar-tooltip,
.user-actions-tooltip,
.cart-section-tooltip {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.tooltip-text {
  visibility: hidden;
  width: auto;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  text-align: center;
  border-radius: 4px;
  padding: 5px 8px;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 12px;
  white-space: nowrap;
}

.logo-tooltip:hover .tooltip-text,
.search-bar-tooltip:hover .tooltip-text,
.user-actions-tooltip:hover .tooltip-text,
.cart-section-tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

.tooltip-text::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
}

/* Navigation Styles */
/* Navigation Styles */
.nav-container {
  background-color: #000000; /* Dark background */
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white; /* White border */
}

nav {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  max-width: 1200px;
  width: 100%;
}

.nav-menu {
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.nav-menu li {
  margin-right: 30px; /* Reduced margin between menu items */
}

.nav-menu li a {
  color: #ffffff; /* White text */
  text-decoration: none;
  font-size: 16px;
  font-weight: bold; /* Bold text */
  transition: color 0.3s ease; /* Smooth color transition */
}

.nav-menu li a:hover {
  color: #e91e63; /* Pink hover color */
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #9f9f9f;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}


footer {
    background-color: #f2f2f2;
    padding: 40px 20px;
    margin-top: 200px;
  }
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .footer-section {
    flex-basis: 25%;
    padding: 0 20px;
  }
  
  .footer-section h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .footer-section p,
  .footer-section ul {
    font-size: 14px;
    color: #666;
    margin-bottom: 5px;
  }
  
  .footer-section ul {
    list-style-type: none;
    padding: 0;
  }
  
  .footer-section ul li a {
    color: #666;
    text-decoration: none;
  }
  
  .footer-section ul li a:hover {
    color: #333;
  }
  
  .copyright {
    text-align: center;
    font-size: 14px;
    color: #666;
    margin-top: 20px;
  }

/* Remove underline from anchor tags */
a {
  text-decoration: none; /* Remove underline */
  color: inherit; /* Inherit parent color */
}

</style>
