import { getObjectStringify } from "../getObjectStringify";

describe("getObjectStringify function test", () => {
  test("getObjectStringify item present case", () => {
    const objectToStringify = {
      destination: {
        city: "Pune, Maharashtra, India",
        lat: 18.5204303,
        lng: 73.8567437,
      },
      los: 1,
      hotelName: "Star",
      onlySupplier: false,
      target: {
        suppliers: [],
        channels: [],
      },
      brands: [
        {
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
                      id: "DEMO_OFFERBUILDER",
                      name: "DEMO_OFFERBUILDER",
                    },
                  ],
                },
              ],
            },
          ],
          id: "idb",
          name: "Internal Demo Brand",
        },
      ],
      pageSize: 10,
      pageOffset: 0,
      dateRange: {
        startDate: "2021-02-11",
        endDate: "2021-04-12",
      },
      currencyCode: "EUR",
      remainingCapitalPool: "",
    };
    expect(getObjectStringify(objectToStringify)).toBe(
      "?destination.city=Pune%2C%20Maharashtra%2C%20India&destination.lat=18.5204303&destination.lng=73.8567437&los=1&hotelName=Star&onlySupplier=false&brands%5B0%5D.storefronts%5B0%5D.id=ids&brands%5B0%5D.storefronts%5B0%5D.name=Internal%20Demo%20Storefront&brands%5B0%5D.storefronts%5B0%5D.suppliers%5B0%5D.id=ntp&brands%5B0%5D.storefronts%5B0%5D.suppliers%5B0%5D.name=NTP&brands%5B0%5D.storefronts%5B0%5D.suppliers%5B0%5D.channels%5B0%5D.id=DEMO_OFFERBUILDER&brands%5B0%5D.storefronts%5B0%5D.suppliers%5B0%5D.channels%5B0%5D.name=DEMO_OFFERBUILDER&brands%5B0%5D.id=idb&brands%5B0%5D.name=Internal%20Demo%20Brand&pageSize=10&pageOffset=0&dateRange.startDate=2021-02-11&dateRange.endDate=2021-04-12&currencyCode=EUR&remainingCapitalPool="
    );
  });

  test("getObjectStringify values sent are null", () => {
    expect(getObjectStringify(null)).toBe("");
  });
});
