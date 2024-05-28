import {
  onSnapshot,
  collection,
  CollectionReference,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
  DocumentReference,
  DocumentData,
} from 'firebase/firestore';
import { defineStore } from 'pinia';
import { db } from 'src/boot/firebase';
import { StrDict } from 'src/models/basicTypes';

export function defineFirebaseBasicStore<DataModel, Model>(
  storeName: string,
  convertDataModel: (key: string, data: DataModel) => Model,
  convertToDataModel: (model: Model) => DataModel
) {
  const dataCollection = collection(
    db,
    storeName
  ) as CollectionReference<DataModel>;

  interface StoreState {
    data: StrDict<Model>;
    loading: boolean;
  }

  return defineStore(storeName, {
    state: (): StoreState => {
      return {
        data: {},
        loading: true,
      };
    },

    getters: {
      isLoading(state: StoreState) {
        return () => state.loading;
      },
      getAll(state: StoreState) {
        return () => state.data;
      },
      get(state: StoreState) {
        return (key: string) => state.data[key];
      },
    },

    actions: {
      async setup() {
        return new Promise((resolve) => {
          this.loading = true;

          onSnapshot(dataCollection, (ds) => {
            this.data = {};
            if (ds.empty === false) {
              for (const doc of ds.docs) {
                this.data[doc.id] = convertDataModel(doc.id, doc.data());
              }
            }
            this.loading = false;
            resolve(true);
          });
        });
      },

      addImage(
        model: Model
      ): Promise<DocumentReference<DataModel, DocumentData>> {
        return addDoc(dataCollection, convertToDataModel(model));
      },

      setImage(key: string, model: Model) {
        if (!key) {
          console.error('Could not find key');
        } else {
          const itemDoc = doc(dataCollection, key);
          setDoc(itemDoc, convertToDataModel(model));
        }
      },

      deleteImage(key: string) {
        if (!key) {
          console.error('Could not find key');
        } else {
          const itemDoc = doc(dataCollection, key);
          deleteDoc(itemDoc);
        }
      },
    },
  });
}
