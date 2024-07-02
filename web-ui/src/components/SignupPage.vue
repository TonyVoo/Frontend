<template>
  <div class="container">
    <h1>Create Account</h1>
    <form id="signup-form" @submit.prevent="handleSubmit">
      <!-- First Name -->
      <div class="input-field">
        <label>First Name</label>
        <input type="text" v-model="firstName" required>
      </div>
      
      <!-- Last Name -->
      <div class="input-field">
        <label>Last Name</label>
        <input type="text" v-model="lastName" required>
      </div>
      
      <!-- Email -->
      <div class="input-field">
        <label>Email</label>
        <input type="email" v-model="email" required>
      </div>
      
      <!-- Password -->
      <div class="input-field">
        <label>Password</label>
        <input type="password" v-model="password" required>
      </div>
      
      <!-- Confirm Password -->
      <div class="input-field">
        <label>Confirm Password</label>
        <input type="password" v-model="confirmPassword" required>
      </div>

      <button type="submit" class="btn-continue">Continue</button>
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      successMessage: '' // Added success message state
    };
  },
  methods: {
    async handleSubmit() {
      // Validate passwords match
      if (this.password !== this.confirmPassword) {
        console.error('Passwords do not match');
        // Handle error (e.g., show error message)
        return;
      }
      
      try {
        // Make API call to register user and handle response
        const response = await fetch('https://localhost:443/api/v1/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
          })
        });
        
        if (!response.ok) {
          throw new Error('Registration failed');
        }
        
        // Display success message
        this.successMessage = 'Signup successful! Redirecting...';
        setTimeout(() => {
          this.$router.push('./RegisterAuthentication');
        }, 2000);
      } catch (error) {
        console.error('Registration error:', error);
        // Handle error (e.g., show error message)
      }
    }
  }
};
</script>

<style>
.container {
  /* display: flex; */
  justify-content: center;
  align-items: center;
}

header h1 {
  margin: 0;
}

form {
  background-color: #fff;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  margin-left: auto;
  margin-right: auto;
}

h1 {
  text-align: center;
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

.btn-continue {
  background-color: #000000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 3px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
}

.success-message {
  color: green;
  margin-top: 10px;
}

.signup-link {
  margin-top: 20px;
  text-align: center;
}

.signup-link a {
  color: #007185;
  text-decoration: none;
}
</style>
