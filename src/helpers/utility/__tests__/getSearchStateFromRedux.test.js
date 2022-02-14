import { supplySearchActions } from "../../../pages/browseSupply/actions";
import { store } from "../../../redux/store";
import { getSearchStateFromRedux } from "../getSearchStateFromRedux";
import { getValue } from "../getValue";

describe("getSearchStateFromRedux function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  test("getSearchStateFromRedux check if initial state with redux data for search state is correct or not", () => {
    store.dispatch({
      type: supplySearchActions.SUPPLY_SEARCH_UPDATE_REDUX_STATE,
      payload: {
        destination: { lat: "", lng: "", city: "" },
        distance: "",
        los: 1,
        hotelName: "",
        onlySupplier: false,
        target: { suppliers: [], channels: [] },
        brands: [],
        pageSize: 10,
        pageOffset: 0,
        dateRange: { startDate: "2021-02-12", endDate: "2021-04-13" },
        currencyCode: "EUR",
        lcn: "",
        remainingCapitalPool: "",
      },
    });
    expect(getSearchStateFromRedux()).toStrictEqual({
      latitude: "",
      longitude: "",
      distance: "",
      hotelName: "",
      startDate: "2021-02-12",
      endDate: "2021-04-13",
      los: 1,
      onlySupplier: false,
      lcn: false,
      currencyCode: "EUR",
      remainingCapitalPool: null,
      pageSize: 10,
      pageOffset: 0,
      sortCriteria: "NAME",
      sortOrder: "ASCENDING",
      suppliers: [],
      brands: [],
      type: "DEMO",
    });
  });

  test("getSearchStateFromRedux check if initial state with redux data for search state with onlysupplier true is correct or not", () => {
    store.dispatch({
      type: supplySearchActions.SUPPLY_SEARCH_UPDATE_REDUX_STATE,
      payload: {
        destination: { lat: "", lng: "", city: "" },
        distance: "",
        los: 1,
        hotelName: "",
        onlySupplier: true,
        target: { suppliers: [], channels: [] },
        brands: [],
        pageSize: 10,
        pageOffset: 0,
        dateRange: { startDate: "2021-02-12", endDate: "2021-04-13" },
        currencyCode: "EUR",
        lcn: "",
        remainingCapitalPool: "",
      },
    });
    expect(getSearchStateFromRedux()).toStrictEqual({
      latitude: "",
      longitude: "",
      distance: "",
      hotelName: "",
      startDate: "2021-02-12",
      endDate: "2021-04-13",
      los: 1,
      onlySupplier: true,
      lcn: false,
      currencyCode: "EUR",
      remainingCapitalPool: null,
      pageSize: 10,
      pageOffset: 0,
      sortCriteria: "NAME",
      sortOrder: "ASCENDING",
      suppliers: [],
      brands: [],
      type: "DEMO",
    });
  });

  test("getSearchStateFromRedux check if search params selected state with redux data for search state is correct or not", () => {
    store.dispatch({
      type: supplySearchActions.SUPPLY_SEARCH_UPDATE_REDUX_STATE,
      payload: {
        destination: { lat: "", lng: "", city: "" },
        distance: "",
        los: 1,
        hotelName: "",
        onlySupplier: false,
        target: { suppliers: [], channels: [] },
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
                      { id: "DEMO_OFFERBUILDER", name: "DEMO_OFFERBUILDER" },
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
        dateRange: { startDate: "2021-02-12", endDate: "2021-04-13" },
        currencyCode: "EUR",
        lcn: "",
        remainingCapitalPool: "",
      },
    });
    expect(getSearchStateFromRedux()).toStrictEqual({
      latitude: "",
      longitude: "",
      distance: "",
      hotelName: "",
      startDate: "2021-02-12",
      endDate: "2021-04-13",
      los: 1,
      onlySupplier: false,
      lcn: false,
      currencyCode: "EUR",
      remainingCapitalPool: null,
      pageSize: 10,
      pageOffset: 0,
      sortCriteria: "NAME",
      sortOrder: "ASCENDING",
      suppliers: [],
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
                    { id: "DEMO_OFFERBUILDER", name: "DEMO_OFFERBUILDER" },
                  ],
                },
              ],
            },
          ],
          id: "idb",
          name: "Internal Demo Brand",
        },
      ],
      type: "DEMO",
    });
  });

  test("getSearchStateFromRedux check output for search params selected state with invalid redux data for current search state ", () => {
    Date.now = jest.fn(() => new Date("2021-01-01"));
    store.dispatch({
      type: supplySearchActions.SUPPLY_SEARCH_UPDATE_REDUX_STATE,
      payload: {},
    });
    expect(getSearchStateFromRedux()).toStrictEqual({
      latitude: "",
      longitude: "",
      distance: "",
      hotelName: "",
      startDate: "2021-01-01",
      endDate: "2021-03-02",
      los: 1,
      onlySupplier: undefined,
      lcn: false,
      currencyCode: "EUR",
      remainingCapitalPool: null,
      pageSize: 10,
      pageOffset: 0,
      sortCriteria: "NAME",
      sortOrder: "ASCENDING",
      suppliers: [],
      brands: [],
      type: "DEMO",
    });
  });
});
