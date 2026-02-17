import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import FlipbookView from '../views/FlipbookView.vue';
import AboutView from '../views/AboutView.vue';
import LoginView from '../views/LoginView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/book',
            name: 'book',
            component: FlipbookView,
        },
        {
            path: '/about',
            name: 'about',
            component: AboutView,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/admin',
            component: () => import('../layouts/AdminLayout.vue'),
            children: [
                {
                    path: '',
                    redirect: 'dashboard'
                },
                {
                    path: 'dashboard',
                    name: 'admin-dashboard',
                    component: () => import('../views/admin/AdminDashboardView.vue'),
                    meta: { title: 'Dashboard' }
                },
                {
                    path: 'books',
                    name: 'admin-books',
                    component: () => import('../views/admin/AdminBooksView.vue'),
                    meta: { title: 'Books Management' },
                    alias: 'book' // Handle /admin/book as well
                }
            ]
        },
    ],
});

export default router;
