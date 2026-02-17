<script setup>
import { ref } from 'vue';
import { RouterView, useRouter, useRoute } from 'vue-router';
import {
    PieChartOutlined,
    BookOutlined,
    TeamOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons-vue';

const router = useRouter();
const route = useRoute();
const collapsed = ref(false);
const selectedKeys = ref([route.name]);

const onMenuClick = ({ key }) => {
    if (key === 'logout') {
        logout();
        message.success('Logged out successfully');
        router.push('/login');
    } else {
        router.push({ name: key });
    }
};

import { logout } from '@/api/auth';
import { message } from 'ant-design-vue';
</script>

<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed" collapsible>
            <div class="logo">CSC Admin</div>
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" @click="onMenuClick">
                <a-menu-item key="admin-dashboard">
                    <pie-chart-outlined />
                    <span>Dashboard</span>
                </a-menu-item>
                <a-menu-item key="admin-books">
                    <book-outlined />
                    <span>Books Management</span>
                </a-menu-item>
                <a-menu-item key="admin-users">
                    <user-outlined />
                    <span>User Management</span>
                </a-menu-item>
                <a-sub-menu key="sub1">
                    <template #title>
                        <span>
                            <team-outlined />
                            <span>Team</span>
                        </span>
                    </template>
                    <a-menu-item key="6">Team 1</a-menu-item>
                    <a-menu-item key="8">Team 2</a-menu-item>
                </a-sub-menu>
                <a-menu-item key="settings">
                    <setting-outlined />
                    <span>Settings</span>
                </a-menu-item>
                <a-menu-item key="logout">
                    <logout-outlined />
                    <span>Logout</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0 20px">
                <div class="header-content">
                    <h3>Admin Portal</h3>
                    <a-avatar style="background-color: #87d068">
                        <template #icon>
                            <UserOutlined />
                        </template>
                    </a-avatar>
                </div>
            </a-layout-header>
            <a-layout-content style="margin: 0 16px">
                <a-breadcrumb style="margin: 16px 0">
                    <a-breadcrumb-item>Admin</a-breadcrumb-item>
                    <a-breadcrumb-item>{{ route.meta.title || route.name }}</a-breadcrumb-item>
                </a-breadcrumb>
                <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
                    <RouterView />
                </div>
            </a-layout-content>
            <a-layout-footer style="text-align: center">
                CSC Book Flip ©2026
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<style scoped>
.logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
}
</style>
