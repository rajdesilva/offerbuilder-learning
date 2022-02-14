import { cleanup } from "@testing-library/react-hooks";
import { propertyCartActions } from "../../../pages/browseSupply/actions";
import {
  marketingActions,
  newOfferActions,
} from "../../../pages/offers/actions";
import { store } from "../../../redux/store";
import { createOfferRequestObject } from "../createOfferRequestObject";
import { getValue } from "../getValue";

describe("createOfferRequestObject function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  afterEach(cleanup);
  test("createOfferRequestObject check if function returns correct offer object to send or not", () => {
    store.dispatch({
      type: newOfferActions.NEW_OFFER_UPDATE_REDUX_STATE,
      payload: {
        key: "16130408723",
        offerId: "16130408723",
        type: 'PROD',
        lcn: false,
        status: {
          id: "UNPUBLISHED",
          name: "UNPUBLISHED",
        },
        images: [],
        name: "Cypress DL3 Offer",
        brands: [
          {
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
          },
        ],
        marketingInfo: [
          {
            title: "Banjare & Banjare Start Hotels",
            lang: "EN",
            shortDescription: "Experience award-winning service",
            description:
              "Experience award-winning service and sophisticated style at JW Marriott Hotel Vienna.",
            termsAndConditions: "Standard terms and conditions",
          },
        ],
        languages: ["EN"],
        storefrontName: "Best Travel",
        brandName: "Internal Demo Brand",
        bookingDatesTimezone: "",
        deepLinkSettingsInfo: {
          destination: {
            lat: 47.6435616,
            lng: 15.8302052,
          },
          adultOccupancy: 1,
          childOccupancy: 0,
          checkInType: "rolling",
          includeAllProperties: true,
          los: 5,
          rollingOffset: 4,
          fixedDate: null,
        },
        bookingDateRange: null,
        displayBookingDateRange: null,
        currency: "EUR",
        createdDate: "11.02.2021",
        travellingDateRange: null,
        displayTravellingDateRange: null,
      },
    });
    store.dispatch({
      type: marketingActions.UPDATE_OFFER_MARKETING_INFO,
      payload: {
        EN: {
          description:
            "Experience award-winning service and sophisticated style at Villa Schönthal Hotel.",
          shortDescription: "Experience award-winning service",
          termsAndConditions: "Standard terms and conditions",
          title: "Banjare & Banjare Start Hotels",
        },
        images: [],
      },
    });
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
    expect(createOfferRequestObject()).toStrictEqual({
      bookingEndDate: null,
      bookingStartDate: null,
      bookingZoneId: null,
      type: 'PROD',
      currencyCode: "EUR",
      lastSearchDistance: "",
      deepLinkSettingsInfo: {
        adultOccupancy: 1,
        checkinDate: null,
        childOccupancy: 0,
        includeAllProperties: true,
        latitude: 47.6435616,
        longitude: 15.8302052,
        los: 5,
        rollingOffset: 4,
      },
      id: "16130408723",
      images: [],
      internalName: "Cypress DL3 Offer",
      languages: ["EN"],
      marketingInfo: [
        {
          description:
            "Experience award-winning service and sophisticated style at Villa Schönthal Hotel.",
          lang: "EN",
          shortDescription: "Experience award-winning service",
          termsAndConditions: "Standard terms and conditions",
          title: "Banjare & Banjare Start Hotels",
        },
      ],
      properties: [
        {
          channel: "DEMO_OFFERBUILDER",
          city: "Wien",
          images: [],
          internalId: 1660,
          isSavedProperty: true,
          lcn: false,
          marketingInfo: [
            {
              description:
                "Experience award-winning service and sophisticated style at JW Marriott Hotel Vienna.",
              lang: "EN",
              shortDescription: "Experience award-winning service",
            },
          ],
          name: "HEERO Merriott STAR",
          propertyCode: "DEMO_HEERO",
          rating: 4,
          ratingProvider: "",
          remainingCapitalPool: 0,
          supplier: "ntp",
        },
      ],
      status: "UNPUBLISHED",
      targets: [
        {
          id: "idb",
          name: "Internal Demo Brand",
          storefronts: [
            {
              id: "ids2",
              name: "Best Travel",
              suppliers: [
                {
                  channels: [
                    { id: "DEMO_OFFERBUILDER", name: "DEMO_OFFERBUILDER" },
                  ],
                  id: "ntp",
                  name: "NTP",
                },
              ],
            },
          ],
        },
      ],
      travelEndDate: null,
      travelStartDate: null,
    });
  });
  test("createOfferRequestObject check return object when all the redux data is empty", () => {
    store.dispatch({
      type: newOfferActions.NEW_OFFER_UPDATE_REDUX_STATE,
      payload: {},
    });
    store.dispatch({
      type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
      payload: {},
    });
    store.dispatch({
      type: marketingActions.UPDATE_OFFER_MARKETING_INFO,
      payload: {},
    });
    expect(createOfferRequestObject()).toStrictEqual({});
  });

  test("createOfferRequestObject check return object when all redux data is null", () => {
    store.dispatch({
      type: newOfferActions.NEW_OFFER_UPDATE_REDUX_STATE,
      payload: null,
    });
    store.dispatch({
      type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
      payload: null,
    });
    store.dispatch({
      type: marketingActions.UPDATE_OFFER_MARKETING_INFO,
      payload: null,
    });
    expect(createOfferRequestObject()).toStrictEqual({
      bookingEndDate: null,
      bookingStartDate: null,
      bookingZoneId: null,
      type: '',
      currencyCode: "EUR",
      lastSearchDistance: "",
      deepLinkSettingsInfo: {
        adultOccupancy: "",
        checkinDate: null,
        childOccupancy: "",
        includeAllProperties: "",
        latitude: "",
        longitude: "",
        los: "",
        rollingOffset: -1,
      },
      id: "",
      images: [],
      internalName: "",
      languages: ["EN"],
      marketingInfo: {},
      properties: [],
      status: {},
      targets: [],
      travelEndDate: null,
      travelStartDate: null,
    });
  });
});
