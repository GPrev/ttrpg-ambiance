<template>
  <q-img
    v-if="props.image && props.image.url"
    :src="props.image.url"
    :ratio="16 / 9"
  >
    <template v-slot:error>
      <div class="flex flex-center bg-grey" style="aspect-ratio: 16/9">
        <q-icon name="image_not_supported" size="xl" color="white" />
      </div>
    </template>
  </q-img>
  <div v-else class="flex flex-center bg-grey" style="aspect-ratio: 16/9">
    <q-icon name="image_not_supported" size="xl" color="white" />
  </div>
</template>

<script setup lang="ts">
import { ImageSource } from 'src/models/viewModels';

const props = defineProps<{
  image: ImageSource | null;
}>();
</script>
