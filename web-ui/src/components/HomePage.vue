<template>
  <div>
      <section id="Bestsellers-section">
      <h2 class="section">Bestsellers</h2>
      <div class="product-list">
          <div
              v-for="product in products"
              :key="product.name"
              class="product-item"
              @click="redirectProduct(product.name)"
          >
              <div class="product-container" id="product-box">
                  <img class="product-pic" v-bind:src="'data:image/jpeg;base64,'+ product.fileResponseDTOList[0].fileByte" alt="Product Image">
                  <div class="product-info">
                      <p class="product-name">{{product.name}}</p>
                      <div class="product-price">
                          <p class="ori-price">{{ product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }} VND</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      </section>

      <section id="TopBrand-section">
      <h2 class="section">Top Brand</h2>
      <div class="product-list">
          <div
              v-for="product in products"
              :key="product.name"
              class="product-item"
              @click="redirectProduct(product.name)"
          >
              <div class="product-container" id="product-box">
                  <img class="product-pic" v-bind:src="'data:image/jpeg;base64,'+ product.fileResponseDTOList[0].fileByte" alt="Product Image">
                  <div class="product-info">
                      <p class="product-name">{{product.name}}</p>
                      <div class="product-price">
                          <p class="ori-price">{{ product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }} VND</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      </section>

      <section id="Promotion-section">
      <h2 class="section">Promotion</h2>
      <div class="product-list">
          <div
              v-for="product in products"
              :key="product.name"
              class="product-item"
              @click="redirectProduct(product.name)"
          >
              <div class="product-container" id="product-box">
                  <img class="product-pic" v-bind:src="'data:image/jpeg;base64,'+ product.fileResponseDTOList[0].fileByte" alt="Product Image">
                  <div class="product-info">
                      <p class="product-name">{{product.name}}</p>
                      <div class="product-price">
                          <p class="ori-price">{{ product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }} VND</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      </section>
  </div>
</template>

<script>

  export default{
      data(){
      return {
              products: [],
          }
      },
      

      mounted(){
          this.retrieveProducts();
      },
      methods:{
          
          redirectProduct(productName){
              let productUrl = './product/' + encodeURIComponent(productName);
              this.$router.push(productUrl);
          },
          
          retrieveProducts(){
              const options = {method: 'GET'};
              let url = 'https://localhost/api/v1/products/search'
              
              fetch(url, options)
              .then(response => response.json())
              .then(response => {
                  this.products = response.content
              })
              .catch(err => console.error(err));
          }
      }
  }
  

</script>


<style>

#product-box{
  margin: 40px;
}

.product-info, .user-item {
  margin-bottom: 10px;
}

.product-list {
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  /* gap: 20px; */
}

.product-item {
flex-basis: calc(15% - 20px); /* Adjust the percentage to control the number of items per row (5 items here) */
max-width: calc(15% - 20px); /* Adjust the percentage to control the number of items per row (5 items here) */
width: 150px;
height: 200px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border: 1px solid #ccc;
cursor: pointer;
text-align: center;
padding: 10px;
}

.product-item img {
max-width: 100%;
max-height: 100px;
object-fit: cover;
}

.header-bar {
display: flex;
align-items: center;
padding: 10px;
background-color: #f5f5f5;
}

.search-bar {
flex: 1;
padding: 5px 10px;
margin-right: 10px;
border: 1px solid #ccc;
border-radius: 4px;
}

.category-select {
padding: 5px 10px;
border: 1px solid #ccc;
border-radius: 4px;
}

.search-bar {
display: flex;
align-items: center;
background-color: #fff;
border-radius: 4px;
padding: 5px;
flex-grow: 1;
margin: 0px 20px;
max-width: 500px;
}

.section  {
  margin-left: 30px;
  font-size: 30px;
}
</style>