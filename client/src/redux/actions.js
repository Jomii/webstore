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
 * Sends a login request to API and tries to get JWT and other authdata.
 * Need credentials parameter that contains email and password.
 */
export const sendLoginRequest = credentials => {
  return dispatch => {
    dispatch(requestAuth());
    fetch("http://localhost:5000/api/login", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
      .then(respone => response.json())
      .then(authData => dispatch(receiveAuth(authData)))
      .catch(error => dispatch(errorAuth(error)));
  };
};

/*
 * Send API request to get JWT etc. Nothing special here.
 */
const requestAuth = () => {
  return { type: REQUEST_AUTH, isFetching: true, error: null };
};

/*
 * Receive JWT and other login data from server.
 * JSON should contain: token (JWT), user role and user id.
 */
const receiveAuth = json => {
  return {
    type: RECEIVE_AUTH,
    token: json.token,
    role: json.role,
    id: json.id,
    isFetching: false,
    error: null
  };
};

/*
 * This action is called when the worst happens,
 * an ERROR appears while logging in.
 * Receives error and makes it a string.
 */
const errorAuth = error => {
  return {
    type: ERROR_AUTH,
    error: error.toString(),
    isFetching: error
  };
};
