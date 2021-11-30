import React from "react";
import { createStore } from "redux";
import { render } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import ArchiveOffers from "../ArchiveOffers";

import { tempStore } from "./tempStore";

window.fetchWrapper = window.fetchWrapper = jest.fn().mockResolvedValue({
  success: true,
});
const archiveStore = { ...tempStore };
archiveStore.offerlistsearchandfilters.active = "archive";
archiveStore.offerlistsearchandfilters.offers = [
  {
    id: "16123427",
    internalName: "PKM Cypress Offer ",
    status: "ARCHIVED",
    currencyCode: "EUR",
    images: [],
    languages: ["EN"],
    deepLinkSettingsInfo: {
      latitude: 48.2081743,
      longitude: 16.3738189,
      includeAllProperties: true,
      adultOccupancy: 1,
      childOccupancy: 0,
      los: 1,
      rollingOffset: 0,
      checkinDate: "2021-02-03",
      checkoutDate: "2021-02-04",
    },
    marketingInfo: [
      {
        title: "JWM Start Hotels",
        lang: "EN",
        shortDescription: "Experience award-winning service",
        description:
          "Experience award-winning service and sophisticated style at JW Marriott Hotel Vienna.",
        termsAndConditions: "Standard terms and conditions",
      },
    ],
    properties: [
      {
        internalId: 1318,
        propertyCode: "DEMO_BANJARE",
        name: "BANJARE & BANJARE STAR HOTEL",
        channel: "DEMO_OFFERBUILDER",
        supplier: "ntp",
        city: "Vienna",
        rating: 4.0,
        ratingProvider: "",
        remainingCapitalPool: 0.0,
        lcn: false,
        images: [],
        marketingInfo: [
          {
            lang: "EN",
            shortDescription: "Experience award-winning service",
            description:
              "Experience award-winning service and sophisticated style at JW Marriott Hotel Vienna.",
          },
        ],
      },
    ],
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
                id: "ntp",
                name: "NTP",
                channels: [
                  { id: "DEMO_OFFERBUILDER", name: "DEMO_OFFERBUILDER" },
                ],
              },
            ],
          },
        ],
      },
    ],
    createdAt: "2021-02-03T08:58:53.610+0000",
    updatedAt: "2021-02-03T09:48:52.765+0000",
    lcn: false,
    bookingStartDate: null,
    bookingEndDate: null,
    bookingZoneId: null,
    travelStartDate: null,
    travelEndDate: null,
  },
  {
    id: "16119049",
    internalName: "Cypress Offer - 1611904929032",
    status: "ARCHIVED",
    currencyCode: "EUR",
    images: [],
    languages: ["EN"],
    deepLinkSettingsInfo: {
      latitude: 48.2081743,
      longitude: 16.3738189,
      includeAllProperties: true,
      adultOccupancy: 1,
      childOccupancy: 0,
      los: 1,
      rollingOffset: 0,
      checkinDate: "2021-01-29",
      checkoutDate: "2021-01-30",
    },
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
    properties: [
      {
        internalId: 1211,
        propertyCode: "DEMO_JEEVAN",
        name: "AJSG Hotel",
        channel: "DEMO_OFFERBUILDER",
        supplier: "ntp",
        city: "Vienna",
        rating: 0.0,
        ratingProvider: "",
        remainingCapitalPool: 0.0,
        lcn: false,
        images: [],
        marketingInfo: [
          {
            lang: "EN",
            shortDescription: "Experience award-winning service",
            description:
              "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.Experience award-winning service and sophisticated style at JW Marriott Hotel Vienna.",
          },
        ],
      },
    ],
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
                id: "ntp",
                name: "NTP",
                channels: [
                  { id: "DEMO_OFFERBUILDER", name: "DEMO_OFFERBUILDER" },
                ],
              },
            ],
          },
        ],
      },
    ],
    createdAt: "2021-01-29T07:22:37.106+0000",
    updatedAt: "2021-01-29T10:17:11.450+0000",
    lcn: false,
    bookingStartDate: null,
    bookingEndDate: null,
    bookingZoneId: null,
    travelStartDate: null,
    travelEndDate: null,
  },
  {
    id: "16115526",
    internalName: "Cypress Offer - 1611552693780",
    status: "ARCHIVED",
    currencyCode: "EUR",
    images: [],
    languages: ["EN"],
    deepLinkSettingsInfo: {
      latitude: 48.2081743,
      longitude: 16.3738189,
      includeAllProperties: true,
      adultOccupancy: 1,
      childOccupancy: 0,
      los: 1,
      rollingOffset: 0,
      checkinDate: "2021-01-25",
      checkoutDate: "2021-01-26",
    },
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
    properties: [
      {
        internalId: 1063,
        propertyCode: "DEMO_JEEVAN",
        name: "AJSG Hotel",
        channel: "DEMO_OFFERBUILDER",
        supplier: "ntp",
        city: "Vienna",
        rating: 0.0,
        ratingProvider: "",
        remainingCapitalPool: 0.0,
        lcn: false,
        images: [],
        marketingInfo: [
          {
            lang: "EN",
            shortDescription: "Experience award-winning service",
            description:
              "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.Experience award-winning service and sophisticated style at JW Marriott Hotel Vienna.",
          },
        ],
      },
    ],
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
                id: "ntp",
                name: "NTP",
                channels: [
                  { id: "DEMO_OFFERBUILDER", name: "DEMO_OFFERBUILDER" },
                ],
              },
            ],
          },
        ],
      },
    ],
    createdAt: "2021-01-25T05:32:01.584+0000",
    updatedAt: "2021-01-25T05:50:43.329+0000",
    lcn: false,
    bookingStartDate: null,
    bookingEndDate: null,
    bookingZoneId: null,
    travelStartDate: null,
    travelEndDate: null,
  },
  {
    id: "16110351",
    internalName: "Cypress Offer - 1611035184223",
    status: "ARCHIVED",
    currencyCode: "EUR",
    images: [],
    languages: ["EN"],
    deepLinkSettingsInfo: {
      latitude: 48.2081743,
      longitude: 16.3738189,
      includeAllProperties: false,
      adultOccupancy: 1,
      childOccupancy: 0,
      los: 1,
      rollingOffset: 0,
      checkinDate: "2021-01-19",
      checkoutDate: "2021-01-20",
    },
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
    properties: [
      {
        internalId: 905,
        propertyCode: "DEMO_JEEVAN",
        name: "AJSG Hotel",
        channel: "DEMO_OFFERBUILDER",
        supplier: "ntp",
        city: "Vienna",
        rating: 0.0,
        ratingProvider: "",
        remainingCapitalPool: 0.0,
        lcn: false,
        images: [],
        marketingInfo: [
          {
            lang: "EN",
            shortDescription: "Experience award-winning service",
            description:
              "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.Experience award-winning service and sophisticated style at JW Marriott Hotel Vienna.",
          },
        ],
      },
    ],
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
                id: "ntp",
                name: "NTP",
                channels: [
                  { id: "DEMO_OFFERBUILDER", name: "DEMO_OFFERBUILDER" },
                ],
              },
            ],
          },
        ],
      },
    ],
    createdAt: "2021-01-19T05:46:53.575+0000",
    updatedAt: "2021-01-19T09:18:45.021+0000",
    lcn: false,
    bookingStartDate: null,
    bookingEndDate: null,
    bookingZoneId: null,
    travelStartDate: null,
    travelEndDate: null,
  },
  {
    id: "16109917",
    internalName: "Cypress Offer - 1610991741230",
    status: "ARCHIVED",
    currencyCode: "EUR",
    images: [],
    languages: ["EN"],
    deepLinkSettingsInfo: {
      latitude: 48.2081743,
      longitude: 16.3738189,
      includeAllProperties: false,
      adultOccupancy: 1,
      childOccupancy: 0,
      los: 1,
      rollingOffset: 0,
      checkinDate: "2021-01-18",
      checkoutDate: "2021-01-19",
    },
    marketingInfo: [
      {
        title: "JWM Start Hotels",
        lang: "EN",
        shortDescription: "Experience award-winning service",
        description:
          "Experience award-winning service and sophisticated style at JW Marriott Hotel Vienna.",
        termsAndConditions: "Standard terms and conditions",
      },
    ],
    properties: [
      {
        internalId: 903,
        propertyCode: "DEMO_BANJARE",
        name: "BANJARE & BANJARE STAR HOTEL",
        channel: "DEMO_OFFERBUILDER",
        supplier: "ntp",
        city: "Vienna",
        rating: 4.0,
        ratingProvider: "",
        remainingCapitalPool: 0.0,
        lcn: false,
        images: [],
        marketingInfo: [
          {
            lang: "EN",
            shortDescription: "Experience award-winning service",
            description:
              "Experience award-winning service and sophisticated style at JW Marriott Hotel Vienna.",
          },
        ],
      },
    ],
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
                id: "ntp",
                name: "NTP",
                channels: [
                  { id: "DEMO_OFFERBUILDER", name: "DEMO_OFFERBUILDER" },
                ],
              },
            ],
          },
        ],
      },
    ],
    createdAt: "2021-01-18T17:42:49.000+0000",
    updatedAt: "2021-01-19T09:17:19.599+0000",
    lcn: false,
    bookingStartDate: null,
    bookingEndDate: null,
    bookingZoneId: null,
    travelStartDate: null,
    travelEndDate: null,
  },
  {
    id: "161099161",
    internalName: "Cypress Offer - 1610991614286",
    status: "ARCHIVED",
    currencyCode: "EUR",
    images: [],
    languages: ["EN"],
    deepLinkSettingsInfo: {
      latitude: 48.2081743,
      longitude: 16.3738189,
      includeAllProperties: false,
      adultOccupancy: 1,
      childOccupancy: 0,
      los: 1,
      rollingOffset: 0,
      checkinDate: "2021-01-18",
      checkoutDate: "2021-01-19",
    },
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
    properties: [
      {
        internalId: 901,
        propertyCode: "DEMO_JEEVAN",
        name: "AJSG Hotel",
        channel: "DEMO_INDIA_CH",
        supplier: "ntp",
        city: "Vienna",
        rating: 0.0,
        ratingProvider: "",
        remainingCapitalPool: 0.0,
        lcn: false,
        images: [],
        marketingInfo: [
          {
            lang: "EN",
            shortDescription: "Experience award-winning service",
            description:
              "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.Experience award-winning service and sophisticated style at JW Marriott Hotel Vienna.",
          },
        ],
      },
    ],
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
                id: "ntp",
                name: "NTP",
                channels: [
                  { id: "DEMO_OFFERBUILDER", name: "DEMO_OFFERBUILDER" },
                  { id: "DEMO_INDIA_CH", name: "DEMO_INDIA_CH" },
                  { id: "NEMO_CH_01", name: "NEMO_CH_01" },
                  { id: "NEMO_CH_02", name: "NEMO_CH_02" },
                  { id: "NEMO_CH_03", name: "NEMO_CH_03" },
                ],
              },
            ],
          },
        ],
      },
    ],
    createdAt: "2021-01-18T17:40:46.946+0000",
    updatedAt: "2021-01-19T18:56:29.125+0000",
    lcn: false,
    bookingStartDate: null,
    bookingEndDate: null,
    bookingZoneId: null,
    travelStartDate: null,
    travelEndDate: null,
  },
  {
    id: "16105378",
    internalName: "Cypress Offer - 1610537842218",
    status: "ARCHIVED",
    currencyCode: "EUR",
    images: [],
    languages: ["EN"],
    deepLinkSettingsInfo: {
      latitude: 48.2081743,
      longitude: 16.3738189,
      includeAllProperties: false,
      adultOccupancy: 1,
      childOccupancy: 0,
      los: 1,
      rollingOffset: 0,
      checkinDate: "2021-01-13",
      checkoutDate: "2021-01-14",
    },
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
    properties: [
      {
        internalId: 829,
        propertyCode: "DEMO_JEEVAN",
        name: "AJSG Hotel",
        channel: "DEMO_OFFERBUILDER",
        supplier: "ntp",
        city: "Vienna",
        rating: 0.0,
        ratingProvider: "",
        remainingCapitalPool: 0.0,
        lcn: false,
        images: [],
        marketingInfo: [
          {
            lang: "EN",
            shortDescription: "Experience award-winning service",
            description:
              "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.Experience award-winning service and sophisticated style at JW Marriott Hotel Vienna.",
          },
        ],
      },
    ],
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
                id: "ntp",
                name: "NTP",
                channels: [
                  { id: "DEMO_OFFERBUILDER", name: "DEMO_OFFERBUILDER" },
                ],
              },
            ],
          },
        ],
      },
    ],
    createdAt: "2021-01-13T11:37:50.304+0000",
    updatedAt: "2021-01-13T16:19:12.945+0000",
    lcn: false,
    bookingStartDate: null,
    bookingEndDate: null,
    bookingZoneId: null,
    travelStartDate: null,
    travelEndDate: null,
  },
];

describe("ArchiveOffers component test", () => {
  test("create ArchiveOffers components snapshot", () => {
    const store = createStore(() => ({ ...archiveStore }));
    store.dispatch = jest.fn();
    const { container } = render(
      <MemoryRouter>
        <ArchiveOffers />
      </MemoryRouter>,
      {
        store,
      }
    );

    expect(container.firstChild).toMatchSnapshot();
  });
  test("ArchiveOffers components- check if archive offers are displayed", () => {
    const store = createStore(() => ({ ...archiveStore }));
    store.dispatch = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
        <ArchiveOffers />
      </MemoryRouter>,
      {
        store,
      }
    );
    // offer id of first offer in the list added with test id
    expect(getByTestId("archive-status-16123427")).toBeInTheDocument();
  });
});
