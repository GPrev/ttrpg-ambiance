<template>
  <q-dialog v-model="popupOpen">
    <q-card class="size-big-vignette">
      <q-card-section>
        <div class="flex column no-wrap" v-if="editedTracklist != null">
          <q-input v-model="editedTracklist.name" label="Name" />
          <q-field label="Tracks" stack-label outlined class="q-mt-sm">
            <template v-slot:control>
              <q-list class="col">
                <q-item v-for="track in editedTracklist.tracks" :key="track.key || ''">
                  <q-item-section>
                    <WildseaTrackView :track="track" />
                  </q-item-section>
                  <q-item-section side>
                    <q-btn flat round color="red" icon="delete" @click="removeTrack(track)" />
                  </q-item-section>
                </q-item>
                <q-item class="justify-center">
                  <q-btn-dropdown color="primary" label="Add" icon="add" v-model="isAddDropdownOpen"
                    :disable="absentTracks.length == 0">
                    <q-list>
                      <q-item v-for="track in absentTracks" :key="track.key || ''" clickable v-close-popup
                        @click="addTrack(track)">
                        <q-item-section>
                          <WildseaTrackView :track="track" />
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
    tracks: tracklist.tracks,
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

defineExpose({ editNew, editExisting });
</script>
