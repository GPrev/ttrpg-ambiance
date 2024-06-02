<template>
  <img v-if="props.image" :src="props.image.url" />
  <q-icon v-else name="image_not_supported" size="xl" color="grey" />
</template>

<script setup lang="ts">
import { ImageSource } from 'src/models/viewModels';

const props = defineProps<{
  image: ImageSource | null;
}>();
</script>
