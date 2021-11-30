import { cleanup } from "@testing-library/react-hooks";
import { getParsedOffers } from "../getParsedOffers";
import { getValue } from "../getValue";

describe("getParsedOffers function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  afterEach(cleanup);
  test("getParsedOffers check return value when settings component loads first time with initial state value", () => {
    const offerToBeParsed = {
      id: "16131278",
      type: 'DEMO',
      internalName: "PKM Test Offer 278",
      status: "UNPUBLISHED",
      currencyCode: "EUR",
      images: [],
      languages: ["EN"],
      lastSearchDistance: 10,
      deepLinkSettingsInfo: {
        latitude: 47.6435616,
        longitude: 15.8302052,
        includeAllProperties: false,
        adultOccupancy: 1,
        childOccupancy: 0,
        los: 5,
        rollingOffset: 4,
        checkinDate: "2021-02-16",
        checkoutDate: "2021-02-21",
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
      properties: [],
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
      createdAt: "2021-02-12T11:05:23.553+0000",
      updatedAt: "2021-02-12T11:07:17.756+0000",
      lcn: false,
      bookingStartDate: "2021-02-14",
      bookingEndDate: "2021-02-21",
      bookingZoneId: "Pacific/Honolulu",
      travelStartDate: "2021-02-14",
      travelEndDate: "2021-02-22",
    };
    expect(getParsedOffers(offerToBeParsed)).toStrictEqual({
      key: "16131278",
      offerId: "16131278",
      properties: [],
      type: 'DEMO',
      lcn: false,
      status: { id: "UNPUBLISHED", name: "UNPUBLISHED" },
      images: [],
      name: "PKM Test Offer 278",
      lastSearchDistance: 10,
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
                    { id: "DEMO_OFFERBUILDER", name: "DEMO_OFFERBUILDER" },
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
      bookingDatesTimezone: { value: "Pacific/Honolulu" },
      deepLinkSettingsInfo: {
        destination: { lat: 47.6435616, lng: 15.8302052 },
        adultOccupancy: 1,
        childOccupancy: 0,
        checkInType: "rolling",
        includeAllProperties: false,
        los: 5,
        rollingOffset: 4,
        fixedDate: null,
      },
      bookingDateRange: { startDate: "2021-02-14", endDate: "2021-02-21" },
      displayBookingDateRange: {
        endDate: "2021-02-21",
        startDate: "2021-02-14",
      },
      currency: "EUR",
      createdDate: "2021-02-12T11:05:23.553+0000",
      travellingDateRange: { startDate: "2021-02-14", endDate: "2021-02-22" },
      displayTravellingDateRange: {
        endDate: "2021-02-22",
        startDate: "2021-02-14",
      },
    });
  });

  test("getParsedOffers check return value when empty or null object is given", () => {
    let offerToBeParsed = null;
    expect(getParsedOffers(offerToBeParsed)).toStrictEqual({});
  });
});
