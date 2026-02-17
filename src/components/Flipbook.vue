<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { PageFlip } from 'page-flip';

const props = defineProps({
  pages: {
    type: Array,
    required: true,
  },
});

const bookContainer = ref(null);
let pageFlip = null;

onMounted(() => {
  pageFlip = new PageFlip(bookContainer.value, {
    width: 400, // base page width
    height: 600, // base page height
    size: 'stretch',
    minWidth: 315,
    maxWidth: 1000,
    minHeight: 420,
    maxHeight: 1350,
    maxShadowOpacity: 0.5,
    showCover: true,
    mobileScrollSupport: false,
  });

  pageFlip.loadFromHTML(bookContainer.value.querySelectorAll('.page'));

});

onBeforeUnmount(() => {
  if (pageFlip) {
    pageFlip.destroy();
  }
});
</script>

<template>
  <div class="flipbook-wrapper">
    <div class="flipbook" ref="bookContainer">
      <!-- Cover -->
      <div class="page cover" data-density="hard">
        <div class="page-content">
          <h2>Book Title</h2>
          <p>Click or drag to flip</p>
        </div>
      </div>

      <!-- Pages from props -->
      <div v-for="(page, index) in props.pages" :key="index" class="page">
        <div class="page-content">
          <div v-if="page.type === 'image'" class="image-container">
            <img :src="page.url" :alt="'Page ' + (index + 1)" />
            <span class="page-number">{{ index + 1 }}</span>
          </div>
          <div v-else class="text-content">
            <!-- Fallback for simple testing if no images provided -->
            <h3>Page {{ index + 1 }}</h3>
            <p>{{ page.content || 'Lorem ipsum dolor sit amet...' }}</p>
            <span class="page-number">{{ index + 1 }}</span>
          </div>
        </div>
      </div>

      <!-- Back Cover -->
      <div class="page cover" data-density="hard">
        <div class="page-content">
          <h2>The End</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flipbook-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}


.flipbook {
  /* page-flip handles dimensions */
}

.page {
  background-color: white;
  border: 1px solid #c2c2c2;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.page-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.cover {
  background-color: #3e3e3e;
  color: white;
  border: 1px solid #222;
}

.image-container img {
  max-width: 100%;
  max-height: 90%;
  object-fit: contain;
}

.page-number {
  position: absolute;
  bottom: 10px;
  font-size: 12px;
  color: #888;
}
</style>
