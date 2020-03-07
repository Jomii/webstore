import { createStore, applyMiddleware, compose } from "redux";
import rootReducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Uncomment applyMiddleware to enable redux-thunk.
const store = createStore(
  rootReducer,
  composeEnhancers() //applyMiddleware(thunkMiddleware))
);
