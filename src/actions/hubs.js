import fetch from "isomorphic-fetch";

export const SELECT_HUB = "SELECT_HUB";
export function selectHub(hub) {
  return {
    type: SELECT_HUB,
    hub
  };
}

export const FOUND_HUBS = "FOUND_HUBS";
export function foundHubs(list) {
  return {
    type: FOUND_HUBS,
    list
  };
}

export const CANNOT_FIND_HUBS = "CANNOT_FIND_HUBS";
export function cannotFindHubs(error) {
  return {
    type: CANNOT_FIND_HUBS,
    error
  };
}

export const FETCH_HUBS = "FETCH_HUBS";
export function fetchHubs() {
  return {
    type: FETCH_HUBS
  };
}

export const FIND_HUBS = "FIND_HUBS";
export function findHubs() {
  return dispatch => {
    dispatch(fetchHubs());
    fetch("https://www.meethue.com/api/nupnp")
    .then(response => response.json())
    .then(result => {
      dispatch(foundHubs(result));
    })
    .catch(error => {
      dispatch(cannotFindHubs(error));
    });
  };
}
