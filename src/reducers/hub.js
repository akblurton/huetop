import { combineReducers } from "redux";
import {
  FOUND_HUBS,
  SELECT_HUB,
  CANNOT_FIND_HUBS,
  FETCH_HUBS
} from "actions";

function list(state = [], action) {
  switch(action.type) {
  case FOUND_HUBS:
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
  case SELECT_HUB: {
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
  case FETCH_HUBS:
    return true;
  case FOUND_HUBS:
  case CANNOT_FIND_HUBS:
    return false;
  default:
    return state;
  }
}

function error(state = null, action) {
  switch(action.type) {
  case CANNOT_FIND_HUBS:
    return action.error;
  case SELECT_HUB:
  case FOUND_HUBS:
  case FETCH_HUBS:
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
