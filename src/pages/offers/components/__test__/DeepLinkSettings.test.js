import React from "react";
import { createStore } from "redux";
import { render, fireEvent, act, waitFor } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import DeepLinkSettings from "../DeepLinkSettings";
import * as Util from "../../../../helpers/utility/checkIfPropertiesHaveMultipleLocations";
import * as service from "./../../service";
import { cloneDeep } from "lodash";
import { tempStore } from "./tempStore";
import { Form } from "antd";
window.google = {
  maps: {
    Marker: class {},
    Map: class {},
    LatLngBounds: class {},
    places: {
      Autocomplete: class {},
      AutocompleteService: class {
        getPlacePredictions() {}
      },
      PlacesServiceStatus: {
        INVALID_REQUEST: "INVALID_REQUEST",
        NOT_FOUND: "NOT_FOUND",
        OK: "OK",
        OVER_QUERY_LIMIT: "OVER_QUERY_LIMIT",
        REQUEST_DENIED: "REQUEST_DENIED",
        UNKNOWN_ERROR: "UNKNOWN_ERROR",
        ZERO_RESULTS: "ZERO_RESULTS",
      },
      PlacesAutocomplete: {
        INVALID_REQUEST: "INVALID_REQUEST",
        NOT_FOUND: "NOT_FOUND",
        OK: "OK",
        OVER_QUERY_LIMIT: "OVER_QUERY_LIMIT",
        REQUEST_DENIED: "REQUEST_DENIED",
        UNKNOWN_ERROR: "UNKNOWN_ERROR",
        ZERO_RESULTS: "ZERO_RESULTS",
      },
    },

    MarkerClusterer: class {},
    Geocoder: class {},
  },
};

jest.mock("./../../service");

describe("DeepLinkSettings component test", () => {
  let ComponentWrapper;
  beforeEach(() => {
    ComponentWrapper = (props, deepStore) => {
      const [form] = Form.useForm();
      return (
        <MemoryRouter initialEntries={["offers/create-new-offer/3"]}>
          <Form form={form} initialValues={deepStore.newoffersettingsparam}>
            <DeepLinkSettings {...{ ...props, form }} />
          </Form>
        </MemoryRouter>
      );
    };
  });
  test("create DeepLinkSettings components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    const props = {
      form: {
        getFieldValue: () => {},
        validateFields: () => {},
        setFieldsValue: () => {},
      },
    };
    const wrapper = render(
      <MemoryRouter>
        <DeepLinkSettings {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot();
  });
  test("DeepLinkSettings destination in redux displayed in form", () => {
    const deepStore = cloneDeep(tempStore);
    deepStore.newoffersettingsparam.deepLinkSettingsInfo = {
      destination: {
        lat: 48.2081743,
        lng: 16.3738189,
      },
      adultOccupancy: 1,
      childOccupancy: 0,
      checkInType: "rolling",
      includeAllProperties: true,
      los: 1,
      rollingOffset: 0,
      fixedDate: null,
    };
   
    const store = createStore(() => ({ ...deepStore }));

    const props = {
      form: {
        getFieldValue: () => {},
        validateFields: () => {},
      },
    };
    const { getByTestId } = render(
      <ComponentWrapper deepStore={deepStore} props={props} />,
      {
        store,
      }
    );
    const city = getByTestId("search-city-input").getAttribute("value");
    expect(city).toBe("");
  });

  test("DeepLinkSettings destination changed and api called to get city from lat and long", async () => {
    const deepStore = cloneDeep(tempStore);
    deepStore.newoffersettingsparam.deepLinkSettingsInfo = {
      destination: {
        lat: 48.2081743,
        lng: 16.3738189,
      },
      adultOccupancy: 1,
      childOccupancy: 0,
      checkInType: "rolling",
      includeAllProperties: true,
      los: 1,
      rollingOffset: 0,
      fixedDate: null,
    };
    const store = createStore(() => ({ ...deepStore }));
    const props = {
      form: {
        getFieldValue: () => {},
        validateFields: () => {},
        setFieldsValue: () => {},
      },
    };

    render(<ComponentWrapper deepStore={deepStore} props={props} />, {
      store,
    });

    // mocking post api when submit button is clicked
    service.getCityFromLatLong.mockImplementation((data) => {
      return Promise.resolve({
        plus_code: {
          compound_code: "GVC4+5M Pune, Maharashtra, India",
        },
      });
    });

    waitFor(() => expect(service.getCityFromLatLong).toHaveBeenCalledTimes(1)); // as lat long are present
  });

  test("DeepLinkSettings destination changed and fetch city name api is not called", async () => {
    const deepStore = cloneDeep(tempStore);
    deepStore.newoffersettingsparam.deepLinkSettingsInfo = {
      destination: {},
      adultOccupancy: 1,
      childOccupancy: 0,
      checkInType: "rolling",
      includeAllProperties: true,
      los: 1,
      rollingOffset: 0,
      fixedDate: null,
    };
    const store = createStore(() => ({ ...deepStore }));
    const props = {
      form: {
        getFieldValue: () => {},
        validateFields: () => {},
        setFieldsValue: () => {},
      },
    };

    const { getByTestId } = render(
      <ComponentWrapper deepStore={deepStore} props={props} />,
      {
        store,
      }
    );

    // mocking post api when submit button is clicked
    service.getCityFromLatLong.mockImplementation((data) => {
      return Promise.resolve({
        plus_code: {
          compound_code: "GVC4+5M Pune, Maharashtra, India",
        },
      });
    });

    const cityInput = getByTestId("search-city-input");
    await act(() => {
      fireEvent.change(cityInput, { target: { value: "Pune" } }); // 3 chars
    });
    expect(cityInput.value).toBe("Pune");
    waitFor(() => expect(service.getCityFromLatLong).toHaveBeenCalledTimes(1)); // as lat long null
  });

  test("DeepLinkSettings destination values are present and include properties flag is true", async () => {
    const deepStore = cloneDeep(tempStore);
    deepStore.newoffersettingsparam.deepLinkSettingsInfo = {
      destination: {
        city: "Vienna, Austria",
        lat: 48.2081743,
        lng: 16.3738189,
      },
      adultOccupancy: 1,
      childOccupancy: 0,
      checkInType: "rolling",
      includeAllProperties: true,
      los: 1,
      rollingOffset: 0,
      fixedDate: null,
    };
    const store = createStore(() => ({ ...deepStore }));
    const props = {
      form: {
        getFieldValue: () => {},
        validateFields: () => {},
        setFieldsValue: () => {},
      },
    };
    const { getByTestId } = render(
      <ComponentWrapper deepStore={deepStore} props={props} />,
      {
        store,
      }
    );
    const cityInput = getByTestId("search-city-input");
    const hotelCheckbox = getByTestId("include-all-properties-settings");
    waitFor(() => {
      expect(cityInput.value).toBe("Vienna, Austria");
      expect(service.getCityFromLatLong).toHaveBeenCalledTimes(1); // as lat long null
      expect(hotelCheckbox.checked).toEqual(true);
      expect(hotelCheckbox).not.toBeDisabled();
    });
  });

  test("DeepLinkSettings destination values are absent and include properties flag is true and disabled", async () => {
    const deepStore = cloneDeep(tempStore);
    deepStore.newoffersettingsparam.deepLinkSettingsInfo = {
      destination: {},
      adultOccupancy: 1,
      childOccupancy: 0,
      checkInType: "rolling",
      includeAllProperties: true,
      los: 1,
      rollingOffset: 0,
      fixedDate: null,
    };
    const store = createStore(() => ({ ...deepStore }));
    const props = {
      form: {
        getFieldValue: () => jest.fn(),
        validateFields: () => jest.fn(),
        setFieldsValue: () => {},
      },
    };
    const { getByTestId } = render(
      <ComponentWrapper deepStore={deepStore} props={props} />,
      {
        store,
      }
    );
    const cityInput = getByTestId("search-city-input");
    expect(cityInput.value).toBe("");
    const hotelCheckbox = getByTestId("include-all-properties-settings");
    expect(hotelCheckbox.checked).toEqual(true);
    expect(hotelCheckbox).toBeDisabled();
  });

  test("DeepLinkSettings properties with different destinations are present, destination in settings present then include properties flag is true and enabled", async () => {
    const deepStore = cloneDeep(tempStore);
    deepStore.propertycart.cartItems = [
      [
        {
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
          highestMargin: 11,
          lowestMargin: 11,
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
        },
        {
          img: "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
          images: [
            "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
            "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/DSC00137-ch_simple2-e1511971588521.jpg",
          ],
          propertyCode: "DEMO_TEST",
          lcn: false,
          supplier: "ntp",
          channel: "NEMO_CH_01",
          hotelName: "DEMO Hotel TEST",
          remainingCapital: null,
          city: "Pune",
          country: "India",
          rating: "",
          highestMargin: 11,
          lowestMargin: 11,
          description:
            "11Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
          descriptions: [
            {
              text: "11Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
              lang: "EN",
            },
          ],
          trustyou: "",
          isParent: true,
          key: "DEMO_TEST-0true",
        },
      ],
    ];
    const store = createStore(() => ({ ...deepStore }));
    const props = {
      form: {
        getFieldValue: () => jest.fn(),
        validateFields: () => jest.fn(),
        setFieldsValue: () => {},
      },
    };
    const { getByTestId } = render(
      <ComponentWrapper deepStore={deepStore} props={props} />,
      {
        store,
      }
    );
    const hotelCheckbox = getByTestId("include-all-properties-settings");
    expect(hotelCheckbox.checked).toEqual(true);
    expect(hotelCheckbox).not.toBeDisabled();
    const cityInput = getByTestId("search-city-input");
    expect(cityInput).not.toBeDisabled();
  });

  test("DeepLinkSettings properties with same destinations are present then include properties flag is true and disabled", async () => {
    const deepStore = cloneDeep(tempStore);
    deepStore.propertycart.cartItems = [
      [
        {
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
          highestMargin: 11,
          lowestMargin: 11,
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
        },
        {
          img: "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
          images: [
            "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
            "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/DSC00137-ch_simple2-e1511971588521.jpg",
          ],
          propertyCode: "DEMO_TEST",
          lcn: false,
          supplier: "ntp",
          channel: "NEMO_CH_01",
          hotelName: "DEMO Hotel TEST",
          remainingCapital: null,
          city: "Pune",
          country: "India",
          rating: "",
          highestMargin: 11,
          lowestMargin: 11,
          description:
            "11Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
          descriptions: [
            {
              text: "11Our luxurious Apartment hotel in country style is situated directly in the untouched nature of a side valley of the Vinschgau. At our house you can relax 24 hours a day: Start your day with a hearty breakfast and afterwards enjoy the beautiful nature and the various sport activities we have to offer. Relax in our alpine sauna world or our Panorama swimming pool. In the evening you can choose between three different restaurants in which we serve regional and international specialties.",
              lang: "EN",
            },
          ],
          trustyou: "",
          isParent: true,
          key: "DEMO_TEST-0true",
        },
      ],
    ];
    deepStore.newoffersettingsparam.deepLinkSettingsInfo.destination = {};
    const store = createStore(() => ({ ...deepStore }));
    const props = {
      form: {
        getFieldValue: () => jest.fn(),
        validateFields: () => jest.fn(),
        setFieldsValue: () => {},
      },
    };

    const { getByTestId } = render(
      <ComponentWrapper deepStore={deepStore} props={props} />,
      {
        store,
      }
    );
    const cityInput = getByTestId("search-city-input");
    waitFor(() => expect(cityInput).toBeDisabled());
    const hotelCheckbox = getByTestId("include-all-properties-settings");
    expect(hotelCheckbox.checked).toEqual(true);
    waitFor(() => expect(hotelCheckbox).toBeDisabled());
  });

  test("DeepLinkSettings in edit flow, check if rolling is set based on redux value and no of days visible", async () => {
    const deepStore = cloneDeep(tempStore);
    deepStore.newoffersettingsparam.deepLinkSettingsInfo = {
      destination: {},
      adultOccupancy: 1,
      childOccupancy: 0,
      checkInType: "rolling",
      includeAllProperties: true,
      los: 5,
      rollingOffset: 5,
      fixedDate: null,
    };
    const store = createStore(() => ({ ...deepStore }));
    const props1 = {
      //in future if need any props pass it through this variable.
    };
    const FormWrapper = (props) => {
      const [form] = Form.useForm();
      return (
        <MemoryRouter initialEntries={["/offers/edit/123"]}>
          <Form form={form} initialValues={deepStore.newoffersettingsparam}>
            <DeepLinkSettings {...{ ...props, form }} />
          </Form>
        </MemoryRouter>
      );
    };

    const { getByTestId, queryByTestId } = render(<FormWrapper {...props1} />, {
      store,
    });

    const rollingBtn = getByTestId("deep-rolling-radio-btn");
    expect(rollingBtn.value).toBe("rolling");
    expect(getByTestId("deeplink-rolling-days-input")).toBeInTheDocument();
    expect(
      queryByTestId("deeplink-fixed-date-form-item")
    ).not.toBeInTheDocument();
    const days = getByTestId("deeplink-rolling-days-input").getAttribute(
      "value"
    );
    expect(days).toEqual("5");
  });

  test("DeepLinkSettings in edit flow, check if fixed date is set based on redux value and date picker is shown", async () => {
    const deepStore = cloneDeep(tempStore);
    deepStore.newoffersettingsparam.deepLinkSettingsInfo = {
      destination: null,
      adultOccupancy: 1,
      childOccupancy: 0,
      checkInType: "",
      includeAllProperties: true,
      los: 5,
      rollingOffset: 0,
      fixedDate: "2021-02-25",
    };
    const store = createStore(() => ({ ...deepStore }));
    const props1 = {
      //in future if need any props pass it through this variable.
    };
    const FormWrapper = (props) => {
      const [form] = Form.useForm();
      return (
        <MemoryRouter initialEntries={["/offers/edit/123"]}>
          <Form form={form} initialValues={deepStore.newoffersettingsparam}>
            <DeepLinkSettings {...{ ...props, form }} />
          </Form>
        </MemoryRouter>
      );
    };

    const { getByTestId, queryByTestId, getByText } = render(
      <FormWrapper {...props1} />,
      {
        store,
      }
    );

    const fixedBtn = getByTestId("deep-fixed-radio-btn");
    expect(fixedBtn.value).toBe("fixed");
    expect(
      queryByTestId("deeplink-rolling-days-input")
    ).not.toBeInTheDocument();
    expect(getByText("Fixed Date")).toBeInTheDocument();
  });

  test("DeepLinkSettings in create offer flow, check if fixed or rolling is selected, store dispatch is called", async () => {
    const deepStore = cloneDeep(tempStore);
    deepStore.newoffersettingsparam.deepLinkSettingsInfo = {
      destination: null,
      adultOccupancy: 1,
      childOccupancy: 0,
      checkInType: "fixed",
      includeAllProperties: true,
      los: 5,
      rollingOffset: 0,
      fixedDate: "2021-02-25",
    };
    const store = createStore(() => ({ ...deepStore }));
    store.dispatch = jest.fn();
    const props1 = {
      //in future if need any props pass it through this variable.
    };
    const FormWrapper = (props) => {
      const [form] = Form.useForm();
      return (
        <MemoryRouter initialEntries={["offers/create-new-offer/3"]}>
          <Form form={form} initialValues={deepStore.newoffersettingsparam}>
            <DeepLinkSettings {...{ ...props, form }} />
          </Form>
        </MemoryRouter>
      );
    };

    const { getByTestId } = render(<FormWrapper {...props1} />, {
      store,
    });

    const rollingBtn = getByTestId("deep-rolling-radio-btn");
    await act(async () => {
      await fireEvent.click(rollingBtn);
    });
    expect(rollingBtn.value).toBe("rolling");
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  test("DeepLinkSettings in create offer flow, check if cart is empty and destination is mandatory, with hotel flag disabled and unchecked", async () => {
    const deepStore = cloneDeep(tempStore);
    deepStore.propertycart.cartItems = [];
    deepStore.newoffersettingsparam.deepLinkSettingsInfo = {
      destination: null,
      adultOccupancy: 1,
      childOccupancy: 0,
      checkInType: "fixed",
      includeAllProperties: true,
      los: 5,
      rollingOffset: 0,
      fixedDate: "2021-02-25",
    };
    const store = createStore(() => ({ ...deepStore }));
    store.dispatch = jest.fn();
    const props = {
      //in future if need any props pass it through this variable.
    };
    const { getByTestId, getByText } = render(
      <ComponentWrapper deepStore={deepStore} props={props} />,
      {
        store,
      }
    );

    const hotelCheckbox = getByTestId("include-all-properties-settings");
    expect(hotelCheckbox.checked).toEqual(false);
    expect(getByText("*")).toBeInTheDocument();
    expect(getByText("Destination")).toBeInTheDocument();
    expect(hotelCheckbox).toBeDisabled();
  });

  test("DeepLinkSettings in create offer flow, check if cart has properties and destination is optional, with hotel flag enabled and unchecked", async () => {
    const deepStore = cloneDeep(tempStore);
    deepStore.propertycart.cartItems = [
      {
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
        highestMargin: 11,
        lowestMargin: 11,
        latitude: 18.610317,
        longitude: 73.78897,
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
      },
      {
        img: "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
        images: [
          "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
          "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/DSC00137-ch_simple2-e1511971588521.jpg",
        ],
        propertyCode: "DEMO_TEST",
        lcn: false,
        supplier: "ntp",
        channel: "NEMO_CH_06",
        hotelName: "AJSG Hotel",
        remainingCapital: null,
        city: "Vienna",
        country: "Austria",
        rating: "",
        highestMargin: 11,
        lowestMargin: 11,
        latitude: 18.610317,
        longitude: 73.78897,
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
        key: "DEMO_TEST-0true",
      },
    ];
    deepStore.newoffersettingsparam.deepLinkSettingsInfo = {
      destination: {
        city: "Vienna, Austria",
        lat: 18.610317,
        lng: 73.78897,
      },
      adultOccupancy: 1,
      childOccupancy: 0,
      checkInType: "fixed",
      includeAllProperties: false,
      los: 5,
      rollingOffset: 0,
      fixedDate: "2021-02-25",
    };
    const store = createStore(() => ({ ...deepStore }));
    store.dispatch = jest.fn();
    const props = {
      //in future if need any props pass it through this variable.
    };
    const { getByTestId, getByText } = render(
      <ComponentWrapper deepStore={deepStore} props={props} />,
      {
        store,
      }
    );

    const hotelCheckbox = getByTestId("include-all-properties-settings");
    expect(hotelCheckbox.checked).toEqual(false);
    expect(getByText("Destination")).toBeInTheDocument();
    expect(hotelCheckbox).not.toBeDisabled();
  });

  test("DeepLinkSettings in create offer flow, check if cart has no properties and destination is present as per search settings page", async () => {
    const deepStore = cloneDeep(tempStore);
    deepStore.propertycart.cartItems = [];
    deepStore.searchparams.destination = {
      city: "Vienna, Austria",
        lat: 18.610317,
        lng: 73.78897,
    }
    deepStore.newoffersettingsparam.deepLinkSettingsInfo = {
      destination: {
        city: "Vienna, Austria",
        lat: 18.610317,
        lng: 73.78897,
      },
      adultOccupancy: 1,
      childOccupancy: 0,
      checkInType: "fixed",
      includeAllProperties: false,
      los: 5,
      rollingOffset: 0,
      fixedDate: "2021-02-25",
    };
    deepStore.newoffersettingsparam.type = 'DEMO';
    deepStore.newoffersettingsparam.lastSearchDistance = 10;
    const store = createStore(() => ({ ...deepStore }));
    store.dispatch = jest.fn();
    const checkIfPropertiesHaveMultipleLocations = jest.spyOn(Util, "checkIfPropertiesHaveMultipleLocations");
    checkIfPropertiesHaveMultipleLocations.mockReturnValue(false);
    const props = {
      form: {
        getFieldValue: () => jest.fn(),
        validateFields: () => jest.fn(),
        setFieldsValue: () => {},
      },
    };
    const { getByTestId, queryByText } = render(
      <ComponentWrapper deepStore={deepStore} props={props} />,
      {
        store,
      }
    );
    const hotelCheckbox = getByTestId("include-all-properties-settings");
    expect(hotelCheckbox.checked).toEqual(false);
    expect(queryByText(/Destination deeplink data will not be added/i)).not.toBeInTheDocument();
  });
  test("DeepLinkSettings in create offer flow, check if cart has properties and destination entered is different then check for msg displayed for destination", async () => {
    const deepStore = cloneDeep(tempStore);
    deepStore.propertycart.cartItems = [
      {
        img: "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
        images: [
          "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
          "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/DSC00137-ch_simple2-e1511971588521.jpg",
        ],
        type: 'DEMO',
        propertyCode: "DEMO_JEEVAN",
        lcn: false,
        supplier: "ntp",
        channel: "NEMO_CH_06",
        hotelName: "AJSG Hotel",
        remainingCapital: null,
        city: "Vienna",
        country: "Austria",
        rating: "",
        highestMargin: 11,
        lowestMargin: 11,
        latitude: 18.610317,
        longitude: 73.78897,
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
        type: 'DEMO',
        key: "DEMO_JEEVAN-0true",
      },
    ];
    deepStore.searchparams.destination = {
      city: "Vienna, Austria",
        lat: 18.610317,
        lng: 73.78897,
    }
    deepStore.newoffersettingsparam.deepLinkSettingsInfo = {
      destination: {
        city: "Vienna, Austria",
        lat: 18.610317,
        lng: 73.78897,
      },
      adultOccupancy: 1,
      childOccupancy: 0,
      checkInType: "fixed",
      includeAllProperties: true,
      los: 5,
      rollingOffset: 0,
      fixedDate: "2021-02-25",
    };
    deepStore.newoffersettingsparam.type = 'DEMO';
    deepStore.newoffersettingsparam.lastSearchDistance = 10;
    const checkIfPropertiesHaveMultipleLocations = jest.spyOn(Util, "checkIfPropertiesHaveMultipleLocations");
    checkIfPropertiesHaveMultipleLocations.mockReturnValue(true);
    const store = createStore(() => ({ ...deepStore }));
    store.dispatch = jest.fn();
    const props = {
      form: {
        getFieldValue: () => jest.fn(),
        validateFields: () => jest.fn(),
        setFieldsValue: () => {},
      },
    };
    const { getByTestId, getByText } = render(
      <ComponentWrapper deepStore={deepStore} props={props} />,
      {
        store,
      }
    );
    const hotelCheckbox = getByTestId("include-all-properties-settings");
    expect(hotelCheckbox.checked).toEqual(true);
    expect(getByText(/Destination deeplink data will not be added/i)).toBeInTheDocument();
  });
});
