import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAgent, defaultValue } from 'app/shared/model/agent.model';

export const ACTION_TYPES = {
  FETCH_AGENT_LIST: 'agent/FETCH_AGENT_LIST',
  FETCH_AGENT: 'agent/FETCH_AGENT',
  CREATE_AGENT: 'agent/CREATE_AGENT',
  UPDATE_AGENT: 'agent/UPDATE_AGENT',
  PARTIAL_UPDATE_AGENT: 'agent/PARTIAL_UPDATE_AGENT',
  DELETE_AGENT: 'agent/DELETE_AGENT',
  RESET: 'agent/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAgent>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type AgentState = Readonly<typeof initialState>;

// Reducer

export default (state: AgentState = initialState, action): AgentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_AGENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AGENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_AGENT):
    case REQUEST(ACTION_TYPES.UPDATE_AGENT):
    case REQUEST(ACTION_TYPES.DELETE_AGENT):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_AGENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_AGENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AGENT):
    case FAILURE(ACTION_TYPES.CREATE_AGENT):
    case FAILURE(ACTION_TYPES.UPDATE_AGENT):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_AGENT):
    case FAILURE(ACTION_TYPES.DELETE_AGENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_AGENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_AGENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_AGENT):
    case SUCCESS(ACTION_TYPES.UPDATE_AGENT):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_AGENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_AGENT):
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

const apiUrl = 'api/agents';

// Actions

export const getEntities: ICrudGetAllAction<IAgent> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_AGENT_LIST,
  payload: axios.get<IAgent>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IAgent> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_AGENT,
    payload: axios.get<IAgent>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IAgent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_AGENT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAgent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_AGENT,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IAgent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_AGENT,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAgent> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_AGENT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
