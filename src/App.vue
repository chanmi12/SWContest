<template>
  <HeaderBar />
  <RouterView />
</template>

<script>
import HeaderBar from '@/components/layout/Header.vue'

export default {
  name: 'App',
  components: {
    HeaderBar
  }
}

</script>

<style>
@font-face {
  font-family: 'SANJUGotgam';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2112@1.0/SANJUGotgam.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'Middleschool_student';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/naverfont_08@1.0/Middleschool_student.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'RixInooAriDuriR';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2207-01@1.0/RixInooAriDuriR.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}
</style>
