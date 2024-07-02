<template>
  <div class="product-page-container" v-if="product">
    <div class="product-image-section">
      <img class="product-pic" v-bind:src="'data:image/jpeg;base64,'+ product.fileResponseDTOList[0].fileByte" alt="Product Image">
    </div>
    <div class="product-details-section">
      <h2>{{ product.name }}</h2>
      <p>Description: {{ product.description }}</p>
      <p><strong>Price:</strong> {{ product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }} VND</p>
      <p><strong>Quantity:</strong> {{ product.stockQuantity }}</p>
      <input type="number" required v-model="quantity" />
      <div v-if="quantityError">Select at least 1</div>
      <button class="submit-button" @click="addToCart()">Add to Cart</button>
      <div v-if="cartMessage" class="cart-message">{{ cartMessage }}</div>
    </div>
  </div>
  <div v-else>
    <h>
      404 not found
    </h>
  </div>
</template>

<script>
  import store from '../store'
  export default {
    data() {
      return {
        product: null,
        quantity: 0,
        quantityError: false,
        cartMessage: ''
      }
    },
    created() {
      const options = { method: 'GET' };
      const url = 'https://localhost/api/v1/products/search?product-name=' + this.$route.params.name

      fetch(url, options)
        .then(response => response.json())
        .then(response => {
          this.product = response.content[0]
        })
        .catch(err => console.error(err));
    },
    methods: {
      addToCart() {
        if (this.quantity < 1) {
          this.quantityError = true;
          return;
        } else {
          this.quantityError = false;
        }

        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + store.getters.getToken()
          },
          body: JSON.stringify([{
            productId: this.product.id,
            quantity: this.quantity
          }])
        };

        fetch('https://localhost/api/v1/carts/upload', options)
          .then(response => response.json())
          .then(response => {
            console.log(response);
            this.cartMessage = 'Product added to cart successfully!';
          })
          .catch(err => {
            console.error(err);
            this.cartMessage = 'Failed to add product to cart.';
          });
      }
    }
  }
</script>

<style>
.product-page-container {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.product-image-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-image-section img {
  max-width: 100%;
  max-height: 400px;
}

.product-details-section {
  flex: 2;
  padding: 20px;
}

.product-details-section h2 {
  text-align: left;
  font-size: 24px;
  margin-bottom: 20px;
}

.product-details-section p {
  font-size: 16px;
  margin-bottom: 10px;
}

.product-details-section button {
  padding: 10px 20px;
  background-color: #000000;
  border: none;
  margin-left: 5px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
}

.cart-message {
  margin-top: 20px;
  font-size: 16px;
  color: green;
}

h {
  font-size: 400%;
}

h2 {
  text-align: left;
}
</style>
