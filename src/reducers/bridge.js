import { combineReducers } from "redux";
import {
  FOUND_BRIDGES,
  SELECT_BRIDGE,
  CANNOT_FIND_BRIDGES,
  FETCH_BRIDGES
} from "actions";

function list(state = [], action) {
  switch(action.type) {
  case FOUND_BRIDGES:
    return action.list.map(hub => {
      let { id, internalipaddress: ip } = hub;
      return {
        id,
        ip
      };
    });
  default:
    return state;
  }
}

function current(state = null, action) {
  switch(action.type) {
  case SELECT_BRIDGE: {
    let { id, internalipaddress: ip } = action.hub;
    return {
      id,
      ip
    };
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
  case SELECT_BRIDGE:
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
