<template>
  <div class="text-center q-pa-md flex flex-center">
    <q-spinner v-if="isLoading" color="primary" size="3em" />
    <div v-else class="flex column">
      <AmbianceView :ambiance="ambiance" class="image-vignette" />
      <q-select
        class="col"
        v-model="playlist"
        :options="playlists"
        label="Playlist"
        option-label="name"
        option-value="key"
      />
      <q-select
        class="col"
        v-model="ambiance"
        :options="ambiances"
        label="Ambiance"
        option-label="name"
        option-value="key"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AmbianceView from 'src/components/AmbianceView.vue';
import { computed } from 'vue';
import { useGlobalStore } from 'src/stores/global-store';
import { Ambiance, Playlist } from 'src/models/viewModels';
import { useAmbiancesStore } from 'src/stores/ambiances-store';
import { usePlaylistsStore } from 'src/stores/playlists-store';
const globalStore = useGlobalStore();
const playlistsStore = usePlaylistsStore();
const ambiancesStore = useAmbiancesStore();

const nonePlaylist: Playlist = {
  name: 'None',
  key: '',
  ambiances: [],
};

const noneAmbiance: Ambiance = {
  name: 'None',
  key: '',
  background: null,
  music: null,
  sounds: [],
};

const ambiance = computed({
  get() {
    return globalStore.getAmbiance() || noneAmbiance;
  },
  set(ambiance: Ambiance) {
    globalStore.setAmbiance(ambiance);
  },
});

const playlist = computed({
  get() {
    return globalStore.getPlaylist() || nonePlaylist;
  },
  set(ambiance: Playlist) {
    globalStore.setPlaylist(ambiance);
  },
});

const playlists = computed(() => {
  return Object.values(playlistsStore.getAll()).concat(nonePlaylist);
});

const ambiances = computed(() => {
  return Object.values(ambiancesStore.getAll()).concat(noneAmbiance);
});

const isLoading = computed(() => {
  return globalStore.isLoading();
});
</script>
