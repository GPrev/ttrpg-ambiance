<template>
  <ImageSourceView :image="props.image?.source || null" />
</template>

<script setup lang="ts">
import ImageSourceView from './ImageSourceView.vue';
import { Image } from 'src/models/viewModels';

const props = defineProps<{
  image: Image | null;
}>();
</script>
