import fetch from "isomorphic-fetch";

export const SELECT_BRIDGE = "SELECT_BRIDGE";
export function selectBridge(hub) {
  return {
    type: SELECT_BRIDGE,
    hub
  };
}

export const FOUND_BRIDGES = "FOUND_BRIDGES";
export function foundBridges(list) {
  return {
    type: FOUND_BRIDGES,
    list
  };
}

export const CANNOT_FIND_BRIDGES = "CANNOT_FIND_BRIDGES";
export function cannotFindBridges(error) {
  return {
    type: CANNOT_FIND_BRIDGES,
    error
  };
}

export const FETCH_BRIDGES = "FETCH_BRIDGES";
export function fetchBridges() {
  return {
    type: FETCH_BRIDGES
  };
}

export const FIND_BRIDGES = "FIND_BRIDGES";
export function findBridges() {
  return dispatch => {
    dispatch(fetchBridges());
    fetch("https://www.meethue.com/api/nupnp")
    .then(response => response.json())
    .then(result => {
      dispatch(foundBridges(result));
    })
    .catch(error => {
      dispatch(cannotFindBridges(error));
    });
  };
}
