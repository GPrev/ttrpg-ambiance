<template>
  <div class="fullscreen text-center q-pa-md flex column flex-center">
    <q-icon name="image_not_supported" size="xl" color="grey" />
    <p class="text-h4" style="color: gray">No image found</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    return {};
  },
});
</script>
