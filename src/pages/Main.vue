<template>
  <div>
    <carousel
        :items-to-show="1"
        :wrap-around="true"
        :autoplay="false"
        ref="carousel"
        style="overflow: hidden; margin-top: 3%;"
    >
      <!-- 슬라이드 생성 -->
      <slide v-for="(image, index) in images" :key="index" style="padding: 0 5%;">
        <img :src="image" alt="Carousel Image" class="carousel-image" />
      </slide>
      <template #addons>
        <pagination />
      </template>
    </carousel>

    <!-- 랜덤 음식 추천 카드 -->
    <div class="random-food">
      <h2>이런 식당은 어떠세요?</h2>
      <div class="food-cards">
        <div class="food-card" v-for="(food, index) in foodItems" :key="index">
          <img :src="food.image" alt="Food Image" class="food-image" />
          <p class="food-name">{{ food.name }}</p>
          <button class="food-button">더보기</button>
        </div>
      </div>
    </div>


    <!-- 달력 추가 -->
    <div class="calendar-section">
      <h3>예약 가능한 날짜</h3>
      <div class="calendar">
        <div class="calendar-header">
          <button @click="prevMonth">&lt;</button>
          <span>{{ currentYear }}년 {{ currentMonth }}월</span>
          <button @click="nextMonth">&gt;</button>
        </div>
        <div class="calendar-grid">
          <div class="calendar-day" v-for="day in daysOfWeek" :key="day">{{ day }}</div>
          <div
              v-for="(date, index) in daysInMonth"
              :key="index"
              class="calendar-date"
              :class="{ 'today': isToday(date) }"
          >
            {{ date }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination } from "vue3-carousel";

export default {
  name: "MainPage",
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  data() {
    return {
      images: [
        require('@/components/layout/img/image1.jpg'),
        require('@/components/layout/img/image2.jpeg'),
        require('@/components/layout/img/image3.jpeg'),
        require('@/components/layout/img/image4.jpeg'),
        require('@/components/layout/img/image5.jpeg'),
      ],
      foodItems: [
        {
          name: "찬미 디저트 카페",
          image: require("@/img/food1.png"),
        },
        {
          name: "수빈 레스토랑",
          image: require("@/img/food2.png"),
        },
        {
          name: "예은 초밥집",
          image: require("@/img/food3.png"),
        },
      ],
      customInterval: null,
      currentMonth: new Date().getMonth() + 1,
      currentYear: new Date().getFullYear(),
      daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
    };
  },
  computed: {
    daysInMonth() {
      const days = new Date(this.currentYear, this.currentMonth, 0).getDate();
      return Array.from({ length: days }, (_, i) => i + 1);
    },
  },
  methods: {
    prevMonth() {
      if (this.currentMonth === 1) {
        this.currentMonth = 12;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    },
    nextMonth() {
      if (this.currentMonth === 12) {
        this.currentMonth = 1;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    },
    isToday(date) {
      const today = new Date();
      return (
          this.currentYear === today.getFullYear() &&
          this.currentMonth === today.getMonth() + 1 &&
          date === today.getDate()
      );
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.customInterval = setInterval(() => {
        if (this.$refs.carousel) {
          this.$refs.carousel.next();
        }
      }, 2200);
    });
  },
  beforeUnmount() {
    clearInterval(this.customInterval);
  },
};
</script>

<style scoped>
.carousel-container {
  width: 100%;
  margin-top: 3%;
  overflow: hidden;
}

.carousel-image {
  width: 100%;
  height: 500px;
  border-radius: 10px;
  object-fit: fill;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}

.random-food {
  text-align: center;
  margin: 40px 0;
}

.random-food h2 {
  font-size: 40px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
}

.food-cards {
  display: flex;
  justify-content: center;
  gap: 200px;
  padding: 0 5%;
}

.food-card {
  width: 380px;
  height: 450px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}

.food-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
}

.food-card p {
  font-size: 30px;
  font-weight: bold;
  color: #444;
  text-align: center;
}

.food-card button {
  padding: 10px 18px;
  background-color: #91bd59;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.food-card button:hover {
  background-color: #76a547;
}


table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

.calendar-section {
  margin: 40px auto;
  width: 80%;
  text-align: center;
}

.calendar {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: #fff;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.calendar-header button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.calendar-header button:hover {
  background-color: #0056b3;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.calendar-day {
  font-weight: bold;
  padding: 5px 0;
}

.calendar-date {
  padding: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
  cursor: pointer;
}

.calendar-date:hover {
  background-color: #007bff;
  color: #fff;
}

.calendar-date.today {
  background-color: #76a547;
  color: #fff;
}
</style>