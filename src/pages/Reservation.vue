<template>
  <div class="reservation-page">
    <h1>예약 관리</h1>

    <div class="current-reservation">
      <h2>현재 예약</h2>
      <div v-if="currentReservation" class="reservation-card">
        <p><strong>가게 이름:</strong> {{ currentReservation.shopName }}</p>
        <p><strong>예약 시간:</strong> {{ currentReservation.time }}</p>
        <button @click="openEditModal" class="edit-button">수정</button>
      </div>
      <div v-else>
        <p>현재 예약된 내용이 없습니다.</p>
      </div>
    </div>

    <div class="past-reservations">
      <h2>지난 예약</h2>
      <div v-if="pastReservations.length > 0" class="reservation-cards">
        <div v-for="(reservation, index) in pastReservations" :key="index" class="reservation-card">
          <p><strong>가게 이름:</strong> {{ reservation.shopName }}</p>
          <p><strong>예약 시간:</strong> {{ reservation.time }}</p>
          <button @click="deletePastReservation(index)" class="delete-button">삭제</button>
        </div>
      </div>
      <div v-else>
        <p>지난 예약 내용이 없습니다.</p>
      </div>
    </div>

    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <h2>예약 시간 수정</h2>
        <div class="time-selector">
          <label for="time">예약 시간:</label>
          <select v-model="selectedTime" id="time">
            <option v-for="time in timeOptions" :key="time" :value="time">
              {{ time }}
            </option>
          </select>
        </div>
        <div class="modal-actions">
          <button @click="closeModal" class="cancel-button">취소</button>
          <button @click="updateReservation" class="save-button">저장</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Reservation",
  data() {
    return {
      currentReservation: {
        shopName: "119딧고기",
        time: "오전 9:00",
      },
      pastReservations: [
        { shopName: "온정가", time: "오후 1:30" },
        { shopName: "한우랑", time: "오후 4:00" },
        { shopName: "화목정", time: "오전 11:00" },
      ],
      isModalOpen: false,
      selectedTime: "오전 9:00",
      timeOptions: [],
    };
  },
  mounted() {
    const hours = ["오전", "오후"];
    const times = [];
    for (let hour = 9; hour <= 11; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const period = hour < 12 ? hours[0] : hours[1];
        const time = `${period} ${hour % 12 || 12}:${min === 0 ? "00" : "30"}`;
        times.push(time);
      }
    }
    this.timeOptions = times;
  },
  methods: {
    openEditModal() {
      this.selectedTime = this.currentReservation.time;
      this.isModalOpen = true;
    },

    updateReservation() {
      this.currentReservation.time = this.selectedTime;
      this.isModalOpen = false;
      alert("예약 시간이 수정되었습니다.");
    },

    closeModal() {
      this.isModalOpen = false;
    },

    deletePastReservation(index) {
      this.pastReservations.splice(index, 1);
      alert("예약이 삭제되었습니다.");
    },
  },
};
</script>

<style scoped>
.reservation-page {
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 24px;
  text-align: center;
  margin-bottom: 30px;
}

h2 {
  font-size: 20px;
  margin-bottom: 15px;
}

.reservation-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  background-color: #f9f9f9;
}

.reservation-card p {
  font-size: 16px;
  margin: 5px 0;
}

button {
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.edit-button {
  background-color: #4CAF50;
  color: white;
}

.edit-button:hover {
  background-color: #45a049;
}

.delete-button {
  background-color: #f44336;
  color: white;
}

.delete-button:hover {
  background-color: #e53935;
}

.reservation-cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
}

.time-selector {
  margin-bottom: 20px;
}

select {
  padding: 8px;
  font-size: 14px;
  border-radius: 5px;
  width: 100%;
}

.modal-actions button {
  margin-top: 10px;
  width: 45%;
  padding: 8px;
}

.save-button {
  background-color: #4CAF50;
  color: white;
}

.save-button:hover {
  background-color: #45a049;
}

.cancel-button {
  background-color: #f44336;
  color: white;
}

.cancel-button:hover {
  background-color: #e53935;
}
</style>
