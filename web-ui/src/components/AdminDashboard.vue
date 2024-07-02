<template>
  <div class="admin-dashboard">
    <h1>Admin Dashboard</h1>

    <div class="navigation-buttons">
      <router-link to="/adminproductmanagement" class="btn">Manage Products</router-link>
      <router-link to="/adminusermanagement" class="btn">Manage Users</router-link>
      <router-link to="/admintransactionmanagement" class="btn">Manage Transactions</router-link>
      <router-link to="/adminordermanagement" class="btn">Manage Orders</router-link> <!-- New Button -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard'
};
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  margin-bottom: 20px;
}

.navigation-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
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
