import React from "react";
import { createStore } from "redux";
import { render, fireEvent } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import OfferImages from "../OfferImages";

import { tempStore } from "./tempStore";
import { cloneDeep } from "lodash";
import { act } from "react-test-renderer";

window.fetchWrapper = window.fetchWrapper = jest.fn().mockResolvedValue({
  success: true,
});
jest.mock("./../../service");

describe("OfferImages component test", () => {
  test("create OfferImages components snapshot", () => {
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
      onChange: jest.fn(),
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
        <OfferImages {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(container).toMatchSnapshot();
  });

  test("OfferImages components- click on manage images btn and popup is displayed", async () => {
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
      onChange: jest.fn(),
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
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <OfferImages {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const manageBtn = getByTestId("manage-offer-image-btn");
    expect(manageBtn).toBeTruthy();
    await act(async () => {
      await fireEvent.click(manageBtn);

      expect(getByText(/Selecting images for/i)).toBeInTheDocument();
    });
  });

  test("OfferImages components- click on remove image btn and onchange is called", async () => {
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
      onChange: jest.fn(),
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
        <OfferImages {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const removeImgBtn = getByTestId("0-remove-image-btn");
    expect(removeImgBtn).toBeTruthy();
    await act(async () => {
      await fireEvent.click(removeImgBtn);
      expect(props.onChange).toHaveBeenCalledTimes(1);
    });
  });

  test("OfferImages components- remove btn with only one image displayed as per redux/edit values", async () => {
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
      onChange: jest.fn(),
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
        {
          id: "Screenshot 2021-03-24 at 2-46-07 PM.png",
          uploadedBy: "swapnil.deshmukh@kognitiv.com",
          checksum: "8db052ac1d98a3a5a28eb9c1a53ecb8f",
          url: "https://res.cloudinary.com/seekda-dev/image/upload/v1616688146/offer_builder_dev/Screenshot%202021-03-24%20at%202-46-07%20PM.png",
          createdAt: "2021-03-25T17:02:26.832568",
          updatedAt: "2021-03-25T17:02:26.832568",
          offerDetails: [],
        },
      ],
    };
    const { getByTestId, queryByTestId } = render(
      <MemoryRouter>
        <OfferImages {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const removeImgBtn = getByTestId("0-remove-image-btn");
    expect(removeImgBtn).toBeTruthy();
    expect(getByTestId("0-remove-image-btn")).toBeInTheDocument();
    expect(queryByTestId("1-remove-image-btn")).not.toBeInTheDocument();
  });
});
