import { getListOfPropertiesForStorefront } from "../getListOfPropertiesForStorefront";
import { store } from "../../../redux/store";
import { propertyCartActions } from "../../../pages/browseSupply/actions";
import { cleanup } from "@testing-library/react-hooks";
import { getValue } from "../getValue";

afterEach(cleanup);

describe("getListOfPropertiesForStorefront function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  test("getListOfPropertiesForStorefront case when single property for storefront", () => {
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

    const storefrontToBeRemoved = 
      {
        id: "ids2",
        name: "Best Travel",
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
      };

    expect(
      getListOfPropertiesForStorefront(storefrontToBeRemoved)
    ).toStrictEqual([
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

  test("getListOfPropertiesForStorefront case when property not belongs to storefront", () => {
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

    const storefrontToBeRemoved = 
      {
        id: "ids2",
        name: "Best Travel",
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
      };

    expect(
      getListOfPropertiesForStorefront(storefrontToBeRemoved)
    ).toStrictEqual([]);
  });

  test("getListOfPropertiesForStorefront case when storefront to remove is empty", () => {
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
    const storefrontToBeRemoved = {};
    expect(
      getListOfPropertiesForStorefront(storefrontToBeRemoved)
    ).toStrictEqual([]);
  });
  test("getListOfPropertiesForStorefront case when storefront to remove is null", () => {
    store.dispatch({
      type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
      payload: null,
    });

    const storefrontToBeRemoved = null;

    expect(
      getListOfPropertiesForStorefront(storefrontToBeRemoved)
    ).toStrictEqual([]);
  });
});
