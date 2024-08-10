<template>
  <q-dialog v-model="popupOpen">
    <q-card>
      <q-card-section>
        <div class="flex column no-wrap" v-if="editedAudio != null">
          <AudioSourceView :audio="editedAudio" class="image-big-vignette" />
          <div class="row justify-center q-mt-xs">
            <audio controls :src="editedAudio.url" />
          </div>
          <q-input v-model="editedAudio.name" label="Name" />
          <q-input v-model="editedAudio.url" label="URL" />
          <q-field label="Volume" stack-label>
            <template v-slot:control>
              <div class="col flex row">
                <q-icon class="col-auto self-start q-ma-xs" size="sm" color="primary" name="volume_up" />
                <q-slider class="col q-mx-xs" v-model="editedAudio.volume" :min="0" :max="200" label
                  :marker-labels="volumeLabels" />
              </div>
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
import AudioSourceView from './AudioSourceView.vue';
import { AudioSource } from 'src/models/viewModels';
import { useAudiosStore } from 'src/stores/audios-store';
import { computed, ref, Ref } from 'vue';
const audiosStore = useAudiosStore();

const editedAudio: Ref<AudioSource | null> = ref(null);

const volumeLabels = { 0: '0%', 50: '50%', 100: '100%', 150: '150%', 200: '200%' };

const popupOpen = computed({
  get () {
    return editedAudio.value != null;
  },
  set (value: boolean) {
    if (value && editedAudio.value == null) {
      editNew();
    } else {
      editedAudio.value = null;
    }
  },
});

function editNew () {
  editedAudio.value = {
    name: 'New Audio',
    key: '',
    url: '',
    volume: 100,
  };
}

function editExisting (audio: AudioSource) {
  editedAudio.value = {
    name: audio.name,
    key: audio.key,
    url: audio.url,
    volume: audio.volume,
  };
}

function save () {
  if (editedAudio.value) {
    if (editedAudio.value?.key || '' != '') {
      audiosStore.set(editedAudio.value);
    } else {
      audiosStore.add(editedAudio.value);
    }
  }
  popupOpen.value = false;
}

defineExpose({ editNew, editExisting });
</script>
