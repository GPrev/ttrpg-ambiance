import { onSnapshot, collection, doc, updateDoc } from 'firebase/firestore';
import { defineStore } from 'pinia';
import { db } from 'src/boot/firebase';
import { useAmbiancesStore } from './ambiances-store';
import { usePlaylistsStore } from './playlists-store';
import { Ambiance, Playlist } from 'src/models/viewModels';

interface Control {
  ambianceKey: string;
  playlistKey: string;
}

interface GlobalStoreState {
  control: Control;
  loading: boolean;
}

const globalCollection = collection(db, 'global');

export const useGlobalStore = defineStore('global', {
  state: (): GlobalStoreState => {
    return {
      control: {
        ambianceKey: '',
        playlistKey: '',
      },
      loading: true,
    };
  },

  getters: {
    isLoading(state: GlobalStoreState) {
      return () => state.loading;
    },
    getAmbianceKey(state: GlobalStoreState) {
      return () => state.control.ambianceKey;
    },
    getAmbiance(state: GlobalStoreState) {
      const ambianceStore = useAmbiancesStore();
      return () => ambianceStore.get(state.control.ambianceKey);
    },
    getPlaylistKey(state: GlobalStoreState) {
      return () => state.control.playlistKey;
    },
    getPlaylist(state: GlobalStoreState) {
      const playlistStore = usePlaylistsStore();
      return () => playlistStore.get(state.control.playlistKey);
    },
  },

  actions: {
    setup() {
      this.loading = true;

      onSnapshot(globalCollection, (ds) => {
        if (ds.empty === false) {
          for (const doc of ds.docs) {
            if (doc.id == 'control') {
              this.control.ambianceKey = doc.data().ambianceKey;
              this.control.playlistKey = doc.data().playlistKey;
            }
          }
        }
        this.loading = false;
      });
    },

    setAmbianceKey(key: string) {
      const itemDoc = doc(globalCollection, 'control');
      updateDoc(itemDoc, {
        ambianceKey: key,
      });
    },
    setAmbiance(ambiance: Ambiance) {
      const itemDoc = doc(globalCollection, 'control');
      updateDoc(itemDoc, {
        ambianceKey: ambiance.key,
      });
    },

    setPlaylistKey(key: string) {
      const itemDoc = doc(globalCollection, 'control');
      updateDoc(itemDoc, {
        playlistKey: key,
      });
    },
    setPlaylist(playlist: Playlist) {
      const itemDoc = doc(globalCollection, 'control');
      updateDoc(itemDoc, {
        playlistKey: playlist.key,
      });
    },
  },
});
