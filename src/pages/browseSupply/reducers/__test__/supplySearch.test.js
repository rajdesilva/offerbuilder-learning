import moment from "moment";
import { store } from "../../../../redux/store";
import { getValue } from "../../../../helpers";

window.getValue = getValue;

describe("Test Channels Redux", () => {
  test("Check initial default state of store ", () => {
    expect(store.getState().searchparams).toEqual({
      destination: {
        city: "",
        lat: "",
        lng: "",
      },
      los: 1,
      currencyCode: "EUR",
      onlySupplier: false,
      sortBy: {
        sortCriteria: "NAME",
        sortOrder: "ASCENDING",
      },
      target: {
        suppliers: [],
        channels: [],
      },
      distance: 10,
      hotelName: "",
      lcn: false,
      brands: [],
      type: "ALL",
      pageSize: 10,
      pageOffset: 0,
      dateRange: {
        startDate: moment().format("YYYY-MM-DD"),
        endDate: moment().add(60, "days").format("YYYY-MM-DD"),
      },
      remainingCapitalPool: "",
    });
  });
});
