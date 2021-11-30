import React from "react";
import { createStore } from "redux";
import { render, fireEvent, act } from "../../../../helpers/testUtils";
import * as Util from "../../../../helpers/utility/checkIfNewPropertiesAdded";
import * as TrustYou from "../../../../helpers/utility/getTrustYouIdListFromProperties";
import * as service from "./../../service";

import { MemoryRouter } from "react-router-dom";
import { SearchResultContainer } from "../SearchResultContainer";
import { ReduxStoreForPropertySearch } from "./ReduxStoreForPropertySearch";
import { cloneDeep } from "lodash";

jest.mock("./../../service");

describe("SearchResultContainer component test", () => {
  test("SearchResultContainer components snapshot", () => {
    const store = createStore(() => ({ ...ReduxStoreForPropertySearch }));
    const props = {
      isEditFlow: false,
      finishAddPropertiesFlow: jest.fn(),
      prev: jest.fn(),
    };
    const wrapper = render(
      <MemoryRouter initialEntries={["/offers/create-new-offer/:step?"]}>
        <SearchResultContainer props={props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot();
  });

  test("SearchResultContainer check if edit flow is false,  is available or not", () => {
    const store = createStore(() => ({ ...ReduxStoreForPropertySearch }));
    const props = {
      isEditFlow: false,
      finishAddPropertiesFlow: jest.fn(),
      prev: jest.fn(),
    };
    const { queryByTestId } = render(
      <MemoryRouter initialEntries={["/offers/create-new-offer/:step?"]}>
        <SearchResultContainer {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(queryByTestId("discard-changes-btn")).not.toBeInTheDocument();
    expect(queryByTestId("save-changes-btn")).not.toBeInTheDocument();
    expect(queryByTestId("property-list-modal")).not.toBeInTheDocument();
  });

  test("SearchResultContainer check if edit flow is true and btns to save, discard are present", () => {
    const store = createStore(() => ({ ...ReduxStoreForPropertySearch }));
    const props = {
      isEditFlow: true,
      finishAddPropertiesFlow: jest.fn(),
      prev: jest.fn(),
    };
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/offers/edit/123"]}>
        <SearchResultContainer {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(getByTestId("discard-changes-btn")).toBeInTheDocument();
    expect(getByTestId("save-changes-btn")).toBeInTheDocument();
    expect(getByTestId("property-list-modal")).toBeInTheDocument();
  });

  test("SearchResultContainer check loaded data with searched properties", () => {
    const store = createStore(() => ({ ...ReduxStoreForPropertySearch }));
    const props = {
      isEditFlow: false,
      finishAddPropertiesFlow: jest.fn(),
      prev: jest.fn(),
    };
    const { getByTestId, getByText } = render(
      <MemoryRouter initialEntries={["/offers/create-new-offer/:step?"]}>
        <SearchResultContainer {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const image = getByTestId("image");
    expect(getByText(/AJSG Hotel/i)).toBeInTheDocument(); //hotel name
    expect(getByText(/Best hotel/i)).toBeInTheDocument(); // description
    expect(image).toHaveAttribute(
      "src",
      "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg"
    );
  });
  test("SearchResultContainer check of discard btn is clicked and dispatch is called", () => {
    const store = createStore(() => ({ ...ReduxStoreForPropertySearch }));
    store.dispatch = jest.fn();
    const props = {
      isEditFlow: true,
      finishAddPropertiesFlow: jest.fn(),
      prev: jest.fn(),
    };
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/offers/edit/123"]}>
        <SearchResultContainer {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const discardBtn = getByTestId("discard-changes-btn");
    fireEvent.click(discardBtn);
    expect(discardBtn).toBeTruthy();
    expect(store.dispatch).toHaveBeenCalledTimes(3);
  });

  test("SearchResultContainer if Save btn is clicked and dispatch is called", () => {
    const store = createStore(() => ({ ...ReduxStoreForPropertySearch }));
    store.dispatch = jest.fn();
    const checkIfNewPropertiesAdded = jest.spyOn(
      Util,
      "checkIfNewPropertiesAdded"
    );

    checkIfNewPropertiesAdded.mockReturnValue(true); // if new property added
    const props = {
      isEditFlow: true,
      finishAddPropertiesFlow: jest.fn(),
      prev: jest.fn(),
    };
    const { getByTestId, getByText } = render(
      <MemoryRouter initialEntries={["/offers/edit/123"]}>
        <SearchResultContainer {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const savebtn = getByTestId("save-changes-btn");
    fireEvent.click(savebtn);
    expect(savebtn).toBeTruthy();
    expect(props.finishAddPropertiesFlow).toHaveBeenCalledTimes(1);
    expect(getByText(/Save/i)).toBeInTheDocument();
  });

  test("SearchResultContainer check if include properties flag is false and dispatch is called when the btn is clicked", () => {
    ReduxStoreForPropertySearch.marketprice.marketPriceData = [
      {
        price: 475,
        trustYouId: "6c9991fe-e182-447b-8e87-dc261b3ab3f3",
        provider: "expedia",
      },
    ];
    ReduxStoreForPropertySearch.marketprice.includeMarketPrice = false;
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
          {
            info: {
              name: "AJSG Hotel",
              description:
                "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
              city: "Wien",
              countryName: "Austria",
              image: {
                url: "https://res.cloudinary.com/seekda-dev/image/upload/w_375,h_210,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
                description: null,
                title: null,
                width: 375,
                height: 210,
                category: "Other",
                size: "XSmall",
                globalPosition: 0,
                categoryCode: null,
              },
              trustyou: null,
              award: null,
            },
            propertyCode: "DEMO_JEEVAN",
            lcn: false,
            remainingCapital: null,
            supplier: "ntp",
            channel: "NEMO_CH_05",
          },
          {
            info: {
              name: "AJSG Hotel",
              description:
                "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
              city: "Wien",
              countryName: "Austria",
              image: {
                url: "https://res.cloudinary.com/seekda-dev/image/upload/w_375,h_210,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
                description: null,
                title: null,
                width: 375,
                height: 210,
                category: "Other",
                size: "XSmall",
                globalPosition: 0,
                categoryCode: null,
              },
              trustyou: null,
              award: null,
            },
            propertyCode: "DEMO_JEEVAN",
            lcn: false,
            remainingCapital: null,
            supplier: "ntp",
            channel: "NEMO_CH_03",
          },
          {
            info: {
              name: "AJSG Hotel",
              description:
                "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
              city: "Wien",
              countryName: "Austria",
              image: {
                url: "https://res.cloudinary.com/seekda-dev/image/upload/w_375,h_210,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
                description: null,
                title: null,
                width: 375,
                height: 210,
                category: "Other",
                size: "XSmall",
                globalPosition: 0,
                categoryCode: null,
              },
              trustyou: null,
              award: null,
            },
            propertyCode: "DEMO_JEEVAN",
            lcn: false,
            remainingCapital: null,
            supplier: "ntp",
            channel: "NEMO_CH_01",
          },
          {
            info: {
              name: "AJSG Hotel",
              description:
                "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
              city: "Wien",
              countryName: "Austria",
              image: {
                url: "https://res.cloudinary.com/seekda-dev/image/upload/w_375,h_210,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
                description: null,
                title: null,
                width: 375,
                height: 210,
                category: "Other",
                size: "XSmall",
                globalPosition: 0,
                categoryCode: null,
              },
              trustyou: null,
              award: null,
            },
            propertyCode: "DEMO_JEEVAN",
            lcn: false,
            remainingCapital: null,
            supplier: "ntp",
            channel: "NEMO_CH_02",
          },
        ],
      },
    ];
    const props = {
      isEditFlow: false,
      finishAddPropertiesFlow: jest.fn(),
      prev: jest.fn(),
    };
    const store = createStore(() => ({ ...ReduxStoreForPropertySearch }));
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/offers/create-new-offer/:step?"]}>
        <SearchResultContainer {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const includeMarketPriceBtn = getByTestId("include-market-price-btn");
    expect(includeMarketPriceBtn).toBeTruthy();
  });

  test("SearchResultContainer check if include properties flag is false and api is not called as trust you ids are not present for displayed for properties", async () => {
    ReduxStoreForPropertySearch.marketprice.marketPriceData = [
      {
        price: 475,
        trustYouId: "6c9991fe-e182-447b-8e87-dc261b3ab3f3",
        provider: "expedia",
      },
    ];
    ReduxStoreForPropertySearch.marketprice.includeMarketPrice = false;
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
            trustyou: null,
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
    const props = {
      isEditFlow: false,
      finishAddPropertiesFlow: jest.fn(),
      prev: jest.fn(),
    };
    const store = createStore(() => ({ ...ReduxStoreForPropertySearch }));

    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/offers/create-new-offer/:step?"]}>
        <SearchResultContainer {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );

    const includeMarketPriceBtn = getByTestId("include-market-price-btn");
    expect(includeMarketPriceBtn).toBeTruthy();
    const getMarketPricesForListOfProperties = jest.spyOn(
      service,
      "getMarketPricesForListOfProperties"
    );
    await act(async () => {
      await fireEvent.click(includeMarketPriceBtn);
      expect(getMarketPricesForListOfProperties).not.toHaveBeenCalled();
    });
  });

  test("SearchResultContainer check if include properties flag is false and api to fetch market price is called when the btn is clicked", async () => {
    const tempStore = cloneDeep(ReduxStoreForPropertySearch);
    tempStore.marketprice.marketPriceData = [
      {
        price: 475,
        trustYouId: "6c9991fe-e182-447b-8e87-dc261b3ab3f3",
        provider: "expedia",
      },
    ];
    tempStore.marketprice.includeMarketPrice = false;
    tempStore.searchedproperties.properties = [
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
    const props = {
      isEditFlow: false,
      finishAddPropertiesFlow: jest.fn(),
      prev: jest.fn(),
    };

    const store = createStore(() => ({ ...tempStore }));
    const getTrustYouIdListFromProperties = jest.spyOn(
      TrustYou,
      "getTrustYouIdListFromProperties"
    );
    getTrustYouIdListFromProperties.mockReturnValue([
      "6c9991fe-e182-447b-8e87-dc261b3ab3f3",
    ]); // if new property added
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/offers/create-new-offer/:step?"]}>
        <SearchResultContainer {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    // it working now
    service.getMarketPricesForListOfProperties.mockImplementation(() => {
      return Promise.resolve({
        success: true,
        data: [
          {
            price: 475,
            trustYouId: "6c9991fe-e182-447b-8e87-dc261b3ab3f3",
            provider: "expedia",
          },
        ],
        error: null,
      });
    });
    const includeMarketPriceBtn = getByTestId("include-market-price-btn");
    expect(includeMarketPriceBtn).toBeTruthy();
    const getMarketPricesForListOfProperties = jest.spyOn(
      service,
      "getMarketPricesForListOfProperties"
    );
    await act(async () => {
      await fireEvent.click(includeMarketPriceBtn);
      expect(getMarketPricesForListOfProperties).toHaveBeenCalled();
    });
  });
});
