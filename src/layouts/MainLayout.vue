<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> TTRPG Ambiance </q-toolbar-title>

        <q-btn
          round
          flat
          color="white"
          :icon="themeIcon"
          @click="toggleDarkMode"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> TTRPG Ambiance </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Dark } from 'quasar';
import EssentialLink from 'components/EssentialLink.vue';

const essentialLinks = [
  {
    title: 'Display',
    caption: '/',
    icon: 'aspect_ratio',
    link: '/',
  },
  {
    title: 'Control hub',
    caption: '/control',
    icon: 'tune',
    link: 'control',
  },
  {
    title: 'Image sources',
    caption: '/images',
    icon: 'photo_library',
    link: 'images',
  },
  {
    title: 'Sound sources',
    caption: '/sounds',
    icon: 'music_note',
    link: 'sounds',
  },
  {
    title: 'Ambiances',
    caption: '/ambiances',
    icon: 'movie_filter',
    link: 'ambiances',
  },
  {
    title: 'Playlists',
    caption: '/playlists',
    icon: 'slideshow',
    link: 'playlists',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const themeIcon = computed(() => {
  return Dark.isActive ? 'lightbulb_outline' : 'lightbulb';
});

function toggleDarkMode() {
  Dark.toggle();
  console.log('Theme is now ' + Dark.isActive ? 'dark' : 'light');
}
</script>
