import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./rootReducers";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1";

const persistConfig = {
  key: "root",
  storage: storageSession,
  stateReconciler: autoMergeLevel1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const loggerMiddleware = createLogger();
const middlewares = [];
middlewares.push(thunkMiddleware);
if (process.env.NODE_ENV === "development") {
  middlewares.push(loggerMiddleware);
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);
