import React from "react";
import { createStore } from "redux";
import { render, fireEvent, cleanup } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import PropertyImageSelectionModal from "../PropertyImageSelectionModal";

import * as service from "../../service";
import { tempStore } from "./tempStore";

window.fetchWrapper = jest.fn().mockResolvedValue({
  success: true,
});

jest.mock("./../../service");

afterEach(cleanup);

describe("PropertyImageSelectionModal component test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("create PropertyImageSelectionModal components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      defaultSelectedImages: [
        "https://res.cloudinary.com/seekda-dev/image/upload/v1603359435/offer_builder_dev/gapj1ko3ffeuyhspdmbw.png",
      ],
      setImagesForProperty: () => {},
      hideModal: () => {},
      images: [
        "https://res.cloudinary.com/seekda-dev/image/upload/v1603359435/offer_builder_dev/gapj1ko3ffeuyhspdmbw.png",
      ],
      propertyCode: "DEMO_JEEVAN",
    };

    const { container } = render(
      <MemoryRouter initialEntries={["/offers"]}>
        <div id="img-wrapper">
          <PropertyImageSelectionModal {...props} />
        </div>
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("PropertyImageSelectionModal modal shows in offer edit flow, a submit button is clicked to hide the modal and set the state with images selected", () => {
    // Arrange
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      defaultSelectedImages: [
        "https://res.cloudinary.com/seekda-dev/image/upload/v1603359435/offer_builder_dev/gapj1ko3ffeuyhspdmbw.png",
      ],
      setImagesForProperty: jest.fn(),
      hideModal: jest.fn(),
      images: [
        "https://res.cloudinary.com/seekda-dev/image/upload/v1603359435/offer_builder_dev/gapj1ko3ffeuyhspdmbw.png",
      ],
      propertyCode: "DEMO_JEEVAN",
    };

    // Act
    const { getByText } = render(
      <MemoryRouter initialEntries={["/offers/create-new-offer/4"]}>
        <div id="img-wrapper">
          <PropertyImageSelectionModal {...props} />
        </div>
      </MemoryRouter>,
      {
        store,
      }
    );
    // Assert
    expect(getByText("Selecting images for")).toBeTruthy();

    // Act
    fireEvent.click(getByText(/Submit/i));

    // Assert
    expect(props.hideModal).toHaveBeenCalledTimes(1);
    expect(props.setImagesForProperty).toHaveBeenCalledTimes(1);
  });

  test("PropertyImageSelectionModal modal shows in offer edit flow and a cancel button is clicked to hide the modal", () => {
    // Arrange
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      defaultSelectedImages: [
        "https://res.cloudinary.com/seekda-dev/image/upload/v1603359435/offer_builder_dev/gapj1ko3ffeuyhspdmbw.png",
      ],
      setImagesForProperty: jest.fn(),
      hideModal: jest.fn(),
      images: [
        "https://res.cloudinary.com/seekda-dev/image/upload/v1603359435/offer_builder_dev/gapj1ko3ffeuyhspdmbw.png",
      ],
      propertyCode: "DEMO_JEEVAN",
    };
    // mocking get api when dialog is displayed
    service.getImagesFromProperties.mockImplementation((data) => {
      return Promise.resolve({
        success: true,
        data: {
          properties: [
            {
              propertyCode: "DEMO_JEEVAN",
              mainProperty: {
                info: {
                  name: "HOTEL DEMO_JEEVAN",
                  description:
                    "Experience award-winning service and sophisticated style at JW Marriott Hotel Vienna. Ideally situated between the airport and Vienna Expressway, our 5-star hotel is an ideal destination for both business travelers and vacationing families. Luxury rooms and suites showcase deluxe bedding and marble bathrooms, as well as high-speed internet, desks with ergonomic chairs and laptop-sized safes. Many accommodations also provide striking views of the Pune cityscape or the nearby mountain. Delightful dining options within the hotel include Italian fare, a vegetarian restaurant and a chic rooftop bar. Challenge yourself to a workout in the fitness center or a swim in the outdoor pool, followed by a treatment at the tranquil Quan Spa. If you're hosting an event in Pune, you can explore our 40,000 square feWe are always looking forward to children in our hotel. In our 120 sqm large playground your children will be supervised by professional trained staff. In the meantime the parents can just chill in our relax garden or in our sauna. Besides we provide a fitness room, an indoor swimming pool with panorama view and a cosmetic studio. In summer we offer guided excursions in the beautiful mountain world starting directly in front of our house and in winter you can explore the surrounding ski area with our guides.et of versatile, sophisticated venue space, including multiple boardrooms and a ballroom that can accommodate 2,000 people. We look forward to making your visit truly remarkable at JW Marriott Hotel Vienna.",
                  descriptions: [],
                  languages: ["DE", "EN"],
                  images: [
                    "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_RAVI/seafacing.jpg",
                    "https://res.cloudinary.com/seekda-dev/image/upload/v1603359435/offer_builder_dev/gapj1ko3ffeuyhspdmbw.png",
                  ],
                  city: "Wien",
                  countryName: "Austria",
                  trustyou: null,
                  award: { provider: "no-official-recognition", value: 4.0 },
                },
                propertyCode: "DEMO_JEEVAN",
                lcn: false,
                remainingCapital: null,
                supplier: null,
                channel: null,
                b2bPrice: null,
                b2cPrice: null,
                lowestMargin: null,
                highestMargin: null,
                arrivalDate: null,
                margins: [
                  {
                    b2bPrice: null,
                    b2cPrice: null,
                    marginOnPrice: null,
                    checkinDate: null,
                  },
                ],
              },
              alternateProperties: [],
            },
          ],
          pageSize: 100,
          pageOffset: 0,
          totalMatchedProperties: 1,
        },
        error: null,
      });
    });
    // Act
    const { getByText } = render(
      <MemoryRouter initialEntries={["/offers/edit/123"]}>
        <div id="img-wrapper">
          <PropertyImageSelectionModal {...props} />
        </div>
      </MemoryRouter>,
      {
        store,
      }
    );
    // Act
    fireEvent.click(getByText(/Cancel/i));

    // Assert
    expect(props.hideModal).toHaveBeenCalledTimes(1);
    expect(props.setImagesForProperty).toHaveBeenCalledTimes(0);
  });

  test("PropertyImageSelectionModal modal displayed in offer edit flow and  get images api is called only one time", () => {
    // Arrange
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      defaultSelectedImages: [
        "https://res.cloudinary.com/seekda-dev/image/upload/v1603359435/offer_builder_dev/gapj1ko3ffeuyhspdmbw.png",
      ],
      setImagesForProperty: jest.fn(),
      hideModal: jest.fn(),
      images: [
        "https://res.cloudinary.com/seekda-dev/image/upload/v1603359435/offer_builder_dev/gapj1ko3ffeuyhspdmbw.png",
      ],
      propertyCode: "DEMO_JEEVAN",
    };
    // mocking get api when dialog is displayed
    service.getImagesFromProperties.mockImplementation((data) => {
      return Promise.resolve({
        success: true,
        data: {
          properties: [
            {
              propertyCode: "DEMO_JEEVAN",
              mainProperty: {
                info: {
                  name: "HOTEL DEMO_JEEVAN",
                  description:
                    "Experience award-winning service and sophisticated style at JW Marriott Hotel Vienna. Ideally situated between the airport and Vienna Expressway, our 5-star hotel is an ideal destination for both business travelers and vacationing families. Luxury rooms and suites showcase deluxe bedding and marble bathrooms, as well as high-speed internet, desks with ergonomic chairs and laptop-sized safes. Many accommodations also provide striking views of the Pune cityscape or the nearby mountain. Delightful dining options within the hotel include Italian fare, a vegetarian restaurant and a chic rooftop bar. Challenge yourself to a workout in the fitness center or a swim in the outdoor pool, followed by a treatment at the tranquil Quan Spa. If you're hosting an event in Pune, you can explore our 40,000 square feWe are always looking forward to children in our hotel. In our 120 sqm large playground your children will be supervised by professional trained staff. In the meantime the parents can just chill in our relax garden or in our sauna. Besides we provide a fitness room, an indoor swimming pool with panorama view and a cosmetic studio. In summer we offer guided excursions in the beautiful mountain world starting directly in front of our house and in winter you can explore the surrounding ski area with our guides.et of versatile, sophisticated venue space, including multiple boardrooms and a ballroom that can accommodate 2,000 people. We look forward to making your visit truly remarkable at JW Marriott Hotel Vienna.",
                  descriptions: [],
                  languages: ["DE", "EN"],
                  images: [
                    "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_RAVI/seafacing.jpg",
                    "https://res.cloudinary.com/seekda-dev/image/upload/v1603359435/offer_builder_dev/gapj1ko3ffeuyhspdmbw.png",
                  ],
                  city: "Wien",
                  countryName: "Austria",
                  trustyou: null,
                  award: { provider: "no-official-recognition", value: 4.0 },
                },
                propertyCode: "DEMO_JEEVAN",
                lcn: false,
                remainingCapital: null,
                supplier: null,
                channel: null,
                b2bPrice: null,
                b2cPrice: null,
                lowestMargin: null,
                highestMargin: null,
                arrivalDate: null,
                margins: [
                  {
                    b2bPrice: null,
                    b2cPrice: null,
                    marginOnPrice: null,
                    checkinDate: null,
                  },
                ],
              },
              alternateProperties: [],
            },
          ],
          pageSize: 100,
          pageOffset: 0,
          totalMatchedProperties: 1,
        },
        error: null,
      });
    });

    render(
      <MemoryRouter initialEntries={["/offers/edit/123"]}>
        <div id="img-wrapper">
          <PropertyImageSelectionModal {...props} />
        </div>
      </MemoryRouter>,
      {
        store,
      }
    );

    // Assert
    expect(service.getImagesFromProperties).toHaveBeenCalledTimes(1);
  });

  test("PropertyImageSelectionModal modal displayed and get images api is not called in offer creation flow", () => {
    // Arrange
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      defaultSelectedImages: [
        "https://res.cloudinary.com/seekda-dev/image/upload/v1603359435/offer_builder_dev/gapj1ko3ffeuyhspdmbw.png",
      ],
      setImagesForProperty: () => {},
      hideModal: jest.fn(),
      images: [
        "https://res.cloudinary.com/seekda-dev/image/upload/v1603359435/offer_builder_dev/gapj1ko3ffeuyhspdmbw.png",
      ],
      propertyCode: "DEMO_JEEVAN",
    };

    render(
      <MemoryRouter initialEntries={["/offers/create-new-offer/4"]}>
        <div id="img-wrapper">
          <PropertyImageSelectionModal {...props} />
        </div>
      </MemoryRouter>,
      {
        store,
      }
    );

    // Assert
    expect(service.getImagesFromProperties).toHaveBeenCalledTimes(0);
  });
});
