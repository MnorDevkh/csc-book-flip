<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/api/auth';
import { message } from 'ant-design-vue';

const router = useRouter();

const formState = reactive({
    username: '',
    password: '',
    remember: true,
});

const loading = ref(false);

const onFinish = async values => {
    loading.value = true;
    try {
        const response = await login({
            username: values.username,
            password: values.password
        });
        
        // Assuming response contains token or user data
        if (response.access_token) {
            localStorage.setItem('token', response.access_token);
            message.success('Login successful');
            router.push('/');
        } else {
             message.error('Login failed: No token received');
        }

    } catch (error) {
        console.error('Login error:', error);
        message.error(error.response?.data?.detail || 'Login failed');
    } finally {
        loading.value = false;
    }
};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
</script>

<template>
    <div class="login-container">
        <a-card title="Login" class="login-card">
            <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
                autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
                <a-form-item label="Username" name="username"
                    :rules="[{ required: true, message: 'Please input your username!' }]">
                    <a-input v-model:value="formState.username" />
                </a-form-item>

                <a-form-item label="Password" name="password"
                    :rules="[{ required: true, message: 'Please input your password!' }]">
                    <a-input-password v-model:value="formState.password" />
                </a-form-item>

                <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
                    <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
                </a-form-item>

                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <a-button type="primary" html-type="submit" :loading="loading">Submit</a-button>
                </a-form-item>
            </a-form>
        </a-card>
    </div>
</template>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f2f5;
}

.login-card {
    width: 400px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
