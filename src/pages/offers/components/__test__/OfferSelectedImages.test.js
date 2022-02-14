import React from "react";
import { createStore } from "redux";
import { render, fireEvent } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import OfferSelectedImages from "../OfferSelectedImages";
import { tempStore } from "./tempStore";

describe("OfferSelectedImages component test", () => {
  test("create OfferSelectedImages components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      setUpdatedSelectedImages: jest.fn(),
      isDetailsShown: false,
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
        <OfferSelectedImages {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );

    expect(container.firstChild).toMatchSnapshot();
  });
  test("OfferSelectedImages components- click on deselect all to remove all images", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      setUpdatedSelectedImages: jest.fn(),
      isDetailsShown: false,
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
    const { getByTestId } = render(
      <MemoryRouter>
        <OfferSelectedImages {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const deselectBtn = getByTestId("deselect-image-all-btn");
    fireEvent.click(deselectBtn);
    expect(props.setUpdatedSelectedImages).toHaveBeenCalledTimes(1);
  });
  test("OfferSelectedImages components- click on remove image to remove 1st selected image", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      setUpdatedSelectedImages: jest.fn(),
      isDetailsShown: false,
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

    const { getByTestId } = render(
      <MemoryRouter>
        <OfferSelectedImages {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const removeBtn = getByTestId("0-remove-image-btn");
    fireEvent.click(removeBtn);
    expect(props.setUpdatedSelectedImages).toHaveBeenCalledTimes(1);
  });

  test("OfferSelectedImages components- Check if user click on image name to see image details", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      setUpdatedSelectedImages: jest.fn(),
      isDetailsShown: false,
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
    const { queryByTestId, getByTestId } = render(
      <MemoryRouter>
        <OfferSelectedImages {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(queryByTestId("0-selected-image-name")).toBeInTheDocument();
    const nameBtn = getByTestId("0-selected-image-name");
    expect(nameBtn).toBeTruthy();
    expect(nameBtn).toBeInTheDocument();
    fireEvent.click(nameBtn);
    expect(props.displayImageDetails).toHaveBeenCalledTimes(1);
  });
});
