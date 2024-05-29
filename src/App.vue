<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useImagesStore } from './stores/images-store';
import { useAudiosStore } from './stores/audios-store';
import { useAmbiancesStore } from './stores/ambiances-store';
import { usePlaylistsStore } from './stores/playlists-store';
import { useGlobalStore } from './stores/global-store';

export default defineComponent({
  name: 'App',

  async mounted() {
    const imagesStore = useImagesStore();
    const audiosStore = useAudiosStore();
    const ambiancesStore = useAmbiancesStore();
    const playlistsStore = usePlaylistsStore();
    const globalStore = useGlobalStore();
    // Setup order matters
    await Promise.all([imagesStore.setup(), audiosStore.setup()]);
    await ambiancesStore.setup();
    await playlistsStore.setup();
    await globalStore.setup();
  },
});
</script>
