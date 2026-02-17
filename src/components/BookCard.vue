<script setup>
defineProps({
    title: String,
    author: String,
    coverImage: String,
    id: [String, Number]
});

const emit = defineEmits(['click']);
</script>

<template>
    <a-card hoverable class="book-card" @click="emit('click', id)">
        <template #cover>
            <div class="cover-wrapper">
                <img v-if="coverImage" :alt="title" :src="coverImage" />
                <div v-else class="placeholder-cover">
                    <span>{{ title }}</span>
                </div>
            </div>
        </template>
        <a-card-meta :title="title">
            <template #description>{{ author }}</template>
        </a-card-meta>
    </a-card>
</template>

<style scoped>
.book-card {
    width: 240px;
    cursor: pointer;
    transition: transform 0.2s;
}

.book-card:hover {
    transform: translateY(-5px);
}

.cover-wrapper {
    height: 320px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
}

.cover-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.placeholder-cover {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
    padding: 20px;
    text-align: center;
}
</style>
