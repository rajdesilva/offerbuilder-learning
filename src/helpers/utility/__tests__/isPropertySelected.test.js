import { isPropertySelected } from "../isPropertySelected";

describe("isPropertySelected function test", () => {
  test("isPropertySelected check if function returns false when empty cart", () => {
    const property = {
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
      supplier: "ntp",
      channel: "DEMO_INDIA_CH",
      hotelName: "AJSG Hotel ",
      remainingCapital: null,
      city: "Vienna",
      arrivalDate: "12.04.2021",
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
      trustyou: "",
      isParent: true,
      key: "DEMO_JEEVAN-0true",
      alternativeProperties: [
        {
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
          supplier: "ntp",
          channel: "NEMO_CH_01",
          hotelName: "AJSG Hotel ",
          remainingCapital: null,
          city: "Vienna",
          arrivalDate: "12.04.2021",
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
          trustyou: "",
          isParent: false,
          key: "DEMO_JEEVAN-ntp-NEMO_CH_01-0",
        },
        {
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
          supplier: "ntp",
          channel: "DEMO_OFFERBUILDER",
          hotelName: "AJSG Hotel ",
          remainingCapital: null,
          city: "Vienna",
          arrivalDate: "12.04.2021",
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
          trustyou: "",
          isParent: false,
          key: "DEMO_JEEVAN-ntp-DEMO_OFFERBUILDER-1",
        },
      ],
    };
    const selectedProperties = [];
    expect(isPropertySelected(property, selectedProperties)).toBe(false);
  });
  test("isPropertySelected check if property is already selected", () => {
    const property = {
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
      supplier: "ntp",
      channel: "DEMO_INDIA_CH",
      hotelName: "AJSG Hotel ",
      remainingCapital: null,
      city: "Vienna",
      arrivalDate: "12.04.2021",
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
      trustyou: "",
      isParent: true,
      key: "DEMO_JEEVAN-0true",
      alternativeProperties: [
        {
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
          supplier: "ntp",
          channel: "NEMO_CH_01",
          hotelName: "AJSG Hotel ",
          remainingCapital: null,
          city: "Vienna",
          arrivalDate: "12.04.2021",
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
          trustyou: "",
          isParent: false,
          key: "DEMO_JEEVAN-ntp-NEMO_CH_01-0",
        },
        {
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
          supplier: "ntp",
          channel: "DEMO_OFFERBUILDER",
          hotelName: "AJSG Hotel ",
          remainingCapital: null,
          city: "Vienna",
          arrivalDate: "12.04.2021",
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
          trustyou: "",
          isParent: false,
          key: "DEMO_JEEVAN-ntp-DEMO_OFFERBUILDER-1",
        },
      ],
    };
    const selectedProperties = [
      {
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
        supplier: "ntp",
        channel: "DEMO_INDIA_CH",
        hotelName: "AJSG Hotel ",
        remainingCapital: null,
        city: "Vienna",
        arrivalDate: "12.04.2021",
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
        trustyou: "",
        isParent: true,
        key: "DEMO_JEEVAN-0true",
      },
      {
        img:
          "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_BANJARE/DUDE.jpg",
        images: [
          "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_BANJARE/DUDE.jpg",
          "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_BANJARE/RAJJ.jpg",
          "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_SWAP_01/mar2333.jpg",
          "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_SWAP_01/m11111.jpg",
          "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_SWAP_01/roo11.jpg",
          "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_SWAP_01/busi.jpg",
          "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_SWAP_01/fami.jpg",
        ],
        propertyCode: "DEMO_BANJARE",
        lcn: false,
        supplier: "ntp",
        channel: "DEMO_OFFERBUILDER",
        hotelName: "BANJARE & BANJARE STAR HOTEL",
        remainingCapital: null,
        city: "Vienna",
        arrivalDate: "12.04.2021",
        b2bPrice: 142.86,
        b2cPrice: null,
        margin: "",
        country: "Austria",
        rating: 4,
        description:
          "Experience award-winning service and sophisticated style at JW Marriott Hotel Vienna. Ideally situated between the airport and Vienna Expressway, our 5-star hotel is an ideal destination for both business travelers and vacationing families. Luxury rooms and suites showcase deluxe bedding and marble bathrooms, as well as high-speed internet, desks with ergonomic chairs and laptop-sized safes. Many accommodations also provide striking views of the Pune cityscape or the nearby mountain. Delightful dining options within the hotel include Italian fare, a vegetarian restaurant and a chic rooftop bar. Challenge yourself to a workout in the fitness center or a swim in the outdoor pool, followed by a treatment at the tranquil Quan Spa. If you're hosting an event in Pune, you can explore our 40,000 square feWe are always looking forward to children in our hotel. In our 120 sqm large playground your children will be supervised by professional trained staff. In the meantime the parents can just chill in our relax garden or in our sauna. Besides we provide a fitness room, an indoor swimming pool with panorama view and a cosmetic studio. In summer we offer guided excursions in the beautiful mountain world starting directly in front of our house and in winter you can explore the surrounding ski area with our guides.et of versatile, sophisticated venue space, including multiple boardrooms and a ballroom that can accommodate 2,000 people. We look forward to making your visit truly remarkable at JW Marriott Hotel Vienna.",
        descriptions: [],
        trustyou: {
          name: "Hotel Das Kronthaler",
          score: "94",
          ty_id: "45370c73-2347-4297-a9bc-cf39356de8f3",
          score_description: "Excellent",
          sources_count: 19,
          reviews_count: 553,
        },
        isParent: true,
        key: "DEMO_BANJARE-1true",
      },
    ];
    expect(isPropertySelected(property, selectedProperties)).toBe(true);
  });
});
