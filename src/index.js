import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { store } from "./redux/store";
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from "react-redux";
import { apm, history } from "./helpers";
import { fetchWrapper } from "./helpers/fetchWrapper";
import { getValue } from "./helpers/utility";
import { TranslateProvider } from "./TranslateProvider";

window.fetchWrapper = fetchWrapper;
window.getValue = getValue;
window.apm = apm;

// disable console.logs for production envt
if (process.env.REACT_APP_ENABLE_LOGS === "false") {
  console.log = function () {};
}

window.onerror = (msg, url, lineNo, columnNo, error) => {
  apm.captureError(error.message + " msg :", msg + " lineNo :", lineNo);
  return false;
};

function TranslatedApp() {
  return (
    <Provider store={store}>
      <React.StrictMode>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <Router history={history}>
          <TranslateProvider />
        </Router>
        </PersistGate>
      </React.StrictMode>
    </Provider>
  );
}
ReactDOM.render(<TranslatedApp />, document.getElementById("root"));
