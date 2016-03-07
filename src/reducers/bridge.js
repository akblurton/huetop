import { combineReducers } from "redux";
import {
  FETCH_BRIDGES,
  FOUND_BRIDGES,
  CANNOT_FIND_BRIDGES,
  CONNECT_TO_BRIDGE,
  CONNECTED_TO_BRIDGE,
  CONNECTION_FAILED
} from "actions";

function list(state = [], action) {
  switch(action.type) {
  case FOUND_BRIDGES:
    return [...action.list];
  default:
    return state;
  }
}

function current(state = null, action) {
  switch(action.type) {
  case CONNECTED_TO_BRIDGE: {
    return action.bridge;
  }
  default:
    return state;
  }
}

function isLoading(state = false, action) {
  switch(action.type) {
  case FETCH_BRIDGES:
    return true;
  case FOUND_BRIDGES:
  case CANNOT_FIND_BRIDGES:
    return false;
  default:
    return state;
  }
}

function error(state = null, action) {
  switch(action.type) {
  case CANNOT_FIND_BRIDGES:
    return action.error;
  case CONNECTION_FAILED:
    return action.error;
  case CONNECT_TO_BRIDGE:
  case CONNECTED_TO_BRIDGE:
  case FOUND_BRIDGES:
  case FETCH_BRIDGES:
    return null;
  default:
    return state;
  }
}

export default combineReducers({
  list,
  current,
  error,
  isLoading
});
