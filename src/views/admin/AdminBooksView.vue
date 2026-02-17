<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getBooks, createBook, deleteBook } from '@/api/books';
import { message } from 'ant-design-vue';

const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Author',
        dataIndex: 'author',
        key: 'author',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Action',
        key: 'action',
    },
];

const data = ref([]);
const loading = ref(false);

const fetchBooks = async () => {
    loading.value = true;
    try {
        const books = await getBooks();
        data.value = books.map(book => ({
            key: book.id,
            title: book.title,
            author: book.author || 'Unknown',
            status: book.status || 'Draft',
        }));
    } catch (error) {
        message.error('Failed to fetch books');
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchBooks();
});

const visible = ref(false);
const confirmLoading = ref(false);
const formState = reactive({
    title: '',
    author: '',
    status: 'Draft',
});

const showModal = () => {
    visible.value = true;
};

const fileList = ref([]);
const handleOk = async () => {
    if (formState.title && formState.author) {
        confirmLoading.value = true;
        try {
            let payload = {
                title: formState.title,
                author: formState.author,
                status: formState.status,
            };

            if (fileList.value.length > 0) {
                const formData = new FormData();
                formData.append('title', formState.title);
                formData.append('author', formState.author);
                formData.append('status', formState.status);
                formData.append('file', fileList.value[0].originFileObj);
                payload = formData;
            }

            await createBook(payload);
            message.success('Book created successfully');
            visible.value = false;
            formState.title = '';
            formState.author = '';
            fileList.value = [];
            fetchBooks(); // Refresh list
        } catch (error) {
            console.error(error);
            message.error('Failed to create book');
        } finally {
            confirmLoading.value = false;
        }
    } else {
        message.warning('Please fill in all fields');
    }
};

const beforeUpload = (file) => {
    fileList.value = [...fileList.value, file];
    return false;
};

const handleRemove = (file) => {
    const index = fileList.value.indexOf(file);
    const newFileList = fileList.value.slice();
    newFileList.splice(index, 1);
    fileList.value = newFileList;
};

const onDelete = async (key) => {
    try {
        await deleteBook(key);
        message.success('Book deleted successfully');
        fetchBooks(); // Refresh list
    } catch (error) {
        message.error('Failed to delete book');
    }
};
</script>

<template>
    <div>
        <div style="margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
            <h2>Books Management</h2>
            <a-button type="primary" @click="showModal">Add New Book</a-button>
        </div>

        <a-table :columns="columns" :data-source="data" :loading="loading">
            <template #headerCell="{ column }">
                <template v-if="column.key === 'title'">
                    <span>Title</span>
                </template>
            </template>

            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'title'">
                    <a>{{ record.title }}</a>
                </template>
                <template v-else-if="column.key === 'status'">
                    <span>
                        <a-tag :color="record.status === 'Published' ? 'green' : 'geekblue'">
                            {{ record.status.toUpperCase() }}
                        </a-tag>
                    </span>
                </template>
                <template v-else-if="column.key === 'action'">
                    <span>
                        <a>Edit</a>
                        <a-divider type="vertical" />
                        <a @click="onDelete(record.key)" style="color: red;">Delete</a>
                    </span>
                </template>
            </template>
        </a-table>

        <a-modal v-model:open="visible" title="Add New Book" @ok="handleOk" :confirmLoading="confirmLoading">
            <a-form layout="vertical">
                <a-form-item label="Title">
                    <a-input v-model:value="formState.title" />
                </a-form-item>
                <a-form-item label="Author">
                    <a-input v-model:value="formState.author" />
                </a-form-item>
                <a-form-item label="Status">
                    <a-select v-model:value="formState.status">
                        <a-select-option value="Draft">Draft</a-select-option>
                        <a-select-option value="Published">Published</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="PDF File">
                    <a-upload :file-list="fileList" :before-upload="beforeUpload" @remove="handleRemove" :max-count="1">
                        <a-button>
                            <span class="material-symbols-outlined">upload</span>
                            Select PDF
                        </a-button>
                    </a-upload>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
