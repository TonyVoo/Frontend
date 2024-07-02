<template>
  <div class="transaction-management">
    <!-- Transaction Upload Form -->
    <div class="transaction-form">
      <h2 class="form-title">Upload Transaction</h2>
      <form @submit.prevent="uploadTransaction">
        <div class="form-group">
          <label for="orderId">Order ID: {{ this.orderId }}</label>
        </div>
        <div class="form-group">
          <label for="transactionType">Transaction Type:</label>
          <select id="transactionType" v-model="transactionType" required>
            <option value="INTERNET_BANKING">Internet Banking</option>
            <option value="CREDIT_CARD">Credit Card</option>
            <option value="CASH">Cash</option>
          </select>
        </div>
        <div class="form-group">
          <label for="currency">Currency:</label>
          <select id="currency" v-model="currency" required>
            <option value="VND">VND</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <button type="submit" class="submit-button">Upload Transaction</button>
      </form>
    </div>

    <!-- Transaction List -->
    <div class="transaction-list">
      <h2 class="list-title">Transaction History</h2>
      <div v-if="transactions.length > 0" class="transaction-cards">
        <div v-for="transaction in transactions" :key="transaction.id" class="transaction-card">
          <div class="transaction-info">
            <p><strong>Transaction ID:</strong> {{ transaction.id }}</p>
            <p><strong>Order ID:</strong> {{ transaction.orderId }}</p>
            <p><strong>Type:</strong> {{ transaction.transactionType }}</p>
            <p><strong>Currency:</strong> {{ transaction.currency }}</p>
            <!-- Add more fields as needed -->
          </div>
        </div>
      </div>
      <div v-else class="no-transactions">
        <p>No transactions found.</p>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store'

export default {
  data() {
    return {
      orderId: this.$route.params.id,
      transactionType: '',
      currency: '',
      transactions: []
    };
  },
  methods: {
    async uploadTransaction() {
      try {
        const response = await fetch('https://localhost/api/v1/transactions/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + store.getters.getToken()
          },
          body: JSON.stringify({
            orderId: this.orderId,
            transactionType: this.transactionType,
            currency: this.currency
          })
        });
        const data = await response.json();
        console.log('Transaction uploaded:', data);
        if(data.message == 'Save transaction successfully'){
          this.$router.push('/transactioncomplete')
        }
      } catch (error) {
        console.error('Error uploading transaction:', error);
      }
    }
    
  }
};
</script>

<style scoped>
.transaction-management {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.transaction-form {
  background-color: #f0f2f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.transaction-list {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button {
  background-color: #f0c14b;
  color: #111;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
}

.submit-button:hover {
  background-color: #e1ac42;
}

.list-title {
  font-size: 20px;
  margin-bottom: 10px;
}

.transaction-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.transaction-card {
  background-color: #ffffff;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.transaction-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.transaction-info p {
  margin: 5px 0;
}

.no-transactions {
  margin-top: 20px;
  padding: 10px;
  background-color: #f0f2f5;
  border-radius: 8px;
  text-align: center;
  color: #888;
}

@media (max-width: 768px) {
  .transaction-cards {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
</style>
