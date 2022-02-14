import { cleanup } from "@testing-library/react-hooks";
import { getParsedNewOfferSettingsObject } from "../getParsedNewOfferSettingsObject";
import { getValue } from "../getValue";

describe("getParsedNewOfferSettingsObject function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  afterEach(cleanup);
  test("getParsedNewOfferSettingsObject check return value when settings component loads first time with initial state value and flag is false", () => {
    const decodedQueryObj = {
      key: "DEEP_LINK_FLOW_",
      offerId: "DEEP_LINK_FLOW_",
      lcn: "false",
      status: { id: "UNPUBLISHED", name: "UNPUBLISHED" },
      name: "DEEP_LINK_FLOW_",
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
                    { id: "DEMO_OFFERBUILDER", name: "DEMO_OFFERBUILDER" },
                    { id: "DEMO_INDIA_CH", name: "DEMO_INDIA_CH" },
                    { id: "NEMO_CH_01", name: "NEMO_CH_01" },
                  ],
                },
              ],
            },
          ],
        },
      ],
      marketingInfo: [
        {
          title: "DEEP_LINK_FLOW_",
          lang: "EN",
          shortDescription: "DEEP_LINK_FLOW_",
          description: "DEEP_LINK_FLOW_",
          termsAndConditions: "DEEP_LINK_FLOW_",
        },
      ],
      languages: ["EN"],
      storefrontName: "Internal Demo Storefront",
      brandName: "Internal Demo Brand",
      bookingDatesTimezone: "",
      deepLinkSettingsInfo: {
        destination: { lat: "18.5204303", lng: "73.8567437" },
        adultOccupancy: "1",
        childOccupancy: "0",
        checkInType: "rolling",
        includeAllProperties: "true",
        los: "1",
        rollingOffset: "0",
      },
      currency: "EUR",
      createdDate: "12.02.2021",
    };
    expect(getParsedNewOfferSettingsObject(decodedQueryObj, false)).toStrictEqual({
      offerId: "DEEP_LINK_FLOW_",
      status: { id: "UNPUBLISHED", name: "UNPUBLISHED" },
      name: "DEEP_LINK_FLOW_",
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
                    { id: "DEMO_OFFERBUILDER", name: "DEMO_OFFERBUILDER" },
                    { id: "DEMO_INDIA_CH", name: "DEMO_INDIA_CH" },
                    { id: "NEMO_CH_01", name: "NEMO_CH_01" },
                  ],
                },
              ],
            },
          ],
        },
      ],
      lastSearchDistance: 10,
      bookingDateRange: null,
      travellingDateRange: null,
      bookingDatesTimezone: "",
      deepLinkSettingsInfo: {
        destination: { lat: "18.5204303", lng: "73.8567437" },
        adultOccupancy: "1",
        childOccupancy: "0",
        includeAllProperties: true,
        checkInType: "rolling",
        los: "1",
        fixedDate: "",
        rollingOffset: "0",
      },
    });
  });

  test("getParsedNewOfferSettingsObject check return value when settings component is switching to marketing component and flag is true for query url", () => {
    const decodedQueryObj = {
      key: "DEEP_LINK_FLOW_",
      offerId: "DEEP_LINK_FLOW_",
      lcn: "false",
      status: { id: "UNPUBLISHED", name: "UNPUBLISHED" },
      name: "DEEP_LINK_FLOW_",
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
                    { id: "DEMO_OFFERBUILDER", name: "DEMO_OFFERBUILDER" },
                    { id: "DEMO_INDIA_CH", name: "DEMO_INDIA_CH" },
                    { id: "NEMO_CH_01", name: "NEMO_CH_01" },
                  ],
                },
              ],
            },
          ],
        },
      ],
      marketingInfo: [
        {
          title: "DEEP_LINK_FLOW_",
          lang: "EN",
          shortDescription: "DEEP_LINK_FLOW_",
          description: "DEEP_LINK_FLOW_",
          termsAndConditions: "DEEP_LINK_FLOW_",
        },
      ],
      languages: ["EN"],
      storefrontName: "Internal Demo Storefront",
      brandName: "Internal Demo Brand",
      bookingDatesTimezone: "",
      deepLinkSettingsInfo: {
        destination: { lat: "18.5204303", lng: "73.8567437" },
        adultOccupancy: "1",
        childOccupancy: "0",
        checkInType: "rolling",
        includeAllProperties: "true",
        los: "1",
        rollingOffset: "0",
      },
      currency: "EUR",
      createdDate: "12.02.2021",
    };
    expect(getParsedNewOfferSettingsObject(decodedQueryObj, true)).toStrictEqual({
      offerId: "DEEP_LINK_FLOW_",
      status: { id: "UNPUBLISHED", name: "UNPUBLISHED" },
      name: "DEEP_LINK_FLOW_",
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
                    { id: "DEMO_OFFERBUILDER", name: "DEMO_OFFERBUILDER" },
                    { id: "DEMO_INDIA_CH", name: "DEMO_INDIA_CH" },
                    { id: "NEMO_CH_01", name: "NEMO_CH_01" },
                  ],
                },
              ],
            },
          ],
        },
      ],
      lastSearchDistance: 10,
      bookingDateRange: null,
      travellingDateRange: null,
      bookingDatesTimezone: "",
      deepLinkSettingsInfo: {
        destination: { lat: "18.5204303", lng: "73.8567437" },
        adultOccupancy: "1",
        childOccupancy: "0",
        includeAllProperties: true,
        checkInType: "rolling",
        los: "1",
        fixedDate: "",
        rollingOffset: "0",
      },
    });
  });

  test("getParsedNewOfferSettingsObject check return value when empty or null object is given", () => {
    let decodedQueryObj = {};
    expect(getParsedNewOfferSettingsObject(decodedQueryObj)).toStrictEqual({
      bookingDateRange: null,
      bookingDatesTimezone: "",
      brands: [],
      lastSearchDistance: 10,
      deepLinkSettingsInfo: {
        adultOccupancy: 1,
        checkInType: "rolling",
        childOccupancy: 0,
        destination: null,
        fixedDate: null,
        includeAllProperties: true,
        los: 1,
        rollingOffset: 0,
      },
      name: "",
      offerId: "",
      status: { id: "UNPUBLISHED", name: "UNPUBLISHED" },
      travellingDateRange: null,
    });

    decodedQueryObj = null;
    expect(getParsedNewOfferSettingsObject(decodedQueryObj)).toStrictEqual({
      bookingDateRange: null,
      bookingDatesTimezone: "",
      brands: [],
      deepLinkSettingsInfo: {
        adultOccupancy: 1,
        checkInType: "rolling",
        childOccupancy: 0,
        destination: null,
        fixedDate: null,
        includeAllProperties: true,
        los: 1,
        rollingOffset: 0,
      },
      lastSearchDistance: 10,
      name: "",
      offerId: "",
      status: { id: "UNPUBLISHED", name: "UNPUBLISHED" },
      travellingDateRange: null,
    });
  });
});
