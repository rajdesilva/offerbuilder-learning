import { parseOfferMarketingFromOffer } from "../parseOfferMarketingFromOffer";
import { getValue } from "../getValue";

describe("parseOfferMarketingFromOffer function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  test("parseOfferMarketingFromOffer check if parsed data for offer marketing is correct or not", () => {
    const offerData = {
      key: "tetttt",
      offerId: "tetttt",
      properties: [
        {
          internalId: 1809,
          propertyCode: "DEMO_JEEVAN",
          name: "AJSG Hotel ",
          channel: "DEMO_INDIA_CH",
          supplier: "ntp",
          city: "Vienna",
          rating: 0,
          ratingProvider: "",
          remainingCapitalPool: 0,
          lcn: false,
          images: [],
          hotelName: "AJSG Hotel ",
          isSavedProperty: true,
          marketingImages: [],
          descriptions: [
            {
              lang: "DE",
              shortDescription: null,
              description: "Duch lang ggjjgjgjgjgj",
            },
            {
              lang: "EN",
              shortDescription: "ccc",
              description:
                "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
            },
          ],
        },
        {
          internalId: 1810,
          propertyCode: "DEMO_BANJARE",
          name: "BANJARE & BANJARE STAR HOTEL",
          channel: "DEMO_OFFERBUILDER",
          supplier: "ntp",
          city: "Vienna",
          rating: 4,
          ratingProvider: "",
          remainingCapitalPool: 0,
          lcn: false,
          images: [],
          hotelName: "BANJARE & BANJARE STAR HOTEL",
          isSavedProperty: true,
          marketingImages: [],
          descriptions: [
            {
              lang: "EN",
              shortDescription: "gsdgsgsd",
              description: "dsfsdgsg",
            },
          ],
        },
        {
          internalId: 1811,
          propertyCode: "XS_NM_0001",
          name: "Bishop's Lodge",
          channel: "DEMO_INDIA_CH",
          supplier: "ntp",
          city: "Santa Fe",
          rating: 5,
          ratingProvider: "",
          remainingCapitalPool: 0,
          lcn: true,
          images: [
            "https://res.cloudinary.com/seekda/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/production/US_NM_0001/Bishops-Exterior.jpg",
          ],
          hotelName: "Bishop's Lodge",
          isSavedProperty: true,
          marketingImages: [
            "https://res.cloudinary.com/seekda/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/production/US_NM_0001/Bishops-Exterior.jpg",
          ],
          descriptions: [
            {
              lang: "DE",
              shortDescription: null,
              description:
                "Unser Resort ist ein Reiseziel wie kein anderes und bietet gehobene Ranchunterk??nfte und endlose Erholungsm??glichkeiten f??r vier Jahreszeiten. Genie??en Sie klare, sonnenverw??hnte Tage und erkunden Sie unsere 450 Hektar gro??en malerischen Wanderwege vom Reiten, Wandern und Mountainbiken.",
            },
            {
              lang: "EN",
              shortDescription: "gsdgsgg",
              description:
                "A destination unlike any other, our resort offers upscale ranch lodging and endless four-season recreation. Enjoy clear, sun-drenched days exploring our 450 acres of scenic trails from horseback riding, hiking and mountain biking.",
            },
          ],
        },
      ],
      lcn: true,
      status: { id: "UNPUBLISHED", name: "UNPUBLISHED" },
      images: [],
      name: "tetttt",
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
          title: "fefwefwe",
          lang: "EN",
          shortDescription: "f3f23",
          description: "ewgwegwe",
          termsAndConditions: "ewfw3fw",
        },
      ],
      languages: ["EN"],
      storefrontName: "Internal Demo Storefront",
      brandName: "Internal Demo Brand",
      bookingDatesTimezone: "",
      deepLinkSettingsInfo: {
        destination: null,
        adultOccupancy: 1,
        childOccupancy: 0,
        checkInType: "rolling",
        includeAllProperties: true,
        los: 1,
        rollingOffset: 0,
        fixedDate: null,
      },
      bookingDateRange: null,
      displayBookingDateRange: null,
      currency: "EUR",
      createdDate: "13.02.2021",
      travellingDateRange: null,
      displayTravellingDateRange: null,
    };
    expect(parseOfferMarketingFromOffer(offerData)).toStrictEqual({
      EN: {
        description: "ewgwegwe",
        shortDescription: "f3f23",
        termsAndConditions: "ewfw3fw",
        title: "fefwefwe",
      },
      images: [],
    });
  });

  test("parseOfferMarketingFromOffer check if parsed data with images for offer marketing is correct or not", () => {
    const offerData = {
      key: "tetttt",
      offerId: "tetttt",
      properties: [
        {
          internalId: 1809,
          propertyCode: "DEMO_JEEVAN",
          name: "AJSG Hotel ",
          channel: "DEMO_INDIA_CH",
          supplier: "ntp",
          city: "Vienna",
          rating: 0,
          ratingProvider: "",
          remainingCapitalPool: 0,
          lcn: false,
          images: [],
          hotelName: "AJSG Hotel ",
          isSavedProperty: true,
          marketingImages: [],
          descriptions: [
            {
              lang: "DE",
              shortDescription: null,
              description: "Duch lang ggjjgjgjgjgj",
            },
            {
              lang: "EN",
              shortDescription: "ccc",
              description:
                "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
            },
          ],
        },
        {
          internalId: 1810,
          propertyCode: "DEMO_BANJARE",
          name: "BANJARE & BANJARE STAR HOTEL",
          channel: "DEMO_OFFERBUILDER",
          supplier: "ntp",
          city: "Vienna",
          rating: 4,
          ratingProvider: "",
          remainingCapitalPool: 0,
          lcn: false,
          images: [],
          hotelName: "BANJARE & BANJARE STAR HOTEL",
          isSavedProperty: true,
          marketingImages: [],
          descriptions: [
            {
              lang: "EN",
              shortDescription: "gsdgsgsd",
              description: "dsfsdgsg",
            },
          ],
        },
        {
          internalId: 1811,
          propertyCode: "XS_NM_0001",
          name: "Bishop's Lodge",
          channel: "DEMO_INDIA_CH",
          supplier: "ntp",
          city: "Santa Fe",
          rating: 5,
          ratingProvider: "",
          remainingCapitalPool: 0,
          lcn: true,
          images: [
            "https://res.cloudinary.com/seekda/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/production/US_NM_0001/Bishops-Exterior.jpg",
          ],
          hotelName: "Bishop's Lodge",
          isSavedProperty: true,
          marketingImages: [
            "https://res.cloudinary.com/seekda/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/production/US_NM_0001/Bishops-Exterior.jpg",
          ],
          descriptions: [
            {
              lang: "DE",
              shortDescription: null,
              description:
                "Unser Resort ist ein Reiseziel wie kein anderes und bietet gehobene Ranchunterk??nfte und endlose Erholungsm??glichkeiten f??r vier Jahreszeiten. Genie??en Sie klare, sonnenverw??hnte Tage und erkunden Sie unsere 450 Hektar gro??en malerischen Wanderwege vom Reiten, Wandern und Mountainbiken.",
            },
            {
              lang: "EN",
              shortDescription: "gsdgsgg",
              description:
                "A destination unlike any other, our resort offers upscale ranch lodging and endless four-season recreation. Enjoy clear, sun-drenched days exploring our 450 acres of scenic trails from horseback riding, hiking and mountain biking.",
            },
          ],
        },
      ],
      lcn: true,
      status: { id: "UNPUBLISHED", name: "UNPUBLISHED" },
      images: [
        "https://res.cloudinary.com/seekda/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/production/US_NM_0001/Bishops-Exterior.jpg",
      ],
      name: "tetttt",
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
          title: "fefwefwe",
          lang: "EN",
          shortDescription: "f3f23",
          description: "ewgwegwe",
          termsAndConditions: "ewfw3fw",
        },
      ],
      languages: ["EN"],
      storefrontName: "Internal Demo Storefront",
      brandName: "Internal Demo Brand",
      bookingDatesTimezone: "",
      deepLinkSettingsInfo: {
        destination: null,
        adultOccupancy: 1,
        childOccupancy: 0,
        checkInType: "rolling",
        includeAllProperties: true,
        los: 1,
        rollingOffset: 0,
        fixedDate: null,
      },
      bookingDateRange: null,
      displayBookingDateRange: null,
      currency: "EUR",
      createdDate: "13.02.2021",
      travellingDateRange: null,
      displayTravellingDateRange: null,
    };
    expect(parseOfferMarketingFromOffer(offerData)).toStrictEqual({
      EN: {
        description: "ewgwegwe",
        shortDescription: "f3f23",
        termsAndConditions: "ewfw3fw",
        title: "fefwefwe",
      },
      images: [
        "https://res.cloudinary.com/seekda/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/production/US_NM_0001/Bishops-Exterior.jpg",
      ],
    });
  });
});
