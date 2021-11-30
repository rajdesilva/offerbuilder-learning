import { cleanup } from "@testing-library/react-hooks";
import { propertyCartActions } from "../../../pages/browseSupply/actions";
import { store } from "../../../redux/store";
import { getOfferTypeFromPropertiesSelected } from "../getOfferTypeFromPropertiesSelected";
import { getValue } from "../getValue";

describe("getOfferTypeFromPropertiesSelected function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  afterEach(cleanup);
  test("getOfferTypeFromPropertiesSelected check when property is DEMO, return is DEMO", () => {
    store.dispatch({
        type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
        payload: [
            {
                img: 'https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_PKM_002/Screenshot_2020-03-06_at_5-17-37_PM.png',
                images: [
                  'https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_PKM_002/Screenshot_2020-03-06_at_5-17-37_PM.png'
                ],
                propertyCode: 'DEMO_PKM_002',
                lcn: false,
                supplier: 'ntp',
                channel: 'KOGNITIV_QA',
                hotelName: 'Hotel Paradise PKM',
                remainingCapital: null,
                city: 'Vienna',
                arrivalDate: '2021-06-07',
                latitude: 48.19912,
                longitude: 16.349869,
                highestMargin: 0,
                lowestMargin: 0,
                b2bPrice: 142.86,
                b2cPrice: 142.86,
                margin: '',
                country: 'Austria',
                rating: 5,
                description: 'The beautiful hotel is located in India. It provides luxurious accommodations with private balconies offering mountain views and and private bathrooms. Wi-Fi is free in the entire resort. Pune International Airport is 13 mi from the resort while the railway station is only 8.8 mi away. This hotel provides an airport shuttle service for guests’ convenience at an additional charge. The property offers much privacy and all modern comforts. The floor-to-ceiling wood chalets feature large windows that allow the fresh mountain air in. They are equipped with a flat-screen TV, air-conditioning and a mini-bar. For meals, enjoy a range of cuisines at the resort’s restaurant or can enjoy a drink at the bar. It also provides room service. Other services offered by the resort includes car rental.',
                descriptions: [],
                trustyou: null,
                isParent: true,
                type: 'DEMO',
                key: 'DEMO_PKM_002-0true',
                marketingImages: [
                  'https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_PKM_002/Screenshot_2020-03-06_at_5-17-37_PM.png'
                ]
              },
              {
                img: 'https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_PKM_002/Screenshot_2020-03-06_at_5-17-37_PM.png',
                images: [
                  'https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_PKM_002/Screenshot_2020-03-06_at_5-17-37_PM.png'
                ],
                propertyCode: 'DEMO_PKM_002',
                lcn: false,
                supplier: 'ntp',
                channel: 'KOGNITIV_QA',
                hotelName: 'Hotel Paradise PKM',
                remainingCapital: null,
                city: 'Vienna',
                arrivalDate: '2021-06-07',
                latitude: 48.19912,
                longitude: 16.349869,
                highestMargin: 0,
                lowestMargin: 0,
                b2bPrice: 142.86,
                b2cPrice: 142.86,
                margin: '',
                country: 'Austria',
                rating: 5,
                description: 'The beautiful hotel is located in India. It provides luxurious accommodations with private balconies offering mountain views and and private bathrooms. Wi-Fi is free in the entire resort. Pune International Airport is 13 mi from the resort while the railway station is only 8.8 mi away. This hotel provides an airport shuttle service for guests’ convenience at an additional charge. The property offers much privacy and all modern comforts. The floor-to-ceiling wood chalets feature large windows that allow the fresh mountain air in. They are equipped with a flat-screen TV, air-conditioning and a mini-bar. For meals, enjoy a range of cuisines at the resort’s restaurant or can enjoy a drink at the bar. It also provides room service. Other services offered by the resort includes car rental.',
                descriptions: [],
                trustyou: null,
                isParent: true,
                type: 'DEMO',
                key: 'DEMO_PKM_002-0true',
                marketingImages: [
                  'https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_PKM_002/Screenshot_2020-03-06_at_5-17-37_PM.png'
                ]
              }
        ]
    })
    expect(getOfferTypeFromPropertiesSelected()).toStrictEqual('DEMO');
  });

  test("getOfferTypeFromPropertiesSelected check when property is PROD, return is PROD", () => {
    store.dispatch({
        type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
        payload: [
            {
                img: 'https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_PKM_002/Screenshot_2020-03-06_at_5-17-37_PM.png',
                images: [
                  'https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_PKM_002/Screenshot_2020-03-06_at_5-17-37_PM.png'
                ],
                propertyCode: 'DEMO_PKM_002111',
                lcn: false,
                supplier: 'ntp11',
                channel: 'KOGNITIV_QA11',
                hotelName: 'Hotel Paradise PKM111',
                remainingCapital: null,
                city: 'Vienna',
                arrivalDate: '2021-06-07',
                latitude: 48.19912,
                longitude: 16.349869,
                highestMargin: 0,
                lowestMargin: 0,
                b2bPrice: 142.86,
                b2cPrice: 142.86,
                margin: '',
                country: 'Austria',
                rating: 5,
                description: 'The beautiful hotel is located in India. It provides luxurious accommodations with private balconies offering mountain views and and private bathrooms. Wi-Fi is free in the entire resort. Pune International Airport is 13 mi from the resort while the railway station is only 8.8 mi away. This hotel provides an airport shuttle service for guests’ convenience at an additional charge. The property offers much privacy and all modern comforts. The floor-to-ceiling wood chalets feature large windows that allow the fresh mountain air in. They are equipped with a flat-screen TV, air-conditioning and a mini-bar. For meals, enjoy a range of cuisines at the resort’s restaurant or can enjoy a drink at the bar. It also provides room service. Other services offered by the resort includes car rental.',
                descriptions: [],
                trustyou: null,
                isParent: true,
                type: 'PROD',
                key: 'DEMO_PKM_002-0true',
                marketingImages: [
                  'https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_PKM_002/Screenshot_2020-03-06_at_5-17-37_PM.png'
                ]
              },
              {
                img: 'https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_PKM_002/Screenshot_2020-03-06_at_5-17-37_PM.png',
                images: [
                  'https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_PKM_002/Screenshot_2020-03-06_at_5-17-37_PM.png'
                ],
                propertyCode: 'DEMO_PKM_002',
                lcn: false,
                supplier: 'ntp',
                channel: 'KOGNITIV_QA',
                hotelName: 'Hotel Paradise PKM',
                remainingCapital: null,
                city: 'Vienna',
                arrivalDate: '2021-06-07',
                latitude: 48.19912,
                longitude: 16.349869,
                highestMargin: 0,
                lowestMargin: 0,
                b2bPrice: 142.86,
                b2cPrice: 142.86,
                margin: '',
                country: 'Austria',
                rating: 5,
                description: 'The beautiful hotel is located in India. It provides luxurious accommodations with private balconies offering mountain views and and private bathrooms. Wi-Fi is free in the entire resort. Pune International Airport is 13 mi from the resort while the railway station is only 8.8 mi away. This hotel provides an airport shuttle service for guests’ convenience at an additional charge. The property offers much privacy and all modern comforts. The floor-to-ceiling wood chalets feature large windows that allow the fresh mountain air in. They are equipped with a flat-screen TV, air-conditioning and a mini-bar. For meals, enjoy a range of cuisines at the resort’s restaurant or can enjoy a drink at the bar. It also provides room service. Other services offered by the resort includes car rental.',
                descriptions: [],
                trustyou: null,
                isParent: true,
                type: 'PROD',
                key: 'DEMO_PKM_002-0true',
                marketingImages: [
                  'https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_PKM_002/Screenshot_2020-03-06_at_5-17-37_PM.png'
                ]
              }
        ]
    })
    expect(getOfferTypeFromPropertiesSelected()).toStrictEqual('PROD');
  });

  test("getOfferTypeFromPropertiesSelected check when properties are both DEMO and PROD, return is DEMO", () => {
    store.dispatch({
        type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
        payload: [
            {
                img: 'https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_PKM_002/Screenshot_2020-03-06_at_5-17-37_PM.png',
                images: [
                  'https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_PKM_002/Screenshot_2020-03-06_at_5-17-37_PM.png'
                ],
                propertyCode: 'DEMO_PKM_002',
                lcn: false,
                supplier: 'ntp',
                channel: 'KOGNITIV_QA',
                hotelName: 'Hotel Paradise PKM',
                remainingCapital: null,
                city: 'Vienna',
                arrivalDate: '2021-06-07',
                latitude: 48.19912,
                longitude: 16.349869,
                highestMargin: 0,
                lowestMargin: 0,
                b2bPrice: 142.86,
                b2cPrice: 142.86,
                margin: '',
                country: 'Austria',
                rating: 5,
                description: 'The beautiful hotel is located in India. It provides luxurious accommodations with private balconies offering mountain views and and private bathrooms. Wi-Fi is free in the entire resort. Pune International Airport is 13 mi from the resort while the railway station is only 8.8 mi away. This hotel provides an airport shuttle service for guests’ convenience at an additional charge. The property offers much privacy and all modern comforts. The floor-to-ceiling wood chalets feature large windows that allow the fresh mountain air in. They are equipped with a flat-screen TV, air-conditioning and a mini-bar. For meals, enjoy a range of cuisines at the resort’s restaurant or can enjoy a drink at the bar. It also provides room service. Other services offered by the resort includes car rental.',
                descriptions: [],
                trustyou: null,
                isParent: true,
                type: 'DEMO',
                key: 'DEMO_PKM_002-0true',
                marketingImages: [
                  'https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_PKM_002/Screenshot_2020-03-06_at_5-17-37_PM.png'
                ]
              },
              {
                img: 'https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_PKM_002/Screenshot_2020-03-06_at_5-17-37_PM.png',
                images: [
                  'https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_PKM_002/Screenshot_2020-03-06_at_5-17-37_PM.png'
                ],
                propertyCode: 'DEMO_PKM_002',
                lcn: false,
                supplier: 'ntp',
                channel: 'KOGNITIV_QA',
                hotelName: 'Hotel Paradise PKM',
                remainingCapital: null,
                city: 'Vienna',
                arrivalDate: '2021-06-07',
                latitude: 48.19912,
                longitude: 16.349869,
                highestMargin: 0,
                lowestMargin: 0,
                b2bPrice: 142.86,
                b2cPrice: 142.86,
                margin: '',
                country: 'Austria',
                rating: 5,
                description: 'The beautiful hotel is located in India. It provides luxurious accommodations with private balconies offering mountain views and and private bathrooms. Wi-Fi is free in the entire resort. Pune International Airport is 13 mi from the resort while the railway station is only 8.8 mi away. This hotel provides an airport shuttle service for guests’ convenience at an additional charge. The property offers much privacy and all modern comforts. The floor-to-ceiling wood chalets feature large windows that allow the fresh mountain air in. They are equipped with a flat-screen TV, air-conditioning and a mini-bar. For meals, enjoy a range of cuisines at the resort’s restaurant or can enjoy a drink at the bar. It also provides room service. Other services offered by the resort includes car rental.',
                descriptions: [],
                trustyou: null,
                isParent: true,
                type: 'PROD',
                key: 'DEMO_PKM_002-0true',
                marketingImages: [
                  'https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_PKM_002/Screenshot_2020-03-06_at_5-17-37_PM.png'
                ]
              }
        ]
    })
    expect(getOfferTypeFromPropertiesSelected()).toStrictEqual('DEMO');
  });

  test("getOfferTypeFromPropertiesSelected check when properties are absent, return is PROD", () => {
    store.dispatch({
        type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
        payload: [],
    })
    expect(getOfferTypeFromPropertiesSelected()).toStrictEqual('PROD');
  });

  test("getOfferTypeFromPropertiesSelected check when cart data is null, return is PROD", () => {
    store.dispatch({
        type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
        payload: null,
    })
    expect(getOfferTypeFromPropertiesSelected()).toStrictEqual('PROD');
  });
});
