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
import { useWildseaTracksStore } from './stores/wildsea/tracks-store';
import { useWildseaTracklistsStore } from './stores/wildsea/tracklists-store';

export default defineComponent({
  name: 'App',

  async mounted () {
    const imagesStore = useImagesStore();
    const audiosStore = useAudiosStore();
    const ambiancesStore = useAmbiancesStore();
    const playlistsStore = usePlaylistsStore();
    const globalStore = useGlobalStore();
    const wildseaTracksStore = useWildseaTracksStore();
    const wildseaTracklistsStore = useWildseaTracklistsStore();
    // Setup order matters
    const wildseaPromise = Promise.all([wildseaTracksStore.setup(), wildseaTracklistsStore.setup()])
    await Promise.all([imagesStore.setup(), audiosStore.setup()]);
    await ambiancesStore.setup();
    await playlistsStore.setup();
    // Global store needs wildsea, could be split to avoid that
    await wildseaPromise;
    await globalStore.setup();
  },
});
</script>
