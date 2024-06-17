<template>
  <AmbianceView class="fullscreen" :ambiance="ambiance" />
</template>

<script lang="ts" setup>
import AmbianceView from 'src/components/AmbianceView.vue';
import { computed } from 'vue';
import { useGlobalStore } from 'src/stores/global-store';
const globalStore = useGlobalStore();

const ambiance = computed(() => {
  return globalStore.getAmbiance();
});
</script>
