import { getListOfPropertiesForSupplier } from "../getListOfPropertiesForSupplier";
import { store } from "../../../redux/store";
import { propertyCartActions } from "../../../pages/browseSupply/actions";
import { cleanup } from "@testing-library/react-hooks";
import { getValue } from "../getValue";

afterEach(cleanup);

describe("getListOfPropertiesForSupplier function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  test("getListOfPropertiesForSupplier case when single property for supplier", () => {
    store.dispatch({
      type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
      payload: [
        {
          internalId: 1660,
          propertyCode: "DEMO_HEERO",
          name: "HEERO Merriott STAR",
          channel: "DEMO_OFFERBUILDER",
          supplier: "ntp",
          city: "Wien",
          rating: 4,
          ratingProvider: "",
          remainingCapitalPool: 0,
          lcn: false,
          images: [],
          hotelName: "HEERO Merriott STAR",
          isSavedProperty: true,
          marketingImages: [],
          descriptions: [
            {
              lang: "EN",
              shortDescription: "Experience award-winning service",
              description:
                "Experience award-winning service and sophisticated style at JW Marriott Hotel Vienna.",
            },
          ],
        },
      ],
    });

    const supplierToBeRemoved = {
      id: "ntp",
      name: "NTP",
      channels: [
        {
          id: "DEMO_OFFERBUILDER",
          name: "DEMO_OFFERBUILDER",
        },
      ],
    };

    expect(getListOfPropertiesForSupplier(supplierToBeRemoved)).toStrictEqual([
      {
        channel: "DEMO_OFFERBUILDER",
        city: "Wien",
        descriptions: [
          {
            description:
              "Experience award-winning service and sophisticated style at JW Marriott Hotel Vienna.",
            lang: "EN",
            shortDescription: "Experience award-winning service",
          },
        ],
        hotelName: "HEERO Merriott STAR",
        images: [],
        internalId: 1660,
        isSavedProperty: true,
        lcn: false,
        marketingImages: [],
        name: "HEERO Merriott STAR",
        propertyCode: "DEMO_HEERO",
        rating: 4,
        ratingProvider: "",
        remainingCapitalPool: 0,
        supplier: "ntp",
      },
    ]);
  });

  test("getListOfPropertiesForSupplier case when property not belongs to supplier", () => {
    store.dispatch({
      type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
      payload: [
        {
          internalId: 1660,
          propertyCode: "DEMO_HEERO",
          name: "HEERO Merriott STAR",
          channel: "DEMO_INDIA_CH",
          supplier: "ntp",
          city: "Wien",
          rating: 4,
          ratingProvider: "",
          remainingCapitalPool: 0,
          lcn: false,
          images: [],
          hotelName: "HEERO Merriott STAR",
          isSavedProperty: true,
          marketingImages: [],
          descriptions: [
            {
              lang: "EN",
              shortDescription: "Experience award-winning service",
              description:
                "Experience award-winning service and sophisticated style at JW Marriott Hotel Vienna.",
            },
          ],
        },
      ],
    });

    const supplierToBeRemoved = {
      id: "ntp1",
      name: "NTP1",
      channels: [
        {
          id: "DEMO_OFFERBUILDER",
          name: "DEMO_OFFERBUILDER",
        },
      ],
    };

    expect(getListOfPropertiesForSupplier(supplierToBeRemoved)).toStrictEqual(
      []
    );
  });

  test("getListOfPropertiesForSupplier case when supplier to remove is empty", () => {
    store.dispatch({
      type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
      payload: [
        {
          internalId: 1660,
          propertyCode: "DEMO_HEERO",
          name: "HEERO Merriott STAR",
          channel: "DEMO_INDIA_CH",
          supplier: "ntp",
          city: "Wien",
          rating: 4,
          ratingProvider: "",
          remainingCapitalPool: 0,
          lcn: false,
          images: [],
          hotelName: "HEERO Merriott STAR",
          isSavedProperty: true,
          marketingImages: [],
          descriptions: [
            {
              lang: "EN",
              shortDescription: "Experience award-winning service",
              description:
                "Experience award-winning service and sophisticated style at JW Marriott Hotel Vienna.",
            },
          ],
        },
      ],
    });
    const supplierToBeRemoved = {};
    expect(getListOfPropertiesForSupplier(supplierToBeRemoved)).toStrictEqual(
      []
    );
  });
  test("getListOfPropertiesForSupplier case when supplier to remove is null", () => {
    store.dispatch({
      type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
      payload: null,
    });

    const supplierToBeRemoved = null;

    expect(getListOfPropertiesForSupplier(supplierToBeRemoved)).toStrictEqual(
      []
    );
  });
});
