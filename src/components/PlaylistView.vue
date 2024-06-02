<template>
  <AmbianceView :ambiance="props.playlist.ambiances[0]" />
</template>

<script setup lang="ts">
import { Playlist } from 'src/models/viewModels';

const props = defineProps<{
  playlist: Playlist;
}>();
</script>
