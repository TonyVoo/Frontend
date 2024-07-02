<template>
  <div class="amazon-like-page">
    <div class="left-panel">
      <!-- Shopping Cart Component -->
      <div class="shopping-cart">
        <h2>Shopping Cart</h2>
        
        <!-- View Cart Contents Section -->
        <div class="view-cart">
          <h3>View Cart Contents</h3>
          <div v-if="cartItems.length === 0" class="empty-cart">
            <p>Your cart is empty.</p>
          </div>
          <div v-else>
            <ul class="cart-list">
              <li v-for="cartItem in cartItems" :key="cartItem.productQuantityId" class="cart-item">
                <div class="product-details">
                  <template v-if="cartItem.productResponseDTO">
                    <img class="product-image" v-bind:src="'data:image/jpeg;base64,'+ cartItem.productResponseDTO.fileResponseDTOList[0].fileByte" alt="Product Image">    
                    <div>
                      <h4 class="product-name">{{ cartItem.productResponseDTO.name }}</h4>
                      <p class="quantity">Quantity: {{ cartItem.quantity }}</p>
                      <p class="price">Price per unit: {{ formatPriceWithPeriods(cartItem.productResponseDTO.price) }}</p>
                      <p class="total-price">Total Price: {{ formatPriceWithPeriods(cartItem.totalAmount) }}</p>
                    </div>
                                        
                  </template>
                  <template v-else>
                    <p class="product-name">Product details not available.</p>
                  </template>
                </div>
              </li>
            </ul>

            <!-- Total Cart Price -->
            <div class="total-cart-price" v-if="cartItems.length > 0">
              <p>Total Cart Price: {{ formatPriceWithPeriods(totalCartPrice) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="right-panel">
      <!-- Order Management Component -->
      <div class="order-management">
        <!-- Order Upload Form -->
        <div class="order-form">
          <h2 class="form-title">Make Order</h2>
          <form @submit.prevent="makeOrder">
            <div class="form-group">
              <label for="phoneNumber">Phone Number:</label>
              <input id="phoneNumber" type="tel" v-model="phoneNumber" required>
            </div>
            <div class="address-group">
              <h3>Address</h3>
              <div class="form-group">
                <label for="houseNumber">House Number:</label>
                <input id="houseNumber" type="text" v-model="address.houseNumber" required>
              </div>
              <div class="form-group">
                <label for="streetName">Street Name:</label>
                <input id="streetName" type="text" v-model="address.streetName" required>
              </div>
              <div class="form-group">
                <label for="wardName">Ward Name:</label>
                <input id="wardName" type="text" v-model="address.wardName" required>
              </div>
              <div class="form-group">
                <label for="city">City:</label>
                <input id="city" type="text" v-model="address.city" required>
              </div>
              <div class="form-group">
                <label for="zipCode">Zip Code:</label>
                <input id="zipCode" type="text" v-model="address.zipCode" required>
              </div>
            </div>
            <button type="submit" class="submit-button">Make Order</button>
          </form>
        </div>

        <!-- Order List -->
        
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store';

export default {
  data() {
    return {
      // Shopping Cart Data
      cartItems: [],
      uploadResponse: null,

      // Order Management Data
      orderInfo: 'good',
      anotherField: 'good',
      phoneNumber: '',
      address: {
        houseNumber: '',
        streetName: '',
        wardName: '',
        city: '',
        zipCode: ''
      },
      orders: []
    };
  },
  methods: {
    // Shopping Cart Methods
    
    async fetchCartItems() {
      try {
        const response = await fetch('https://localhost/api/v1/carts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.getters.getToken()}`
          }
        });
        const cartData = await response.json();
        this.cartItems = cartData.productQuantityResponseDTOPage.content;
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    },

    // Order Management Methods
    async makeOrder() {
      try {
        const response = await fetch('https://localhost/api/v1/orders/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.getters.getToken()}`
          },
          body: JSON.stringify({
            orderInfo: this.orderInfo,
            anotherField: this.anotherField,
            phoneNumber: this.phoneNumber,
            addressRequestDTO: this.address
          })
        });
        const data = await response.json();
        if(data.id){
          let url = './transactionmanagement/' + data.id
          this.$router.push(url)
        }
      } catch (error) {
        console.error('Error placing order:', error);
      }
    },

    // Format price with periods as thousand separators
    formatPriceWithPeriods(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },
  computed: {
    totalCartPrice() {
      return this.cartItems.reduce((total, cartItem) => total + cartItem.totalAmount, 0);
    }
  },
  mounted() {
    this.fetchCartItems(); // Fetch initial cart items
  }
};
</script>

<style scoped>
.amazon-like-page {
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #f0f2f5;
  flex-direction: column;
}

.left-panel, .right-panel {
  flex: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.shopping-cart, .order-management {
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 30px;
  color: #333;
  text-align: center;
}

.cart-item, .order-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.cart-item:last-child, .order-card:last-child {
  border-bottom: none;
}

.product-details, .card-content {
  display: flex
}

.remove-btn, .add-item-btn, .upload-btn, .submit-button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #000000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.remove-btn {
  background-color: #dc3545;
}

.add-item-btn, .submit-button {
  display: block;
  width: 100%;
  text-align: center;
}

.remove-btn:hover, .add-item-btn:hover, .upload-btn:hover, .submit-button:hover {
  background-color: #0056b3;
}

.add-item-btn:hover {
  background-color: #0069d9;
}

.upload-btn:hover {
  background-color: #0056b3;
}

.empty-cart, .no-orders {
  text-align: center;
  color: #666;
  margin-top: 20px;
}

.form-group, .address-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 96%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.address-group h3 {
  margin-bottom: 10px;
  font-size: 16px;
}

.order-list {
  margin-top: 30px;
}

.order-card {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.order-card .card-title {
  font-size: 16px;
  font-weight: bold;
}

.order-card p {
  margin: 5px 0;
}

.product-image {
  width: auto;
  height: 100px;
  margin-right: 30px;
}
</style>
