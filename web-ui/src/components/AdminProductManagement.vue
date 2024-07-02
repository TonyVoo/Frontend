<template>
  <div class="container">
    <h1>Admin Product Management</h1>

    <!-- Back to Admin Dashboard Button -->
    <button @click="goToAdminDashboard" class="btn-back">Back to Admin Dashboard</button>

    <!-- Form to Upload a Product -->
    <form @submit.prevent="uploadProduct" enctype="multipart/form-data">
      <h2>Upload Product</h2>
      <div class="input-field">
        <label for="name">Name:</label>
        <input type="text" v-model="product.name" required />
      </div>
      <div class="input-field">
        <label for="price">Price:</label>
        <input type="number" v-model="product.price" required />
      </div>
      <div class="input-field">
        <label for="stockQuantity">Stock Quantity:</label>
        <input type="number" v-model="product.stockQuantity" required />
      </div>
      <div class="input-field">
        <label for="description">Description:</label>
        <textarea v-model="product.description"></textarea>
      </div>
      <div class="input-field">
        <label for="categoryIds">CategoryIds:</label>
        <input type="number" v-model="product.categoryIds" required />
      </div>
      <div class="input-field">
        <label for="newCategoryNames">New Category Names:</label>
        <input type="text" v-model="product.newCategoryNames" />
      </div>
      <div class="input-field">
        <label for="files">Files:</label>
        <input type="file" @change="handleFileUpload" multiple />
      </div>
      <button type="submit" class="btn-continue">Upload Product</button>
      <p v-if="uploadMessage">{{ uploadMessage }}</p>
    </form>

    <!-- Form to Update Product -->
    <form @submit.prevent="updateProduct" enctype="multipart/form-data">
      <h2>Update Product</h2>
      <div class="input-field">
        <label for="productId">Product ID:</label>
        <input type="text" v-model="productId" required />
      </div>
      <div class="input-field">
        <label for="name">Name:</label>
        <input type="text" v-model="updateData.name" />
      </div>
      <div class="input-field">
        <label for="price">Price:</label>
        <input type="number" v-model="updateData.price" />
      </div>
      <div class="input-field">
        <label for="stockQuantity">Stock Quantity:</label>
        <input type="number" v-model="updateData.stockQuantity" />
      </div>
      <div class="input-field">
        <label for="description">Description:</label>
        <textarea v-model="updateData.description"></textarea>
      </div>
      <button type="submit" class="btn-continue">Update Product</button>
      <p v-if="updateMessage">{{ updateMessage }}</p>
    </form>

    <!-- Form to Delete Product -->
    <form @submit.prevent="deleteProduct">
      <h2>Delete Product</h2>
      <div class="input-field">
        <label for="deleteProductId">Product ID:</label>
        <input type="text" v-model="deleteProductId" required />
      </div>
      <button type="submit" class="btn-continue">Delete Product</button>
      <p v-if="deleteMessage">{{ deleteMessage }}</p>
    </form>

    <!-- Form to Upload Files to Product -->
    <form @submit.prevent="uploadFilesToProduct" enctype="multipart/form-data">
      <h2>Upload Files to Product</h2>
      <div class="input-field">
        <label for="productId">Product ID:</label>
        <input type="text" v-model="productId" required />
      </div>
      <div class="input-field">
        <label for="files">Files:</label>
        <input type="file" @change="handleFileUpload" multiple />
      </div>
      <button type="submit" class="btn-continue">Upload Files</button>
      <p v-if="uploadFilesMessage">{{ uploadFilesMessage }}</p>
    </form>

    <!-- Form to Update Files of Product -->
    <form @submit.prevent="updateProductFile" enctype="multipart/form-data">
      <h2>Update Product File</h2>
      <div class="input-field">
        <label for="productId">Product ID:</label>
        <input type="text" v-model="productId" required />
      </div>
      <div class="input-field">
        <label for="fileId">File ID:</label>
        <input type="text" v-model="fileId" required />
      </div>
      <div class="input-field">
        <label for="file">File:</label>
        <input type="file" @change="handleFileUpload" />
      </div>
      <button type="submit" class="btn-continue">Update File</button>
      <p v-if="updateFileMessage">{{ updateFileMessage }}</p>
    </form>
  </div>
</template>

<script>
import store from '../store'

export default {
  data() {
    return {
      product: {
        name: '',
        price: '',
        stockQuantity: '',
        description: '',
        categoryIds: '',
        newCategoryNames: ''
      },
      updateData: {
        name: '',
        price: '',
        stockQuantity: '',
        description: ''
      },
      productId: '',
      deleteProductId: '',
      fileId: '',
      files: [],
      uploadMessage: '',
      updateMessage: '',
      deleteMessage: '',
      uploadFilesMessage: '',
      updateFileMessage: ''
    }
  },
  methods: {
    handleFileUpload(event) {
      this.files = event.target.files
    },
    async uploadProduct() {
      const formData = new FormData()
      formData.append('name', this.product.name)
      formData.append('price', this.product.price)
      formData.append('stockQuantity', this.product.stockQuantity)
      formData.append('description', this.product.description)
      formData.append('categoryIds', this.product.categoryIds)
      formData.append('newCategoryNames', this.product.newCategoryNames)

      for (let i = 0; i < this.files.length; i++) {
        formData.append('files', this.files[i])
      }

      try {
        const response = await fetch('https://localhost/api/v1/products/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ` + store.getters.getToken()
          },
          body: formData
        })
        const data = await response.json()
        this.uploadMessage = 'Product uploaded successfully'
        console.log(data)
      } catch (err) {
        console.error(err)
        this.uploadMessage = 'Failed to upload product'
      }
    },
    async updateProduct() {
      const formData = new FormData()
      if (this.updateData.name) formData.append('name', this.updateData.name)
      if (this.updateData.price) formData.append('price', this.updateData.price)
      if (this.updateData.stockQuantity) formData.append('stockQuantity', this.updateData.stockQuantity)
      if (this.updateData.description) formData.append('description', this.updateData.description)

      console.log(`Updating product with ID: ${this.productId}`)
      console.log('FormData:', [...formData.entries()])

      try {
        const response = await fetch(`https://localhost/api/v1/products/update/${this.productId}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ` + store.getters.getToken()
          },
          body: formData
        })
        const data = await response.json()
        this.updateMessage = 'Product updated successfully'
        console.log(data)
      } catch (err) {
        console.error(err)
        this.updateMessage = 'Failed to update product'
      }
    },
    async deleteProduct() {
  try {
    const response = await fetch(`https://localhost/api/v1/products/delete/${this.deleteProductId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${store.getters.getToken()}`
      }
    });

    if (!response.ok) {
      if (response.status === 409) {
        const errorData = await response.json();
        console.error('Conflict Error:', errorData);
        // Handle conflict error, perhaps display an alert or message to the user
        // Example:
        this.errorMessage = 'Unable to delete the product due to existing references.';
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } else {
      const data = await response.json();
      console.log('Product deletion successful:', data);
      // Optionally, update UI or perform any additional actions upon successful deletion
    }
  } catch (err) {
    console.error('Delete Product Error:', err);
    // Handle other errors as needed
  }
},

    async uploadFilesToProduct() {
      const formData = new FormData()
      for (let i = 0; i < this.files.length; i++) {
        formData.append('files', this.files[i])
      }

      try {
        const response = await fetch(`https://localhost/api/v1/products/${this.productId}/files`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ` + store.getters.getToken()
          },
          body: formData
        })
        const data = await response.json()
        this.uploadFilesMessage = 'Files uploaded successfully'
        console.log(data)
      } catch (err) {
        console.error(err)
        this.uploadFilesMessage = 'Failed to upload files'
      }
    },
    async updateProductFile() {
  const formData = new FormData();
  formData.append('file', this.files[0]); // Ensure this.files[0] contains the correct file object

  try {
    const response = await fetch(`https://localhost/api/v1/products/update/${this.productId}/files/${this.fileId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ` + store.getters.getToken()
      },
      body: formData
    });

    if (!response.ok) {
      if (response.status === 400) {
        const errorData = await response.json();
        console.error('Bad Request:', errorData);
        // Handle specific error or display error message to the user
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } else {
      const data = await response.json();
      console.log('File update successful:', data);
      // Optionally, update UI or perform additional actions upon successful file update
    }
  } catch (err) {
    console.error('Update Product File Error:', err);
    // Handle other errors as needed
  }
},

    goToAdminDashboard() {
      this.$router.push('/admindashboard');
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

form {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 600px;
  margin-bottom: 20px;
}

.input-field {
  margin-bottom: 20px;
}

.input-field label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.input-field input,
.input-field textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.btn-continue, .btn-back {
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-continue:hover, .btn-back:hover {
  background-color: #333;
}

.btn-back {
  margin-bottom: 20px;
}
</style>
