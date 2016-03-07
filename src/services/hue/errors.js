/**
 * Hue API Error Codes
 */

export const UNAUTHORIZED_USER = 1;
export const INVALID_JSON = 2;
export const RESOURCE_NOT_AVAILABLE = 3;
export const METHOD_NOT_AVAILABLE = 4;
export const MISSING_PARAMETERS = 5;
export const PARAMETER_NOT_AVAILABLE = 6;
export const INVALID_VALUE = 7;
export const PARAMETER_NOT_MODIFIABLE = 8;
export const TOO_MANY_ITEMS = 11;
export const PORTAL_CONNECTION_REQUIRED = 12;
export const INTERNAL_ERROR = 901;
export const LINK_BUTTON_NOT_PRESSED = 101;
export const DHCP_CANNOT_BE_DISABLED = 110;
export const INVALID_UPDATE_STATE = 111;
export const DEVICE_SET_TO_OFF = 201;
export const GROUP_TABLE_FULL = 301;
export const DEVICE_GROUP_TABLE_FULL = 302;
export const DEVICE_UNREACHABLE = 304;
export const NOT_ALLOWED_TO_MODIFY_GROUP = 305;
export const LIGHT_ALREADY_USED = 306;
export const SCENE_CREATION_IN_PROGRESS = 401;
export const BUFFER_FULL = 402;
export const SCENE_LOCKED = 403;
export const NOT_ALLOWED_TO_CREATE_SENSOR = 501;
export const SENSOR_LIST_FULL = 502;
export const RULE_ENGINE_FULL = 601;
export const CONDITION_ERROR = 607;
export const ACTION_ERROR = 608;
export const UNABLE_TO_ACTIVE = 609;
export const SCHEDULE_LIST_FULL = 701;
export const TIMEZONE_INVALID = 702;
export const CANNOT_SET_TIME_AND_LOCAL_TIME = 703;
export const CANNOT_CREATE_SCHEDULE = 704;
export const CANNOT_ENABLE_SCHEDULE = 705;
export const COMMAND_ERROR = 706;
export const SOURCE_MODEL_INVALID = 801;
export const SOURCE_FACTORY_NEW = 802;
export const INVALID_STATE = 803;

/**
 * Retrieve descriptor object for given error code
 * @param  {Number} code Error code
 * @return {Object} Summary, Description (and optional note) for error type
 */
export const describe = code => ({
  [UNAUTHORIZED_USER]: {
    "summary": "unauthorized user,",
    "description": "This will be returned if an invalid username is used in the request, or if the username does not have the rights to modify the resource."
  },

  [INVALID_JSON]: {
    "summary": "body contains invalid JSON,",
    "description": "This will be returned if the body of the message contains invalid JSON."
  },

  [RESOURCE_NOT_AVAILABLE]: {
    "summary": "resource, <resource>, not available,",
    "description": "This will be returned if the addressed resource does not exist. E.g. the user specifies a light ID that does not exist."
  },

  [METHOD_NOT_AVAILABLE]: {
    "summary": "method, <method_name>, not available for resource, <resource>,",
    "description": "This will be returned if the method (GET/POST/PUT/DELETE) used is not supported by the URL e.g. DELETE is not supported on the /config resource"
  },

  [MISSING_PARAMETERS]: {
    "summary": "missing parameters in body,",
    "description": "Will be returned if required parameters are not present in the message body. The presence of invalid parameters should not trigger this error as long as all required parameters are present."
  },

  [PARAMETER_NOT_AVAILABLE]: {
    "summary": "parameter, <parameter>, not available,",
    "description": "This will be returned if a parameter sent in the message body does not exist. This error is specific to PUT commands; invalid parameters in other commands are simply ignored."
  },

  [INVALID_VALUE]: {
    "summary": "invalid value, <value>, for parameter, <parameter>,",
    "description": "This will be returned if the value set for a parameter is of the incorrect format or is out of range."
  },

  [PARAMETER_NOT_MODIFIABLE]: {
    "summary": "parameter, <parameter>, is not modifiable,",
    "description": "This will be returned if an attempt to modify a read only parameter is made."
  },

  [TOO_MANY_ITEMS]: {
    "summary": "too many items in list,",
    "description": "List in request contains too many items"
  },

  [PORTAL_CONNECTION_REQUIRED]: {
    "summary": "Portal connection required,",
    "description": "Command requires portal connection. Returned if portalservices is “false“ or the portal connection is down"
  },

  [INTERNAL_ERROR]: {
    "summary": "Internal error, <error code>,",
    "description": "This will be returned if there is an internal error in the processing of the command. This indicates an error in the bridge, not in the message being sent."
  },

  [LINK_BUTTON_NOT_PRESSED]: {
    "summary": "link button not pressed,",
    "description": " /config/linkbutton is false. Link button has not been pressed in last 30 seconds."
  },

  [DHCP_CANNOT_BE_DISABLED]: {
    "summary": "DHCP cannot be disabled,",
    "description": "DHCP can only be disabled if there is a valid static IP configuration"
  },

  [INVALID_UPDATE_STATE]: {
    "summary": "Invalid updatestate,",
    "description": "checkforupdate can only be set in updatestate 0 and 1."
  },

  [DEVICE_SET_TO_OFF]: {
    "summary": "parameter, <parameter>, is not modifiable. Device is set to off.,",
    "description": "This will be returned if a user attempts to modify a parameter which cannot be modified due to current state of the device. This will most commonly be returned if the hue/sat/bri/effect/xy/ct parameters are modified while the on parameter is false."
  },

  [GROUP_TABLE_FULL]: {
    "summary": "group could not be created. Group table is full.,",
    "description": "The bridge can store a maximum of 16 groups. This error will be returned if there are already the maximum number of groups created in the bridge."
  },

  [DEVICE_GROUP_TABLE_FULL]: {
    "summary": "device, <id>, could not be added to group. Device’s group table is full.,",
    "description": "The lamp can store a maximum of 16 groups. This error will be returned if the device cannot accept any new groups in its internal table.,",
    "note": "Deprecated as of 1.4"
  },

  [DEVICE_UNREACHABLE]: {
    "summary": "device, <id>, could not be added to the scene. Device is unreachable.,",
    "description": "This will be returned if an attempt to update a light list in a group or delete a group of type \"Luminaire\" or \"LightSource\",",
    "note": "Deprecated as of 1.4"
  },

  [NOT_ALLOWED_TO_MODIFY_GROUP]: {
    "summary": "It is not allowed to update or delete group of this type,",
    "description": "This will be returned if an attempt to update a light list in a group or delete a group of type \"Luminaire\" or \"LightSource\",",
    "note": "Implemented as of 1.4"
  },

  [LIGHT_ALREADY_USED]: {
    "summary": "Light is already used in another room",
    "description": "A light can only be used in 1 room at the same time.,",
    "note": "Added in 1 .11"
  },

  [SCENE_CREATION_IN_PROGRESS]: {
    "summary": "scene could not be created. Scene creation in progress.,",
    "description": "This will be returned if a scene is activated which is currently still in the process of being created.,",
    "note": "Deprecated as of 1.2.1"
  },

  [BUFFER_FULL]: {
    "summary": "Scene could not be created. Scene buffer in bridge full,",
    "description": "It is not possibly anymore to buffer scenes in the bridge for the lights. Application can try again later, let the user turn on lights, remove schedules or delete scenes"
  },

  [SCENE_LOCKED]: {
    "summary": "Scene couldn't not be removed, because it's locked.",
    "description": "Scene could not be removed, because it's locked. Delete the resource (schedule or rule action) that is locking it first.,",
    "note": "Added in 1 .11"
  },

  [NOT_ALLOWED_TO_CREATE_SENSOR]: {
    "summary": "No allowed to create sensor type,",
    "description": "Will be returned if the sensor type cannot be created using CLIP"
  },

  [SENSOR_LIST_FULL]: {
    "summary": "Sensor list is full,",
    "description": "This will be returned if there are already the maximum number of sensors created in the bridge."
  },

  [RULE_ENGINE_FULL]: {
    "summary": "Rule engine full,",
    "description": "Returned when already 100 rules are created and no further rules can be added"
  },

  [CONDITION_ERROR]: {
    "summary": "Condition error,",
    "description": "Rule conditions contain errors or operator combination is not allowed (e.g. only one dt operator is allowed)"
  },

  [ACTION_ERROR]: {
    "summary": "Action error,",
    "description": "Rule actions contain errors or multiple actions with the same resource address"
  },

  [UNABLE_TO_ACTIVE]: {
    "summary": "Unable to activate,",
    "description": "Unable to set rule status to ‘enable, because rule conditions references unknown resource or unsupported resource attribute"
  },

  [SCHEDULE_LIST_FULL]: {
    "summary": "Schedule list is full,",
    "description": "This will be returned if there are already the maximum number of schedules created in the bridge."
  },

  [TIMEZONE_INVALID]: {
    "summary": "Schedule time-zone not valid,",
    "description": "Cannot set parameter 'localtime', because timezone has not been configured."
  },

  [CANNOT_SET_TIME_AND_LOCAL_TIME]: {
    "summary": "Schedule cannot set time and local time,",
    "description": "Cannot set parameter 'time' and 'localtime' at the same time."
  },

  [CANNOT_CREATE_SCHEDULE]: {
    "summary": "Cannot create schedule,",
    "description": "Cannot create schedule because tag, <tag>, is invalid."
  },

  [CANNOT_ENABLE_SCHEDULE]: {
    "summary": "Cannot enable schedule, time is in the past,",
    "description": "The schedule has expired , the time pattern has to be updated before enabling"
  },

  [COMMAND_ERROR]: {
    "summary": "Command error,",
    "description": "Schedule command on a unsupported resource.,",
    "note": "Added in 1.11"
  },

  [SOURCE_MODEL_INVALID]: {
    "summary": "Source model invalid,",
    "description": "Backup is requested on an unsupported bridge model.,",
    "note": "Added in 1.10"
  },

  [SOURCE_FACTORY_NEW]: {
    "summary": "Source factory new",
    "description": "Backup is requested on a factory new bridge, nothing to backup.,",
    "note": "Added in 1.10"
  },

  [INVALID_STATE]: {
    "summary": "Invalid state",
    "description": "Backup is requested in another state then idle.,",
    "note": "Added in 1.10"
  }
})[code];
