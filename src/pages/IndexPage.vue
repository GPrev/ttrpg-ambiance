<template>
  <AmbianceView class="fullscreen" :ambiance="ambiance" />
  <q-list class="fullscreen column" v-if="globalStore.isWildseaVisible()">
    <q-item v-for="track in displayedTracks" :key="track.key || ''">
      <q-card class="q-pa-sm" style="background-color: #ffffffcc">
        <WildseaTrackView :track="track" :size="globalStore.getWildseaTracklistSize() + 'rem'" />
      </q-card>
    </q-item>
  </q-list>
</template>

<script lang="ts" setup>
import AmbianceView from 'src/components/AmbianceView.vue';
import WildseaTrackView from 'src/components/wildsea/WildseaTrackView.vue';
import { computed } from 'vue';
import { WildseaTrack, WildseaTracklist } from 'src/models/wildsea/viewModels';
import { useGlobalStore } from 'src/stores/global-store';
import { useWildseaTracksStore } from 'src/stores/wildsea/tracks-store';
const globalStore = useGlobalStore();
const wildseaTracksStore = useWildseaTracksStore();

const ambiance = computed(() => {
  return globalStore.getAmbiance();
});

const displayedTracks = computed(() => {
  return (
    globalStore
      // List all chosen tracklists
      .getWildseaTracklists()
      // Get all tracks from those tracklists
      .reduce(
        (list: WildseaTrack[], tracklist: WildseaTracklist): WildseaTrack[] => [
          ...list,
          ...tracklist.tracks,
        ],
        []
      )
      // Here we get the original tracks from the store, otherwise we would loose reactivity
      .map((item) => wildseaTracksStore.get(item.key || ''))
      // Only display visible tracks
      .filter((track) => track.visible)
  );
});
</script>
