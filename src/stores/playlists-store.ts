import { PlaylistData } from '../models/databaseModels';
import { Playlist } from '../models/viewModels';
import { defineFirebaseBasicStore } from './firebase-basic-store';
import { useAmbiancesStore } from './ambiances-store';

function convertDataModel(key: string, data: PlaylistData): Playlist {
  const ambiancesStore = useAmbiancesStore();
  return {
    key: key,
    name: data.name,
    ambiances: data.ambiances.map((ambianceKey) =>
      ambiancesStore.get(ambianceKey)
    ),
  };
}

function convertToDataModel(model: Playlist): PlaylistData {
  return {
    name: model.name,
    ambiances: model.ambiances
      .map((ambiance) => ambiance.key)
      .filter((key) => key != null) as string[],
  };
}

export const usePlaylistsStore = defineFirebaseBasicStore<
  PlaylistData,
  Playlist
>('playlists', convertDataModel, convertToDataModel);
