import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieDetail from '../views/MovieDetail.vue'

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        // This is the individual movie page, so it accepts a parameter ID.
        path: '/movie/:id',
        name: 'MovieDetail',
        component: MovieDetail
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router