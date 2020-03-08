import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_RECEIVE,
  GET_ITEMS_ERROR
} from "../actionTypes";

const initialState = {
  byId: null,
  isFetching: false,
  error: null
};

export const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST:
      return {
        byId: null,
        isFetching: action.isFetching,
        error: action.error
      };
    // TODO: write a function to handle unpacking items from response so that
    // byId has format: byId: { item_id: name: ..., ... }
    case GET_ITEMS_RECEIVE:
      return {
        byId: action.response.items,
        isFetching: action.isFetching,
        error: action.error
      };
    case GET_ITEMS_ERROR:
      return {
        byId: null,
        isFetching: action.isFetching,
        error: action.error
      };
    default:
      return state;
  }
};
