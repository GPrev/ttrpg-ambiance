<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useImagesStore } from './stores/images-store';

export default defineComponent({
  name: 'App',

  async mounted() {
    const imagesStore = useImagesStore();
    imagesStore.setup();
  },
});
</script>
