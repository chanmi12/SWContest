<template>
  <div class="container">
    <div class="sidebar">
      <ul>
        <li><span>✏️</span> Edit Profile</li>
        <li><span>🔔</span> Notification</li>
        <li><span>🔒</span> Security</li>
        <li><span>🎨</span> Appearance</li>
        <li><span>❓</span> Help</li>
      </ul>
    </div>
    <div class="content">
      <h1>Edit Profile</h1>
      <form @submit.prevent="saveChanges">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input type="text" id="firstName" v-model="user.firstName" placeholder="First Name">
        </div>
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input type="text" id="lastName" v-model="user.lastName" placeholder="Last Name">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="user.email" placeholder="Email" readonly>
        </div>
        <div class="form-group">
          <label for="address">Address</label>
          <input type="text" id="address" v-model="user.address" placeholder="Address">
        </div>
        <div class="form-group">
          <label for="contactNumber">Contact Number</label>
          <input type="text" id="contactNumber" v-model="user.contactNumber" placeholder="Contact Number">
        </div>
        <div class="form-group">
          <label for="city">City</label>
          <select id="city" v-model="user.city">
            <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="state">State</label>
          <select id="state" v-model="user.state">
            <option v-for="state in states" :key="state" :value="state">{{ state }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="user.password" placeholder="Password">
        </div>
        <div class="buttons">
          <button type="button" class="cancel-btn" @click="cancelChanges">Cancel</button>
          <button type="submit" class="save-btn">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mypage',
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: 'Mehrabbozorgi.business@gmail.com',
        address: '33062 Zboncak Isle',
        contactNumber: '58077.79',
        city: 'Mehrab',
        state: 'Bozorgi',
        password: 'sbfdbnd65sfvdbs',
      },
      cities: ['Mehrab', 'Other'],
      states: ['Bozorgi', 'Other'],
    };
  },
  methods: {
    saveChanges() {
      alert('Changes saved!');
      console.log(this.user);
    },
    cancelChanges() {
      alert('Changes canceled.');
    },
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
}

.container {
  display: flex;
  width: 90%;
  max-width: 1200px;
  margin: 30px auto;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.sidebar {
  width: 25%;
  background: #f1f1f1;
  padding: 20px;
  border-right: 1px solid #ddd;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  margin: 15px 0;
  cursor: pointer;
  font-size: 16px;
}

.content {
  width: 75%;
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.buttons {
  margin-top: 20px;
}

.cancel-btn {
  background: #ccc;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

.save-btn {
  background: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>