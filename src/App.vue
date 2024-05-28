<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useImagesStore } from './stores/images-store';
import { useAmbiancesStore } from './stores/ambiances-store';

export default defineComponent({
  name: 'App',

  async mounted() {
    const imagesStore = useImagesStore();
    const ambiancesStore = useAmbiancesStore();
    await imagesStore.setup();
    await ambiancesStore.setup(); // Needs images store
  },
});
</script>
