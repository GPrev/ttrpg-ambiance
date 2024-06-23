<template>
  <div class="q-pa-md flex flex-center">
    <q-spinner v-if="isLoading" color="primary" size="3em" />
    <div v-else class="flex column">
      <AmbianceView :ambiance="ambiance" class="image-vignette" />
      <q-select class="col" v-model="playlist" :options="playlists" label="Playlist" option-label="name"
        option-value="key" />
      <q-select class="col" v-model="ambiance" :options="ambiances" label="Ambiance" option-label="name"
        option-value="key" />
      <h5 class="q-mb-xs">Wildsea</h5>
      <q-checkbox class="col" v-model="wildseaVisible" label="Display Tracks"
        @update:model-value="(value) => globalStore.setWildseaVisible(value)" />
      <q-field label="Tracks" stack-label outlined>
        <template v-slot:control>
          <q-list class="col" separator>
            <q-item v-for="tracklist in wildseaTracklists" :key="tracklist.key || ''">
              <q-item-section>
                <div class="text-h6">{{ tracklist.name }}</div>
                <q-list>
                  <q-item v-for="track in tracklist.tracks" :key="track.key || ''">
                    <q-item-section> • {{ track.name }} </q-item-section>
                    <q-item-section side>
                      <q-checkbox v-model="track.visible" checked-icon="visibility" unchecked-icon="visibility_off"
                        @update:model-value="(value) => updateTrackVisibility(track, value)
                          " />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-item-section>
              <q-item-section side top>
                <q-btn flat round color="red" icon="delete" @click="removeTracklist(tracklist)" />
              </q-item-section>
            </q-item>
            <q-item class="justify-center">
              <q-btn-dropdown color="primary" label="Add" icon="add" v-model="isAddTracklistDropdownOpen"
                :disable="absentWildseaTracklists.length == 0">
                <q-list>
                  <q-item v-for="tracklist in absentWildseaTracklists" :key="tracklist.key || ''" clickable v-close-popup
                    @click="addTracklist(tracklist)">
                    <q-item-section>
                      <WildseaTracklistView :tracklist="tracklist" />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </q-item>
          </q-list>
        </template>
      </q-field>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AmbianceView from 'src/components/AmbianceView.vue';
import WildseaTracklistView from 'src/components/wildsea/WildseaTracklistView.vue';
import { computed, ref } from 'vue';
import { useGlobalStore } from 'src/stores/global-store';
import { Ambiance, Playlist } from 'src/models/viewModels';
import { WildseaTrack, WildseaTracklist } from 'src/models/wildsea/viewModels';
import { useAmbiancesStore } from 'src/stores/ambiances-store';
import { usePlaylistsStore } from 'src/stores/playlists-store';
import { useWildseaTracklistsStore } from 'src/stores/wildsea/tracklists-store';
import { useWildseaTracksStore } from 'src/stores/wildsea/tracks-store';
const globalStore = useGlobalStore();
const playlistsStore = usePlaylistsStore();
const ambiancesStore = useAmbiancesStore();
const tracklistStore = useWildseaTracklistsStore();
const tracksStore = useWildseaTracksStore();

const isAddTracklistDropdownOpen = ref(false);

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
  get () {
    return globalStore.getAmbiance() || noneAmbiance;
  },
  set (ambiance: Ambiance) {
    globalStore.setAmbiance(ambiance);
  },
});

const playlist = computed({
  get () {
    return globalStore.getPlaylist() || nonePlaylist;
  },
  set (ambiance: Playlist) {
    globalStore.setPlaylist(ambiance);
  },
});

const wildseaTracklists = computed({
  get () {
    return globalStore.getWildseaTracklists();
  },
  set (trackLists: WildseaTracklist[]) {
    // Modifying the array will not work, only overwriting it
    globalStore.setWildseaTracklists(trackLists);
  },
});

const absentWildseaTracklists = computed(() => {
  const allTrackLists = tracklistStore.getAll();
  const allKeys = Object.keys(allTrackLists);
  const presentKeys = globalStore.getWildseaTracklistKeys();
  const absentKeys = allKeys.filter((key) => !presentKeys.includes(key));
  return absentKeys.map((key) => allTrackLists[key]);
});

const wildseaVisible = computed({
  get () {
    return globalStore.isWildseaVisible();
  },
  set (visible: boolean) {
    globalStore.setWildseaVisible(visible);
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

function addTracklist (tracklist: WildseaTracklist) {
  // Modifying the array will not work, only overwriting it
  wildseaTracklists.value = [...wildseaTracklists.value, tracklist];
  isAddTracklistDropdownOpen.value = false;
}

function removeTracklist (tracklist: WildseaTracklist) {
  var taskIndex = wildseaTracklists.value.indexOf(tracklist);
  if (taskIndex !== -1) {
    wildseaTracklists.value.splice(taskIndex, 1);
  }
  // Modifying the array will not work, only overwriting it
  wildseaTracklists.value = [...wildseaTracklists.value];
}

function updateTrackVisibility (track: WildseaTrack, visible: boolean) {
  if (track.visible != visible) track.visible = visible;
  tracksStore.set(track);
}
</script>
