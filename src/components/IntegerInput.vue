<template>
  <q-input v-model.number="model" type="number" :label="props.label">
    <template v-slot:append>
      <q-icon name="remove" color="red" @click="model -= 1" />
      <q-icon name="add" color="green" @click="model += 1" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
const model = defineModel({ required: true });
const props = defineProps<{
  label: string | undefined;
}>();
</script>
