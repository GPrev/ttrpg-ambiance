<template>
  <q-page class="text-center q-pa-md flex flex-center">
    <q-spinner v-if="isLoading" color="primary" size="3em" />
    <div v-if="!isLoading" class="q-pa-md row items-start q-gutter-md">
      <q-card
        v-for="[ambianceKey, ambiance] of Object.entries(ambiances)"
        :key="ambianceKey"
      >
        <AmbianceView :ambiance="ambiance" class="image-vignette" />

        <q-card-section>
          <div class="text-h6">{{ ambiance.name }}</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import AmbianceView from 'src/components/AmbianceView.vue';
import { computed } from 'vue';
import { useAmbiancesStore } from 'src/stores/ambiances-store';
const ambiancesStore = useAmbiancesStore();

const ambiances = computed(() => {
  return ambiancesStore.getAll();
});
const isLoading = computed(() => {
  return ambiancesStore.isLoading();
});
</script>
