<template>
  <div>
    <div class="categories">
      <h2>Categories</h2>
      <ul class="category-list">
        <li
          v-for="category in categories"
          :key="category.id"
          :class="{ 'category-item': true, 'selected-category': category.id === selectedCategoryId }"
          @click="changeCategory(category.id, category.name)"
        >
          {{ category.name }}
        </li>
      </ul>
    </div>
    <h1>{{ categoryName }}</h1>
    <div v-if="products.length > 0" class="product-list">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-item"
        @click="redirectProduct(product.name)"
      >
        <div class="product-container" id="product-box">
          <img
            v-if="product.fileResponseDTOList && product.fileResponseDTOList[0] && product.fileResponseDTOList[0].fileByte"
            class="product-pic"
            :src="'data:image/jpeg;base64,' + product.fileResponseDTOList[0].fileByte"
            alt="Product Image"
          />
          <div class="product-info">
            <p class="product-name">{{ product.name }}</p>
            <div class="product-price">
              <p class="ori-price">{{ product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }} VND</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No products found in this category.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'CategoryProducts',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const categoryId = ref(route.query.category);
    const categoryName = ref('');
    const products = ref([]);
    const categories = ref([]);
    const selectedCategoryId = ref(null); // Track selected category ID

    const fetchCategories = () => {
      fetch('https://localhost/api/v1/categories')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          categories.value = data;
        })
        .catch(error => console.error('Error fetching categories:', error));
    };

    const fetchCategoryName = () => {
      const category = categories.value.find(cat => cat.id === parseInt(categoryId.value));
      if (category) {
        categoryName.value = category.name;
        selectedCategoryId.value = category.id; // Update selected category ID
      }
    };

    const fetchProducts = () => {
      console.log('Fetching products for category ID:', categoryId.value);
      fetch(`https://localhost/api/v1/categories/filter?id=${categoryId.value}&page-number=1&page-size=20`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Products data:', data);
          products.value = data.productsPage ? data.productsPage.content : [];
        })
        .catch(error => console.error('Error fetching products:', error));
    };

    const redirectProduct = (productName) => {
      router.push(`./product/${productName}`);
    };

    const changeCategory = (id, name) => {
      categoryId.value = id;
      categoryName.value = name;
      selectedCategoryId.value = id; // Update selected category ID
      fetchProducts();
    };

    watch(route, (newRoute) => {
      categoryId.value = newRoute.query.category;
      fetchCategoryName();
      fetchProducts();
    });

    onMounted(() => {
      fetchCategories();
      fetchCategoryName();
      fetchProducts();
    });

    return {
      categoryName,
      products,
      categories,
      redirectProduct,
      changeCategory,
      selectedCategoryId
    };
  }
};
</script>

<style scoped>
.navContainer {
  background-color: #000000; /* Dark background */
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white; /* White border */
}

Nav {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  max-width: 1200px;
  width: 100%;
}

.navMenu {
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.navMenu li {
  margin-right: 30px; /* Reduced margin between menu items */
}

.navMenu li a {
  color: #ffffff; /* White text */
  text-decoration: none;
  font-size: 16px;
  font-weight: bold; /* Bold text */
  transition: color 0.3s ease; /* Smooth color transition */
}

.navMenu li a:hover {
  color: #8A2BE2; /* Pink hover color */
}

.categories {
  background-color: #333;
  padding: 20px;
  text-align: center;
  color: white;
}

.category-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.category-item {
  margin: 10px;
  padding: 10px 20px;
  background-color: #444;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.category-item:hover {
  background-color: #555;
}

.selected-category {
  background-color: #8A2BE2; /* Highlight color for selected category */
  color: white;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 27px;
  background-color: #f8f8f8;
  margin-right: 100px;
  margin-left: 100px;
}

.product-item {
  width: 200px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  text-align: center;
  padding: 20px;
}

.product-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.product-pic {
  max-width: 100%;
  max-height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
}

.product-info {
  width: 100%;
}

.product-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.product-price .ori-price {
  font-size: 16px;
  color: #e91e63;
  font-weight: bold;
}

h1 {
  margin-left: 30px;
  font-size: 40px;
  font-weight: bold;
  color: white; /* Set text color to white */
}
</style>
