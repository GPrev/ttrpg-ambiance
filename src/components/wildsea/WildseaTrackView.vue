<template>
  <div text-left>
    <div class="q-my-none q-mx-sm q-pr-xs text-bold text-italic ellipsis text-left"
      :style="{ 'font-size': 'calc(' + (props.size || '2.5rem') + '/2)' }">
      {{ props.track?.name }}
    </div>
    <q-separator class="q-mb-xs" />
    <div class="flex">
      <q-icon v-for="i of Array(props.track?.length || 0).keys()" :key="i" :name="getIconName(i)"
        :size="props.size || 'lg'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { WildseaTrack } from 'src/models/wildsea/viewModels';

const props = defineProps<{
  track: WildseaTrack | null,
  size?: string | undefined,
}>();

function getIconName (index: number) {
  if (props.track) {
    if (props.track.progress <= index) return 'radio_button_unchecked';
    if (props.track.burn <= index) return 'block';
    else return 'cancel';
  }
  return '';
}
</script>
