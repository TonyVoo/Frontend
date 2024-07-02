<template>
    <div class="admin-orders">
      <h2>Admin Orders</h2>
      <!-- Orders Table -->
      <div class="back-button-container">
        <router-link to="/admindashboard" class="btn">Back to Admin Dashboard</router-link>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Delivery Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.name }}</td>
            <td>{{ order.totalAmount }}</td>
            <td>{{ order.status }}</td>
            <td>{{ order.deliveryDate }}</td>
            <td>
              <button @click="editOrder(order.id)">Edit</button>
              <button @click="deleteOrder(order.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Pagination -->
      <div class="pagination">
        <button :disabled="pageNumber <= 1" @click="prevPage()">Previous</button>
        <span>Page {{ pageNumber }}</span>
        <button :disabled="pageNumber >= totalPages" @click="nextPage()">Next</button>
      </div>
    </div>
  </template>
  
  <script>
  import store from '../store';
  export default {
    data() {
      return {
        orders: [], // To store fetched orders
        pageNumber: 1, // Current page number
        pageSize: 20, // Number of orders per page
        totalPages: 1 // Total pages of orders
      };
    },
    mounted() {
      this.fetchOrders();
    },
    methods: {
      fetchOrders() {
        // Example URL for fetching orders (adjust as per your API)
        const url = `https://localhost/api/v1/orders?pageNumber=${this.pageNumber}&pageSize=${this.pageSize}`;
        // Fetch orders using Bearer token authentication
        fetch(url, {
          headers: {
            'Authorization': `Bearer ${store.getters.getToken()}`
          }
        })
        .then(response => response.json())
        .then(data => {
          this.orders = data.content;
          this.totalPages = data.page.totalPages;
        })
        .catch(error => {
          console.error('Error fetching orders:', error);
        });
      },
      nextPage() {
        if (this.pageNumber < this.totalPages) {
          this.pageNumber++;
          this.fetchOrders();
        }
      },
      prevPage() {
        if (this.pageNumber > 1) {
          this.pageNumber--;
          this.fetchOrders();
        }
      },
      editOrder(orderId) {
        // Implement edit functionality if needed
        console.log('Editing order with ID:', orderId);
      },
      deleteOrder(orderId) {
        // Implement delete functionality if needed
        console.log('Deleting order with ID:', orderId);
        // Example delete request
        const deleteUrl = `https://localhost/api/v1/orders/delete/${orderId}`;
        fetch(deleteUrl, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${store.getters.getToken()}`
          }
        })
        .then(response => response.json())
        .then(data => {
          console.log('Order deleted:', data);
          // Optionally, refresh the orders list after deletion
          this.fetchOrders();
        })
        .catch(error => {
          console.error('Error deleting order:', error);
        });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your CSS styles here */
  .admin-orders {
    /* Example styles */
    max-width: 800px;
    margin: 0 auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
  .pagination {
    margin-top: 20px;
    text-align: center;
  }
  .pagination button {
    margin: 0 5px;
    padding: 5px 10px;
    cursor: pointer;
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
  
