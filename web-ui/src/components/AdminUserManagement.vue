<template>
  <div class="container">
    <h1>Admin User Management</h1>

    <!-- Back to Admin Dashboard Button -->
    <button @click="goToAdminDashboard" class="btn-back">Back to Admin Dashboard</button>

    <!-- Form to Fetch All Users -->
    <form @submit.prevent="fetchAllUsers">
      <h2>Fetch All Users</h2>
      <div class="input-field">
        <label for="pageNumber">Page Number:</label>
        <input type="number" v-model="pageNumber" min="1" required />
      </div>
      <div class="input-field">
        <label for="pageSize">Page Size:</label>
        <input type="number" v-model="pageSize" min="1" max="20" required />
      </div>
      <button type="submit" class="btn-continue">Fetch Users</button>
    </form>

    <!-- Display All Users -->
    <div v-if="users.length > 0">
      <h2>All Users</h2>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.firstName }} {{ user.lastName }} - {{ user.email }}
        </li>
      </ul>
    </div>

    <!-- Form to Search User by ID -->
    <form @submit.prevent="validateAndSearchUserById">
      <h2>Search User by ID</h2>
      <div class="input-field">
        <label for="searchUserId">User ID:</label>
        <input type="text" v-model="searchUserId" required />
      </div>
      <button type="submit" class="btn-continue">Search User</button>
    </form>

    <!-- Display User Details -->
    <div v-if="searchResult">
      <h2>User Details</h2>
      <p>ID: {{ searchResult.id }}</p>
      <p>Name: {{ searchResult.firstName }} {{ searchResult.lastName }}</p>
      <p>Email: {{ searchResult.email }}</p>
      <p>Phone Number: {{ searchResult.phoneNumber }}</p>
      <p v-if="searchResult.addressResponseDTO">Address: {{ searchResult.addressResponseDTO.streetName }}, {{ searchResult.addressResponseDTO.city }}</p>
    </div>

    <!-- Form to Get Authenticated User Details -->
    <form @submit.prevent="getAuthenticatedUserDetails">
      <h2>Get Authenticated User Details</h2>
      <button type="submit" class="btn-continue">Get Details</button>
    </form>

    <!-- Display Authenticated User Details -->
    <div v-if="authenticatedUser">
      <h2>Authenticated User Details</h2>
      <p>ID: {{ authenticatedUser.id }}</p>
      <p>Name: {{ authenticatedUser.firstName }} {{ authenticatedUser.lastName }}</p>
      <p>Email: {{ authenticatedUser.email }}</p>
      <p>Phone Number: {{ authenticatedUser.phoneNumber }}</p>
      <p v-if="authenticatedUser.addressResponseDTO">Address: {{ authenticatedUser.addressResponseDTO.streetName }}, {{ authenticatedUser.addressResponseDTO.city }}</p>
    </div>
  </div>
</template>

<script>
import store from '../store'

export default {
  data() {
    return {
      pageNumber: 1,
      pageSize: 1,
      users: [],
      searchUserId: '',
      searchResult: null,
      authenticatedUser: null
    }
  },
  methods: {
    async fetchAllUsers() {
      try {
        const response = await fetch(`https://localhost/api/v1/users?page-number=${this.pageNumber}&page-size=${this.pageSize}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${store.state.token}`
          }
        })
        const data = await response.json()
        this.users = data.content
      } catch (err) {
        console.error(err)
      }
    },
    validateAndSearchUserById() {
      if (this.searchUserId.trim() === '') {
        console.error('User ID is required');
        return;
      }
      console.log(`Searching for User ID: ${this.searchUserId}`);
      this.searchUserById();
    },
    async searchUserById() {
      try {
        const response = await fetch(`https://localhost/api/v1/users/search/${this.searchUserId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${store.state.token}`
          }
        });
        if (!response.ok) {
          // Log the response status and status text for debugging
          console.error(`Error: ${response.status} ${response.statusText}`);
          const errorText = await response.text(); // Read the response body as text
          console.error(`Response Body: ${errorText}`); // Log the response body
          throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        this.searchResult = data;
      } catch (err) {
        console.error(err.message); // Log the error message
      }
    },
    async getAuthenticatedUserDetails() {
      try {
        const response = await fetch('https://localhost/api/v1/users/account', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${store.state.token}`
          }
        })
        const data = await response.json()
        this.authenticatedUser = data
      } catch (err) {
        console.error(err)
      }
    },
    goToAdminDashboard() {
      this.$router.push('/admindashboard');
    }
  }
}
</script>

<style scoped>
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

.input-field input {
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
