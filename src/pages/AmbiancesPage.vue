<template>
  <q-page class="text-center q-pa-md flex flex-center">
    <q-spinner v-if="isLoading" color="primary" size="3em" />
    <div v-if="!isLoading" class="q-pa-md row items-start q-gutter-md">
      <q-card v-for="[ambianceKey, ambiance] of Object.entries(ambiances)" :key="ambianceKey" class="size-vignette">
        <AmbianceView :ambiance="ambiance" class="image-vignette" />

        <q-card-section horizontal class="justify-between">
          <q-card-section class="min-width-0">
            <div class="text-h6 ellipsis">{{ ambiance.name }}</div>
          </q-card-section>
          <q-card-actions class="no-wrap">
            <q-btn flat round color="accent" icon="edit" @click="
              (
                $refs.editDialog as typeof AmbianceEditDialog
              ).editExisting(ambiance)
              " />
            <q-btn flat round color="red" icon="delete" @click="ambiancesStore.delete(ambiance)" />
          </q-card-actions>
        </q-card-section>
      </q-card>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="accent" @click="($refs.editDialog as typeof AmbianceEditDialog).editNew()" />
      </q-page-sticky>
    </div>
    <AmbianceEditDialog ref="editDialog" />
  </q-page>
</template>

<script setup lang="ts">
import AmbianceView from 'src/components/AmbianceView.vue';
import { computed } from 'vue';
import { useAmbiancesStore } from 'src/stores/ambiances-store';
import AmbianceEditDialog from 'src/components/AmbianceEditDialog.vue';
const ambiancesStore = useAmbiancesStore();

const ambiances = computed(() => {
  return ambiancesStore.getAll();
});
const isLoading = computed(() => {
  return ambiancesStore.isLoading();
});
</script>
