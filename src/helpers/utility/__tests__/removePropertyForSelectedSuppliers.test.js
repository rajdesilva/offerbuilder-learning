import { removePropertyForSelectedSuppliers } from "../removePropertyForSelectedSuppliers";
import { store } from "../../../redux/store";
import { propertyCartActions } from "../../../pages/browseSupply/actions";
import { cleanup } from "@testing-library/react-hooks";
import { getValue } from "../getValue";

afterEach(cleanup);

describe("removePropertyForSelectedSuppliers function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  test("removePropertyForSelectedSuppliers case when single property for supplier is removed", () => {
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
    removePropertyForSelectedSuppliers(supplierToBeRemoved);
    expect(store.getState().propertycart.cartItems).toStrictEqual([]);
  });

  test("removePropertyForSelectedSuppliers case when no property removed to supplier", () => {
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

    removePropertyForSelectedSuppliers(supplierToBeRemoved);
    expect(store.getState().propertycart.cartItems).toStrictEqual([
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
    ]);
  });

  test("removePropertyForSelectedSuppliers case when supplier to remove is empty", () => {
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
    removePropertyForSelectedSuppliers(supplierToBeRemoved);
    expect(store.getState().propertycart.cartItems).toStrictEqual([
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
    ]);
  });
});
