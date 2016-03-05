import Hue from "services/hue";

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
    Hue.bridges()
    .then(result => {
      dispatch(foundBridges(result));
    })
    .catch(error => {
      dispatch(cannotFindBridges(error));
    });
  };
}

export const CONNECTING_TO_BRIDGE = "CONNECTING_TO_BRIDGE";
export function connectingToBridge() {
  return {
    type: CONNECTING_TO_BRIDGE
  };
}

export const CONNECTED_TO_BRIDGE = "CONNECTED_TO_BRIDGE";
export function connectedToBridge(bridge) {
  return {
    type: CONNECTED_TO_BRIDGE,
    bridge
  };
}

export const CONNECTION_FAILED = "CONNECTION_FAILED";
export function connectionFailed(error) {
  return {
    type: CONNECTION_FAILED,
    error
  };
}

export const WAIT_FOR_LINK_BUTTON = "WAIT_FOR_LINK_BUTTON";
export function waitForLinkButton() {
  return {
    type: WAIT_FOR_LINK_BUTTON
  };
}

export const CONNECT_TO_BRIDGE = "CONNECT_TO_BRIDGE";
export function connectToBridge(ipOrId) {
  return (dispatch) => {
    dispatch(connectingToBridge());

    Hue.waitForConnection(ipOrId).then(bridge => {
      dispatch(connectedToBridge(bridge));
    })
    .catch(e => {
      dispatch(connectionFailed(e));
    });
  };
}
