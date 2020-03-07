// This might get removed.
export const setAuthentication = user => {
  return {
    type: "SET_AUTHENTICATION",
    payload: user
  };
};
