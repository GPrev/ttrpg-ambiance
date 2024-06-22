import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  // },
  {
    path: '/',
    component: () => import('pages/IndexPage.vue'),
  },
  {
    path: '/control',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ControlPage.vue') }],
  },
  {
    path: '/images',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ImagesPage.vue') }],
  },
  {
    path: '/audios',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/AudiosPage.vue') }],
  },
  {
    path: '/ambiances',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AmbiancesPage.vue') },
    ],
  },
  {
    path: '/playlists',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PlaylistsPage.vue') },
    ],
  },
  {
    path: '/wildsea',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'tracks',
        component: () => import('pages/wildsea/WildseaTracksPage.vue'),
      },
      {
        path: 'tracklists',
        component: () => import('pages/wildsea/WildseaTracklistsPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
