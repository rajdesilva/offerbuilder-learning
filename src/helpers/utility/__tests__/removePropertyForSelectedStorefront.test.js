import { removePropertyForSelectedStorefront } from "../removePropertyForSelectedStorefront";
import { store } from "../../../redux/store";
import { cleanup } from "@testing-library/react-hooks";
import { propertyCartActions } from "../../../pages/browseSupply/actions";

afterEach(cleanup);

describe("removePropertyForSelectedStorefront function test", () => {
  test("removePropertyForSelectedStorefront case when for storefront property is removed from cart", () => {
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

    const storefrontToRemove = {
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

    removePropertyForSelectedStorefront(storefrontToRemove);
    expect(store.getState().propertycart.cartItems).toStrictEqual([]);
  });

  test("removePropertyForSelectedStorefront check case when multiple storefronts related properties are removed", () => {
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

    const storefrontToRemove = {
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
            {
              id: "DEMO_INDIA_CH",
              name: "DEMO_INDIA_CH",
            },
          ],
        },
      ],
    };

    removePropertyForSelectedStorefront(storefrontToRemove);
    expect(store.getState().propertycart.cartItems).toStrictEqual([]);
  });

  test("removePropertyForSelectedStorefront check case when storefront to be removed has no valid info", () => {
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

    const storefrontToRemove = {
      storefronts: [{}],
    };

    removePropertyForSelectedStorefront(storefrontToRemove);
    expect(store.getState().propertycart.cartItems).toStrictEqual([
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
    ]);
  });
});
