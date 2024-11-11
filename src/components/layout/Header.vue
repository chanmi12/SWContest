<template>
  <div class="header-container">
    <div class="mainButton-section">
      <h1 class="mainButton">냠냠로드</h1>
    </div>
    <div class="menubar">
      <button class="menuButton" @click="goToMain">
        <h3 class="menuFont">Main</h3>
      </button>
      <button class="menuButton" @click="goToMap">
        <h3>Map</h3>
      </button>
      <button class="menuButton" @click="goToReservation">
        <h3>Reservation</h3>
      </button>
      <button class="menuButton" @click="goToMyPage">
        <h3>MyPage</h3>
      </button>
      <button class="menuButton" @click="goToLoginPage">
        <h3>Login</h3>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    goToMain() {
      this.$router.push('/');
    },
    goToMap() {
      this.$router.push('/map');
    },
    goToReservation() {
      this.$router.push('/reservation');
    },
    goToMyPage() {
      this.$router.push('/mypage');
    },
    goToLoginPage(){
      this.$router.push('/login');
    }
  }
}
</script>

<style>
.header-container {
  display: flex;
  width: 100vw;
  max-height: 11vh;
  margin-top: 3%;
  align-items: center;
  background-color: #6B8E23;
  box-sizing: border-box;
}

.mainButton-section {
  display: flex;
  margin-left: 3%;
  padding-top: -3%;
}

.mainButton {
  max-height: 11vh;
  font-family: 'SANJUGotgam';
  font-weight: normal;
  font-style: normal;
  font-size: 4rem;
  color: white;
}

.menubar {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-left: 11%;
  gap: 12rem;
  padding: 0 5%;
}

.menuButton {
  max-height: 11vh;
  font-family: 'Middleschool_student';
  font-weight: normal;
  font-style: normal;
  font-size: 2.3rem;
  border: none;
  background-color: #6B8E23;
  color: white;
  cursor: pointer;
}

.menuFont {
  text-align: center;
}
</style>
