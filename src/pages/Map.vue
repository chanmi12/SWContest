<template>
  <div>
    <div id="map"></div>

    <div v-if="coordinates">
      <p>클릭한 좌표: {{ coordinates }}</p>
    </div>

    <div v-if="placesList.length > 0" class="search-container">
      <input
          type="text"
          v-model="searchQuery"
          placeholder="음식점 이름을 입력하세요"
          class="search-input"
      />
    </div>

    <div v-if="filteredPlaces.length > 0" class="places-table">
      <h3>음식점 목록</h3>
      <table>
        <thead>
        <tr>
          <th>번호</th>
          <th>음식점 이름</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(place, index) in filteredPlaces" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ place.name }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <p>검색 결과가 없습니다.</p>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>예약하기</h2>

        <p><strong>{{ selectedPlace.name }}</strong></p>

        <div class="form-group">
          <label for="name">예약자명:</label>
          <input
              type="text"
              id="name"
              v-model="reservation.name"
              placeholder="예약자 이름을 입력하세요"
              required
          />
        </div>

        <div class="form-group">
          <label for="time">예약 시간:</label>
          <select v-model="reservation.time" required>
            <option value="" disabled>예약 시간을 선택하세요</option>
            <option v-for="time in timeSlots" :key="time" :value="time">{{ time }}</option>
          </select>
        </div>

        <button class="modal-button" @click="makeReservation" :disabled="!reservation.name || !reservation.time">
          예약하기
        </button>
        <button class="modal-button" @click="closeModal">닫기</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Map",
  data() {
    return {
      map: null,
      infowindow: null,
      ps: null,
      markers: [],
      coordinates: null,
      placesList: [],
      showModal: false,
      selectedPlace: {},
      reservation: {
        name: "",
        time: "",
      },
      timeSlots: [],
      searchQuery: "",
    };
  },
  computed: {
    filteredPlaces() {
      return this.placesList.filter((place) =>
          place.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  mounted() {
    this.initKakaoMapScript();
    this.generateTimeSlots();
  },
  methods: {
    initKakaoMapScript() {
      if (document.getElementById("kakao-map-script")) {
        this.loadMap();
      } else {
        const script = document.createElement("script");
        script.id = "kakao-map-script";
        script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=6a6ea475ad28f19954eb6072753efce4&libraries=services&autoload=false";
        script.async = true;

        script.onload = () => {
          if (window.kakao && window.kakao.maps) {
            window.kakao.maps.load(() => {
              this.loadMap();
            });
          } else {
            console.error("Failed to initialize Kakao Maps API");
          }
        };

        script.onerror = () => {
          console.error("Failed to load Kakao Maps script. Check your API key and domain settings.");
        };

        document.head.appendChild(script);
      }
    },

    loadMap() {
      if (!window.kakao || !window.kakao.maps) {
        console.error("Kakao Maps API not loaded properly.");
        return;
      }

      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(36.089899745207, 129.389866308208),
        level: 3,
      };

      this.map = new window.kakao.maps.Map(container, options);
      this.infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
      this.ps = new window.kakao.maps.services.Places(this.map);

      window.kakao.maps.event.addListener(this.map, "idle", () => {
        this.searchPlaces();
      });

      window.kakao.maps.event.addListener(this.map, "click", this.handleMapClick);

      this.searchPlaces();
    },

    handleMapClick(mouseEvent) {
      const latLng = mouseEvent.latLng;
      if (latLng) {
        const lat = latLng.getLat().toFixed(6);
        const lng = latLng.getLng().toFixed(6);
        this.coordinates = `위도: ${lat}, 경도: ${lng}`;
      }
    },

    searchPlaces() {
      this.infowindow.close();
      this.clearMarkers();
      this.placesList = [];
      this.ps.categorySearch("FD6", this.placesSearchCB, { useMapBounds: true });
    },

    placesSearchCB(data, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        for (let i = 0; i < data.length; i++) {
          this.displayMarker(data[i]);
        }
      } else {
        console.error("Failed to retrieve places: Status - ", status);
      }
    },

    displayMarker(place) {
      axios
          .get("http://localhost:8081/api/mapData", {
            params: {latitude: place.y, longitude: place.x},
          })
          .then((response) => {
            const mapData = response.data;

            const matchingData = mapData.find(
                (item) =>
                    Number(item.latitude) === Number(place.y) &&
                    Number(item.longitude) === Number(place.x)
            );

            const reviewCount = matchingData ? Number(matchingData.reviewCount) : 0;

            let markerImage;
            if (reviewCount < 500) {
              markerImage = require("@/img/red_marker.png");
            } else if (reviewCount >= 500 && reviewCount < 1000) {
              markerImage = require("@/img/yellow_marker.png");
            } else {
              markerImage = require("@/img/blue_marker.png");
            }

            const imageSize = new window.kakao.maps.Size(24, 35);
            const markerImageObj = new window.kakao.maps.MarkerImage(markerImage, imageSize);

            const marker = new window.kakao.maps.Marker({
              map: this.map,
              position: new window.kakao.maps.LatLng(place.y, place.x),
              image: markerImageObj,
            });

            window.kakao.maps.event.addListener(marker, "click", () => {
              this.selectedPlace = {
                name: place.place_name,
                reviewCount,
                latitude: place.y,
                longitude: place.x,
              };
              this.showModal = true;
            });

            this.markers.push(marker);

            this.placesList.push({
              name: place.place_name,
              reviewCount,
              latitude: place.y,
              longitude: place.x,
            });
          })
          .catch((error) => {
            console.error("Error fetching map data:", error);
          });
    },

    clearMarkers() {
      for (let marker of this.markers) {
        marker.setMap(null);
      }
      this.markers = [];
    },

    closeModal() {
      this.showModal = false;
      this.reservation.name = "";
      this.reservation.time = "";
    },

    makeReservation() {
      alert(`예약자: ${this.reservation.name}\n예약 시간: ${this.reservation.time}`);
      this.closeModal();
    },

    generateTimeSlots() {
      const times = [];
      const start = 9;
      const end = 23;

      for (let h = start; h <= end; h++) {
        for (let m = 0; m < 60; m += 30) {
          const hour = h < 10 ? `0${h}` : h;
          const minute = m === 0 ? "00" : "30";
          times.push(`${hour}:${minute}`);
        }
      }

      this.timeSlots = times;
    },
  },
};
</script>

<style scoped>
#map {
  width: 80%;
  height: 800px;
  margin: 20px auto;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.modal {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.modal-content {
  position: relative;
  width: 40%;
  margin: 100px auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}

.modal-button {
  background-color: #3498db;
  color: white;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-button:disabled {
  background-color: #ddd;
}

.search-container {
  text-align: center;
  margin-bottom: 20px;
}

.search-input {
  width: 50%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.places-table {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.places-table table {
  width: 100%;
  border-collapse: collapse;
}

.places-table th,
.places-table td {
  padding: 10px;
  text-align: center;
}

.places-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}
</style>
