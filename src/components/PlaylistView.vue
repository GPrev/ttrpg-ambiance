<template>
  <AmbianceView :ambiance="props.playlist.ambiances[0] || null" />
</template>

<script setup lang="ts">
import AmbianceView from './AmbianceView.vue';
import { Playlist } from 'src/models/viewModels';

const props = defineProps<{
  playlist: Playlist;
}>();
</script>
