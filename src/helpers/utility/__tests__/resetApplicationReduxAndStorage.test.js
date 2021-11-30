import { resetApplicationReduxAndStorage } from "../resetApplicationReduxAndStorage";
import { store } from "../../../redux/store";
import { cleanup } from "@testing-library/react-hooks";
import { getValue } from "../getValue";
import { appConstants } from "../../../common";

afterEach(cleanup);

jest.mock("moment", () => {
  return () => jest.requireActual("moment")("2021-01-01T00:00:00.000Z");
});

describe("resetApplicationReduxAndStorage function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  test("resetApplicationReduxAndStorage case when function is called, redux is updated with empty and initial state values", () => {
    resetApplicationReduxAndStorage();
    expect(store.getState().propertycart.cartItems).toStrictEqual([]);
    expect(store.getState().newoffermarketinginfo).toStrictEqual({
      marketingInfo: {
        images: [],
      },
      selectedLanguages: [
        {
          id: "EN",
          name: "English",
        },
      ],
    });
    expect(store.getState().newoffersettingsparam).toStrictEqual({
      offerId: "",
      status: {
        id: "UNPUBLISHED",
        name: "UNPUBLISHED",
      },
      name: "",
      brands: [],
      bookingDateRange: {
        endDate: "",
        startDate: "",
      },
      lastSearchDistance: 10,
      travellingDateRange: {
        endDate: "",
        startDate: "",
      },
      type: "DEMO",
      bookingDatesTimezone: "",
      deepLinkSettingsInfo: {
        destination: null,
        adultOccupancy: 1,
        childOccupancy: 0,
        includeAllProperties: true,
        checkInType: "rolling",
        los: 1,
        rollingOffset: 0,
        fixedDate: null,
      },
    });
    expect(store.getState().searchedproperties.searchedBrands).toStrictEqual(
      []
    );

    expect(store.getState().searchparams).toStrictEqual({
      destination: {
        lat: "",
        lng: "",
        city: "",
      },
      type: "ALL",
      distance: 10,
      los: 1,
      hotelName: "",
      onlySupplier: false,
      sortBy: {
        sortCriteria: "NAME",
        sortOrder: "ASCENDING",
      },
      target: {
        suppliers: [],
        channels: [],
      },
      brands: [],
      pageSize: 10,
      pageOffset: 0,
      dateRange: {
        endDate: "2021-03-02",
        startDate: "2021-01-01",
      },
      currencyCode: "EUR",
      lcn: false,
      remainingCapitalPool: "",
    });
    expect(store.getState().offerlistsearchandfilters).toStrictEqual({
      selectedTab: appConstants.offerListTab.ACTIVE,
      loading: false,
      offers: [],
      pageOffset: 0,
      pageSize: 10,
      offerDetailsLoading: false,
      totalOffers: 0,
      // used  for storing parsed brands, storefronts, suppliers, channels
      targetfilterdata: {
        brands: [],
        storefronts: [],
        suppliers: [],
        channels: [],
        propertyTypes: [
          {
            name: "DEMO",
            id: "DEMO",
          },
          {
            name: "PROD",
            id: "PROD",
          },
          {
            name: "ALL (DEMO + PROD)",
            id: "ALL",
          },
        ],
      },

      appliedFilters: {
        brands: [],
        storefronts: [],
        suppliers: [],
        channels: [],
        lcn: false,
        propertyTypes: [],
        status: [
          appConstants.OFFER_STATUS_OPTIONS[0],
          appConstants.OFFER_STATUS_OPTIONS[1],
        ],
        searchInputText: "",
      },
    });
  });
});
