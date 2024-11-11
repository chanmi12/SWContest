<template>
  <div class="card_container">
    <div
        v-for="item in items"
        :key="item.id"
        class="card"
        :style="{ backgroundImage: 'url(' + item.imageUrl + ')' }">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  data() {
    return {
      // 예시로 이미지 URL을 포함한 아이템 목록
      items: [
        {id: 1, imageUrl: 'https://example.com/image1.jpg'},
        {id: 2, imageUrl: 'https://example.com/image2.jpg'},
        // 추가적인 아이템들
      ]
    }
  }
}
</script>

<style scoped>
.card_container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
}

.card {
  width: 380px;
  height: 450px;
  background-size: cover;
  background-position: center;
  border-radius: 19px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
