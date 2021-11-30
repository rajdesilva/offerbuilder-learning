import React from "react";
import { createStore } from "redux";
import { render, fireEvent } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import PropertySelectionCarousel from "../PropertySelectionCarousel";

import { tempStore } from "./tempStore";
import { cloneDeep } from "lodash";

window.fetchWrapper = window.fetchWrapper = jest.fn().mockResolvedValue({
  success: true,
});
jest.mock("./../../service");

describe("PropertySelectionCarousel component test", () => {
  test("create PropertySelectionCarousel components snapshot", () => {
    const selectImageStore = cloneDeep(tempStore);
    selectImageStore.newoffermarketinginfo.marketingInfo.images = [
      {
        id: "Screenshot 2021-03-30 at 1-14-53 PM.png",
        uploadedBy: "swapnil.deshmukh@kognitiv.com",
        checksum: "60eef42bf8d3b2a6578f59001af2fcf7",
        url: "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
        createdAt: "2021-03-30T09:45:15.200651",
        updatedAt: "2021-03-30T09:45:15.200651",
        offerDetails: [],
      },
    ];
    const store = createStore(() => ({ ...selectImageStore }));
    store.dispatch = jest.fn();
    const props = {
      updateSelectedImages: jest.fn(),
      hideCarousel: jest.fn(),
      startIndex: 0,
      selectedImages: [
        "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
      ],
      images: [
        "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
      ],
    };
    const { container } = render(
      <MemoryRouter>
        <PropertySelectionCarousel {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(container).toMatchSnapshot();
  });
  test("PropertySelectionCarousel components- click on close btn and dismiss carousel", async () => {
    const selectImageStore = cloneDeep(tempStore);
    selectImageStore.newoffermarketinginfo.marketingInfo.images = [
      {
        id: "Screenshot 2021-03-30 at 1-14-53 PM.png",
        uploadedBy: "swapnil.deshmukh@kognitiv.com",
        checksum: "60eef42bf8d3b2a6578f59001af2fcf7",
        url: "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
        createdAt: "2021-03-30T09:45:15.200651",
        updatedAt: "2021-03-30T09:45:15.200651",
        offerDetails: [],
      },
    ];
    const store = createStore(() => ({ ...selectImageStore }));
    store.dispatch = jest.fn();
    const props = {
      updateSelectedImages: jest.fn(),
      hideCarousel: jest.fn(),
      startIndex: 0,
      selectedImages: [
        "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
      ],
      images: [
        "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
      ],
    };
    const { getByTestId } = render(
      <MemoryRouter>
        <PropertySelectionCarousel {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const cancelBtn = getByTestId("img-carousel-close-btn");
    fireEvent.click(cancelBtn);
    expect(props.hideCarousel).toHaveBeenCalledTimes(1);
  });

  test("PropertySelectionCarousel components- image with checkbox is unchecked if image not exists", async () => {
    const selectImageStore = cloneDeep(tempStore);
    selectImageStore.newoffermarketinginfo.marketingInfo.images = [];
    const store = createStore(() => ({ ...selectImageStore }));
    store.dispatch = jest.fn();
    const props = {
      updateSelectedImages: jest.fn(),
      hideCarousel: jest.fn(),
      startIndex: 0,
      selectedImages: [],
      images: [
        "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
      ],
    };
    const { getByTestId } = render(
      <MemoryRouter>
        <PropertySelectionCarousel {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(getByTestId("0-carousel-image-checkbox-display")).toBeTruthy();
    const imgCheckbox = getByTestId("0-carousel-image-checkbox-display");
    expect(imgCheckbox).toBeTruthy();
    expect(imgCheckbox.value).toBe(
      "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png"
    );
    expect(imgCheckbox.checked).toEqual(false);
  });

  test("PropertySelectionCarousel components- image with checkbox is checked if image already exists", async () => {
    const selectImageStore = cloneDeep(tempStore);
    selectImageStore.newoffermarketinginfo.marketingInfo.images = [];
    const store = createStore(() => ({ ...selectImageStore }));
    store.dispatch = jest.fn();
    const props = {
      updateSelectedImages: jest.fn(),
      hideCarousel: jest.fn(),
      startIndex: 0,
      selectedImages: [
        "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
      ],
      images: [
        "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
      ],
    };
    const { getByTestId } = render(
      <MemoryRouter>
        <PropertySelectionCarousel {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(getByTestId("0-carousel-image-checkbox-display")).toBeTruthy();
    const imgCheckbox = getByTestId("0-carousel-image-checkbox-display");
    expect(imgCheckbox).toBeTruthy();
    expect(imgCheckbox.value).toBe(
      "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png"
    );
    expect(imgCheckbox.checked).toEqual(true);
  });

  test("PropertySelectionCarousel components- if images are empty then carousel is hidden and not displayed unless images is not empty", async () => {
    const selectImageStore = cloneDeep(tempStore);
    selectImageStore.newoffermarketinginfo.marketingInfo.images = [];
    const store = createStore(() => ({ ...selectImageStore }));
    store.dispatch = jest.fn();
    const props = {
      updateSelectedImages: jest.fn(),
      hideCarousel: jest.fn(),
      startIndex: 0,
      selectedImages: [],
      images: [],
    };
    const { queryByTestId } = render(
      <MemoryRouter>
        <PropertySelectionCarousel {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(queryByTestId("0-img-carousel")).not.toBeInTheDocument();
    expect(props.hideCarousel).toHaveBeenCalledTimes(1);
  });
});
