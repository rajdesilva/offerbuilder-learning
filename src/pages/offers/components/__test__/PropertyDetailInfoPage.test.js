import React from "react";
import { createStore } from "redux";
import { render, fireEvent } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import { tempStore } from "./tempStore";
import PropertyDetailInfoPage from "../PropertyDetailInfoPage";

const localStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "sessionStorage", {
  value: localStorageMock,
});

describe("PropertyDetailInfoPage component test", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    jest.restoreAllMocks();
  });
  test("PropertyDetailInfoPage should get property info from session storage and get a snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    window.sessionStorage.setItem(
      "property-info",
      JSON.stringify({
        img: "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_PKM_002/Screenshot_2020-03-06_at_5-17-37_PM.png",
        images: [
          "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_PKM_002/Screenshot_2020-03-06_at_5-17-37_PM.png",
        ],
        propertyCode: "DEMO_PKM_002",
        lcn: true,
        supplier: "ntp",
        channel: "KOGNITIV_QA",
        hotelName: "Hotel Paradise PKM",
        remainingCapital: null,
        city: "Vienna",
        arrivalDate: "28.04.21",
        latitude: 48.19912,
        longitude: 16.349869,
        highestMargin: 0,
        lowestMargin: 0,
        b2bPrice: 142.86,
        b2cPrice: 142.86,
        margin: "",
        country: "Austria",
        rating: 5,
        description: "Featuring an open-air swimming pool, a fitness center",
        descriptions: [],
        trustyou: {
          id: "dc07b3c3-47d9-45a2-84be-369a864671d2",
          info: {
            name: "Rodeway Inn",
            reviews_count: 442,
            score: "66",
            score_description: "Poor",
            sources_count: 18,
            ty_id: "dc07b3c3-47d9-45a2-84be-369a864671d2",
          },
        },
        isParent: true,
        key: "DEMO_PKM_002-0true",
        alternativeProperties: null,
      })
    );
    const { container } = render(
      <MemoryRouter initialEntries={["/property/DEMO_PKM_002"]}>
        <PropertyDetailInfoPage />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(container).toMatchSnapshot();
  });

  test("PropertyDetailInfoPage - check if trust you, rating and review present for given property", () => {
    const store = createStore(() => ({ ...tempStore }));
    window.sessionStorage.setItem(
      "property-info",
      JSON.stringify({
        img: "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_PKM_002/Screenshot_2020-03-06_at_5-17-37_PM.png",
        images: [
          "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_PKM_002/Screenshot_2020-03-06_at_5-17-37_PM.png",
        ],
        propertyCode: "DEMO_PKM_002",
        lcn: true,
        supplier: "ntp",
        channel: "KOGNITIV_QA",
        hotelName: "Hotel Paradise PKM",
        remainingCapital: null,
        city: "Vienna",
        arrivalDate: "28.04.21",
        latitude: 48.19912,
        longitude: 16.349869,
        highestMargin: 0,
        lowestMargin: 0,
        b2bPrice: 142.86,
        b2cPrice: 142.86,
        margin: "",
        country: "Austria",
        rating: 5,
        description: "Featuring an open-air swimming pool, a fitness center",
        descriptions: [],
        trustyou: {
          id: "dc07b3c3-47d9-45a2-84be-369a864671d2",
          info: {
            name: "Rodeway Inn",
            reviews_count: 442,
            score: "66",
            score_description: "Poor",
            sources_count: 18,
            ty_id: "dc07b3c3-47d9-45a2-84be-369a864671d2",
          },
        },
        isParent: true,
        key: "DEMO_PKM_002-0true",
        alternativeProperties: null,
      })
    );
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/property/DEMO_PKM_002"]}>
        <PropertyDetailInfoPage />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(getByTestId("property-details-lcn")).toBeTruthy();
    expect(getByTestId("property-details-trust-you")).toBeTruthy();
    expect(getByTestId("property-trust-you-review")).toBeTruthy();
  });

  test("PropertyDetailInfoPage - check if images, trust you, ratings are not so empty image is shown and other fields are hidden for given property", () => {
    const store = createStore(() => ({ ...tempStore }));
    window.sessionStorage.setItem(
      "property-info",
      JSON.stringify({
        img: "",
        images: [],
        propertyCode: "DEMO_PKM_002",
        lcn: false,
        supplier: "ntp",
        channel: "KOGNITIV_QA",
        hotelName: "Hotel Paradise PKM",
        remainingCapital: null,
        city: "Vienna",
        arrivalDate: "28.04.21",
        latitude: 48.19912,
        longitude: 16.349869,
        highestMargin: 0,
        lowestMargin: 0,
        b2bPrice: 142.86,
        b2cPrice: 142.86,
        margin: "",
        country: "Austria",
        // rating: 5,
        description: "Featuring an open-air swimming pool, a fitness center",
        descriptions: [],
        trustyou: null,
        isParent: true,
        key: "DEMO_PKM_002-0true",
        alternativeProperties: null,
      })
    );
    const { getByTestId, queryByTestId } = render(
      <MemoryRouter initialEntries={["/property/DEMO_PKM_002"]}>
        <PropertyDetailInfoPage />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(
      getByTestId("DEMO_PKM_002-property-empty-image")
    ).toBeInTheDocument();
    expect(queryByTestId("property-details-lcn")).not.toBeInTheDocument();
    expect(queryByTestId("property-details-trust-you")).not.toBeInTheDocument();
    expect(queryByTestId("property-trust-you-review")).not.toBeInTheDocument();
  });

  test("PropertyDetailInfoPage - check if only one image is present other are hidden", () => {
    const store = createStore(() => ({ ...tempStore }));
    window.sessionStorage.setItem(
      "property-info",
      JSON.stringify({
        img: "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_PKM_002/Screenshot_2020-03-06_at_5-17-37_PM.png",
        images: [
          "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_PKM_002/Screenshot_2020-03-06_at_5-17-37_PM.png",
        ],
        propertyCode: "DEMO_PKM_002",
        lcn: true,
        supplier: "ntp",
        channel: "KOGNITIV_QA",
        hotelName: "Hotel Paradise PKM",
        remainingCapital: null,
        city: "Vienna",
        arrivalDate: "28.04.21",
        latitude: 48.19912,
        longitude: 16.349869,
        highestMargin: 0,
        lowestMargin: 0,
        b2bPrice: 142.86,
        b2cPrice: 142.86,
        margin: "",
        country: "Austria",
        rating: 5,
        description: "Featuring an open-air swimming pool, a fitness center",
        descriptions: [],
        trustyou: {
          id: "dc07b3c3-47d9-45a2-84be-369a864671d2",
          info: {
            name: "Rodeway Inn",
            reviews_count: 442,
            score: "66",
            score_description: "Poor",
            sources_count: 18,
            ty_id: "dc07b3c3-47d9-45a2-84be-369a864671d2",
          },
        },
        isParent: true,
        key: "DEMO_PKM_002-0true",
        alternativeProperties: null,
      })
    );
    const { queryByTestId } = render(
      <MemoryRouter initialEntries={["/property/DEMO_PKM_002"]}>
        <PropertyDetailInfoPage />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(queryByTestId("property-img-show-more-btn")).not.toBeInTheDocument();
    expect(queryByTestId("property-image-5")).not.toBeInTheDocument();
    expect(queryByTestId("property-image-4")).not.toBeInTheDocument();
    expect(queryByTestId("property-image-3")).not.toBeInTheDocument();
    expect(queryByTestId("property-image-2")).not.toBeInTheDocument();
    expect(queryByTestId("property-image-1")).not.toBeInTheDocument();
  });

  test("PropertyDetailInfoPage - check if back btn is clicked and page hidden", () => {
    const setItemSpy = jest.spyOn(window.sessionStorage, "setItem");
    const store = createStore(() => ({ ...tempStore }));
    window.sessionStorage.setItem(
      "property-info",
      JSON.stringify({
        img: "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_PKM_002/Screenshot_2020-03-06_at_5-17-37_PM.png",
        images: [
          "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_PKM_002/Screenshot_2020-03-06_at_5-17-37_PM.png",
        ],
        propertyCode: "DEMO_PKM_002",
        lcn: true,
        supplier: "ntp",
        channel: "KOGNITIV_QA",
        hotelName: "Hotel Paradise PKM",
        remainingCapital: null,
        city: "Vienna",
        arrivalDate: "28.04.21",
        latitude: 48.19912,
        longitude: 16.349869,
        highestMargin: 0,
        lowestMargin: 0,
        b2bPrice: 142.86,
        b2cPrice: 142.86,
        margin: "",
        country: "Austria",
        rating: 5,
        description: "Featuring an open-air swimming pool, a fitness center",
        descriptions: [],
        trustyou: {
          id: "dc07b3c3-47d9-45a2-84be-369a864671d2",
          info: {
            name: "Rodeway Inn",
            reviews_count: 442,
            score: "66",
            score_description: "Poor",
            sources_count: 18,
            ty_id: "dc07b3c3-47d9-45a2-84be-369a864671d2",
          },
        },
        isParent: true,
        key: "DEMO_PKM_002-0true",
        alternativeProperties: null,
      })
    );
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/property/DEMO_PKM_002"]}>
        <PropertyDetailInfoPage />
      </MemoryRouter>,
      {
        store,
      }
    );
    const backBtn = getByTestId("property-info-back-btn");
    fireEvent.click(backBtn);
    expect(setItemSpy).toHaveBeenCalledTimes(1);
  });
});
