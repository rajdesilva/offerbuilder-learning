import React from "react";
import { createStore } from "redux";
import { render, fireEvent } from "../../../../helpers/testUtils";
import { createMemoryHistory } from "history";
import { Router, MemoryRouter } from "react-router-dom";
import { SearchedPropertyList } from "../SearchedPropertyList";
import { ReduxStoreForPropertySearch } from "./ReduxStoreForPropertySearch";

jest.mock("./../../service");
const history = createMemoryHistory();

describe("display property component test", () => {
  test("create display property components snapshot", () => {
    const store = createStore(() => ({ ...ReduxStoreForPropertySearch }));
    const wrapper = render(
      <Router history={history}>
        <SearchedPropertyList />
      </Router>,
      {
        store,
      }
    );
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot();
  });

  test("check data is available or not", () => {
    const store = createStore(() => ({ ...ReduxStoreForPropertySearch }));
    const { getByText } = render(
      <Router history={history}>
        <SearchedPropertyList />
      </Router>,
      {
        store,
      }
    );
    expect(getByText(/AJSG Hotel/i)).toBeInTheDocument(); //hotel name
    expect(getByText(/Best hotel/i)).toBeInTheDocument(); // description
  });
  test("check image is available or not", () => {
    const store = createStore(() => ({ ...ReduxStoreForPropertySearch }));
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/offers/create-new-offer/:step?"]}>
        <SearchedPropertyList />
      </MemoryRouter>,
      {
        store,
      }
    );
    const image = getByTestId("image");
    expect(image).toHaveAttribute(
      "src",
      "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg"
    );
  });
  test("Add Property into cart", () => {
    const store = createStore(() => ({ ...ReduxStoreForPropertySearch }));
    store.dispatch = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/offers/create-new-offer/:step?"]}>
        <SearchedPropertyList />
      </MemoryRouter>,
      {
        store,
      }
    );
    const addBtn = getByTestId("add-to-offer-btn");
    fireEvent.click(addBtn);
    expect(addBtn).toBeTruthy();
    expect(store.dispatch).toHaveBeenCalledTimes(6);
  });
  test("Dialog should open on adding the same property into Cart.", () => {
    const ts = ReduxStoreForPropertySearch;
    ts.propertycart.cartItems.push({
      img: "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
      images: [
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/DSC00137-ch_simple2-e1511971588521.jpg",
      ],
      propertyCode: "DEMO_JEEVAN",
      lcn: false,
      supplier: "ntp",
      channel: "NEMO_CH_06",
      hotelName: "AJSG Hotel",
      remainingCapital: null,
      city: "Vienna",
      country: "Austria",
      rating: "",
      description:
        "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
      descriptions: [
        {
          text: "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
          lang: "EN",
        },
      ],
      trustyou: "",
      isParent: true,
      key: "DEMO_JEEVAN-0true",
    });
    const store = createStore(() => ({ ...ts }));
    store.dispatch = jest.fn();
    const { getByTestId, getByText } = render(
      <MemoryRouter initialEntries={["/offers/create-new-offer/:step?"]}>
        <SearchedPropertyList />
      </MemoryRouter>,
      {
        store,
      }
    );
    const addBtn = getByTestId("add-to-offer-btn");
    fireEvent.click(addBtn);
    expect(getByText("Property already added")).toBeInTheDocument();
  });
  test("Show the added Label on the searched property which are already in the cart", () => {
    const ts = ReduxStoreForPropertySearch;
    ts.propertycart.cartItems.push({
      img: "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
      images: [
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/DSC00137-ch_simple2-e1511971588521.jpg",
      ],
      propertyCode: "DEMO_JEEVAN",
      lcn: false,
      supplier: "ntp",
      channel: "NEMO_CH_04",
      hotelName: "AJSG Hotel",
      remainingCapital: null,
      city: "Vienna",
      country: "Austria",
      rating: "",
      description:
        "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
      descriptions: [
        {
          text: "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
          lang: "EN",
        },
      ],
      trustyou: "",
      isParent: true,
      key: "DEMO_JEEVAN-0true",
    });
    const store = createStore(() => ({ ...ts }));
    store.dispatch = jest.fn();
    const { getByText } = render(
      <MemoryRouter initialEntries={["/offers/create-new-offer/:step?"]}>
        <SearchedPropertyList />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(getByText("Added")).toBeInTheDocument();
  });
  test("Show the added Label on the searched property which are already in the cart, clicking on the added label should remove the property from Cart", () => {
    const ts = ReduxStoreForPropertySearch;
    ts.propertycart.cartItems.push({
      img: "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
      images: [
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/DSC00137-ch_simple2-e1511971588521.jpg",
      ],
      propertyCode: "DEMO_JEEVAN",
      lcn: false,
      supplier: "ntp",
      channel: "NEMO_CH_04",
      hotelName: "AJSG Hotel",
      remainingCapital: null,
      city: "Vienna",
      country: "Austria",
      rating: "",
      description:
        "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
      descriptions: [
        {
          text: "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
          lang: "EN",
        },
      ],
      trustyou: "",
      isParent: true,
      key: "DEMO_JEEVAN-0true",
    });
    const store = createStore(() => ({ ...ts }));
    store.dispatch = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/offers/create-new-offer/:step?"]}>
        <SearchedPropertyList />
      </MemoryRouter>,
      {
        store,
      }
    );
    const addBtn = getByTestId("add-to-offer-btn");
    fireEvent.click(addBtn);
    expect(store.dispatch).toHaveBeenCalledTimes(3);
  });
  test("check duplicate expanded row is available or not", () => {
    const store = createStore(() => ({ ...ReduxStoreForPropertySearch }));
    const { getByText, getAllByText } = render(
      <MemoryRouter initialEntries={["/offers/create-new-offer/:step?"]}>
        <SearchedPropertyList />
      </MemoryRouter>,
      {
        store,
      }
    );
    const showDuplicateBtn = getByText("Show Duplicate Properties");
    expect(showDuplicateBtn).toBeTruthy();
    fireEvent.click(showDuplicateBtn);
    expect(getByText("Hide Duplicates")).toBeTruthy();
    expect(getAllByText("AJSG Hotel")).toBeTruthy();
  });
  test("SearchedPropertyList check if market price api is being called based on redux flag or not and loader is displayed", () => {
    ReduxStoreForPropertySearch.marketprice.marketPriceData = [
      {
        price: 475,
        trustYouId: "6c9991fe-e182-447b-8e87-dc261b3ab3f3",
        provider: "expedia",
      },
    ];
    ReduxStoreForPropertySearch.marketprice.includeMarketPrice = true;
    ReduxStoreForPropertySearch.marketprice.loading = true;
    ReduxStoreForPropertySearch.searchedproperties.properties = [
      {
        propertyCode: "DEMO_JEEVAN",
        mainProperty: {
          info: {
            name: "AJSG Hotel",
            description: "Best hotel",
            city: "Wien",
            countryName: "Austria",
            images: [
              "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
            ],
            trustyou: {
              id: "6c9991fe-e182-447b-8e87-dc261b3ab3f3",
              info: {
                name: "Bishop's Lodge Resort and Spa",
                score: "87",
                ty_id: "6c9991fe-e182-447b-8e87-dc261b3ab3f3",
                score_description: "Excellent",
                sources_count: 17,
                reviews_count: 15,
              },
            },
            award: null,
          },
          highestMargin: 11,
          lowestMargin: 11,
          propertyCode: "DEMO_JEEVAN",
          lcn: false,
          remainingCapital: null,
          supplier: "ntp",
          channel: "NEMO_CH_04",
        },
        alternateProperties: [
          {
            info: {
              name: "AJSG Hotel",
              description:
                "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
              city: "Wien",
              countryName: "Austria",
              images: [
                "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
              ],
              trustyou: null,
              award: null,
            },
            propertyCode: "DEMO_JEEVAN",
            lcn: false,
            remainingCapital: null,
            supplier: "ntp",
            channel: "NEMO_CH_06",
          },
        ],
      },
    ];
    const store = createStore(() => ({ ...ReduxStoreForPropertySearch }));
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/offers/create-new-offer/:step?"]}>
        <SearchedPropertyList />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(
      getByTestId("6c9991fe-e182-447b-8e87-dc261b3ab3f3-market-price-loader")
    ).toBeTruthy();
  });

  test("SearchedPropertyList check if market price api is called and based on redux data, loader is hidden and market price is displayed", () => {
    ReduxStoreForPropertySearch.marketprice.marketPriceData = [
      {
        price: 475,
        trustYouId: "6c9991fe-e182-447b-8e87-dc261b3ab3f3",
        provider: "expedia",
      },
    ];
    ReduxStoreForPropertySearch.marketprice.includeMarketPrice = true;
    ReduxStoreForPropertySearch.marketprice.loading = false;
    ReduxStoreForPropertySearch.searchedproperties.properties = [
      {
        propertyCode: "DEMO_JEEVAN",
        mainProperty: {
          info: {
            name: "AJSG Hotel",
            description: "Best hotel",
            city: "Wien",
            countryName: "Austria",
            images: [
              "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
            ],
            trustyou: {
              id: "6c9991fe-e182-447b-8e87-dc261b3ab3f3",
              info: {
                name: "Bishop's Lodge Resort and Spa",
                score: "87",
                ty_id: "6c9991fe-e182-447b-8e87-dc261b3ab3f3",
                score_description: "Excellent",
                sources_count: 17,
                reviews_count: 15,
              },
            },
            award: null,
          },
          highestMargin: 11,
          lowestMargin: 11,
          propertyCode: "DEMO_JEEVAN",
          lcn: false,
          remainingCapital: null,
          supplier: "ntp",
          channel: "NEMO_CH_04",
        },
        alternateProperties: [
          {
            info: {
              name: "AJSG Hotel",
              description:
                "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
              city: "Wien",
              countryName: "Austria",
              images: [
                "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
              ],
              trustyou: null,
              award: null,
            },
            propertyCode: "DEMO_JEEVAN",
            lcn: false,
            remainingCapital: null,
            supplier: "ntp",
            channel: "NEMO_CH_06",
          },
        ],
      },
    ];
    const store = createStore(() => ({ ...ReduxStoreForPropertySearch }));
    const { queryByTestId, getByTestId } = render(
      <MemoryRouter initialEntries={["/offers/create-new-offer/:step?"]}>
        <SearchedPropertyList />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(
      queryByTestId("6c9991fe-e182-447b-8e87-dc261b3ab3f3-market-price-loader")
    ).not.toBeInTheDocument();
    expect(
      getByTestId("6c9991fe-e182-447b-8e87-dc261b3ab3f3-market-price-value")
    ).toBeInTheDocument();
  });
});
