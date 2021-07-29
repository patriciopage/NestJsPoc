import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAttachment, defaultValue } from 'app/shared/model/attachment.model';

export const ACTION_TYPES = {
  FETCH_ATTACHMENT_LIST: 'attachment/FETCH_ATTACHMENT_LIST',
  FETCH_ATTACHMENT: 'attachment/FETCH_ATTACHMENT',
  CREATE_ATTACHMENT: 'attachment/CREATE_ATTACHMENT',
  UPDATE_ATTACHMENT: 'attachment/UPDATE_ATTACHMENT',
  PARTIAL_UPDATE_ATTACHMENT: 'attachment/PARTIAL_UPDATE_ATTACHMENT',
  DELETE_ATTACHMENT: 'attachment/DELETE_ATTACHMENT',
  RESET: 'attachment/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAttachment>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type AttachmentState = Readonly<typeof initialState>;

// Reducer

export default (state: AttachmentState = initialState, action): AttachmentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ATTACHMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ATTACHMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_ATTACHMENT):
    case REQUEST(ACTION_TYPES.UPDATE_ATTACHMENT):
    case REQUEST(ACTION_TYPES.DELETE_ATTACHMENT):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_ATTACHMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_ATTACHMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ATTACHMENT):
    case FAILURE(ACTION_TYPES.CREATE_ATTACHMENT):
    case FAILURE(ACTION_TYPES.UPDATE_ATTACHMENT):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_ATTACHMENT):
    case FAILURE(ACTION_TYPES.DELETE_ATTACHMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATTACHMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATTACHMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_ATTACHMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_ATTACHMENT):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_ATTACHMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ATTACHMENT):
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

const apiUrl = 'api/attachments';

// Actions

export const getEntities: ICrudGetAllAction<IAttachment> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ATTACHMENT_LIST,
  payload: axios.get<IAttachment>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IAttachment> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ATTACHMENT,
    payload: axios.get<IAttachment>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IAttachment> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ATTACHMENT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAttachment> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ATTACHMENT,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IAttachment> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_ATTACHMENT,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAttachment> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ATTACHMENT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
