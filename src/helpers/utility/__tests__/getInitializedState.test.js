import { cleanup } from "@testing-library/react-hooks";
import { getInitializedState } from "../getInitializedState";
import { getValue } from "../getValue";

describe("getInitializedState function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  afterEach(cleanup);
  test("getInitializedState check initial state when component loads first time with initial state value", () => {
    const decodedQueryObj = {
      onlySupplier: false,
    };
    Date.now = jest.fn(() => new Date("2021-01-01"));
    expect(getInitializedState(decodedQueryObj)).toStrictEqual({
      destination: {
        city: "",
        lat: "",
        lng: "",
      },
      distance: 10,
      hotelName: "",
      lcn: "",
      los: 1,
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
      remainingCapitalPool: "",
    });
  });

  test("getInitializedState check initial state when component refreshes with brands data", () => {
    const decodedQueryObj = {
      latitude: "",
      longitude: "",
      distance: 10,
      hotelName: "",
      startDate: "2021-02-12",
      endDate: "2021-04-13",
      los: 1,
      onlySupplier: false,
      lcn: false,
      currencyCode: "EUR",
      pageSize: 10,
      pageOffset: 0,
      sortBy: "name",
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
      city: "",
    };
    expect(getInitializedState(decodedQueryObj)).toStrictEqual({
      destination: {
        lat: "",
        lng: "",
        city: "",
      },
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
        startDate: "2021-02-12",
        endDate: "2021-04-13",
      },
      currencyCode: "EUR",
      lcn: false,
      remainingCapitalPool: "",
    });
  });

  test("getInitializedState check initial state when empty object is given", () => {
    const decodedQueryObj = {};
    Date.now = jest.fn(() => new Date("2021-01-01"));
    expect(getInitializedState(decodedQueryObj)).toStrictEqual({
      brands: [],
      currencyCode: "EUR",
      dateRange: { endDate: "2021-03-02", startDate: "2021-01-01" },
      destination: { city: "", lat: "", lng: "" },
      distance: 10,
      hotelName: "",
      lcn: "",
      los: 1,
      onlySupplier: false,
      pageOffset: 0,
      pageSize: 10,
      remainingCapitalPool: "",
      sortBy: {
        sortCriteria: "NAME",
        sortOrder: "ASCENDING",
      },
      target: { channels: [], suppliers: [] },
    });
  });

  test("getInitializedState check initial state when null object is given", () => {
    const decodedQueryObj = null;
    Date.now = jest.fn(() => new Date("2021-01-01"));
    expect(getInitializedState(decodedQueryObj)).toStrictEqual({
      brands: [],
      currencyCode: "EUR",
      dateRange: { endDate: "2021-03-02", startDate: "2021-01-01" },
      destination: { city: "", lat: "", lng: "" },
      distance: 10,
      hotelName: "",
      lcn: "",
      los: 1,
      onlySupplier: false,
      pageOffset: 0,
      pageSize: 10,
      remainingCapitalPool: "",
      sortBy: {
        sortCriteria: "NAME",
        sortOrder: "ASCENDING",
      },
      target: { channels: [], suppliers: [] },
    });
  });
});
