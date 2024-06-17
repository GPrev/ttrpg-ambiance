<template>
  <q-dialog v-model="popupOpen">
    <q-card>
      <q-card-section>
        <div class="flex column no-wrap" v-if="editedImage != null">
          <ImageSourceView :image="editedImage" class="image-big-vignette" />
          <q-input v-model="editedImage.name" label="Name" />
          <q-input v-model="editedImage.url" label="URL" />
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
import ImageSourceView from './ImageSourceView.vue';
import { ImageSource } from 'src/models/viewModels';
import { useImagesStore } from 'src/stores/images-store';
import { computed, ref, Ref } from 'vue';
const imagesStore = useImagesStore();

const editedImage: Ref<ImageSource | null> = ref(null);

const popupOpen = computed({
  get() {
    return editedImage.value != null;
  },
  set(value: boolean) {
    if (value && editedImage.value == null) {
      editNew();
    } else {
      editedImage.value = null;
    }
  },
});

function editNew() {
  editedImage.value = {
    name: 'New Image',
    key: '',
    url: '',
  };
}

function editExisting(image: ImageSource) {
  editedImage.value = {
    name: image.name,
    key: image.key,
    url: image.url,
  };
}

function save() {
  if (editedImage.value) {
    if (editedImage.value?.key || '' != '') {
      imagesStore.set(editedImage.value);
    } else {
      imagesStore.add(editedImage.value);
    }
  }
  popupOpen.value = false;
}

defineExpose({ editNew, editExisting });
</script>
