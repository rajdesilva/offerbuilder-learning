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

export const appConstants_results = {

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
        id: "nemo.result.allproperties",
       
    }),
    PRICE_ASCENDING: intl.formatMessage({
        id: "nemo.result.withoutsuppliers",
        
    }),
    NAME_DESCENDING: intl.formatMessage({
        id: "nemo.withsuppliers",
    }),
    PRICE_DESCENDING: intl.formatMessage({
        id: "nemo.onlyntpproperties",
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

  
      // SORT_RESULT: {
      //   ALL_PROPERTIES: intl.formatMessage({
      //     id: "nemo.result.allproperties",
      //   }),
      //   ALL_PROPERTIES_WITHOUT: intl.formatMessage({
      //     id: "nemo.result.withoutsuppliers",
      //   }),
      //   ALL_PROPERTIES_WITH: intl.formatMessage({
      //     id: "nemo.withsuppliers",
      //   }),
      //   ALL_PROPERTIES_NTP: intl.formatMessage({
      //     id: "nemo.onlyntpproperties",
      //   }),

      //   ALL_PROPERTIES_ASCENDING_VALUE: {
      //     sortOrder: "ASCENDING",
      //     sortCriteria: "NAME",
      //   },
      //   ALL_PROPERTIES_WITHOUT_VALUE: {
      //     sortOrder: "ASCENDING",
      //     sortCriteria: "NAME",
      //   },
      //   ALL_PROPERTIES_WITH_VALUE: {
      //     sortOrder: "ASCENDING",
      //     sortCriteria: "PRICE",
      //   },
      //   ALL_PROPERTIES_ONLY_NTP_VALUE: {
      //     sortOrder: "ASCENDING",
      //     sortCriteria: "PRICE",
      //   },
      // },
  }
  
};
