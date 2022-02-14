import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createStore } from 'redux';
import { createMemoryHistory } from 'history';
import {
  fireEvent,
  act,
  screen,
} from "@testing-library/react";
import TopNav from '../TopNav';
import { render } from '../../../helpers/testUtils';
import moment from 'moment';
describe("Test TopNav component", () => {
  test("create TopNav Component snapshot matches or not", () => {
    const store = createStore(() => ({}));
    const { container } = render(
      <MemoryRouter>
        <TopNav />
       </MemoryRouter>,
      {
        store,
      });
    expect(container.firstChild).toMatchSnapshot();
  });

  test("Check offers, Browse supply and Logout tabs are present or not", () => {
    const store = createStore(() => ({}));
    const { getByText, getByTestId } = render(<MemoryRouter>
      <TopNav />
    </MemoryRouter>, {
      store,
    });
    expect(getByText(/Offers/i)).toBeInTheDocument();
/*    expect(getByText(/Browse Supply/i)).toBeInTheDocument();*/
    expect(getByTestId('logout')).toBeInTheDocument();
  });
  test("Check offers, Browse supply and Logout tabs are present or not", () => {
    const tempStore = {
      searchparams: {
        latitude: '',
        longitude: '',
        startDate: moment().format("YYYY-MM-DD"),
        endDate: moment().add(60, 'days').format("YYYY-MM-DD"),
        los: 1,
        onlySupplier: false,
        lcn: false,
        remainingCapitalPool: null,
        pageSize: 10,
        pageOffset: 0,
        sortBy: 'name',
        suppliers: [],
        brands: [
          {
            id: 'idb',
            name: 'Internal Demo Brand',
            storefronts: [
              {
                id: 'ids',
                name: 'Internal Demo Storefront',
                suppliers: [
                  {
                    id: 'ntp',
                    name: 'NTP',
                    channels: [
                      {
                        id: 'NEMO_CH_01',
                        name: 'NEMO_CH_01'
                      },
                      {
                        id: 'NEMO_CH_02',
                        name: 'NEMO_CH_02'
                      },
                      {
                        id: 'NEMO_CH_04',
                        name: 'NEMO_CH_04'
                      },
                      {
                        id: 'NEMO_CH_05',
                        name: 'NEMO_CH_05'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        city: '',
        dateRange: {
          startDate: moment().format("YYYY-MM-DD"),
          endDate: moment().add(60, 'days').format("YYYY-MM-DD")
        },
        destination: {}
      },
      newoffersettingsparam: {
        offerId: '',
        status: {
          id: 'unpublished',
          name: 'Unpublished'
        },
        name: '',
        brands: [
          {
            id: 'idb',
            name: 'Internal Demo Brand',
            storefronts: [
              {
                id: 'ids',
                name: 'Internal Demo Storefront',
                suppliers: [
                  {
                    id: 'ntp',
                    name: 'NTP',
                    channels: [
                      {
                        id: 'NEMO_CH_01',
                        name: 'NEMO_CH_01'
                      },
                      {
                        id: 'NEMO_CH_02',
                        name: 'NEMO_CH_02'
                      },
                      {
                        id: 'NEMO_CH_04',
                        name: 'NEMO_CH_04'
                      },
                      {
                        id: 'NEMO_CH_05',
                        name: 'NEMO_CH_05'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      propertycart: {
        cartItems: [
          {
            img: 'https://res.cloudinary.com/seekda-dev/image/upload/w_375,h_210,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg',
            propertyCode: 'DEMO_JEEVAN',
            lcn: false,
            supplier: 'ntp',
            channel: 'NEMO_CH_05',
            hotelName: 'AJSG Hotel',
            remainingCapital: null,
            city: 'Wien',
            country: 'Austria',
            rating: '',
            description: 'Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.',
            trustyou: '',
            isParent: true,
            key: 'DEMO_JEEVAN-0true',
            alternativeProperties: null
          },
          {
            img: 'https://res.cloudinary.com/seekda-dev/image/upload/w_375,h_210,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_PRATIK/PRATTT.jpg',
            propertyCode: 'DEMO_PRATIK',
            lcn: false,
            supplier: 'ntp',
            channel: 'NEMO_CH_01',
            hotelName: 'NICE RESORT PRATIK',
            remainingCapital: null,
            city: 'Wien',
            country: 'Austria',
            rating: 4.5,
            description: 'Experience award-winning service and sophisticated style at JW Marriott Hotel Vienna. Ideally situated between the airport and Vienna Expressway, our 5-star hotel is an ideal destination for both business travelers and vacationing families. Luxury rooms and suites showcase deluxe bedding and marble bathrooms, as well as high-speed internet, desks with ergonomic chairs and laptop-sized safes. Many accommodations also provide striking views of the Pune cityscape or the nearby mountain. Delightful dining options within the hotel include Italian fare, a vegetarian restaurant and a chic rooftop bar. Challenge yourself to a workout in the fitness center or a swim in the outdoor pool, followed by a treatment at the tranquil Quan Spa. If you\'re hosting an event in Pune, you can explore our 40,000 square feWe are always looking forward to children in our hotel. In our 120 sqm large playground your children will be supervised by professional trained staff. In the meantime the parents can just chill in our relax garden or in our sauna. Besides we provide a fitness room, an indoor swimming pool with panorama view and a cosmetic studio. In summer we offer guided excursions in the beautiful mountain world starting directly in front of our house and in winter you can explore the surrounding ski area with our guides.et of versatile, sophisticated venue space, including multiple boardrooms and a ballroom that can accommodate 2,000 people. We look forward to making your visit truly remarkable at JW Marriott Hotel Vienna.',
            trustyou: '',
            isParent: true,
            key: 'DEMO_PRATIK-1true',
            alternativeProperties: null
          }
        ]
      },
      languageinfo: {
        loading: false,
        languages: [
          {
            id: 'EN',
            name: 'English'
          },
          {
            id: 'ES',
            name: 'Spanish'
          },
          {
            id: 'FR',
            name: 'French'
          },

          {
            id: 'EL',
            name: 'Greek'
          },
          {
            id: 'SR',
            name: 'Serbian'
          },
          {
            id: 'BE',
            name: 'Belarusian'
          },
          {
            id: 'BG',
            name: 'Bulgarian'
          },
          {
            id: 'MK',
            name: 'Macedonian'
          },
          {
            id: 'RU',
            name: 'Russian'
          },
          {
            id: 'UK',
            name: 'Ukrainian'
          },
          {
            id: 'IW',
            name: 'Hebrew'
          },
          {
            id: 'AR',
            name: 'Arabic'
          },
          {
            id: 'HI',
            name: 'Hindi'
          },
          {
            id: 'TH',
            name: 'Thai'
          },
          {
            id: 'ZH',
            name: 'Chinese'
          },
          {
            id: 'JA',
            name: 'Japanese'
          },
          {
            id: 'KO',
            name: 'Korean'
          }
        ]
      },
      newoffermarketinginfo: {
        loading: false,
        selectedLanguages: [
          {
            id: 'EN',
            name: 'English'
          }
        ]
      }
    };
    const store = createStore(() => ({...tempStore}));
    const { getByText, getByTestId } = render(<MemoryRouter>
      <TopNav />
    </MemoryRouter>, {
      store,
    });
    expect(getByText(/Offers/i)).toBeInTheDocument();
    /*expect(getByText(/Browse Supply/i)).toBeInTheDocument();*/
    expect(getByTestId('logout')).toBeInTheDocument();
  });

  test("Check router for default home page, offers and browse supply page ", async () => {
    const history = createMemoryHistory()
    const store = createStore(() => ({}));
    const { getByTestId, getByText } = render(
      <Router history={history}>
        <TopNav />
      </Router >, {
      store,
    });
    await act(async () => {
      expect(history.location.pathname).toBe('/');
      
      await fireEvent.click(getByText(/Offers/i));
      expect(history.location.pathname).toBe('/offers');

    /*  await fireEvent.click(getByTestId('browse-supply'));
      expect(history.location.pathname).toBe('/browse-supply/');*/
    });
  });
})