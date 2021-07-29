import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IIncident, defaultValue } from 'app/shared/model/incident.model';

export const ACTION_TYPES = {
  FETCH_INCIDENT_LIST: 'incident/FETCH_INCIDENT_LIST',
  FETCH_INCIDENT: 'incident/FETCH_INCIDENT',
  CREATE_INCIDENT: 'incident/CREATE_INCIDENT',
  UPDATE_INCIDENT: 'incident/UPDATE_INCIDENT',
  PARTIAL_UPDATE_INCIDENT: 'incident/PARTIAL_UPDATE_INCIDENT',
  DELETE_INCIDENT: 'incident/DELETE_INCIDENT',
  RESET: 'incident/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IIncident>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type IncidentState = Readonly<typeof initialState>;

// Reducer

export default (state: IncidentState = initialState, action): IncidentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_INCIDENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_INCIDENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_INCIDENT):
    case REQUEST(ACTION_TYPES.UPDATE_INCIDENT):
    case REQUEST(ACTION_TYPES.DELETE_INCIDENT):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_INCIDENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_INCIDENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_INCIDENT):
    case FAILURE(ACTION_TYPES.CREATE_INCIDENT):
    case FAILURE(ACTION_TYPES.UPDATE_INCIDENT):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_INCIDENT):
    case FAILURE(ACTION_TYPES.DELETE_INCIDENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_INCIDENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_INCIDENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_INCIDENT):
    case SUCCESS(ACTION_TYPES.UPDATE_INCIDENT):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_INCIDENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_INCIDENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/incidents';

// Actions

export const getEntities: ICrudGetAllAction<IIncident> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_INCIDENT_LIST,
  payload: axios.get<IIncident>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IIncident> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_INCIDENT,
    payload: axios.get<IIncident>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IIncident> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_INCIDENT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IIncident> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_INCIDENT,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IIncident> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_INCIDENT,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IIncident> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_INCIDENT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
