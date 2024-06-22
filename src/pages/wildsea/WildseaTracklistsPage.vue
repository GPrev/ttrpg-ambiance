<template>
  <q-page class="text-center q-pa-md flex flex-center">
    <q-spinner v-if="isLoading" color="primary" size="3em" />
    <div v-else>
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card v-for="[imageKey, tracklist] of Object.entries(tracklists)" :key="imageKey">
          <q-card-section horizontal class="justify-between">
            <q-card-section>
              <div class="text-h6">{{ tracklist.name }}</div>
            </q-card-section>
            <q-card-actions>
              <q-btn flat round color="accent" icon="edit" @click="
                (
                  $refs.editDialog as typeof WildseaTracklistEditDialog
                ).editExisting(tracklist)
                " />
              <q-btn flat round color="red" icon="delete" @click="wildseaTracklistsStore.delete(tracklist)" />
            </q-card-actions>
          </q-card-section>
        </q-card>
      </div>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="accent" @click="($refs.editDialog as typeof WildseaTracklistEditDialog).editNew()" />
      </q-page-sticky>
    </div>
    <WildseaTracklistEditDialog ref="editDialog" />
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useWildseaTracklistsStore } from 'src/stores/wildsea/tracklists-store';
import WildseaTracklistEditDialog from 'src/components/wildsea/WildseaTracklistEditDialog.vue';
const wildseaTracklistsStore = useWildseaTracklistsStore();

const tracklists = computed(() => {
  return wildseaTracklistsStore.getAll();
});
const isLoading = computed(() => {
  return wildseaTracklistsStore.isLoading();
});
</script>
