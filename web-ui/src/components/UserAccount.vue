<template>
  <div class="user-container">
    <h1>User Account Details</h1>
    <div v-if="user">
      <p><strong>First Name:</strong> {{ user.firstName }}</p>
      <p><strong>Last Name:</strong> {{ user.lastName }}</p>
      <p><strong>Date of Birth:</strong> {{ user.dateOfBirth }}</p>
      <p><strong>Phone Number:</strong> {{ user.phoneNumber }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <div>
        <h2>Address</h2>
        <p><strong>House Number:</strong> {{ user.addressResponseDTO.houseNumber }}</p>
        <p><strong>Street Name:</strong> {{ user.addressResponseDTO.streetName }}</p>
        <p><strong>Ward Name:</strong> {{ user.addressResponseDTO.wardName }}</p>
        <p><strong>City:</strong> {{ user.addressResponseDTO.city }}</p>
        <p><strong>Zip Code:</strong> {{ user.addressResponseDTO.zipCode }}</p>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    
    <h1>Transaction List</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="transactions.content.length === 0">No transactions found.</div>
    <div v-else>
      <table class="transactions-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Transaction Type</th>
            <th>Currency</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions.content" :key="transaction.transactionId">
            <td>{{ transaction.orderId }}</td>
            <td>{{ transaction.transactionId }}</td>
            <td>{{ transaction.amount }}</td>
            <td>{{ transaction.transactionType }}</td>
            <td>{{ transaction.currency }}</td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination example -->
      <!-- <div class="pagination">
        <button @click="prevPage" :disabled="pageNumber === 1">Previous</button>
        <span>Page {{ pageNumber }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="pageNumber === totalPages">Next</button>
      </div> -->
    </div>
  </div>
</template>

<script>
import store from '../store';

export default {
  data() {
    return {
      user: null,
      transactions: {
        content: []
      },
      pageNumber: 1,
      pageSize: 20,
      totalPages: 1,
      errorMessage: '',
      userId: null,
      loading: false,
      error: null,
    };
  },
  created() {
    this.fetchUserDetails().then(() => {
      this.fetchTransactions(this.pageNumber);
    });
  },
  methods: {
    fetchUserDetails() {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${store.getters.getToken()}`
        }
      };

      return fetch('https://localhost/api/v1/users/account', options)
        .then(response => {
          if (!response.ok) {
            return response.json().then(err => {
              throw new Error(err.message || 'Failed to fetch user details');
            });
          }
          return response.json();
        })
        .then(data => {
          this.user = data;
        })
        .catch(err => {
          this.errorMessage = err.message;
          console.error(err);
        });
    },
    fetchTransactions(pageNumber) {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${store.getters.getToken()}`
        },
      };

      return fetch(`https://localhost/api/v1/transactions?page-number=${pageNumber}&page-size=${this.pageSize}&sort=amount&direction=asc`, options)
        .then(response => {
          if (!response.ok) {
            return response.json().then(err => {
              throw new Error(err.message || 'Failed to fetch transactions');
            });
          }
          return response.json();
        })
        .then(data => {
          this.transactions.content = data.content || [];
          this.pageNumber = data.page.number;
          this.pageSize = data.page.size;
          this.totalPages = data.page.totalPages;
        })
        .catch(err => {
          this.errorMessage = err.message;
          console.error(err);
        });
    },
  }
};
</script>

<style>
.user-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1, h2 {
  text-align: center;
}

p {
  margin: 10px 0;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 20px;
}

.loading {
  text-align: center;
  margin-top: 20px;
}

.error {
  color: red;
  text-align: center;
  margin-top: 20px;
}

.transactions-table {
  width: 100%;
  border-collapse: collapse;
}

.transactions-table th, .transactions-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.transactions-table th {
  background-color: #f2f2f2;
}

.transactions-table td {
  background-color: #fff;
}
</style>
