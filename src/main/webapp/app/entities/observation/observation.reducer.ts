import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IObservation, defaultValue } from 'app/shared/model/observation.model';

export const ACTION_TYPES = {
  FETCH_OBSERVATION_LIST: 'observation/FETCH_OBSERVATION_LIST',
  FETCH_OBSERVATION: 'observation/FETCH_OBSERVATION',
  CREATE_OBSERVATION: 'observation/CREATE_OBSERVATION',
  UPDATE_OBSERVATION: 'observation/UPDATE_OBSERVATION',
  PARTIAL_UPDATE_OBSERVATION: 'observation/PARTIAL_UPDATE_OBSERVATION',
  DELETE_OBSERVATION: 'observation/DELETE_OBSERVATION',
  SET_BLOB: 'observation/SET_BLOB',
  RESET: 'observation/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IObservation>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ObservationState = Readonly<typeof initialState>;

// Reducer

export default (state: ObservationState = initialState, action): ObservationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_OBSERVATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_OBSERVATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_OBSERVATION):
    case REQUEST(ACTION_TYPES.UPDATE_OBSERVATION):
    case REQUEST(ACTION_TYPES.DELETE_OBSERVATION):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_OBSERVATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_OBSERVATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_OBSERVATION):
    case FAILURE(ACTION_TYPES.CREATE_OBSERVATION):
    case FAILURE(ACTION_TYPES.UPDATE_OBSERVATION):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_OBSERVATION):
    case FAILURE(ACTION_TYPES.DELETE_OBSERVATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_OBSERVATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_OBSERVATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_OBSERVATION):
    case SUCCESS(ACTION_TYPES.UPDATE_OBSERVATION):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_OBSERVATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_OBSERVATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType,
        },
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/observations';

// Actions

export const getEntities: ICrudGetAllAction<IObservation> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_OBSERVATION_LIST,
  payload: axios.get<IObservation>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IObservation> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_OBSERVATION,
    payload: axios.get<IObservation>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IObservation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_OBSERVATION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IObservation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_OBSERVATION,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IObservation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_OBSERVATION,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IObservation> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_OBSERVATION,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
