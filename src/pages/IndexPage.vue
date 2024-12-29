<template>
  <AmbianceView class="fullscreen" :ambiance="ambiance" />
  <q-list class="fullscreen column" v-if="globalStore.isWildseaVisible()"
    :style="{ 'align-content': (globalStore.isWildseaTracklistRightAlignment() ? 'end' : 'baseline') }">
    <q-item v-for="track in displayedTracks" :key="track.key || ''" style="max-width: 33%;">
      <q-card class="q-pa-sm glass min-width-0">
        <WildseaTrackView :track="track" :size="globalStore.getWildseaTracklistSize() + 'rem'" />
      </q-card>
    </q-item>
  </q-list>

  <q-dialog v-model="musicDialog">
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="music_note" color="primary" text-color="white" />
        <span class="q-ml-sm">Turn on music ?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="No" color="primary" v-close-popup />
        <q-btn flat label="Yes" color="primary" @click="() => { playMusic(ambiance); musicDialog = false; }" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style>
.glass {
  background: rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}
</style>

<script lang="ts" setup>
import AmbianceView from 'src/components/AmbianceView.vue';
import WildseaTrackView from 'src/components/wildsea/WildseaTrackView.vue';
import { computed, ref, watch } from 'vue';
import { WildseaTrack, WildseaTracklist } from 'src/models/wildsea/viewModels';
import { Ambiance } from 'src/models/viewModels';
import { useGlobalStore } from 'src/stores/global-store';
import { useWildseaTracksStore } from 'src/stores/wildsea/tracks-store';
const globalStore = useGlobalStore();
const wildseaTracksStore = useWildseaTracksStore();

const audio = ref(new Audio);
const musicDialog = ref(false);

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

function playMusic (ambiance: Ambiance) {
  audio.value.pause()
  if (ambiance.music.source) {
    audio.value.src = ambiance.music.source.url;
    // 1 is the max allowed volume, the volume in the ambiance is always 1 for now, 200 is the max volume possible in the audios page
    audio.value.volume = Math.min(1, ambiance.music.volume * ambiance.music.source.volume / 200);
    console.log('playing ' + audio.value.src + ' at volume ' + audio.value.volume + ' (' + ambiance.music.volume + '*' + ambiance.music.source.volume + ')')
    audio.value.loop = true;
    audio.value.play().catch(() => {
      console.log('catch...')
      musicDialog.value = true;
    });
  }
}

watch(ambiance, async (newAmbiance, oldAmbiance) => {
  if (newAmbiance.music.source?.url != oldAmbiance?.music?.source?.url)
    playMusic(newAmbiance);
});

</script>
