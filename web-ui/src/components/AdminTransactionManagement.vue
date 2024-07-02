<template>
    <div class="transactions-page">
      <h1>Transactions</h1>

      <div class="back-button-container">
        <router-link to="/admindashboard" class="btn">Back to Admin Dashboard</router-link>
      </div>

      <div v-if="loading" class="loading">Loading...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="transactions">
        <table class="transactions-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Transaction Type</th>
              <th>Currency</th>
              <th>Created Date</th>
              <th>Last Modified Date</th>
              <th>Created By</th>
              <th>Last Modified By</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactions.content" :key="transaction.transactionId">
              <td>{{ transaction.orderId }}</td>
              <td>{{ transaction.transactionId }}</td>
              <td>{{ transaction.amount }}</td>
              <td>{{ transaction.transactionType }}</td>
              <td>{{ transaction.currency }}</td>
              <td>{{ transaction.createdDate }}</td>
              <td>{{ transaction.lastModifiedDate }}</td>
              <td>{{ transaction.createdBy }}</td>
              <td>{{ transaction.lastModifiedBy }}</td>
            </tr>
          </tbody>
        </table>
        <!-- <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
          <span>Page {{ currentPage }} of {{ transactions.page.totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === transactions.page.totalPages">Next</button>
        </div> -->
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import store from '../store';
  
  export default {
    data() {
      return {
        transactions: null,
        currentPage: 1,
        pageSize: 20,
        sort: 'amount',
        direction: 'desc',
        loading: false,
        error: null,
        userId: null, // Set this to the user ID if needed
      };
    },
    created() {
      this.fetchTransactions();
    },
    methods: {
      async fetchTransactions(page = 1) {
        this.loading = true;
        this.error = null;
  
        let url = `/transactions/search?page-number=${page}&page-size=${this.pageSize}&sort=${this.sort}&direction=${this.direction}`;
        if (this.userId) {
          url = `/transactions/search/${this.userId}?page-number=${page}&page-size=${this.pageSize}&sort=${this.sort}&direction=${this.direction}`;
        }
  
        try {
          const response = await axios.get(url, {
            baseURL: 'https://localhost/api/v1',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${store.getters.getToken()}`
            }
          });
          this.transactions = response.data;
          this.currentPage = page;
        } catch (error) {
          this.error = error.response?.data?.message || 'Error fetching transactions';
        } finally {
          this.loading = false;
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.fetchTransactions(this.currentPage - 1);
        }
      },
      nextPage() {
        if (this.currentPage < this.transactions.page.totalPages) {
          this.fetchTransactions(this.currentPage + 1);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .transactions-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
  
  .loading {
    text-align: center;
    color: #007bff;
  }
  
  .error {
    color: #dc3545;
    text-align: center;
  }
  
  .transactions-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  .transactions-table th,
  .transactions-table td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }
  
  .transactions-table th {
    background-color: #f8f9fa;
    color: #333;
  }
  
  .transactions-table tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  
  .transactions-table tr:hover {
    background-color: #e9ecef;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  
  button {
    margin: 0 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
  
  button:hover:not(:disabled) {
    background-color: #0056b3;
  }
  
  button:focus {
    outline: none;
  }
  
  span {
    font-size: 16px;
  }
  
  .back-button-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  .btn {
    background-color: #000000;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  </style>
  