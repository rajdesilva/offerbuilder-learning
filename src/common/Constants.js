import { createIntl, createIntlCache } from "@formatjs/intl";
import * as languages from "../langs/";
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

export const appConstants = {
  DEBOUNCE_TIME: 2000,
  MAXIMUM_CART_ITEMS_COUNT: 25,
  OFFER_STATUS: {
    ARCHIVED: "ARCHIVED",
    PUBLISHED: "PUBLISHED",
    UNPUBLISHED: "UNPUBLISHED",
  },
  OFFER_STATUS_ACTION: {
    ARCHIVE: "ARCHIVE",
    PUBLISH: "PUBLISH",
    UNPUBLISH: "UNPUBLISH",
  },
  OFFER_STATUS_OPTIONS: [
    {
      id: "UNPUBLISHED",
      name: "UNPUBLISHED",
    },
    {
      id: "PUBLISHED",
      name: "PUBLISHED",
    },
    {
      id: "ARCHIVED",
      name: "ARCHIVED",
    },
  ],
  offerListTab: {
    ACTIVE: "active",
    ARCHIVE: "archive",
  },
  USER_ROLE: {
    ADMIN: "offerbuilder.admin",
    EDITOR: "offerbuilder.editor",
    VIEWER: "offerbuilder.viewer",
  },
  PROPERTY_TYPE_LIST: [
    {
      name: 'DEMO',
      id: 'DEMO'
    },
    {
      name: 'PROD',
      id: 'PROD'
    },
    {
      name: 'ALL (DEMO + PROD)',
      id: 'ALL'
    },
  ],
  DISPLAY_USER_ROLE: {
    "offerbuilder.admin": intl.formatMessage({
      id: "nemo.admin",
    }),
    "offerbuilder.editor": intl.formatMessage({
      id: "nemo.editor",
    }),
    "offerbuilder.viewer": intl.formatMessage({
      id: "nemo.viewer",
    }),
  },
  USER_STATUS: {
    ACTIVE: "ACTIVE",
    INACTIVE: intl.formatMessage({
      id: "nemo.userInactiveStatus",
    }),
    NOTREGISTERED: intl.formatMessage({
      id: "nemo.notRegisteredUser",
    }),
  },
  OFFER_IMAGE: {
    ALL: "ALL",
    EXCLUDE: "EXCLUDE",
    INCLUDE: "INCLUDE",
  },
  SORT_PROPERTY: {
    NAME_ASCENDING: intl.formatMessage({
      id: "nemo.nameAscending",
    }),
    PRICE_ASCENDING: intl.formatMessage({
      id: "nemo.priceAscending",
    }),
    NAME_DESCENDING: intl.formatMessage({
      id: "nemo.nameDescending",
    }),
    PRICE_DESCENDING: intl.formatMessage({
      id: "nemo.priceDescending",
    }),
    NAME_ASCENDING_VALUE: {
      sortOrder: "ASCENDING",
      sortCriteria: "NAME",
    },
    NAME_DESCENDING_VALUE: {
      sortOrder: "DESCENDING",
      sortCriteria: "NAME",
    },
    PRICE_ASCENDING_VALUE: {
      sortOrder: "ASCENDING",
      sortCriteria: "PRICE",
    },
    PRICE_DESCENDING_VALUE: {
      sortOrder: "DESCENDING",
      sortCriteria: "PRICE",
    },
  },
};
