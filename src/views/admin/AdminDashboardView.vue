<script setup>
import {
    ArrowUpOutlined,
    ArrowDownOutlined,
    UserOutlined,
    ReadOutlined
} from '@ant-design/icons-vue';
</script>

<template>
    <div class="dashboard-container">
        <a-row :gutter="16">
            <a-col :span="8">
                <a-card>
                    <a-statistic title="Total Users" :value="1128" style="margin-right: 50px">
                        <template #prefix>
                            <user-outlined />
                        </template>
                    </a-statistic>
                </a-card>
            </a-col>
            <a-col :span="8">
                <a-card>
                    <a-statistic title="Total Books" :value="93" :precision="0">
                        <template #prefix>
                            <read-outlined />
                        </template>
                        <template #suffix>
                            <span> / 100</span>
                        </template>
                    </a-statistic>
                </a-card>
            </a-col>
            <a-col :span="8">
                <a-card>
                    <a-statistic title="Active Readers" :value="11.28" :precision="2" suffix="%"
                        :value-style="{ color: '#3f8600' }">
                        <template #prefix>
                            <arrow-up-outlined />
                        </template>
                    </a-statistic>
                </a-card>
            </a-col>
        </a-row>

        <a-row :gutter="16" style="margin-top: 24px">
            <a-col :span="16">
                <a-card title="Recent Activity">
                    <a-list item-layout="horizontal" :data-source="[]">
                        <a-empty description="No recent activity" />
                    </a-list>
                </a-card>
            </a-col>
            <a-col :span="8">
                <a-card title="System Status">
                    <p><strong>Version:</strong> 1.0.0</p>
                    <p><strong>Server:</strong> Online</p>
                    <p><strong>Database:</strong> Connected</p>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>
