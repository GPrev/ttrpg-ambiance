<template>
  <q-page class="text-center q-pa-md flex flex-center">
    <q-spinner v-if="isLoading" color="primary" size="3em" />
    <div v-else>
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card
          v-for="[audioKey, audio] of Object.entries(audios)"
          :key="audioKey"
        >
          <AudioSourceView :audio="audio" class="audio-vignette" />

          <q-card-section horizontal class="justify-between">
            <q-card-section>
              <div class="text-h6">{{ audio.name }}</div>
            </q-card-section>
            <q-card-actions>
              <q-btn
                flat
                round
                color="accent"
                icon="edit"
                @click="
                  (
                    $refs.editDialog as typeof AudioSourceEditDialog
                  ).editExisting(audio)
                "
              />
              <q-btn
                flat
                round
                color="red"
                icon="delete"
                @click="audiosStore.delete(audio)"
              />
            </q-card-actions>
          </q-card-section>
        </q-card>
      </div>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
          fab
          icon="add"
          color="accent"
          @click="($refs.editDialog as typeof AudioSourceEditDialog).editNew()"
        />
      </q-page-sticky>
    </div>
    <AudioSourceEditDialog ref="editDialog" />
  </q-page>
</template>

<script setup lang="ts">
import AudioSourceView from 'src/components/AudioSourceView.vue';
import { computed } from 'vue';
import { useAudiosStore } from 'src/stores/audios-store';
import AudioSourceEditDialog from 'src/components/AudioSourceEditDialog.vue';
const audiosStore = useAudiosStore();

const audios = computed(() => {
  return audiosStore.getAll();
});
const isLoading = computed(() => {
  return audiosStore.isLoading();
});
</script>
