<template>
  <q-dialog v-model="popupOpen">
    <q-card class="size-big-vignette">
      <q-card-section>
        <div class="flex column no-wrap" v-if="editedTrack != null">
          <q-input v-model="editedTrack.name" label="Name" />
          <q-input v-model.number="editedTrack.length" type="number" label="Length" />
          <q-input v-model.number="editedTrack.progress" type="number" label="Progress" />
          <q-input v-model.number="editedTrack.burn" type="number" label="Burn" />
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
import { computed, ref, Ref } from 'vue';
import { WildseaTrack } from 'src/models/wildsea/viewModels';
import { useWildseaTracksStore } from 'src/stores/wildsea/tracks-store';
const wildseaTracksStore = useWildseaTracksStore();

const emit = defineEmits<{
  (e: 'onSave', newTrack: WildseaTrack): void
}>();

const editedTrack: Ref<WildseaTrack | null> = ref(null);

const popupOpen = computed({
  get () {
    return editedTrack.value != null;
  },
  set (value: boolean) {
    if (value && editedTrack.value == null) {
      editNew();
    } else {
      editedTrack.value = null;
    }
  },
});

function editNew () {
  editedTrack.value = {
    key: '',
    name: 'New Track',
    visible: true,
    length: 3,
    progress: 0,
    burn: 0,
  };
}

function editExisting (track: WildseaTrack) {
  editedTrack.value = {
    key: track.key,
    name: track.name,
    visible: track.visible,
    length: track.length,
    progress: track.progress,
    burn: track.burn,
  };
}

function save () {
  if (editedTrack.value) {
    if (editedTrack.value?.key || '' != '') {
      wildseaTracksStore.set(editedTrack.value);
      emit('onSave', editedTrack.value);
    } else {
      wildseaTracksStore.add(editedTrack.value).then((doc) => {
        emit('onSave', wildseaTracksStore.get(doc.id));
      })
    }
  }
  popupOpen.value = false;
}

defineExpose({ editNew, editExisting });
</script>
