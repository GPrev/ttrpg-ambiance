<template>
  <q-page class="text-center q-pa-md flex flex-center">
    <q-spinner v-if="isLoading" color="primary" size="3em" />
    <div v-if="!isLoading" class="q-pa-md row items-start q-gutter-md">
      <q-card
        v-for="[imageKey, image] of Object.entries(images)"
        :key="imageKey"
      >
        <ImageSourceView :image="image" />

        <q-card-section>
          <div class="text-h6">{{ image.name }}</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ImageSourceView from 'src/components/ImageSourceView.vue';
import { computed } from 'vue';
import { useImagesStore } from 'src/stores/images-store';
const imagesStore = useImagesStore();

const images = computed(() => {
  return imagesStore.getAll();
});
const isLoading = computed(() => {
  return imagesStore.isLoading();
});
</script>
