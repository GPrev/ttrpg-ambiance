<template>
  <div text-left>
    <div class="text-h6 q-my-none q-mx-sm text-italic ellipsis text-left">
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
import { PropType } from 'vue';

const props = defineProps({
  track: { type: Object as PropType<WildseaTrack | null> },
  size: { type: Object as PropType<string>, required: false },
});

function getIconName (index: number) {
  if (props.track) {
    if (props.track.progress <= index) return 'radio_button_unchecked';
    if (props.track.burn <= index) return 'block';
    else return 'cancel';
  }
  return '';
}
</script>
