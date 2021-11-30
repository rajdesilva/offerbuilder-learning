import { propertyCartActions } from "../../../pages/browseSupply/actions";
import { store } from "../../../redux/store";
import { getParsedPropertiesForDeeplinkSettings } from "../getParsedPropertiesForDeeplinkSettings";
import { getValue } from "../getValue";

describe("getParsedPropertiesForDeeplinkSettings function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
    store.dispatch({
      type: propertyCartActions.EMPTY_CART,
    });
  });
  test("getParsedPropertiesForDeeplinkSettings check if properties parsed with name and id", () => {
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
          internalId: 1622260,
          propertyCode: "DEMO_HEERO11",
          name: "HEERO Merriott STAR11",
          channel: "DEMO_OFFERBUILDER",
          supplier: "ntp",
          city: "Wien",
          rating: 5,
          ratingProvider: "",
          remainingCapitalPool: 0,
          lcn: false,
          images: [],
          hotelName: "HEERO Merriott 11111",
          isSavedProperty: true,
          marketingImages: [],
          descriptions: [
            {
              lang: "EN",
              shortDescription: "Experience award-winning service11",
              description:
                "Experience award-winning service and sophisticated style at JW Marriott Hotel Vienna.11",
            },
          ],
        },
      ],
    });
    expect(getParsedPropertiesForDeeplinkSettings()).toStrictEqual([
      {
        id: 1660,
        name: "HEERO Merriott STAR",
      },
      {
        id: 1622260,
        name: "HEERO Merriott STAR11",
      },
    ]);
  });

  test("getParsedPropertiesForDeeplinkSettings check case with empty properties array ", () => {
    store.dispatch({
      type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
      payload: [],
    });
    expect(getParsedPropertiesForDeeplinkSettings()).toStrictEqual([]);
  });

  test("getParsedPropertiesForDeeplinkSettings check case when properties array is null", () => {
    store.dispatch({
      type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
      payload: null,
    });
    expect(getParsedPropertiesForDeeplinkSettings()).toStrictEqual([]);
  });
});
