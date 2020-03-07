export const authReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_AUTHENTICATION":
      return action.payload;
    default:
      return state;
  }
};
