<template>
  <ImageSourceView :class="{ 'horizontal-mirror': image?.mirroredHorizontally }" :image="props.image?.source || null" />
</template>

<style>
.horizontal-mirror {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
</style>

<script setup lang="ts">
import ImageSourceView from './ImageSourceView.vue';
import { Image } from 'src/models/viewModels';

const props = defineProps<{
  image: Image | null;
}>();
</script>
