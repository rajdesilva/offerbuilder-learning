import {
  browseSupplyActions,
  supplySearchActions,
} from "../../../pages/browseSupply/actions";
import { store } from "../../../redux/store";
import { getSearchParamsToFetchMarketPrice } from "../getSearchParamsToFetchMarketPrice";
import { getValue } from "../getValue";

describe("getSearchParamsToFetchMarketPrice function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  test("getSearchParamsToFetchMarketPrice when trust you ids present in properties", () => {
    store.dispatch({
      type: supplySearchActions.SUPPLY_SEARCH_UPDATE_REDUX_STATE,
      payload: {
        destination: { lat: "", lng: "", city: "" },
        distance: "",
        los: 1,
        hotelName: "",
        onlySupplier: false,
        target: { suppliers: [], channels: [] },
        brands: [],
        pageSize: 10,
        pageOffset: 0,
        dateRange: { startDate: "2021-02-12", endDate: "2021-04-13" },
        currencyCode: "EUR",
        lcn: "",
        remainingCapitalPool: "",
      },
    });
    store.dispatch({
      type: browseSupplyActions.BROWSE_SUPPLY_SEARCH_SUCCESS,
      payload: [
        {
          mainProperty: {
            info: {
              name: "AJSG Hotel ",
              description:
                "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
              descriptions: [
                {
                  text: "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
                  lang: "EN",
                },
                { text: "Duch lang ggjjgjgjgjgj", lang: "DE" },
              ],
              languages: ["DE", "EN"],
              images: [
                "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
              ],
              city: "Vienna",
              countryName: "Austria",
              latitude: 48.210033,
              longitude: 16.363449,
              trustyou: {
                id: "6c9991fe-e182-447b-8e87-dc261b3ab3f3",
              },
              award: null,
            },
            propertyCode: "DEMO_TEMP",
            lcn: false,
            remainingCapital: null,
            supplier: "ntp",
            channel: "DEMO_OFFERBUILDER",
            b2bPrice: 128.57,
            b2cPrice: 142.86,
            lowestMargin: 11,
            highestMargin: 11,
            arrivalDate: "2021-04-12",
          },
        },
        {
          mainProperty: {
            info: {
              name: "TEMP Hotel ",
              description:
                "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
              descriptions: [
                {
                  text: "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
                  lang: "EN",
                },
                { text: "Duch lang ggjjgjgjgjgj", lang: "DE" },
              ],
              languages: ["DE", "EN"],
              images: [
                "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
              ],
              city: "Vienna",
              countryName: "Austria",
              latitude: 48.210033,
              longitude: 16.363449,
              trustyou: {
                id: "12345678-e182-447b-8e87-dc261b3ab3f3",
              },
              award: null,
            },
            propertyCode: "DEMO_TEMP",
            lcn: false,
            remainingCapital: null,
            supplier: "ntp",
            channel: "DEMO_OFFERBUILDER",
            b2bPrice: 128.57,
            b2cPrice: 142.86,
            lowestMargin: 11,
            highestMargin: 11,
            arrivalDate: "2021-04-12",
          },
        },
      ],
      totalMatch: 2,
    });
    expect(getSearchParamsToFetchMarketPrice()).toBe(
      "?los=1&startDate=2021-02-12&endDate=2021-04-13&trustYouIdList=6c9991fe-e182-447b-8e87-dc261b3ab3f3&trustYouIdList=12345678-e182-447b-8e87-dc261b3ab3f3"
    );
  });

  test("getSearchParamsToFetchMarketPrice when trust you ids are not present in properties", () => {
    store.dispatch({
      type: supplySearchActions.SUPPLY_SEARCH_UPDATE_REDUX_STATE,
      payload: {
        destination: { lat: "", lng: "", city: "" },
        distance: "",
        los: 1,
        hotelName: "",
        onlySupplier: false,
        target: { suppliers: [], channels: [] },
        brands: [],
        pageSize: 10,
        pageOffset: 0,
        dateRange: { startDate: "2021-02-12", endDate: "2021-04-13" },
        currencyCode: "EUR",
        lcn: "",
        remainingCapitalPool: "",
      },
    });
    store.dispatch({
      type: browseSupplyActions.BROWSE_SUPPLY_SEARCH_SUCCESS,
      payload: [
        {
          mainProperty: {
            info: {
              name: "AJSG Hotel ",
              description:
                "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
              descriptions: [
                {
                  text: "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
                  lang: "EN",
                },
                { text: "Duch lang ggjjgjgjgjgj", lang: "DE" },
              ],
              languages: ["DE", "EN"],
              images: [
                "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
              ],
              city: "Vienna",
              countryName: "Austria",
              latitude: 48.210033,
              longitude: 16.363449,
              trustyou: null,
              award: null,
            },
            propertyCode: "DEMO_TEMP",
            lcn: false,
            remainingCapital: null,
            supplier: "ntp",
            channel: "DEMO_OFFERBUILDER",
            b2bPrice: 128.57,
            b2cPrice: 142.86,
            lowestMargin: 11,
            highestMargin: 11,
            arrivalDate: "2021-04-12",
          },
        },
        {
          mainProperty: {
            info: {
              name: "TEMP Hotel ",
              description:
                "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
              descriptions: [
                {
                  text: "Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
                  lang: "EN",
                },
                { text: "Duch lang ggjjgjgjgjgj", lang: "DE" },
              ],
              languages: ["DE", "EN"],
              images: [
                "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
              ],
              city: "Vienna",
              countryName: "Austria",
              latitude: 48.210033,
              longitude: 16.363449,
              trustyou: null,
              award: null,
            },
            propertyCode: "DEMO_TEMP",
            lcn: false,
            remainingCapital: null,
            supplier: "ntp",
            channel: "DEMO_OFFERBUILDER",
            b2bPrice: 128.57,
            b2cPrice: 142.86,
            lowestMargin: 11,
            highestMargin: 11,
            arrivalDate: "2021-04-12",
          },
        },
      ],
      totalMatch: 2,
    });
    expect(getSearchParamsToFetchMarketPrice()).toBe(
      "?los=1&startDate=2021-02-12&endDate=2021-04-13"
    );
  });

  test("getSearchParamsToFetchMarketPrice when properties are empty", () => {
    store.dispatch({
      type: supplySearchActions.SUPPLY_SEARCH_UPDATE_REDUX_STATE,
      payload: {
        destination: { lat: "", lng: "", city: "" },
        distance: "",
        los: 1,
        hotelName: "",
        onlySupplier: false,
        target: { suppliers: [], channels: [] },
        brands: [],
        pageSize: 10,
        pageOffset: 0,
        dateRange: { startDate: "2021-02-12", endDate: "2021-04-13" },
        currencyCode: "EUR",
        lcn: "",
        remainingCapitalPool: "",
      },
    });
    store.dispatch({
      type: browseSupplyActions.BROWSE_SUPPLY_SEARCH_SUCCESS,
      payload: [],
      totalMatch: 0,
    });
    expect(getSearchParamsToFetchMarketPrice()).toBe(
      "?los=1&startDate=2021-02-12&endDate=2021-04-13"
    );
  });

  test("getSearchParamsToFetchMarketPrice when no data is set for properties and search params default values", () => {
    expect(getSearchParamsToFetchMarketPrice()).toBe(
      "?los=1&startDate=2021-02-12&endDate=2021-04-13"
    );
  });
});
