import { getListOfPropertiesForBrand } from "../getListOfPropertiesForBrand";
import { store } from "../../../redux/store";
import { propertyCartActions } from "../../../pages/browseSupply/actions";
import { cleanup } from "@testing-library/react-hooks";
import { getValue } from "../getValue";

afterEach(cleanup);

describe("getListOfPropertiesForBrand function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  test("getListOfPropertiesForBrand case when single property for brand", () => {
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

    expect(getListOfPropertiesForBrand(brandToRemove)).toStrictEqual([
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

  test("getListOfPropertiesForBrand case when property not belongs to brand", () => {
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

    expect(getListOfPropertiesForBrand(brandToRemove)).toStrictEqual([]);
  });

  test("getListOfPropertiesForBrand check case when brands with multiple storefront channels and properties include those brand info", () => {
    store.dispatch({
      type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
      payload: [
        {
          internalId: 16601,
          propertyCode: "DEMO_HEERO1",
          name: "HEERO Merriott STAR1",
          channel: "DEMO_INDIA_CH",
          supplier: "ntp",
          city: "Wien1",
          rating: 5,
          ratingProvider: "",
          remainingCapitalPool: 1110,
          lcn: true,
          images: [],
          hotelName: "HEERO Merriott STAR11",
          isSavedProperty: true,
          marketingImages: [],
          descriptions: [
            {
              lang: "EN",
              shortDescription: "Experience award-winning service11",
              description:
                "11Experience award-winning service and sophisticated style at JW Marriott Hotel Vienna.",
            },
          ],
        },
        {
          internalId: 343234,
          propertyCode: "DEMO_111111",
          name: "HEERO Merriott STAR444",
          channel: "DEMO_OFFERBUILDER",
          supplier: "ntp",
          city: "Wien444",
          rating: 4,
          ratingProvider: "",
          remainingCapitalPool: 0,
          lcn: false,
          images: [],
          hotelName: "HEERO Merriott STAR444",
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
        {
          id: "ids3",
          name: "PC Travel",
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

    expect(getListOfPropertiesForBrand(brandToRemove)).toStrictEqual([
      {
        channel: "DEMO_OFFERBUILDER",
        city: "Wien444",
        descriptions: [
          {
            description:
              "Experience award-winning service and sophisticated style at JW Marriott Hotel Vienna.",
            lang: "EN",
            shortDescription: "Experience award-winning service",
          },
        ],
        hotelName: "HEERO Merriott STAR444",
        images: [],
        internalId: 343234,
        isSavedProperty: true,
        lcn: false,
        marketingImages: [],
        name: "HEERO Merriott STAR444",
        propertyCode: "DEMO_111111",
        rating: 4,
        ratingProvider: "",
        remainingCapitalPool: 0,
        supplier: "ntp",
      },
      {
        channel: "DEMO_INDIA_CH",
        city: "Wien1",
        descriptions: [
          {
            description:
              "11Experience award-winning service and sophisticated style at JW Marriott Hotel Vienna.",
            lang: "EN",
            shortDescription: "Experience award-winning service11",
          },
        ],
        hotelName: "HEERO Merriott STAR11",
        images: [],
        internalId: 16601,
        isSavedProperty: true,
        lcn: true,
        marketingImages: [],
        name: "HEERO Merriott STAR1",
        propertyCode: "DEMO_HEERO1",
        rating: 5,
        ratingProvider: "",
        remainingCapitalPool: 1110,
        supplier: "ntp",
      },
    ]);
  });

  test("getListOfPropertiesForBrand case when brand to remove is empty", () => {
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
    const brandToRemove = {};
    expect(getListOfPropertiesForBrand(brandToRemove)).toStrictEqual([]);
  });
  test("getListOfPropertiesForBrand case when brand to remove is null", () => {
    store.dispatch({
      type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
      payload: null,
    });

    const brandToRemove = null;

    expect(getListOfPropertiesForBrand(brandToRemove)).toStrictEqual([]);
  });
});
