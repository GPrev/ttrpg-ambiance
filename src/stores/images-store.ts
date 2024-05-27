import {
  onSnapshot,
  collection,
  CollectionReference,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  DocumentReference,
} from 'firebase/firestore';
import { ImageSource, ImageSourceDict } from './../models/ambiance';
import { defineStore } from 'pinia';
import { db } from 'src/boot/firebase';

interface ImagesStoreState {
  images: ImageSourceDict;
  loading: boolean;
}

const imageCollection = collection(db, 'images') as CollectionReference<ImageSource>

export const useImagesStore = defineStore('images', {
  state: (): ImagesStoreState => {
    return {
      images: {},
      loading: true,
    };
  },

  getters: {
    isLoading(state: ImagesStoreState) {
      return () => state.loading;
    },
    getImages(state: ImagesStoreState) {
      return () => state.images;
    },
    getImage(state: ImagesStoreState) {
      return (key: string) => state.images[key];
    },
  },

  actions: {
    setup() {
      this.loading = true;

      onSnapshot(
        imageCollection,
        (ds) => {
          this.images = {}
          if (ds.empty === false) {
            for (const doc of ds.docs) {
              this.images[doc.id] = doc.data();
            }
          }
          this.loading = false;
        }
      );
    },

    addImage(image: ImageSource): Promise<DocumentReference> {
      return addDoc(imageCollection, image);
    },

    updateImage(key: string, image: ImageSource) {
      if (!key) {
        console.error('Could not find key');
      } else {
        const itemDoc = doc(imageCollection, key);
        updateDoc(itemDoc, {
          name: image.name,
          url: image.url,
        });
      }
    },

    deleteImage(key: string) {
      if (!key) {
        console.error('Could not find key');
      } else {
        const itemDoc = doc(imageCollection, key);
        deleteDoc(itemDoc);
      }
    },
  },
});
