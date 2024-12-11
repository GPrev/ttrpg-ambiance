<template>
  <q-page class="text-center q-pa-md flex flex-center">
    <q-spinner v-if="isLoading" color="primary" size="3em" />
    <div v-else>
      <div class="q-pa-md row items-start justify-center q-gutter-md">
        <q-card v-for="[imageKey, track] of tracks" :key="imageKey">
          <q-card-section horizontal class="justify-between">
            <WildseaTrackView :track="track" class="size-vignette q-ma-xs" size="sm" />
            <q-card-actions horizontal>
              <q-btn flat round color="accent" icon="edit" @click="
                (
                  $refs.editDialog as typeof WildseaTrackEditDialog
                ).editExisting(track)
                " />
              <q-btn flat round color="red" icon="delete" @click="wildseaTracksStore.delete(track)" />
            </q-card-actions>
          </q-card-section>
        </q-card>
      </div>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="accent" @click="($refs.editDialog as typeof WildseaTrackEditDialog).editNew()" />
      </q-page-sticky>
    </div>
    <WildseaTrackEditDialog ref="editDialog" />
  </q-page>
</template>

<script setup lang="ts">
import WildseaTrackView from 'src/components/wildsea/WildseaTrackView.vue';
import { computed } from 'vue';
import { useWildseaTracksStore } from 'src/stores/wildsea/tracks-store';
import WildseaTrackEditDialog from 'src/components/wildsea/WildseaTrackEditDialog.vue';
const wildseaTracksStore = useWildseaTracksStore();

const tracks = computed(() => {
  return [...Object.entries(wildseaTracksStore.getAll())].sort((a, b) => (a[1].name.localeCompare(b[1].name)))
});
const isLoading = computed(() => {
  return wildseaTracksStore.isLoading();
});
</script>
