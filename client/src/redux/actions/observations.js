import Observation from '../../models/observation';
import { SAVING, IDLE, LOADING, OBSERVATIONS_LOADED } from './actions';

export function saveObservation(observation) {
  return async dispatch => {
    dispatch({ type: SAVING });
    await observation.save();
    dispatch({ type: IDLE });
  };
}

export function loadObservations() {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING });
    const { dataSample: currentObservations } = getState();
    const observations = await Observation.fetchOwnList();
    const newObservations = observations.filter(o => currentObservations.indexOf(o) < 0);
    dispatch({
      type: OBSERVATIONS_LOADED,
      observations: [...currentObservations, ...newObservations],
    });
    dispatch({ type: IDLE });
  };
}