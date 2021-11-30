import { supplySearchActions } from "../../../pages/browseSupply/actions";
import { store } from "../../../redux/store";
import { history } from "../../history";
import { createSearchQueryURL } from "../createSearchQueryURL";
import { getValue } from "../getValue";

describe("createSearchQueryURL function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  test("createSearchQueryURL check if for search params info is getting updated correctly in url for search settings case or not", () => {
    store.dispatch({
      type: supplySearchActions.SUPPLY_SEARCH_UPDATE_REDUX_STATE,
      payload: {
        destination: {
          city: "Pune, Maharashtra, India",
          lat: 18.5204303,
          lng: 73.8567437,
        },
        los: 1,
        hotelName: "Star",
        onlySupplier: false,
        target: {
          suppliers: [],
          channels: [],
        },
        brands: [
          {
            storefronts: [
              {
                id: "ids",
                name: "Internal Demo Storefront",
                suppliers: [
                  {
                    id: "ntp",
                    name: "NTP",
                    channels: [
                      {
                        id: "DEMO_OFFERBUILDER",
                        name: "DEMO_OFFERBUILDER",
                      },
                    ],
                  },
                ],
              },
            ],
            id: "idb",
            name: "Internal Demo Brand",
          },
        ],
        pageSize: 10,
        pageOffset: 0,
        dateRange: {
          startDate: "2021-02-11",
          endDate: "2021-04-12",
        },
        currencyCode: "EUR",
        remainingCapitalPool: "",
      },
    });
    Date.now = jest.fn(() => new Date("2021-02-11"));
    createSearchQueryURL("/offers/create-new-offer/2", true);
    expect(history.location.pathname).toBe("/offers/create-new-offer/2");
    expect(createSearchQueryURL("/offers/create-new-offer/2", true)).toBe(
      undefined
    );
  });
  test("createSearchQueryURL check if for search params info is getting updated correctly in url for sending in API or not", () => {
    store.dispatch({
      type: supplySearchActions.SUPPLY_SEARCH_UPDATE_REDUX_STATE,
      payload: {
        destination: {
          city: "Pune, Maharashtra, India",
          lat: 18.5204303,
          lng: 73.8567437,
        },
        los: 1,
        hotelName: "Star",
        onlySupplier: false,
        target: {
          suppliers: [],
          channels: [],
        },
        brands: [
          {
            storefronts: [
              {
                id: "ids",
                name: "Internal Demo Storefront",
                suppliers: [
                  {
                    id: "ntp",
                    name: "NTP",
                    channels: [
                      {
                        id: "DEMO_OFFERBUILDER",
                        name: "DEMO_OFFERBUILDER",
                      },
                    ],
                  },
                ],
              },
            ],
            id: "idb",
            name: "Internal Demo Brand",
          },
        ],
        pageSize: 10,
        pageOffset: 0,
        dateRange: {
          startDate: "2021-02-11",
          endDate: "2021-04-12",
        },
        currencyCode: "EUR",
        remainingCapitalPool: "",
      },
    });
    Date.now = jest.fn(() => new Date("2021-02-11"));
    createSearchQueryURL("/browse-supply/search-results");
    expect(history.location.pathname).toBe("/browse-supply/search-results");
    expect(createSearchQueryURL("/browse-supply/search-results")).toBe(
      "?latitude=18.5204303&longitude=73.8567437&distance=&hotelName=Star&startDate=2021-02-11&endDate=2021-04-12&los=1&onlySupplier=false&lcn=false&currencyCode=EUR&pageSize=10&pageOffset=0&sortOrder=ASCENDING&sortCriteria=NAME&brands%5B0%5D.storefronts%5B0%5D.id=ids&brands%5B0%5D.storefronts%5B0%5D.name=Internal%20Demo%20Storefront&brands%5B0%5D.storefronts%5B0%5D.suppliers%5B0%5D.id=ntp&brands%5B0%5D.storefronts%5B0%5D.suppliers%5B0%5D.name=NTP&brands%5B0%5D.storefronts%5B0%5D.suppliers%5B0%5D.channels%5B0%5D.id=DEMO_OFFERBUILDER&brands%5B0%5D.storefronts%5B0%5D.suppliers%5B0%5D.channels%5B0%5D.name=DEMO_OFFERBUILDER&brands%5B0%5D.id=idb&brands%5B0%5D.name=Internal%20Demo%20Brand&type=DEMO"
    );
  });
  test("createSearchQueryURL check url when search params redux data is empty", () => {
    Date.now = jest.fn(() => new Date("2021-01-01"));
    store.dispatch({
      type: supplySearchActions.SUPPLY_SEARCH_UPDATE_REDUX_STATE,
      payload: {},
    });
    createSearchQueryURL("/browse-supply/search-results");
    expect(history.location.pathname).toBe("/browse-supply/search-results");
  });

  test("createSearchQueryURL check url when search params redux data is null", () => {
    store.dispatch({
      type: supplySearchActions.SUPPLY_SEARCH_UPDATE_REDUX_STATE,
      payload: null,
    });
    createSearchQueryURL("/browse-supply/search-results");
    expect(history.location.pathname).toBe("/browse-supply/search-results");
  });
});
