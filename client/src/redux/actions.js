// Authentication/login actions.
import { REQUEST_AUTH, RECEIVE_AUTH, ERROR_AUTH } from "./actionTypes.js";

// This might get removed.
export const setAuthentication = user => {
  return {
    type: "SET_AUTHENTICATION",
    payload: user
  };
};

/*
 * Authentication/login action creators.
 */

/*
 * Send API request to get JWT etc. Nothing special here.
 */
export const requestAuth = () => {
  return { type: REQUEST_AUTH, isFetching: true, error: null };
};

/*
 * Receive JWT and other login data from server.
 * JSON should contain: token (JWT), user role and user id.
 */
export const receiveAuth = json => {
  return {
    type: RECEIVE_AUTH,
    token: json.token,
    user_role: json.role,
    user_id: json.id,
    isFetching: false,
    error: null
  };
};

/*
 * This action is called when the worst happens,
 * an ERROR appears while logging in.
 * Receives error and makes it a string.
 */
export const errorAuth = error => {
  return {
    type: ERROR_AUTH,
    error: error.toString(),
    isFetching: error
  };
};
