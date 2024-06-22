<template>
  <AmbianceView class="fullscreen" :ambiance="ambiance" />
  <q-list class="fullscreen">
    <q-item v-for="track in displayedTracks" :key="track.key || ''">
      <q-card class="q-pa-sm" style="background-color: #ffffffcc">
        <WildseaTrackView :track="track" />
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
const globalStore = useGlobalStore();

const ambiance = computed(() => {
  return globalStore.getAmbiance();
});

const displayedTracks = computed(() => {
  return globalStore
    .getWildseaTracklists()
    .reduce(
      (list: WildseaTrack[], tracklist: WildseaTracklist): WildseaTrack[] => [
        ...list,
        ...tracklist.tracks,
      ],
      []
    );
});
</script>
