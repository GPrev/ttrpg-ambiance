<template>
  {{ props.tracklist?.name }}
</template>

<script setup lang="ts">
import { WildseaTracklist } from 'src/models/wildsea/viewModels';

const props = defineProps<{
  tracklist: WildseaTracklist | null;
}>();
</script>
