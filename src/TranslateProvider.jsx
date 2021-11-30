import React from "react";
import { IntlProvider } from "react-intl";
import * as languages from "./langs/";
import App from "./App";

export function TranslateProvider() {
  return (
    <IntlProvider messages={languages["en"]} locale={"en"} defaultLocale="en">
      <App />
    </IntlProvider>
  );
}
