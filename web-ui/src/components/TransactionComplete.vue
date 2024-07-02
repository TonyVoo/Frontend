<template>
    <div class="transaction-completed">
      <div class="message-container">
        <i class="checkmark-icon">✔️</i>
        <h3>Transaction Completed</h3>
        <p>Thank you for your purchase!</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TransactionCompleted'
  };
  </script>
  
  <style scoped>
  .transaction-completed {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Full viewport height */
    background-color: #f5f5f5;
  }
  
  .message-container {
    text-align: center;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .checkmark-icon {
    font-size: 2rem;
    color: green;
  }
  
  h3 {
    margin: 10px 0;
  }
  
  p {
    color: #666;
  }
  </style>