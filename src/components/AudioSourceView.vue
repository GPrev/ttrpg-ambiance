<template>
  <div class="flex flex-center" :class="props.audio?.url ? 'bg-primary' : 'bg-grey'" style="aspect-ratio: 16/9">
    <q-icon v-if="props.audio" :name="props.audio?.url ? 'music_note' : 'music_off'" size="xl" color="white" />
  </div>
</template>

<script setup lang="ts">
import { AudioSource } from 'src/models/viewModels';

const props = defineProps<{
  audio: AudioSource | null;
}>();
</script>
