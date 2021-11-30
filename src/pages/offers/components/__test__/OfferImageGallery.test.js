import React from "react";
import { createStore } from "redux";
import { render, fireEvent } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import OfferImageGallery from "../OfferImageGallery";

import { tempStore } from "./tempStore";
import { cloneDeep } from "lodash";
import { act } from "react-test-renderer";

window.fetchWrapper = window.fetchWrapper = jest.fn().mockResolvedValue({
  success: true,
});
jest.mock("./../../service");

describe("OfferImageGallery component test", () => {
  test("create OfferImageGallery components snapshot", () => {
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
      isDetailsShown: false,
      displayCarousel: jest.fn(),
      displayImageDetails: jest.fn(),
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
        {
          id: "Screenshot 2021-03-24 at 2-46-07 PM.png",
          uploadedBy: "swapnil.deshmukh@kognitiv.com",
          checksum: "8db052ac1d98a3a5a28eb9c1a53ecb8f",
          url: "https://res.cloudinary.com/seekda-dev/image/upload/v1616688146/offer_builder_dev/Screenshot%202021-03-24%20at%202-46-07%20PM.png",
          createdAt: "2021-03-25T17:02:26.832568",
          updatedAt: "2021-03-25T17:02:26.832568",
          offerDetails: [],
        },
        {
          id: "Screenshot 2021-03-24 at 1-30-49 PM.png",
          uploadedBy: "swapnil.deshmukh@kognitiv.com",
          checksum: "7634f719f11b8d5673b85b3707029863",
          url: "https://res.cloudinary.com/seekda-dev/image/upload/v1616688107/offer_builder_dev/Screenshot%202021-03-24%20at%201-30-49%20PM.png",
          createdAt: "2021-03-25T17:01:47.516244",
          updatedAt: "2021-03-25T17:01:47.516244",
          offerDetails: [],
        },
      ],
    };
    const { container } = render(
      <MemoryRouter>
        <OfferImageGallery {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(container).toMatchSnapshot();
  });
  test("OfferImageGallery components- click on image name and image details are shown", async () => {
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
      isDetailsShown: false,
      offerImageList: [
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
      updateSelectedImages: jest.fn(),
      displayImageDetails: jest.fn(),
      displayCarousel: jest.fn(),
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
        {
          id: "Screenshot 2021-03-24 at 2-46-07 PM.png",
          uploadedBy: "swapnil.deshmukh@kognitiv.com",
          checksum: "8db052ac1d98a3a5a28eb9c1a53ecb8f",
          url: "https://res.cloudinary.com/seekda-dev/image/upload/v1616688146/offer_builder_dev/Screenshot%202021-03-24%20at%202-46-07%20PM.png",
          createdAt: "2021-03-25T17:02:26.832568",
          updatedAt: "2021-03-25T17:02:26.832568",
          offerDetails: [],
        },
        {
          id: "Screenshot 2021-03-24 at 1-30-49 PM.png",
          uploadedBy: "swapnil.deshmukh@kognitiv.com",
          checksum: "7634f719f11b8d5673b85b3707029863",
          url: "https://res.cloudinary.com/seekda-dev/image/upload/v1616688107/offer_builder_dev/Screenshot%202021-03-24%20at%201-30-49%20PM.png",
          createdAt: "2021-03-25T17:01:47.516244",
          updatedAt: "2021-03-25T17:01:47.516244",
          offerDetails: [],
        },
      ],
    };
    const { getByTestId } = render(
      <MemoryRouter>
        <OfferImageGallery {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const nameImg = getByTestId(
      "Screenshot 2021-03-30 at 1-14-53 PM.png-0-image-name-btn"
    );
    fireEvent.click(nameImg);
    expect(props.displayImageDetails).toHaveBeenCalledTimes(1);
  });

  test("OfferImageGallery components- click on checkbox of image and selected images are changed/updated", async () => {
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
      isDetailsShown: false,
      offerImageList: [
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
      updateSelectedImages: jest.fn(),
      displayImageDetails: jest.fn(),
      displayCarousel: jest.fn(),
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
        {
          id: "Screenshot 2021-03-24 at 2-46-07 PM.png",
          uploadedBy: "swapnil.deshmukh@kognitiv.com",
          checksum: "8db052ac1d98a3a5a28eb9c1a53ecb8f",
          url: "https://res.cloudinary.com/seekda-dev/image/upload/v1616688146/offer_builder_dev/Screenshot%202021-03-24%20at%202-46-07%20PM.png",
          createdAt: "2021-03-25T17:02:26.832568",
          updatedAt: "2021-03-25T17:02:26.832568",
          offerDetails: [],
        },
        {
          id: "Screenshot 2021-03-24 at 1-30-49 PM.png",
          uploadedBy: "swapnil.deshmukh@kognitiv.com",
          checksum: "7634f719f11b8d5673b85b3707029863",
          url: "https://res.cloudinary.com/seekda-dev/image/upload/v1616688107/offer_builder_dev/Screenshot%202021-03-24%20at%201-30-49%20PM.png",
          createdAt: "2021-03-25T17:01:47.516244",
          updatedAt: "2021-03-25T17:01:47.516244",
          offerDetails: [],
        },
      ],
    };
    const { getByTestId } = render(
      <MemoryRouter>
        <OfferImageGallery {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(
      getByTestId(
        "Screenshot 2021-03-30 at 1-14-53 PM.png-0-image-checkbox-display"
      )
    ).toBeTruthy();
    const imgCheckbox = getByTestId(
      "Screenshot 2021-03-30 at 1-14-53 PM.png-0-image-checkbox-display"
    );
    expect(imgCheckbox).toBeTruthy();
    await act(async () => {
      await fireEvent.change(imgCheckbox, { target: { value: "true" } }); // 3 chars
      expect(imgCheckbox.value).toBe("true");
    });
  });
});
