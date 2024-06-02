<template>
  <q-page class="text-center q-pa-md flex flex-center">
    <q-spinner v-if="isLoading" color="primary" size="3em" />
    <div v-if="!isLoading" class="q-pa-md row items-start q-gutter-md">
      <q-card
        v-for="[playlistKey, playlist] of Object.entries(playlists)"
        :key="playlistKey"
      >
        <PlaylistView :playlist="playlist" class="image-vignette" />

        <q-card-section>
          <div class="text-h6">{{ playlist.name }}</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import PlaylistView from 'src/components/PlaylistView.vue';
import { computed } from 'vue';
import { usePlaylistsStore } from 'src/stores/playlists-store';
const playlistsStore = usePlaylistsStore();

const playlists = computed(() => {
  return playlistsStore.getAll();
});
const isLoading = computed(() => {
  return playlistsStore.isLoading();
});
</script>
