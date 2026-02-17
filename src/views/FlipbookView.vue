<script setup>
import { ref } from 'vue';
import Flipbook from '../components/Flipbook.vue';

// Mock data for pages
const pages = [
    { type: 'image', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOREhY5SC7c5kLQR1BEikRKYNBjUtyep0sOchzBUI3_ZR6CHTGqoKS4ItqLXnttbnnhlzkXCvikggKwK_x6ZWwmJGh18Ufh4JSynxP3XPzqEU83kG_zQZ9o-KPJDsS0tBvqnp4miFakERnpS3QEyxWcIieTDr-N1xK_7ig6lwSou5tHhG5a0CqXKTnIIpRH1Tk5_HmiMHeWAuQ9iRhEq6wiNFxpAwyeyIpZawpcq7YRQQJ6awTcjMhR9wq3sG5ueDc6ItUW0U3iGM' },
    { type: 'image', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsIsPHmDMtlldBDr2H4CxnKZuEDUDxxZvvlW1-F7i0XEtp6t7PywkpUH9coiBJnD8f6JodE6i6VrLagKt2bpQK3RkVUdSKNmqmL2tQx5gPOWRwT1lvv3D3MqKYoyrOqxA6pBefS1KYgO5wV55UDmO2OibzfTGE0eUaUbMWvHP6n9Nf2-WDuOYckBV0g03dYKlyIXg2IL16gemICTYCJe6iga499Baj9do1HH_IussSda3_k1OSREopPV0lC6XGvJ-gKPDCr69auLc' },
    { type: 'text', content: 'Chapter 1: Operational Excellence' },
    { type: 'text', content: 'Details on quarterly targets and KPIs...' },
];

const showBranding = ref(true);
const selectedDepartment = ref('All Departments');

// Theme handling (simple implementation)
const setTheme = (theme) => {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
};
</script>

<template>
    <div
        class="font-display bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 min-h-screen flex flex-col">
        <header
            class="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-6 sticky top-0 z-50">
            <div class="flex items-center gap-4">
                <button
                    class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
                    <span class="material-icons text-xl">arrow_back</span>
                </button>
                <div>
                    <nav class="flex items-center gap-2 text-sm text-slate-500 mb-0.5">
                        <span>Internal Portal</span>
                        <span class="material-icons text-xs">chevron_right</span>
                        <span class="text-slate-400">Flipbook Editor</span>
                    </nav>
                    <h1 class="text-lg font-semibold leading-none">Q3 Operations Manual.pdf</h1>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <button
                    class="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                    Preview
                </button>
                <button
                    class="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all">
                    Update Internal Link
                </button>
            </div>
        </header>
        <main class="flex-1 flex overflow-hidden">
            <aside
                class="w-80 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto custom-scrollbar">
                <div class="p-6 space-y-8">
                    <section>
                        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
                            Branding</h3>
                        <div
                            class="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                            <div>
                                <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Company Logo</span>
                                <p class="text-[10px] text-slate-500">Show corporate header</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" v-model="showBranding" class="sr-only peer">
                                <div
                                    class="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary">
                                </div>
                            </label>
                        </div>
                    </section>
                    <hr class="border-slate-100 dark:border-slate-800" />
                    <section>
                        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
                            Department Access</h3>
                        <div class="space-y-4">
                            <div>
                                <label
                                    class="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">Restricted
                                    To</label>
                                <select v-model="selectedDepartment"
                                    class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-3 py-2 focus:ring-primary focus:border-primary">
                                    <option>All Departments</option>
                                    <option>Engineering</option>
                                    <option>Human Resources</option>
                                    <option>Sales & Marketing</option>
                                    <option>Operations</option>
                                    <option>Executive Board</option>
                                </select>
                            </div>
                            <div
                                class="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-100 dark:border-blue-800">
                                <span class="material-icons text-blue-500 text-sm">info</span>
                                <p class="text-[11px] text-blue-600 dark:text-blue-400 leading-tight">Access is managed
                                    via Single Sign-On (SSO) integration.</p>
                            </div>
                        </div>
                    </section>
                    <hr class="border-slate-100 dark:border-slate-800" />
                    <section>
                        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
                            Theme</h3>
                        <div class="grid grid-cols-3 gap-2">
                            <button @click="setTheme('light')"
                                class="aspect-square rounded-lg border-2 border-primary bg-slate-50 flex items-center justify-center overflow-hidden">
                                <div class="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200"></div>
                            </button>
                            <button @click="setTheme('dark')"
                                class="aspect-square rounded-lg border-2 border-transparent bg-slate-50 flex items-center justify-center overflow-hidden">
                                <div class="w-full h-full bg-slate-800"></div>
                            </button>
                            <button
                                class="aspect-square rounded-lg border-2 border-transparent bg-slate-50 flex items-center justify-center overflow-hidden">
                                <div class="w-full h-full bg-blue-900"></div>
                            </button>
                        </div>
                    </section>
                </div>
            </aside>
            <div class="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden">
                <div class="flex-1 p-8 flex flex-col items-center justify-center relative">
                    <div
                        class="absolute top-4 flex items-center bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-200 dark:border-slate-700 p-1">
                        <button class="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-primary">
                            <span class="material-icons">desktop_windows</span>
                        </button>
                        <button class="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-400">
                            <span class="material-icons">tablet_mac</span>
                        </button>
                    </div>
                    <div
                        class="w-full max-w-4xl aspect-[4/3] bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
                        <div
                            class="h-10 border-b border-slate-100 dark:border-slate-800 flex items-center px-4 bg-slate-50/50 dark:bg-slate-800/50">
                            <div class="flex gap-1.5">
                                <div class="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                                <div class="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                                <div class="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                            </div>
                            <div class="mx-auto text-[10px] text-slate-400 font-medium">
                                internal-cdn.company.local/docs/v/39482</div>
                        </div>
                        <div class="flex-1 flex items-center justify-center p-12 bg-slate-200/30 relative">
                            <!-- Flipbook Integration -->
                            <div class="w-full h-full flex items-center justify-center">
                                <Flipbook :pages="pages" />
                            </div>
                            <!-- Navigation buttons overlaid if needed, but Flipbook usually handles them. 
                                 Keeping the decorative ones from HTML for now but hidden or adjusted?
                                 The HTML had simple chevron buttons.
                            -->
                            <button
                                class="absolute left-4 p-2 bg-white/80 rounded-full shadow hover:bg-white transition-colors pointer-events-none opacity-50">
                                <span class="material-icons">chevron_left</span>
                            </button>
                            <button
                                class="absolute right-4 p-2 bg-white/80 rounded-full shadow hover:bg-white transition-colors pointer-events-none opacity-50">
                                <span class="material-icons">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8">
                    <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                        <div class="flex-1 w-full space-y-3">
                            <div>
                                <h4 class="text-sm font-semibold text-slate-800 dark:text-slate-200">Internal Share Link
                                </h4>
                                <p class="text-xs text-slate-500">Available only within the corporate network</p>
                            </div>
                            <div class="flex gap-2">
                                <div
                                    class="flex-1 flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2">
                                    <span class="material-icons text-slate-400 text-sm mr-2">lock</span>
                                    <input
                                        class="w-full bg-transparent border-none p-0 text-sm text-slate-600 focus:ring-0"
                                        readonly type="text"
                                        value="https://internal.company.local/docs/39482-ops-manual">
                                </div>
                                <button
                                    class="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
                                    <span class="material-icons text-sm">content_copy</span>
                                    Copy Link
                                </button>
                            </div>
                        </div>
                        <div class="w-full md:w-auto flex flex-col gap-3">
                            <div>
                                <h4 class="text-sm font-semibold text-slate-800 dark:text-slate-200">Local Distribution
                                </h4>
                                <p class="text-xs text-slate-500">For offline or server hosting</p>
                            </div>
                            <button
                                class="w-full md:w-auto border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-6 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                                <span class="material-icons text-sm">file_download</span>
                                Download for Offline
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>
/* Scoped styles if any, most moved to Tailwind */
</style>
