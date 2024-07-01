<template>
  <q-dialog v-model="popupOpen">
    <q-card class="size-big-vignette">
      <q-card-section>
        <div class="flex column no-wrap" v-if="editedTracklist != null">
          <q-input v-model="editedTracklist.name" label="Name" />
          <q-field label="Tracks" stack-label outlined class="q-mt-sm">
            <template v-slot:control>
              <q-list class="col">
                <q-item v-for="(track, index) in editedTracklist.tracks" :key="track.key || ''">
                  <q-item-section class="no-wrap">
                    <WildseaTrackView :track="track" size="sm" />
                  </q-item-section>
                  <q-item-section side top>
                    <div class="q-gutter-xs">
                      <q-btn dense class="q-ma-none" flat round color="primary" icon="keyboard_arrow_up"
                        @click="moveUp(index)" :disable="!canMoveUp(index)" />
                      <q-btn dense class="q-ma-none" flat round color="primary" icon="keyboard_arrow_down"
                        @click="moveDown(index)" :disable="!canMoveDown(index)" />
                      <q-btn dense class="q-ma-none" flat round color="red" icon="delete" @click="removeTrack(track)" />
                    </div>
                  </q-item-section>
                </q-item>
                <q-item class="justify-center">
                  <q-btn-dropdown color="primary" label="Add" icon="add" v-model="isAddDropdownOpen"
                    :disable="absentTracks.length == 0">
                    <q-list>
                      <q-item v-for="track in absentTracks" :key="track.key || ''" clickable v-close-popup
                        @click="addTrack(track)">
                        <q-item-section>
                          <WildseaTrackView :track="track" class="size-vignette" size="sm" />
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>
                </q-item>
              </q-list>
            </template>
          </q-field>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Save" color="primary" @click="save" />
        <q-btn flat label="Cancel" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import WildseaTrackView from 'src/components/wildsea/WildseaTrackView.vue';
import { computed, ref, Ref } from 'vue';
import { WildseaTrack, WildseaTracklist } from 'src/models/wildsea/viewModels';
import { useWildseaTracklistsStore } from 'src/stores/wildsea/tracklists-store';
import { useWildseaTracksStore } from 'src/stores/wildsea/tracks-store';
const wildseaTracklistsStore = useWildseaTracklistsStore();
const wildseaTracksStore = useWildseaTracksStore();

const editedTracklist: Ref<WildseaTracklist | null> = ref(null);
const isAddDropdownOpen = ref(false);

const popupOpen = computed({
  get () {
    return editedTracklist.value != null;
  },
  set (value: boolean) {
    if (value && editedTracklist.value == null) {
      editNew();
    } else {
      editedTracklist.value = null;
    }
  },
});

const absentTracks = computed(() => {
  const allTrackLists = wildseaTracksStore.getAll();
  const allKeys = Object.keys(allTrackLists);
  const presentKeys = editedTracklist.value?.tracks.map((track) => track.key) || [];
  const absentKeys = allKeys.filter((key) => !presentKeys.includes(key));
  return absentKeys.map((key) => allTrackLists[key]);
});

function editNew () {
  editedTracklist.value = {
    key: '',
    name: 'New Tracklist',
    tracks: [],
  };
}

function editExisting (tracklist: WildseaTracklist) {
  editedTracklist.value = {
    name: tracklist.name,
    key: tracklist.key,
    tracks: [...tracklist.tracks],
  };
}

function save () {
  if (editedTracklist.value) {
    if (editedTracklist.value?.key || '' != '') {
      wildseaTracklistsStore.set(editedTracklist.value);
    } else {
      wildseaTracklistsStore.add(editedTracklist.value);
    }
  }
  popupOpen.value = false;
}

function addTrack (track: WildseaTrack) {
  if (!editedTracklist.value) return;
  editedTracklist.value.tracks.push(track);
  isAddDropdownOpen.value = false;
}

function removeTrack (track: WildseaTrack) {
  if (!editedTracklist.value) return;
  var taskIndex = editedTracklist.value.tracks.indexOf(track);
  if (taskIndex !== -1) {
    editedTracklist.value.tracks.splice(taskIndex, 1);
  }
}

function canMoveUp (index: number) {
  return editedTracklist.value && index > 0;
}

function canMoveDown (index: number) {
  return editedTracklist.value && index < editedTracklist.value.tracks.length - 1;
}

function swapTracks (index1: number, index2: number) {
  if (editedTracklist.value) {
    const tracks = editedTracklist.value.tracks;
    [tracks[index1], tracks[index2]] = [tracks[index2], tracks[index1]];
  }
}

function moveUp (index: number) {
  swapTracks(index, index - 1);
}

function moveDown (index: number) {
  swapTracks(index, index + 1);
}

defineExpose({ editNew, editExisting });
</script>
