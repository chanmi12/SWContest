<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-box">
        <h1 class="title">Login</h1>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" placeholder="username@gmail.com" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" placeholder="Password" />
          </div>
          <a href="#" class="forgot-password">Forgot Password?</a>
          <button type="submit" class="login-btn">Sign in</button>
        </form>
        <div class="social-login">
          <p>Or Continue With</p>
          <div class="social-buttons">
            <button class="google">Google</button>
            <button class="github">GitHub</button>
            <button class="facebook">Facebook</button>
          </div>
        </div>
        <p class="register-text">
          Don't have an account yet? <a href="#" class="register-link">Register for free</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      if (this.email && this.password) {
        alert(`Logged in with email: ${this.email}`);
      } else {
        alert("Please fill in all fields.");
      }
    },
  },
};
</script>

<style scoped>
/* Global styles */
body {
  font-family:'Middleschool_student' ;
  margin: 0;
  padding: 0;
  background-color: #fcebe3;
}

/* Header styles */
.header {
  background-color: #7e9c47;
  padding: 10px 20px;
}

.nav-links {
  display: flex;
  list-style: none;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
}

.nav-links li {
  margin-left: 20px;
  color: white;
  font-size: 16px;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.login-box {
  background-color: #ffe4d1;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
}

.title {
  font-size: 4rem;
  font-family: 'Middleschool_student';
  margin-bottom: 20px;
}

/* Form styles */
.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.forgot-password {
  display: block;
  text-align: right;
  font-size: 12px;
  margin-top: 5px;
  color: #f05423;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-btn {
  width: 100%;
  padding: 10px;
  background-color: #f05423;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.login-btn:hover {
  background-color: #d94c1a;
}

/* Social login styles */
.social-login {
  margin: 20px 0;
}

.social-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.social-buttons button {
  padding: 10px 15px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.google {
  background-color: #4285f4;
  color: white;
}

.github {
  background-color: #333;
  color: white;
}

.facebook {
  background-color: #3b5998;
  color: white;
}

/* Register text styles */
.register-text {
  font-size: 14px;
  margin-top: 20px;
}

.register-link {
  color: #f05423;
  text-decoration: none;
  font-weight: bold;
}

.register-link:hover {
  text-decoration: underline;
}
</style>