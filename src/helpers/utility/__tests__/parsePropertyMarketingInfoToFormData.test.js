import { parsePropertyMarketingInfoToFormData } from "../parsePropertyMarketingInfoToFormData";
import { getValue } from "../getValue";

describe("parsePropertyMarketingInfoToFormData function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  test("parsePropertyMarketingInfoToFormData check if property info are parsed to form correctly or not", () => {
    const propertyReduxData = [
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
          { lang: "EN", shortDescription: "gsdgsgsd", description: "dsfsdgsg" },
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
              "Unser Resort ist ein Reiseziel wie kein anderes und bietet gehobene Ranchunterkünfte und endlose Erholungsmöglichkeiten für vier Jahreszeiten. Genießen Sie klare, sonnenverwöhnte Tage und erkunden Sie unsere 450 Hektar großen malerischen Wanderwege vom Reiten, Wandern und Mountainbiken.",
          },
          {
            lang: "EN",
            shortDescription: "gsdgsgg",
            description:
              "A destination unlike any other, our resort offers upscale ranch lodging and endless four-season recreation. Enjoy clear, sun-drenched days exploring our 450 acres of scenic trails from horseback riding, hiking and mountain biking.",
          },
        ],
      },
    ];
    expect(
      parsePropertyMarketingInfoToFormData(propertyReduxData)
    ).toStrictEqual([
      {
        DE: { description: "Duch lang ggjjgjgjgjgj", shortDescription: null },
        EN: {
          description:
            "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
          shortDescription: "ccc",
        },
        images: [],
      },
      {
        EN: { description: "dsfsdgsg", shortDescription: "gsdgsgsd" },
        images: [],
      },
      {
        DE: {
          description:
            "Unser Resort ist ein Reiseziel wie kein anderes und bietet gehobene Ranchunterkünfte und endlose Erholungsmöglichkeiten für vier Jahreszeiten. Genießen Sie klare, sonnenverwöhnte Tage und erkunden Sie unsere 450 Hektar großen malerischen Wanderwege vom Reiten, Wandern und Mountainbiken.",
          shortDescription: null,
        },
        EN: {
          description:
            "A destination unlike any other, our resort offers upscale ranch lodging and endless four-season recreation. Enjoy clear, sun-drenched days exploring our 450 acres of scenic trails from horseback riding, hiking and mountain biking.",
          shortDescription: "gsdgsgg",
        },
        images: [
          "https://res.cloudinary.com/seekda/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/production/US_NM_0001/Bishops-Exterior.jpg",
        ],
      },
    ]);
  });
});
