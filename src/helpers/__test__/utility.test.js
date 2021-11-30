import {
  mapOnlySuppliers,
  mapBrands,
  getParsedProperty,
  getValue,
  isParentOrChildrenPropertyAdded,
  isPropertySelected,
  createSearchQueryURL,
} from "../utility";
import moment from "moment";
window.getValue = getValue;
describe("Check Utility.js functional component test cases", () => {
  it("check mapOnlySuppliers is converting form value to an array", () => {
    const formValues = {
      channels: [
        { id: "NEMO_CH_01", name: "aa" },
        { id: "NEMO_CH_02", name: "NEMO_CH_02" },
      ],
      suppliers: [{ id: "ntp", name: "NTP" }],
    };
    expect(mapOnlySuppliers(formValues)).toEqual([
      {
        channels: [
          { id: "NEMO_CH_01", name: "aa" },
          { id: "NEMO_CH_02", name: "NEMO_CH_02" },
        ],
        id: "ntp",
        name: "NTP",
      },
    ]);
  });
  it("check mapBrands methods output value of when we input brand value ", () => {
    const formBrandValues = [
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
                    id: "DEMO_OFFERBUILDER",
                    name: "DEMO_OFFERBUILDER",
                  },
                  {
                    id: "DEMO_INDIA_CH",
                    name: "DEMO_INDIA_CH",
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
    expect(mapBrands(formBrandValues)).toEqual([
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
                    id: "DEMO_OFFERBUILDER",
                    name: "DEMO_OFFERBUILDER",
                  },
                  {
                    id: "DEMO_INDIA_CH",
                    name: "DEMO_INDIA_CH",
                  },
                ],
              },
            ],
          },
        ],
      },
    ]);
  });

  it("check getParsedProperty, when parents property is true ", () => {
    const property = {
      info: {
        channel: "DEMO_INDIA_CH",
        info: {
          name: "AJSG Hotel",
          description:
            "Our luxurious Apartment hotel in country style is … we serve regional and international specialties.",
          city: "Wien",
          countryName: "Austria",
          image: {
            url:
              "https://res.cloudinary.com/seekda-dev/image/upload/w_375,h_210,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
          },
        },
        latitude:48.210033,
        longitude: 16.363449,
        lcn: false,
        propertyCode: "DEMO_JEEVAN",
        remainingCapital: null,
        supplier: "ntp",
      },
    };
    expect(getParsedProperty(property, 1, true)).toEqual({
      arrivalDate: "",
      b2bPrice: "",
      b2cPrice: "",
      channel: "",
      city: "",
      country: "",
      latitude:48.210033,
      longitude: 16.363449,
      description: "",
      descriptions: [],
      hotelName: "",
      img: "",
      isParent: true,
      highestMargin: "",
      lowestMargin: "",
      key: "-1true",
      lcn: "",
      propertyCode: "",
      rating: "",
      remainingCapital: "",
      supplier: "",
      trustyou: "",
      images: [],
      margin: "",
      type: "DEMO",
    });
  });
  it("check getParsedProperty when parent value is false ", () => {
    const property = {
      info: {
        channel: "DEMO_INDIA_CH",
        info: {
          name: "AJSG Hotel",
          descriptions:
            "Our luxurious Apartment hotel in country style is … we serve regional and international specialties.",
          city: "Wien",
          countryName: "Austria",
          image: {
            url:
              "https://res.cloudinary.com/seekda-dev/image/upload/w_375,h_210,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
          },
          latitude:48.210033,
          longitude: 16.363449,
        },
        lcn: false,
      },
    };
    expect(getParsedProperty(property, 1, false)).toEqual({
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
      img: "",
      highestMargin: "",
      lowestMargin: "",
      isParent: false,
      key: "---1",
      lcn: "",
      propertyCode: "",
      rating: "",
      remainingCapital: "",
      supplier: "",
      trustyou: "",
      images: [],
      margin: "",
      type: "DEMO",
    });
  });

  it("check return value of isParentOrChildrenPropertyAdded when pass empty selectedProperties ", () => {
    const clickedRow = {
      alternativeProperties: null,
      channel: "DEMO_OFFERBUILDER",
      city: "Wien",
      country: "Austria",
      description:
        "Experience award-winning making your visit truly remarkable at JW Marriott Hotel Vienna.",
      hotelName: "HEERO Merriott STAR",
      img:
        "https://res.cloudinary.com/seekda-dev/image/upload/w_375,h_210,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_HEERO/dubai.jpg",
      isParent: true,
      key: "DEMO_HEERO-4true",
      lcn: false,
      propertyCode: "DEMO_HEERO",
      rating: 4,
      remainingCapital: null,
      supplier: "ntp",
      trustyou: "",
    };
    const selectedProperties = [];
    expect(
      isParentOrChildrenPropertyAdded(clickedRow, selectedProperties)
    ).toEqual(false);
  });
  it("check isParentOrChildrenPropertyAdded calls and its return value ", () => {
    const clickedRow = {
      alternativeProperties: null,
      channel: "DEMO_OFFERBUILDER",
      city: "Wien",
      country: "Austria",
      description:
        "Experience award-winning making your visit truly remarkable at JW Marriott Hotel Vienna.",
      hotelName: "HEERO Merriott STAR",
      img:
        "https://res.cloudinary.com/seekda-dev/image/upload/w_375,h_210,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_HEERO/dubai.jpg",
      isParent: true,
      key: "DEMO_HEERO-4true",
      lcn: false,
      propertyCode: "DEMO_HEERO",
      rating: 4,
      remainingCapital: null,
      supplier: "ntp",
      trustyou: "",
    };
    const selectedProperties = [
      {
        channel: "DEMO_INDIA_CH",
        children: null,
        city: "Wien",
        country: "Austria",
        description:
          "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
        hotelName: "AJSG Hotel",
        img:
          "https://res.cloudinary.com/seekda-dev/image/upload/w_375,h_210,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
        isParent: true,
        key: "DEMO_JEEVAN-0true",
        lcn: false,
        propertyCode: "DEMO_JEEVAN",
        rating: "",
        remainingCapital: null,
        supplier: "ntp",

        trustyou: "",
      },
    ];
    expect(
      isParentOrChildrenPropertyAdded(clickedRow, selectedProperties)
    ).toEqual(false);
  });
  it("check isPropertySelected return value", () => {
    const currentProperty = {
      alternativeProperties: null,
      channel: "DEMO_OFFERBUILDER",
      city: "Wien",
      country: "Austria",
      description:
        "Experience award-winning making your visit truly remarkable at JW Marriott Hotel Vienna.",
      hotelName: "HEERO Merriott STAR",
      img:
        "https://res.cloudinary.com/seekda-dev/image/upload/w_375,h_210,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_HEERO/dubai.jpg",
      isParent: true,
      key: "DEMO_HEERO-4true",
      lcn: false,
      propertyCode: "DEMO_JEEVAN",
      rating: 4,
      remainingCapital: null,
      supplier: "ntp",
      trustyou: "",
    };
    const propertyList = [
      {
        channel: "DEMO_INDIA_CH",
        children: null,
        city: "Wien",
        country: "Austria",
        description:
          "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
        hotelName: "AJSG Hotel",
        img:
          "https://res.cloudinary.com/seekda-dev/image/upload/w_375,h_210,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
        isParent: true,
        key: "DEMO_JEEVAN-0true",
        lcn: false,
        propertyCode: "DEMO_JEEVAN",
        rating: "",
        remainingCapital: null,
        supplier: "ntp",

        trustyou: "",
        alternativeProperties: [
          {
            channel: "DEMO_OFFERBUILDER",
            city: "Wien",
            country: "Austria",
            description:
              "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
            hotelName: "AJSG Hotel",
            img:
              "https://res.cloudinary.com/seekda-dev/image/upload/w_375,h_210,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
            isParent: false,
            key: "DEMO_JEEVAN-ntp-DEMO_OFFERBUILDER-0",
            lcn: false,
            propertyCode: "DEMO_JEEVAN",
            rating: "",
            remainingCapital: null,
            supplier: "ntp",
            trustyou: "",
          },
        ],
      },
    ];
    expect(isPropertySelected(currentProperty, propertyList)).toEqual(false);
  });
  it("check query string is generating or not on createSearchQueryURL method call", () => {
    const routePostSearch = "/offers/create-new-offer/2";
    expect(createSearchQueryURL(routePostSearch)).toEqual(
      `?latitude=&longitude=&distance=10&hotelName=&startDate=${moment().format(
        "YYYY-MM-DD"
      )}&endDate=${moment()
        .add(60, "days")
        .format(
          "YYYY-MM-DD"
        )}&los=1&onlySupplier=false&lcn=false&currencyCode=EUR&pageSize=10&pageOffset=0&sortOrder=ASCENDING&sortCriteria=NAME&type=ALL`
    );
  });
});
