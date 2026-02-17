<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const documents = ref([]);
const loading = ref(false);

const fetchBooks = async () => {
    loading.value = true;
    try {
        const data = await getBooks();
        // Map API data to UI structure if necessary
        documents.value = data.map(book => ({
            id: book.id,
            title: book.title,
            department: book.department || 'General',
            departmentColor: book.departmentColor || 'text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700',
            url: book.url || 'http://localhost:8000/books/' + book.id,
            modified: book.updated_at ? new Date(book.updated_at).toLocaleDateString() : 'Recently',
            views: book.views || '0',
            coverImage: book.cover_image || 'https://via.placeholder.com/300x400',
            badge: book.status === 'Published' ? null : book.status
        }));
    } catch (error) {
        console.error('Failed to fetch books:', error);
    } finally {
        loading.value = false;
    }
};

import { onMounted } from 'vue';
import { getBooks } from '@/api/books';

onMounted(() => {
    fetchBooks();
});

const navigateToFlipbook = (id) => {
    router.push('/book');
};
</script>

<template>
    <div
        class="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-200">
        <!-- Sidebar -->
        <aside class="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
            <div class="p-6 flex items-center gap-3">
                <div class="w-8 h-8 bg-primary rounded flex items-center justify-center text-white">
                    <span class="material-symbols-outlined text-xl">corporate_fare</span>
                </div>
                <h1 class="text-lg font-bold tracking-tight text-slate-900 dark:text-white uppercase">DocPortal</h1>
            </div>
            <nav class="flex-1 px-4 space-y-1">
                <a href="#"
                    class="flex items-center gap-3 px-3 py-2 text-sm font-semibold rounded-lg bg-primary/10 text-primary">
                    <span class="material-symbols-outlined">description</span>
                    My Documents
                </a>
                <a href="#"
                    class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <span class="material-symbols-outlined">group</span>
                    Shared with Me
                </a>
                <a href="#"
                    class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <span class="material-symbols-outlined">admin_panel_settings</span>
                    Administration
                </a>
            </nav>
            <div class="p-6 border-t border-slate-100 dark:border-slate-800">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Server Storage</span>
                    <span class="text-[10px] font-bold text-slate-600 dark:text-slate-400">4.2 / 10 GB</span>
                </div>
                <div class="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                    <div class="bg-corporate-grey h-1.5 rounded-full w-[42%]"></div>
                </div>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto">
            <header
                class="sticky top-0 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 py-4 flex items-center justify-between">
                <div class="relative w-96">
                    <span
                        class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                    <input type="text" placeholder="Search internal documents..."
                        class="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:ring-1 focus:ring-primary text-sm transition-all">
                </div>
                <div class="flex items-center gap-4">
                    <button
                        class="px-4 py-2 bg-primary text-white text-sm font-semibold rounded shadow-sm hover:bg-blue-800 transition-colors flex items-center gap-2">
                        <span class="material-symbols-outlined text-lg">upload</span>
                        Upload PDF
                    </button>
                    <div class="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
                    <div class="flex items-center gap-3">
                        <div class="text-right hidden md:block">
                            <p class="text-xs font-bold text-slate-900 dark:text-white leading-none">Alex Rivera</p>
                            <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-tighter">
                                Operations Dept.</p>
                        </div>
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_U9MeueZtybw3yKM6kuMxmfMm33RSELEOMXMDBSFvwm9yWoWHoPwl0jnd-fOf9RSj7WYUYovbFaciyO_B6JIkWvYNGkbVwFdLgMhQzYu6jv5kiml7ZINe1U9lf8WxERHZAnM-K_l-vqjP1dxAfSYt5Q9YtJhn3TOy0Ubq37Cfy6_YdEt5gAE0HwV9-IEvuHM3XOQkx3aN94V4fT9-WosvLR_nvxTw4zRY7xFjV78uIEfZ-FJjtt00Q7D1riMC84vhwyYdErchhrg"
                            alt="User profile" class="w-8 h-8 rounded-full border border-slate-200 object-cover">
                    </div>
                </div>
            </header>

            <div class="p-8">
                <div class="flex items-center justify-between mb-8">
                    <div>
                        <h2 class="text-xl font-bold text-slate-900 dark:text-white">Recent Documents</h2>
                        <p class="text-sm text-slate-500 mt-1">Internal corporate flipbooks and reports</p>
                    </div>
                    <div
                        class="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded border border-slate-200 dark:border-slate-700">
                        <button class="p-1.5 text-primary bg-slate-100 dark:bg-slate-700 rounded transition-colors">
                            <span class="material-symbols-outlined text-lg">grid_view</span>
                        </button>
                        <button class="p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
                            <span class="material-symbols-outlined text-lg">format_list_bulleted</span>
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <div v-for="doc in documents" :key="doc.id"
                        class="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded shadow-sm hover:shadow-md transition-all">
                        <div class="relative aspect-[3/4] bg-slate-50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800 cursor-pointer"
                            @click="navigateToFlipbook(doc.id)">
                            <img :src="doc.coverImage" alt="Document cover" class="w-full h-full object-cover p-2">
                            <div
                                class="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity">
                            </div>
                            <span v-if="doc.badge"
                                class="absolute top-4 right-4 px-2 py-1 bg-white/90 dark:bg-slate-900/90 text-[10px] font-bold rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">{{
                                doc.badge }}</span>
                        </div>
                        <div class="p-4">
                            <div class="flex items-start justify-between gap-2 mb-2">
                                <h3 class="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 cursor-pointer hover:text-primary transition-colors"
                                    @click="navigateToFlipbook(doc.id)">{{ doc.title }}</h3>
                            </div>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span
                                    :class="['px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[10px] font-bold rounded uppercase tracking-wider border', doc.departmentColor]">{{
                                    doc.department }}</span>
                            </div>
                            <div class="space-y-2 border-t border-slate-50 dark:border-slate-800 pt-3">
                                <div class="flex items-center gap-2 text-xs text-slate-500">
                                    <span class="material-symbols-outlined text-sm">link</span>
                                    <span class="truncate">{{ doc.url }}</span>
                                </div>
                                <div class="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                                    <span>Modified {{ doc.modified }}</span>
                                    <span>{{ doc.views }} Views</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-2 mt-4">
                                <button @click="navigateToFlipbook(doc.id)"
                                    class="flex-1 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 hover:bg-primary hover:text-white hover:border-primary transition-all">
                                    View Flipbook
                                </button>
                                <button class="p-1.5 text-slate-400 hover:text-red-600 transition-colors">
                                    <span class="material-symbols-outlined text-lg">delete</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- New Document Button -->
                    <button
                        class="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded aspect-[3/4] flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-primary hover:border-primary hover:bg-blue-50/50 dark:hover:bg-primary/5 transition-all group">
                        <div
                            class="w-12 h-12 rounded bg-slate-50 dark:bg-slate-800 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                            <span class="material-symbols-outlined text-2xl">add_circle</span>
                        </div>
                        <span class="text-xs font-bold uppercase tracking-wider">New Document</span>
                    </button>
                </div>
            </div>
        </main>
    </div>
</template>
