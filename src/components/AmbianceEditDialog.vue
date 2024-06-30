<template>
  <q-dialog v-model="popupOpen">
    <q-card>
      <q-card-section>
        <div class="flex column no-wrap" v-if="editedAmbiance != null">
          <AmbianceView :ambiance="editedAmbiance" class="ambiance-big-vignette" />
          <q-input v-model="editedAmbiance.name" label="Name" />
          <q-select v-model="editedAmbiance.background.source" label="Background"
            :options="Object.values(imagesStore.getAll())" option-label="name" />
          <q-checkbox v-model="editedAmbiance.background.mirroredHorizontally" label="Mirror Horizontally" />
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
import AmbianceView from './AmbianceView.vue';
import { Ambiance } from 'src/models/viewModels';
import { useAmbiancesStore } from 'src/stores/ambiances-store';
import { useImagesStore } from 'src/stores/images-store';
import { computed, ref, Ref } from 'vue';
const ambiancesStore = useAmbiancesStore();
const imagesStore = useImagesStore();

const editedAmbiance: Ref<Ambiance | null> = ref(null);

const popupOpen = computed({
  get () {
    return editedAmbiance.value != null;
  },
  set (value: boolean) {
    if (value && editedAmbiance.value == null) {
      editNew();
    } else {
      editedAmbiance.value = null;
    }
  },
});

function editNew () {
  editedAmbiance.value = {
    name: 'New Ambiance',
    key: '',
    background: {
      source: null,
      mirroredHorizontally: false,
    },
    music: {
      source: null,
      volume: 1,
    },
    sounds: []
  };
}

function editExisting (ambiance: Ambiance) {
  editedAmbiance.value = {
    name: ambiance.name,
    key: ambiance.key,
    background: {
      source: ambiance.background.source,
      mirroredHorizontally: ambiance.background.mirroredHorizontally,
    },
    music: {
      source: ambiance.music.source,
      volume: ambiance.music.volume,
    },
    sounds: [] // TODO deep copy
  };
}

function save () {
  if (editedAmbiance.value) {
    if (editedAmbiance.value?.key || '' != '') {
      ambiancesStore.set(editedAmbiance.value);
    } else {
      ambiancesStore.add(editedAmbiance.value);
    }
  }
  popupOpen.value = false;
}

defineExpose({ editNew, editExisting });
</script>
