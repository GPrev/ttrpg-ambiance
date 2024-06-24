<template>
  <ImageView :image="props.ambiance?.background || null" />
</template>

<script setup lang="ts">
import ImageView from './ImageView.vue';
import { Ambiance } from 'src/models/viewModels';

const props = defineProps<{
  ambiance: Ambiance | null | undefined;
}>();
</script>
