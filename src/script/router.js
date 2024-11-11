import {createRouter, createWebHistory} from 'vue-router';
import Main from '@/pages/Main.vue';
import Map from '@/pages/Map.vue';
import MyPage from "@/pages/MyPage.vue";
import LoginPage from "@/pages/Login.vue";
import Reservation from "@/pages/Reservation.vue";

const routes = [
    { path: '/', component: Main },
    { path: '/map', component: Map},
    { path: '/mypage', component: MyPage},
    { path: '/reservation', component: Reservation},
    { path: '/login', component: LoginPage}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;