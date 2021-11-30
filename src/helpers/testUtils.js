import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render as rtlRender } from "@testing-library/react";
import { getValue } from "./utility";
import rootReducers from "../redux/rootReducers";
import * as languages from "../langs";
import { IntlProvider } from "react-intl";
const initialReducerState = {};
window.getValue = getValue;

window.google = {
  maps: {
    Marker: class {},
    Map: class {},
    LatLngBounds: class {},
    places: {
      Autocomplete: class {},
      AutocompleteService: class {},
      PlacesServiceStatus: {
        INVALID_REQUEST: "INVALID_REQUEST",
        NOT_FOUND: "NOT_FOUND",
        OK: "OK",
        OVER_QUERY_LIMIT: "OVER_QUERY_LIMIT",
        REQUEST_DENIED: "REQUEST_DENIED",
        UNKNOWN_ERROR: "UNKNOWN_ERROR",
        ZERO_RESULTS: "ZERO_RESULTS",
      },
      PlacesAutocomplete: {
        INVALID_REQUEST: "INVALID_REQUEST",
        NOT_FOUND: "NOT_FOUND",
        OK: "OK",
        OVER_QUERY_LIMIT: "OVER_QUERY_LIMIT",
        REQUEST_DENIED: "REQUEST_DENIED",
        UNKNOWN_ERROR: "UNKNOWN_ERROR",
        ZERO_RESULTS: "ZERO_RESULTS",
      },
    },

    MarkerClusterer: class {},
    Geocoder: class {},
  },
};
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

function render(
  ui,
  {
    initialState = initialReducerState,
    store = createStore(rootReducers, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <IntlProvider locale="en" messages={languages["en"]}>
          {children}
        </IntlProvider>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
