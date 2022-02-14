import React from "react";
import { createStore } from "redux";
import { render, fireEvent } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import OfferImagesCarousel from "../OfferImagesCarousel";

import { tempStore } from "./tempStore";
import { cloneDeep } from "lodash";

window.fetchWrapper = window.fetchWrapper = jest.fn().mockResolvedValue({
  success: true,
});
jest.mock("./../../service");

describe("OfferImagesCarousel component test", () => {
  test("create OfferImagesCarousel components snapshot", () => {
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
      carouselImage: {
        index: 0,
      },
      selectedImages: [
        {
          id: "Screenshot 2021-03-30 at 1-14-53 PM.png",
          uploadedBy: "swapnil.deshmukh@kognitiv.com",
          checksum: "60eef42bf8d3b2a6578f59001af2fcf7",
          url: "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
          createdAt: "2021-03-30T09:45:15.200651",
          updatedAt: "2021-03-30T09:45:15.200651",
          offerDetails: [],
        },
      ],
      images: [
        {
          id: "Screenshot 2021-03-30 at 1-14-53 PM.png",
          uploadedBy: "swapnil.deshmukh@kognitiv.com",
          checksum: "60eef42bf8d3b2a6578f59001af2fcf7",
          url: "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
          createdAt: "2021-03-30T09:45:15.200651",
          updatedAt: "2021-03-30T09:45:15.200651",
          offerDetails: [],
        },
      ],
    };
    const { container } = render(
      <MemoryRouter>
        <OfferImagesCarousel {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(container).toMatchSnapshot();
  });
  test("OfferImagesCarousel components- click on close btn and dismiss carousel", async () => {
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
      carouselImage: {
        index: 0,
      },
      selectedImages: [
        {
          id: "Screenshot 2021-03-30 at 1-14-53 PM.png",
          uploadedBy: "swapnil.deshmukh@kognitiv.com",
          checksum: "60eef42bf8d3b2a6578f59001af2fcf7",
          url: "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
          createdAt: "2021-03-30T09:45:15.200651",
          updatedAt: "2021-03-30T09:45:15.200651",
          offerDetails: [],
        },
      ],
      images: [
        {
          id: "Screenshot 2021-03-30 at 1-14-53 PM.png",
          uploadedBy: "swapnil.deshmukh@kognitiv.com",
          checksum: "60eef42bf8d3b2a6578f59001af2fcf7",
          url: "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
          createdAt: "2021-03-30T09:45:15.200651",
          updatedAt: "2021-03-30T09:45:15.200651",
          offerDetails: [],
        },
      ],
    };
    const { getByTestId } = render(
      <MemoryRouter>
        <OfferImagesCarousel {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const cancelBtn = getByTestId("img-carousel-close-btn");
    fireEvent.click(cancelBtn);
    expect(props.hideCarousel).toHaveBeenCalledTimes(1);
  });

  test("OfferImagesCarousel components- image with checkbox is unchecked if image not exists", async () => {
    const selectImageStore = cloneDeep(tempStore);
    selectImageStore.newoffermarketinginfo.marketingInfo.images = [];
    const store = createStore(() => ({ ...selectImageStore }));
    store.dispatch = jest.fn();
    const props = {
      updateSelectedImages: jest.fn(),
      hideCarousel: jest.fn(),
      carouselImage: {
        index: 0,
      },
      selectedImages: [
        {
          id: "Screenshot 2021-03-30 at 1-14-53 PM.png",
          uploadedBy: "swapnil.deshmukh@kognitiv.com",
          checksum: "60eef42bf8d3b2a6578f59001af2fcf7",
          url: "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
          createdAt: "2021-03-30T09:45:15.200651",
          updatedAt: "2021-03-30T09:45:15.200651",
          offerDetails: [],
        },
      ],
      images: [
        {
          id: "test1.png",
          uploadedBy: "swapnil.deshmukh@kognitiv.com",
          checksum: "60eef42bf8d3b2a6578f59001af2fcf7",
          url: "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/test1.png",
          createdAt: "2021-03-30T09:45:15.200651",
          updatedAt: "2021-03-30T09:45:15.200651",
          offerDetails: [],
        },
      ],
    };
    const { getByTestId } = render(
      <MemoryRouter>
        <OfferImagesCarousel {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(
      getByTestId("test1.png-carousel-image-checkbox-display")
    ).toBeTruthy();
    const imgCheckbox = getByTestId(
      "test1.png-carousel-image-checkbox-display"
    );
    expect(imgCheckbox).toBeTruthy();
    expect(imgCheckbox.value).toBe("test1.png");
    expect(imgCheckbox.checked).toEqual(false);
  });

  test("OfferImagesCarousel components- image with checkbox is checked if image already exists", async () => {
    const selectImageStore = cloneDeep(tempStore);
    selectImageStore.newoffermarketinginfo.marketingInfo.images = [];
    const store = createStore(() => ({ ...selectImageStore }));
    store.dispatch = jest.fn();
    const props = {
      updateSelectedImages: jest.fn(),
      hideCarousel: jest.fn(),
      carouselImage: {
        index: 0,
      },
      selectedImages: [
        {
          id: "test1.png",
          uploadedBy: "swapnil.deshmukh@kognitiv.com",
          checksum: "60eef42bf8d3b2a6578f59001af2fcf7",
          url: "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/test1.png",
          createdAt: "2021-03-30T09:45:15.200651",
          updatedAt: "2021-03-30T09:45:15.200651",
          offerDetails: [],
        },
      ],
      images: [
        {
          id: "test1.png",
          uploadedBy: "swapnil.deshmukh@kognitiv.com",
          checksum: "60eef42bf8d3b2a6578f59001af2fcf7",
          url: "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/test1.png",
          createdAt: "2021-03-30T09:45:15.200651",
          updatedAt: "2021-03-30T09:45:15.200651",
          offerDetails: [],
        },
      ],
    };
    const { getByTestId } = render(
      <MemoryRouter>
        <OfferImagesCarousel {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(
      getByTestId("test1.png-carousel-image-checkbox-display")
    ).toBeTruthy();
    const imgCheckbox = getByTestId(
      "test1.png-carousel-image-checkbox-display"
    );
    expect(imgCheckbox).toBeTruthy();
    expect(imgCheckbox.value).toBe("test1.png");
    expect(imgCheckbox.checked).toEqual(true);
  });

  test("OfferImagesCarousel components- if images are empty then carousel is hidden and not displayed unless images is not empty", async () => {
    const selectImageStore = cloneDeep(tempStore);
    selectImageStore.newoffermarketinginfo.marketingInfo.images = [];
    const store = createStore(() => ({ ...selectImageStore }));
    store.dispatch = jest.fn();
    const props = {
      updateSelectedImages: jest.fn(),
      hideCarousel: jest.fn(),
      carouselImage: {
        index: 0,
      },
      selectedImages: [],
      images: [],
    };
    const { queryByTestId } = render(
      <MemoryRouter>
        <OfferImagesCarousel {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(queryByTestId("0-img-carousel")).not.toBeInTheDocument();
    expect(props.hideCarousel).toHaveBeenCalledTimes(1);
  });
});
