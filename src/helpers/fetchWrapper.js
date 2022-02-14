import { message } from "antd";
import { createIntl, createIntlCache } from "@formatjs/intl";
import * as languages from "../langs/";
import { baseURL } from "./api-config";
import { history } from "./history";

// This is optional but highly recommended
// since it prevents memory leak
const cache = createIntlCache();

// Create the `intl` object
const intl = createIntl(
  {
    // Locale of the application
    // TODO:
    locale: "en",
    // Locale of the fallback defaultMessage
    defaultLocale: "en",
    messages: languages["en"],
  },
  cache
);
const defaultRequest = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
};
export const fetchWrapper = (url, payload) => {
  payload = {
    ...defaultRequest,
    ...payload,
  };
  return fetch(url, payload).then(
    (response) => {
      // Check that the response is valid and reject an error
      // response to prevent subsequent attempt to parse json
      if (!response.ok) {
        if (response.status === 500) {
          message.error(
            intl.formatMessage({
              id: "nemo.error500msg",
            })
          );
        } else if (response.status === 503) {
          message.error(
            intl.formatMessage({
              id: "nemo.error503msg",
            })
          );
        } else if (response.status === 504) {
          message.error(
            intl.formatMessage({
              id: "nemo.error504msg",
            })
          );
        } else {
          message.error(
            intl.formatMessage({
              id: "nemo.somethingWentWrongPleaseTryAgain",
            })
          );
        }
        return;
      }
      if (response.status === 403) {
        history.push("/access-denied");
      }
      return response.json ? response.json() : response;
    },
    (error) => {
      /**
       * user url, payload and error here for sending to the logger.
       */
      if (error instanceof TypeError) {
        window.location.href = baseURL.API_URL_BASE + "redirect";
      }
      console.error("fetch error : ", error);
    }
  );
};
