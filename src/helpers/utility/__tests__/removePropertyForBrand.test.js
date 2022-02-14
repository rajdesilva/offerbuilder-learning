import { store } from "../../../redux/store";
import { removePropertyForBrand } from "../removePropertyForBrand";
import { getValue } from "../getValue";
import { propertyCartActions } from "../../../pages/browseSupply/actions";

describe("removePropertyForBrand function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  test("removePropertyForBrand check if brand related properties are removed from cart or not", () => {
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

    const brandToRemove = {
      id: "idb",
      name: "Internal Demo Brand",
      storefronts: [
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
        },
      ],
    };
    const index = 0;
    removePropertyForBrand(brandToRemove, index);
    expect(store.getState().propertycart.cartItems).toStrictEqual([]);
  });

  test("removePropertyForBrand case when property not belongs to brand", () => {
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

    const brandToRemove = {
      id: "idb",
      name: "Internal Demo Brand",
      storefronts: [
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
        },
      ],
    };

    const index = 0;
    removePropertyForBrand(brandToRemove, index);
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

  test("removePropertyForBrand check if brand related multiple properties are removed from cart or not", () => {
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
        {
          internalId: 16601,
          propertyCode: "DEMO_HEERO1",
          name: "HEERO Merriott STAR111",
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

    const brandToRemove = {
      id: "idb",
      name: "Internal Demo Brand",
      storefronts: [
        {
          id: "ids2",
          name: "Best Travel",
          suppliers: [
            {
              id: "ntp",
              name: "NTP",
              channels: [
                {
                  id: "DEMO_INDIA_CH",
                  name: "DEMO_INDIA_CH",
                },
                {
                  id: "DEMO_OFFERBUILDER",
                  name: "DEMO_OFFERBUILDER",
                },
              ],
            },
          ],
        },
      ],
    };
    const index = 0;
    removePropertyForBrand(brandToRemove, index);
    expect(store.getState().propertycart.cartItems).toStrictEqual([]);
  });
});
