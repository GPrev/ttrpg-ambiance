import { onSnapshot, collection, doc, updateDoc } from 'firebase/firestore';
import { defineStore } from 'pinia';
import { db } from 'src/boot/firebase';
import { useAmbiancesStore } from './ambiances-store';
import { usePlaylistsStore } from './playlists-store';
import { useWildseaTracklistsStore } from './wildsea/tracklists-store';
import { Ambiance, Playlist } from 'src/models/viewModels';
import { WildseaTracklist } from 'src/models/wildsea/viewModels';

interface Control {
  ambianceKey: string;
  playlistKey: string;
}

interface WildseaControl {
  tracklistsKeys: string[];
  visible: boolean;
  tracklistSize: number;
}

interface GlobalStoreState {
  control: Control;
  wildseaControl: WildseaControl;
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
      wildseaControl: {
        tracklistsKeys: [],
        visible: false,
        tracklistSize: 4,
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
    getWildseaTracklistKeys(state: GlobalStoreState) {
      return () => state.wildseaControl.tracklistsKeys;
    },
    getWildseaTracklists(state: GlobalStoreState) {
      const tracklistStore = useWildseaTracklistsStore();
      return () =>
        state.wildseaControl.tracklistsKeys.map((tracklistKey) =>
          tracklistStore.get(tracklistKey)
        );
    },
    isWildseaVisible(state: GlobalStoreState) {
      return () => state.wildseaControl.visible;
    },
    getWildseaTracklistSize(state: GlobalStoreState) {
      return () => state.wildseaControl.tracklistSize;
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
            } else if (doc.id == 'wildsea_control') {
              this.wildseaControl.tracklistsKeys = doc.data().tracklists;
              this.wildseaControl.visible = doc.data().visible;
              this.wildseaControl.tracklistSize =
                doc.data().tracklistSize || this.wildseaControl.tracklistSize;
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

    setWildseaTracklistKeys(keys: string[]) {
      const itemDoc = doc(globalCollection, 'wildsea_control');
      updateDoc(itemDoc, {
        tracklists: keys,
      });
    },
    setWildseaTracklists(tracklists: WildseaTracklist[]) {
      const itemDoc = doc(globalCollection, 'wildsea_control');
      updateDoc(itemDoc, {
        tracklists: tracklists.map((tracklist) => tracklist.key),
      });
    },
    setWildseaVisible(visible: boolean) {
      const itemDoc = doc(globalCollection, 'wildsea_control');
      updateDoc(itemDoc, {
        visible: visible,
      });
    },
    setWildseaTracklistSize(size: number) {
      const itemDoc = doc(globalCollection, 'wildsea_control');
      updateDoc(itemDoc, {
        tracklistSize: size,
      });
    },
  },
});
