import { cleanup } from "@testing-library/react-hooks";
import { getParsedProperty } from "../getParsedProperty";
import { getValue } from "../getValue";

describe("getParsedProperty function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  afterEach(cleanup);
  test("getParsedProperty check values when property is parent", () => {
    const property = {
      info: {
        name: "AJSG Hotel ",
        description:
          "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
        descriptions: [
          {
            text:
              "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
            lang: "EN",
          },
          { text: "Duch lang ggjjgjgjgjgj", lang: "DE" },
        ],
        languages: ["DE", "EN"],
        images: [
          "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
          "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/DSC00137-ch_simple2-e1511971588521.jpg",
          "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/OIP.jpg",
          "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/OIP2.jpg",
        ],
        city: "Vienna",
        countryName: "Austria",
        latitude:48.210033,
        longitude: 16.363449,
        trustyou: null,
        award: null,
      },
      propertyCode: "DEMO_JEEVAN",
      lcn: false,
      type: 'DEMO',
      remainingCapital: null,
      supplier: "ntp",
      channel: "DEMO_OFFERBUILDER",
      b2bPrice: 128.57,
      b2cPrice: 142.86,
      lowestMargin: 11,
      highestMargin: 11,
      arrivalDate: "2021-04-12",
      margins: [
        {
          b2bPrice: 12857,
          b2cPrice: 14286,
          marginOnPrice: 11.114569,
          checkinDate: "2021-04-12",
        },
        {
          b2bPrice: 25714,
          b2cPrice: 28571,
          marginOnPrice: 11.110679,
          checkinDate: "2021-02-16",
        },
        {
          b2bPrice: 25714,
          b2cPrice: 28571,
          marginOnPrice: 11.110679,
          checkinDate: "2021-02-14",
        },
        {
          b2bPrice: 25714,
          b2cPrice: 28571,
          marginOnPrice: 11.110679,
          checkinDate: "2021-02-12",
        },
        {
          b2bPrice: 25714,
          b2cPrice: 28571,
          marginOnPrice: 11.110679,
          checkinDate: "2021-02-15",
        },
      ],
    };
    const index = 0;
    const isParent = true;
    expect(getParsedProperty(property, index, isParent)).toStrictEqual({
      img:
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
      images: [
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/DSC00137-ch_simple2-e1511971588521.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/OIP.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/OIP2.jpg",
      ],
      propertyCode: "DEMO_JEEVAN",
      lcn: false,
      type: "DEMO",
      supplier: "ntp",
      channel: "DEMO_OFFERBUILDER",
      hotelName: "AJSG Hotel ",
      remainingCapital: null,
      city: "Vienna",
      arrivalDate: "2021-04-12",
      b2bPrice: 128.57,
      b2cPrice: 142.86,
      margin: "",
      latitude:48.210033,
      longitude: 16.363449,
      country: "Austria",
      lowestMargin: 11,
      highestMargin: 11,
      rating: "",
      description:
        "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
      descriptions: [
        {
          lang: "EN",
          description:
            "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
        },
        { lang: "DE", description: "Duch lang ggjjgjgjgjgj" },
      ],
      trustyou: null,
      isParent: true,
      key: "DEMO_JEEVAN-0true",
    });
  });

  test("getParsedProperty check values when property is child i.e alternative property", () => {
    const property = {
      info: {
        name: "AJSG Hotel ",
        description:
          "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
        descriptions: [
          {
            text:
              "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
            lang: "EN",
          },
          { text: "Duch lang ggjjgjgjgjgj", lang: "DE" },
        ],
        languages: ["DE", "EN"],
        images: [
          "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
          "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/DSC00137-ch_simple2-e1511971588521.jpg",
          "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/OIP.jpg",
          "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/OIP2.jpg",
        ],
       
        city: "Vienna",
        countryName: "Austria",
        trustyou: null,
        latitude:48.210033,
        longitude: 16.363449,
        award: null,
      },
      type: 'PROD',
      propertyCode: "DEMO_JEEVAN",
      lcn: false,
      remainingCapital: null,
      supplier: "ntp",
      channel: "DEMO_INDIA_CH",
      b2bPrice: 128.57,
      b2cPrice: 142.86,
      lowestMargin: 11,
      highestMargin: 11,
      arrivalDate: "2021-04-12",
      margins: [
        {
          b2bPrice: 12857,
          b2cPrice: 14286,
          marginOnPrice: 11.114569,
          checkinDate: "2021-04-12",
        },
        {
          b2bPrice: 25714,
          b2cPrice: 28571,
          marginOnPrice: 11.110679,
          checkinDate: "2021-02-14",
        },
        {
          b2bPrice: 25714,
          b2cPrice: 28571,
          marginOnPrice: 11.110679,
          checkinDate: "2021-02-12",
        },
        {
          b2bPrice: 25714,
          b2cPrice: 28571,
          marginOnPrice: 11.110679,
          checkinDate: "2021-02-15",
        },
        {
          b2bPrice: 25714,
          b2cPrice: 28571,
          marginOnPrice: 11.110679,
          checkinDate: "2021-02-16",
        },
      ],
    };
    const index = 0;
    const isParent = false;
    expect(getParsedProperty(property, index, isParent)).toStrictEqual({
      img:
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
      images: [
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/DSC00137-ch_simple2-e1511971588521.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/OIP.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/OIP2.jpg",
      ],
      propertyCode: "DEMO_JEEVAN",
      lcn: false,
      type: "PROD",
      supplier: "ntp",
      channel: "DEMO_INDIA_CH",
      hotelName: "AJSG Hotel ",
      remainingCapital: null,
      city: "Vienna",
      highestMargin: 11,
      lowestMargin: 11,
      latitude:48.210033,
      longitude: 16.363449,
      arrivalDate: "2021-04-12",
      b2bPrice: 128.57,
      b2cPrice: 142.86,
      margin: "",
      country: "Austria",
      rating: "",
      description:
        "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
      descriptions: [
        {
          lang: "EN",
          description:
            "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
        },
        { lang: "DE", description: "Duch lang ggjjgjgjgjgj" },
      ],
      trustyou: null,
      isParent: false,
      key: "DEMO_JEEVAN-ntp-DEMO_INDIA_CH-0",
    });
  });

  test("getParsedProperty check if functions received invalid or empty data", () => {
    let property = {};
    let index = 0;
    let isParent = true;
    expect(getParsedProperty(property, index, isParent)).toStrictEqual({
      arrivalDate: "",
      b2bPrice: "",
      b2cPrice: "",
      channel: "",
      type: "DEMO",
      city: "",
      latitude: "",
      longitude: "",
      country: "",
      description: "",
      descriptions: [],
      hotelName: "",
      images: [],
      highestMargin: "",
      lowestMargin: "",
      img: "",
      isParent: true,
      key: "-0true",
      lcn: "",
      margin: "",
      propertyCode: "",
      rating: "",
      remainingCapital: "",
      supplier: "",
      trustyou: "",
    });

    property = null;
    index = 1;
    isParent = false;
    expect(getParsedProperty(property, index, isParent)).toStrictEqual({
      arrivalDate: "",
      b2bPrice: "",
      b2cPrice: "",
      channel: "",
      city: "",
      country: "",
      description: "",
      descriptions: [],
      hotelName: "",
      latitude:"",
      longitude: "",
      type: "DEMO",
      images: [],
      img: "",
      isParent: false,
      highestMargin: "",
      lowestMargin: "",
      key: "---1",
      lcn: "",
      margin: "",
      propertyCode: "",
      rating: "",
      remainingCapital: "",
      supplier: "",
      trustyou: "",
    });
  });
});
