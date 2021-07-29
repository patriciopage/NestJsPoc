import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IConversation, defaultValue } from 'app/shared/model/conversation.model';

export const ACTION_TYPES = {
  FETCH_CONVERSATION_LIST: 'conversation/FETCH_CONVERSATION_LIST',
  FETCH_CONVERSATION: 'conversation/FETCH_CONVERSATION',
  CREATE_CONVERSATION: 'conversation/CREATE_CONVERSATION',
  UPDATE_CONVERSATION: 'conversation/UPDATE_CONVERSATION',
  PARTIAL_UPDATE_CONVERSATION: 'conversation/PARTIAL_UPDATE_CONVERSATION',
  DELETE_CONVERSATION: 'conversation/DELETE_CONVERSATION',
  SET_BLOB: 'conversation/SET_BLOB',
  RESET: 'conversation/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IConversation>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ConversationState = Readonly<typeof initialState>;

// Reducer

export default (state: ConversationState = initialState, action): ConversationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CONVERSATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CONVERSATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CONVERSATION):
    case REQUEST(ACTION_TYPES.UPDATE_CONVERSATION):
    case REQUEST(ACTION_TYPES.DELETE_CONVERSATION):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_CONVERSATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CONVERSATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CONVERSATION):
    case FAILURE(ACTION_TYPES.CREATE_CONVERSATION):
    case FAILURE(ACTION_TYPES.UPDATE_CONVERSATION):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_CONVERSATION):
    case FAILURE(ACTION_TYPES.DELETE_CONVERSATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONVERSATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONVERSATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CONVERSATION):
    case SUCCESS(ACTION_TYPES.UPDATE_CONVERSATION):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_CONVERSATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CONVERSATION):
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

const apiUrl = 'api/conversations';

// Actions

export const getEntities: ICrudGetAllAction<IConversation> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CONVERSATION_LIST,
  payload: axios.get<IConversation>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IConversation> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CONVERSATION,
    payload: axios.get<IConversation>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IConversation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CONVERSATION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IConversation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CONVERSATION,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IConversation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_CONVERSATION,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IConversation> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CONVERSATION,
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
