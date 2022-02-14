import { removePropertyForSelectedChannels } from "../removePropertyForSelectedChannels";
import { store } from "../../../redux/store";
import { propertyCartActions } from "../../../pages/browseSupply/actions";
import { cleanup } from "@testing-library/react-hooks";
import { getValue } from "../getValue";

afterEach(cleanup);

describe("removePropertyForSelectedChannels function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  test("removePropertyForSelectedChannels case when single property for channel is removed", () => {
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

    const channelToBeRemoved = {
      id: "DEMO_OFFERBUILDER",
      name: "DEMO_OFFERBUILDER",
    };

    removePropertyForSelectedChannels(channelToBeRemoved);
    expect(store.getState().propertycart.cartItems).toStrictEqual([]);
  });

  test("removePropertyForSelectedChannels case when property not belongs to channel", () => {
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

    const channelToBeRemoved = {
      id: "DEMO_OFFERBUILDER",
      name: "DEMO_OFFERBUILDER",
    };

    removePropertyForSelectedChannels(channelToBeRemoved);
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

  test("removePropertyForSelectedChannels case when channel to remove is empty", () => {
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
    const channelToBeRemoved = {};
    removePropertyForSelectedChannels(channelToBeRemoved);
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
  test("removePropertyForSelectedChannels case when channel to remove is null", () => {
    store.dispatch({
      type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
      payload: null,
    });

    const channelToBeRemoved = null;

    removePropertyForSelectedChannels(channelToBeRemoved);
    expect(store.getState().propertycart.cartItems).toStrictEqual([]);
  });
});
