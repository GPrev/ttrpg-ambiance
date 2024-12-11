<template>
  <q-page class="text-center q-pa-md flex flex-center">
    <q-spinner v-if="isLoading" color="primary" size="3em" />
    <div v-else>
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card v-for="[imageKey, image] of images" :key="imageKey" class="size-vignette">
          <ImageSourceView :image="image" class="image-vignette" />

          <q-card-section horizontal class="justify-between">
            <q-card-section class="min-width-0">
              <div class="text-h6 ellipsis">{{ image.name }}</div>
            </q-card-section>
            <q-card-actions class="no-wrap">
              <q-btn flat round color="accent" icon="edit" @click="
                (
                  $refs.editDialog as typeof ImageSourceEditDialog
                ).editExisting(image)
                " />
              <q-btn flat round color="red" icon="delete" @click="imagesStore.delete(image)" />
            </q-card-actions>
          </q-card-section>
        </q-card>
      </div>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="accent" @click="($refs.editDialog as typeof ImageSourceEditDialog).editNew()" />
      </q-page-sticky>
    </div>
    <ImageSourceEditDialog ref="editDialog" />
  </q-page>
</template>

<script setup lang="ts">
import ImageSourceView from 'src/components/ImageSourceView.vue';
import { computed } from 'vue';
import { useImagesStore } from 'src/stores/images-store';
import ImageSourceEditDialog from 'src/components/ImageSourceEditDialog.vue';
const imagesStore = useImagesStore();

const images = computed(() => {
  return [...Object.entries(imagesStore.getAll())].sort((a, b) => (a[1].name.localeCompare(b[1].name)))
});
const isLoading = computed(() => {
  return imagesStore.isLoading();
});
</script>
