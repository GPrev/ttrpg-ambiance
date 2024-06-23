import { WildseaTrack } from 'src/models/wildsea/viewModels';
import { WildseaTrackData } from 'src/models/wildsea/databaseModels';
import { defineFirebaseBasicStore } from '../firebase-basic-store';

function convertDataModel(key: string, data: WildseaTrackData): WildseaTrack {
  return {
    key: key,
    name: data.name,
    visible: data.visible,
    length: data.length,
    progress: data.progress,
    burn: data.burn,
  };
}

function convertToDataModel(model: WildseaTrack): WildseaTrackData {
  return {
    name: model.name,
    visible: model.visible,
    length: model.length,
    progress: model.progress,
    burn: model.burn,
  };
}

export const useWildseaTracksStore = defineFirebaseBasicStore<
  WildseaTrackData,
  WildseaTrack
>('wildsea_tracks', convertDataModel, convertToDataModel);
