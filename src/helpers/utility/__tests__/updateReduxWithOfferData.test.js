import { updateReduxWithOfferData } from "../updateReduxWithOfferData";
import { store } from "../../../redux/store";
import { cleanup } from "@testing-library/react-hooks";
import { getValue } from "../getValue";

afterEach(cleanup);

jest.mock("moment", () => {
  return () => jest.requireActual("moment")("2021-01-01T00:00:00.000Z");
});

describe("updateReduxWithOfferData function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  test("updateReduxWithOfferData case when function is called, redux is updated with correct cart data and settings, marketing values", () => {
    const offerData = {
      key: "16220204",
      offerId: "16220204",
      properties: [
        {
          internalId: 5669,
          propertyCode: "DEMO_JEEVAN",
          name: "AJSG Hotel ",
          channel: "NEMO_CH_01",
          supplier: "ntp",
          city: "Palm Springs",
          rating: 0,
          ratingProvider: "",
          remainingCapitalPool: 0,
          lcn: false,
          lowestMargin: 5,
          highestMargin: 5,
          marketPrice: null,
          images: [],
          latitude: 33.4804,
          longitude: 116.3243,
          sequence: 1,
          hotelName: "AJSG Hotel ",
          key: 0,
          isSavedProperty: true,
          marketingImages: [],
          descriptions: [
            {
              lang: "DE",
              shortDescription: null,
              description: "Duch lang ggjjgjgjgjgj",
              name: "AJSG Hotel (DE)",
            },
            {
              lang: "EN",
              shortDescription: "222211111",
              description:
                "222211111 Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
              name: "AJSG Hotel ",
            },
          ],
        },
        {
          internalId: 5670,
          propertyCode: "XS_NM_0001",
          name: "Bishop's Lodge",
          channel: "DEMO_INDIA_CH",
          supplier: "ntp",
          city: "Santa Fe",
          rating: 5,
          ratingProvider: "",
          remainingCapitalPool: 0,
          lcn: true,
          lowestMargin: 15,
          highestMargin: 15,
          marketPrice: null,
          images: [],
          latitude: 35.715103,
          longitude: -105.91955,
          sequence: 2,
          hotelName: "Bishop's Lodge",
          key: 1,
          isSavedProperty: true,
          marketingImages: [],
          descriptions: [
            {
              lang: "DE",
              shortDescription: null,
              description:
                "Unser Resort ist ein Reiseziel wie kein anderes und bietet gehobene Ranchunterkünfte und endlose Erholungsmöglichkeiten für vier Jahreszeiten. Genießen Sie klare, sonnenverwöhnte Tage und erkunden Sie unsere 450 Hektar großen malerischen Wanderwege vom Reiten, Wandern und Mountainbiken.",
              name: "Bishop's Lodge",
            },
            {
              lang: "EN",
              shortDescription: "222211111",
              description:
                "222211111A destination unlike any other, our resort offers upscale ranch lodging and endless four-season recreation. Enjoy clear, sun-drenched days exploring our 450 acres of scenic trails from horseback riding, hiking and mountain biking.",
              name: "Bishop's Lodge",
            },
          ],
        },
      ],
      lcn: true,
      status: { id: "PUBLISHED", name: "PUBLISHED" },
      lastSearchDistance: 10,
      images: [],
      name: "Cypress DL6 Offer",
      brands: [
        {
          id: "idb",
          name: "Internal Demo Brand",
          storefronts: [
            {
              id: "ids",
              name: "Internal Demo Storefront",
              suppliers: [
                {
                  id: "ntp",
                  name: "NTP",
                  channels: [
                    { id: "DEMO_INDIA_CH", name: "DEMO_INDIA_CH" },
                    { id: "DEMO_OFFERBUILDER", name: "DEMO_OFFERBUILDER" },
                    {
                      id: "KOGNITIV_QA",
                      name: "QA for Kognitiv Onboarding Projects",
                    },
                    { id: "NEMO_CH_01", name: "NEMO_CH_01" },
                    { id: "NEMO_CH_02", name: "NEMO_CH_02" },
                  ],
                },
              ],
            },
          ],
        },
      ],
      marketingInfo: [
        {
          title: "2221111dfghgfd",
          lang: "EN",
          shortDescription: "22222",
          description: "22222f11111ghtyjthregfwdqf",
          termsAndConditions: "22221111gwgewegwegewgw",
        },
      ],
      languages: ["EN"],
      storefrontName: "Internal Demo Storefront",
      brandName: "Internal Demo Brand",
      bookingDatesTimezone: { value: "America/Phoenix" },
      deepLinkSettingsInfo: {
        destination: null,
        adultOccupancy: 1,
        childOccupancy: 0,
        checkInType: "rolling",
        includeAllProperties: true,
        los: 7,
        rollingOffset: 3,
        fixedDate: null,
      },
      bookingDateRange: { startDate: "2021-06-01", endDate: "2021-06-30" },
      displayBookingDateRange: {
        startDate: "2021-06-01",
        endDate: "2021-06-30",
      },
      currency: "EUR",
      createdDate: "2021-05-26T09:14:10.369+0000",
      travellingDateRange: { startDate: "2021-06-01", endDate: "2021-06-30" },
      displayTravellingDateRange: {
        startDate: "2021-06-01",
        endDate: "2021-06-30",
      },
    };
    updateReduxWithOfferData(offerData);
    expect(store.getState().propertycart.cartItems).toStrictEqual([
      {
        internalId: 5669,
        propertyCode: "DEMO_JEEVAN",
        name: "AJSG Hotel ",
        channel: "NEMO_CH_01",
        supplier: "ntp",
        city: "Palm Springs",
        rating: 0,
        ratingProvider: "",
        remainingCapitalPool: 0,
        lcn: false,
        lowestMargin: 5,
        highestMargin: 5,
        marketPrice: null,
        images: [],
        latitude: 33.4804,
        longitude: 116.3243,
        sequence: 1,
        hotelName: "AJSG Hotel ",
        key: 0,
        isSavedProperty: true,
        marketingImages: [],
        descriptions: [
          {
            lang: "DE",
            shortDescription: null,
            description: "Duch lang ggjjgjgjgjgj",
            name: "AJSG Hotel (DE)",
          },
          {
            lang: "EN",
            shortDescription: "222211111",
            description:
              "222211111 Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
            name: "AJSG Hotel ",
          },
        ],
      },
      {
        internalId: 5670,
        propertyCode: "XS_NM_0001",
        name: "Bishop's Lodge",
        channel: "DEMO_INDIA_CH",
        supplier: "ntp",
        city: "Santa Fe",
        rating: 5,
        ratingProvider: "",
        remainingCapitalPool: 0,
        lcn: true,
        lowestMargin: 15,
        highestMargin: 15,
        marketPrice: null,
        images: [],
        latitude: 35.715103,
        longitude: -105.91955,
        sequence: 2,
        hotelName: "Bishop's Lodge",
        key: 1,
        isSavedProperty: true,
        marketingImages: [],
        descriptions: [
          {
            lang: "DE",
            shortDescription: null,
            description:
              "Unser Resort ist ein Reiseziel wie kein anderes und bietet gehobene Ranchunterkünfte und endlose Erholungsmöglichkeiten für vier Jahreszeiten. Genießen Sie klare, sonnenverwöhnte Tage und erkunden Sie unsere 450 Hektar großen malerischen Wanderwege vom Reiten, Wandern und Mountainbiken.",
            name: "Bishop's Lodge",
          },
          {
            lang: "EN",
            shortDescription: "222211111",
            description:
              "222211111A destination unlike any other, our resort offers upscale ranch lodging and endless four-season recreation. Enjoy clear, sun-drenched days exploring our 450 acres of scenic trails from horseback riding, hiking and mountain biking.",
            name: "Bishop's Lodge",
          },
        ],
      },
    ]);
    expect(store.getState().newoffermarketinginfo).toStrictEqual({
      marketingInfo: {
        EN: {
          description: "22222f11111ghtyjthregfwdqf",
          shortDescription: "22222",
          termsAndConditions: "22221111gwgewegwegewgw",
          title: "2221111dfghgfd",
        },
        images: [],
      },
      selectedLanguages: [
        {
          id: "EN",
          name: "English",
        },
      ],
    });
    expect(store.getState().newoffersettingsparam).toStrictEqual({
      key: "16220204",
      offerId: "16220204",
      lcn: true,
      status: {
        id: "PUBLISHED",
        name: "PUBLISHED",
      },
      lastSearchDistance: 10,
      images: [],
      name: "Cypress DL6 Offer",
      brands: [
        {
          id: "idb",
          name: "Internal Demo Brand",
          storefronts: [
            {
              id: "ids",
              name: "Internal Demo Storefront",
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
                    {
                      id: "KOGNITIV_QA",
                      name: "QA for Kognitiv Onboarding Projects",
                    },
                    {
                      id: "NEMO_CH_01",
                      name: "NEMO_CH_01",
                    },
                    {
                      id: "NEMO_CH_02",
                      name: "NEMO_CH_02",
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
          title: "2221111dfghgfd",
          lang: "EN",
          shortDescription: "22222",
          description: "22222f11111ghtyjthregfwdqf",
          termsAndConditions: "22221111gwgewegwegewgw",
        },
      ],
      languages: ["EN"],
      storefrontName: "Internal Demo Storefront",
      brandName: "Internal Demo Brand",
      bookingDatesTimezone: {
        value: "America/Phoenix",
      },
      deepLinkSettingsInfo: {
        destination: null,
        adultOccupancy: 1,
        childOccupancy: 0,
        checkInType: "rolling",
        includeAllProperties: true,
        los: 7,
        rollingOffset: 3,
        fixedDate: null,
      },
      bookingDateRange: {
        startDate: "2021-06-01",
        endDate: "2021-06-30",
      },
      displayBookingDateRange: {
        startDate: "2021-06-01",
        endDate: "2021-06-30",
      },
      currency: "EUR",
      createdDate: "2021-05-26T09:14:10.369+0000",
      travellingDateRange: {
        startDate: "2021-06-01",
        endDate: "2021-06-30",
      },
      displayTravellingDateRange: {
        startDate: "2021-06-01",
        endDate: "2021-06-30",
      },
    });
  });

  test("updateReduxWithOfferData case when function is called with empty object, redux is updated as per it", () => {
    const offerData = {};
    updateReduxWithOfferData(offerData);
    expect(store.getState().propertycart.cartItems).toStrictEqual([]);
    expect(store.getState().newoffermarketinginfo).toStrictEqual({
      marketingInfo: {
        images: [],
      },
      selectedLanguages: [],
    });
    expect(store.getState().newoffersettingsparam).toStrictEqual({
      offerId: "",
      status: {
        id: "UNPUBLISHED",
        name: "UNPUBLISHED",
      },
      name: "",
      brands: [],
      bookingDateRange: {
        endDate: "",
        startDate: "",
      },
      type: "DEMO",
      lastSearchDistance: 10,
      travellingDateRange: {
        endDate: "",
        startDate: "",
      },
      bookingDatesTimezone: "",
      deepLinkSettingsInfo: {
        destination: null,
        adultOccupancy: 1,
        childOccupancy: 0,
        includeAllProperties: true,
        checkInType: "rolling",
        los: 1,
        rollingOffset: 0,
        fixedDate: null,
      },
    });
  });

  test("updateReduxWithOfferData case when function is called with null object, redux is updated as per it", () => {
    const offerData = null;
    updateReduxWithOfferData(offerData);
    expect(store.getState().propertycart.cartItems).toStrictEqual([]);
    expect(store.getState().newoffermarketinginfo).toStrictEqual({
      marketingInfo: {
        images: [],
      },
      selectedLanguages: [],
    });
    expect(store.getState().newoffersettingsparam).toStrictEqual({
      offerId: "",
      status: {
        id: "UNPUBLISHED",
        name: "UNPUBLISHED",
      },
      name: "",
      brands: [],
      bookingDateRange: {
        endDate: "",
        startDate: "",
      },
      type: "DEMO",
      lastSearchDistance: 10,
      travellingDateRange: {
        endDate: "",
        startDate: "",
      },
      bookingDatesTimezone: "",
      deepLinkSettingsInfo: {
        destination: null,
        adultOccupancy: 1,
        childOccupancy: 0,
        includeAllProperties: true,
        checkInType: "rolling",
        los: 1,
        rollingOffset: 0,
        fixedDate: null,
      },
    });
  });
});
