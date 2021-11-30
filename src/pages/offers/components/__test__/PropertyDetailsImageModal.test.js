import React from "react";
import { createStore } from "redux";
import { render, fireEvent } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import PropertyDetailsImageModal from "../PropertyDetailsImageModal";

import { tempStore } from "./tempStore";

describe("PropertyDetailsImageModal component test", () => {
  test("create PropertyDetailsImageModal components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      hideModal: () => jest.fn(),
      images: [
        "https://res.cloudinary.com/seekda-dev/image/upload/v1603359435/offer_builder_dev/gapj1ko3ffeuyhspdmbw.png",
      ],
    };

    const { container } = render(
        <MemoryRouter initialEntries={["/property/DEMO_PKM_002"]}>
        <div id="img-wrapper">
          <PropertyDetailsImageModal {...props} />
        </div>
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("PropertyDetailsImageModal modal shows given images with pagination component", () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      hideModal: jest.fn(),
      images: [
        "https://res.cloudinary.com/seekda-dev/image/upload/v1603359435/offer_builder_dev/gapj1ko3ffeuyhspdmbw.png",
      ],
    };
    
    // Act
    const { getByTestId, getByText } = render(
        <MemoryRouter initialEntries={["/property/DEMO_PKM_002"]}>
        <div id="img-wrapper">
          <PropertyDetailsImageModal {...props} />
        </div>
      </MemoryRouter>,
      {
        store,
      }
    );
    // Assert
    expect(getByTestId("0-https://res.cloudinary.com/seekda-dev/image/upload/v1603359435/offer_builder_dev/gapj1ko3ffeuyhspdmbw.png")).toBeInTheDocument();
    expect(getByText(/Images per page/i)).toBeInTheDocument();
    expect(getByText(/gapj1ko3ffeuyhspdmbw.png/i)).toBeInTheDocument();
});

  test("PropertyDetailsImageModal modal shows, a close button is clicked to hide the modal", () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      hideModal: jest.fn(),
      images: [
        "https://res.cloudinary.com/seekda-dev/image/upload/v1603359435/offer_builder_dev/gapj1ko3ffeuyhspdmbw.png",
      ],
    };
    
    // Act
    const { getByTestId } = render(
        <MemoryRouter initialEntries={["/property/DEMO_PKM_002"]}>
        <div id="img-wrapper">
          <PropertyDetailsImageModal {...props} />
        </div>
      </MemoryRouter>,
      {
        store,
      }
    );
    // Act
    fireEvent.click(getByTestId("gallery-img-close-btn"));

    // Assert
    expect(props.hideModal).toHaveBeenCalledTimes(1);
  });
});
