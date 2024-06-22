import { WildseaTracklist } from 'src/models/wildsea/viewModels';
import { WildseaTracklistData } from 'src/models/wildsea/databaseModels';
import { defineFirebaseBasicStore } from '../firebase-basic-store';
import { useWildseaTracksStore } from './tracks-store';

function convertDataModel(
  key: string,
  data: WildseaTracklistData
): WildseaTracklist {
  const tracksStore = useWildseaTracksStore();
  return {
    key: key,
    name: data.name,
    tracks: data.tracks.map((trackKey) => tracksStore.get(trackKey)),
  };
}

function convertToDataModel(model: WildseaTracklist): WildseaTracklistData {
  return {
    name: model.name,
    tracks: model.tracks.map((track) => track.key || ''),
  };
}

export const useWildseaTracklistsStore = defineFirebaseBasicStore<
  WildseaTracklistData,
  WildseaTracklist
>('wildsea_tracklists', convertDataModel, convertToDataModel);
