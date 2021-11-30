import React from "react";
import { createStore } from "redux";
import { render, fireEvent } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import OfferImageSelectionModal from "../OfferImageSelectionModal";
import { tempStore } from "./tempStore";
import { cloneDeep } from "lodash";
import { act } from "react-test-renderer";

window.fetchWrapper = window.fetchWrapper = jest.fn().mockResolvedValue({
  success: true,
});
jest.mock("./../../service");

describe("OfferImageSelectionModal component test", () => {
  test("create OfferImageSelectionModal components snapshot", () => {
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
      uploadedFiles: [],
      refreshSelectedImages: jest.fn(),
      displaySelectedImages: jest.fn(),
      isDetailsShown: false,
      hideModal: jest.fn(),
      toggleUploadModal: jest.fn(),
      setUpdatedSelectedImages: jest.fn(),
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
        <OfferImageSelectionModal {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(container).toMatchSnapshot();
  });
  test("OfferImageSelectionModal components- click on cancel and dismiss dialog", async () => {
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
      uploadedFiles: [],
      refreshSelectedImages: jest.fn(),
      displaySelectedImages: jest.fn(),
      isDetailsShown: false,
      hideModal: jest.fn(),
      toggleUploadModal: jest.fn(),
      setUpdatedSelectedImages: jest.fn(),
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
        <OfferImageSelectionModal {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const cancelBtn = getByTestId("offer-image-list-cancel-btn");
    fireEvent.click(cancelBtn);
    expect(props.hideModal).toHaveBeenCalledTimes(1);
  });

  test("OfferImageSelectionModal components- click on upload image btn is clicked", async () => {
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
      uploadedFiles: [],
      refreshSelectedImages: jest.fn(),
      displaySelectedImages: jest.fn(),
      isDetailsShown: false,
      hideModal: jest.fn(),
      toggleUploadModal: jest.fn(),
      setUpdatedSelectedImages: jest.fn(),
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
        <OfferImageSelectionModal {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const uploadBtn = getByTestId("filter-offer-upload-image-btn");
    fireEvent.click(uploadBtn);
    expect(props.toggleUploadModal).toHaveBeenCalledTimes(1);
  });

  test("OfferImageSelectionModal components- click on submit and popup is hidden with selected images", async () => {
    const selectImageStore = cloneDeep(tempStore);
    selectImageStore.newoffermarketinginfo.marketingInfo.images = [
      {
        id: "test.png",
        uploadedBy: "swapnil.deshmukh@kognitiv.com",
        checksum: "60eef42bf8d3b2a6578f59001af2fcf7",
        url: "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
        createdAt: "2021-03-30T09:45:15.200651",
        updatedAt: "2021-03-30T09:45:15.200651",
        offerDetails: [],
      },
      {
        id: "test2.png",
        uploadedBy: "swapnil.deshmukh@kognitiv.com",
        checksum: "8db052ac1d98a3a5a28eb9c1a53ecb8f",
        url: "https://res.cloudinary.com/seekda-dev/image/upload/v1616688146/offer_builder_dev/Screenshot%202021-03-24%20at%202-46-07%20PM.png",
        createdAt: "2021-03-25T17:02:26.832568",
        updatedAt: "2021-03-25T17:02:26.832568",
        offerDetails: [],
      },
      {
        id: "test3.png",
        uploadedBy: "swapnil.deshmukh@kognitiv.com",
        checksum: "7634f719f11b8d5673b85b3707029863",
        url: "https://res.cloudinary.com/seekda-dev/image/upload/v1616688107/offer_builder_dev/Screenshot%202021-03-24%20at%201-30-49%20PM.png",
        createdAt: "2021-03-25T17:01:47.516244",
        updatedAt: "2021-03-25T17:01:47.516244",
        offerDetails: [],
      },
    ];
    const store = createStore(() => ({ ...selectImageStore }));
    store.dispatch = jest.fn();
    const props = {
      uploadedFiles: [],
      refreshSelectedImages: jest.fn(),
      displaySelectedImages: jest.fn(),
      isDetailsShown: false,
      hideModal: jest.fn(),
      toggleUploadModal: jest.fn(),
      setUpdatedSelectedImages: jest.fn(),
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
    const { getByTestId, queryByTestId } = render(
      <MemoryRouter>
        <OfferImageSelectionModal {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );

    const submitBtn = getByTestId("offer-image-list-submit-btn");
    expect(submitBtn).toBeTruthy();
    await act(async () => {
      await fireEvent.click(submitBtn);
      expect(props.hideModal).toHaveBeenCalledTimes(1);
      expect(props.displaySelectedImages).toHaveBeenCalledTimes(1);
      expect(
        queryByTestId("image-selection-for-offer-modal")
      ).not.toBeInTheDocument();
    });
    expect(props.hideModal).toHaveBeenCalledTimes(1);
  });

  test("OfferImageSelectionModal components- click on image checkbox to select images and image is selected", async () => {
    const selectImageStore = cloneDeep(tempStore);
    selectImageStore.newoffermarketinginfo.marketingInfo.images = [
      {
        id: "test.png",
        uploadedBy: "swapnil.deshmukh@kognitiv.com",
        checksum: "60eef42bf8d3b2a6578f59001af2fcf7",
        url: "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
        createdAt: "2021-03-30T09:45:15.200651",
        updatedAt: "2021-03-30T09:45:15.200651",
        offerDetails: [],
      },
      {
        id: "test2.png",
        uploadedBy: "swapnil.deshmukh@kognitiv.com",
        checksum: "8db052ac1d98a3a5a28eb9c1a53ecb8f",
        url: "https://res.cloudinary.com/seekda-dev/image/upload/v1616688146/offer_builder_dev/Screenshot%202021-03-24%20at%202-46-07%20PM.png",
        createdAt: "2021-03-25T17:02:26.832568",
        updatedAt: "2021-03-25T17:02:26.832568",
        offerDetails: [],
      },
      {
        id: "test3.png",
        uploadedBy: "swapnil.deshmukh@kognitiv.com",
        checksum: "7634f719f11b8d5673b85b3707029863",
        url: "https://res.cloudinary.com/seekda-dev/image/upload/v1616688107/offer_builder_dev/Screenshot%202021-03-24%20at%201-30-49%20PM.png",
        createdAt: "2021-03-25T17:01:47.516244",
        updatedAt: "2021-03-25T17:01:47.516244",
        offerDetails: [],
      },
    ];
    const store = createStore(() => ({ ...selectImageStore }));
    store.dispatch = jest.fn();
    const props = {
      uploadedFiles: [],
      refreshSelectedImages: jest.fn(),
      displaySelectedImages: jest.fn(),
      isDetailsShown: false,
      hideModal: jest.fn(),
      toggleUploadModal: jest.fn(),
      setUpdatedSelectedImages: jest.fn(),
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
        <OfferImageSelectionModal {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );

    expect(
      getByTestId("user_1616577125384.png-image-list-display")
    ).toBeTruthy();
    const imgCheckbox = getByTestId(
      "user_1616577125384.png-0-image-checkbox-display"
    );
    expect(imgCheckbox).toBeTruthy();
    act(() => {
      fireEvent.change(imgCheckbox, { target: { value: "true" } }); // 3 chars
    });
    expect(imgCheckbox.value).toBe("true");
  });

  test("OfferImageSelectionModal components- click on image name and image details is displayed", async () => {
    const selectImageStore = cloneDeep(tempStore);
    selectImageStore.newoffermarketinginfo.marketingInfo.images = [
      {
        id: "test.png",
        uploadedBy: "swapnil.deshmukh@kognitiv.com",
        checksum: "60eef42bf8d3b2a6578f59001af2fcf7",
        url: "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
        createdAt: "2021-03-30T09:45:15.200651",
        updatedAt: "2021-03-30T09:45:15.200651",
        offerDetails: [],
      },
      {
        id: "test2.png",
        uploadedBy: "swapnil.deshmukh@kognitiv.com",
        checksum: "8db052ac1d98a3a5a28eb9c1a53ecb8f",
        url: "https://res.cloudinary.com/seekda-dev/image/upload/v1616688146/offer_builder_dev/Screenshot%202021-03-24%20at%202-46-07%20PM.png",
        createdAt: "2021-03-25T17:02:26.832568",
        updatedAt: "2021-03-25T17:02:26.832568",
        offerDetails: [],
      },
      {
        id: "test3.png",
        uploadedBy: "swapnil.deshmukh@kognitiv.com",
        checksum: "7634f719f11b8d5673b85b3707029863",
        url: "https://res.cloudinary.com/seekda-dev/image/upload/v1616688107/offer_builder_dev/Screenshot%202021-03-24%20at%201-30-49%20PM.png",
        createdAt: "2021-03-25T17:01:47.516244",
        updatedAt: "2021-03-25T17:01:47.516244",
        offerDetails: [],
      },
    ];
    const store = createStore(() => ({ ...selectImageStore }));
    store.dispatch = jest.fn();
    const props = {
      uploadedFiles: [],
      refreshSelectedImages: jest.fn(),
      displaySelectedImages: jest.fn(),
      isDetailsShown: false,
      hideModal: jest.fn(),
      toggleUploadModal: jest.fn(),
      setUpdatedSelectedImages: jest.fn(),
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
        <OfferImageSelectionModal {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );

    expect(
      getByTestId("user_1616577125384.png-image-list-display")
    ).toBeTruthy();
    const imgNameBtn = getByTestId("user_1616577125384.png-0-image-name-btn");
    expect(imgNameBtn).toBeTruthy();
    await act(async () => {
      await fireEvent.click(imgNameBtn);
      expect(getByTestId("user_1616577125384.png-image-details")).toBeTruthy();
    });
  });

  test("OfferImageSelectionModal components- click on image details close and image details is hidden", async () => {
    const selectImageStore = cloneDeep(tempStore);
    selectImageStore.newoffermarketinginfo.marketingInfo.images = [
      {
        id: "test.png",
        uploadedBy: "swapnil.deshmukh@kognitiv.com",
        checksum: "60eef42bf8d3b2a6578f59001af2fcf7",
        url: "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
        createdAt: "2021-03-30T09:45:15.200651",
        updatedAt: "2021-03-30T09:45:15.200651",
        offerDetails: [],
      },
      {
        id: "test2.png",
        uploadedBy: "swapnil.deshmukh@kognitiv.com",
        checksum: "8db052ac1d98a3a5a28eb9c1a53ecb8f",
        url: "https://res.cloudinary.com/seekda-dev/image/upload/v1616688146/offer_builder_dev/Screenshot%202021-03-24%20at%202-46-07%20PM.png",
        createdAt: "2021-03-25T17:02:26.832568",
        updatedAt: "2021-03-25T17:02:26.832568",
        offerDetails: [],
      },
      {
        id: "test3.png",
        uploadedBy: "swapnil.deshmukh@kognitiv.com",
        checksum: "7634f719f11b8d5673b85b3707029863",
        url: "https://res.cloudinary.com/seekda-dev/image/upload/v1616688107/offer_builder_dev/Screenshot%202021-03-24%20at%201-30-49%20PM.png",
        createdAt: "2021-03-25T17:01:47.516244",
        updatedAt: "2021-03-25T17:01:47.516244",
        offerDetails: [],
      },
    ];
    const store = createStore(() => ({ ...selectImageStore }));
    store.dispatch = jest.fn();
    const props = {
      uploadedFiles: [],
      refreshSelectedImages: jest.fn(),
      displaySelectedImages: jest.fn(),
      isDetailsShown: false,
      hideModal: jest.fn(),
      toggleUploadModal: jest.fn(),
      setUpdatedSelectedImages: jest.fn(),
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
    const { getByTestId, queryByTestId } = render(
      <MemoryRouter>
        <OfferImageSelectionModal {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );

    expect(
      getByTestId("user_1616577125384.png-image-list-display")
    ).toBeTruthy();
    const closeBtn = getByTestId("image-details-close-btn");
    expect(closeBtn).toBeTruthy();
    await act(async () => {
      await fireEvent.click(closeBtn);
      expect(
        queryByTestId("user_1616577125384.png-image-details")
      ).not.toBeInTheDocument();
    });
  });

  test("OfferImageSelectionModal components- click on deselect all btn and select image section is hidden", async () => {
    const selectImageStore = cloneDeep(tempStore);
    selectImageStore.newoffermarketinginfo.marketingInfo.images = [
      {
        id: "test.png",
        uploadedBy: "swapnil.deshmukh@kognitiv.com",
        checksum: "60eef42bf8d3b2a6578f59001af2fcf7",
        url: "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
        createdAt: "2021-03-30T09:45:15.200651",
        updatedAt: "2021-03-30T09:45:15.200651",
        offerDetails: [],
      },
      {
        id: "test2.png",
        uploadedBy: "swapnil.deshmukh@kognitiv.com",
        checksum: "8db052ac1d98a3a5a28eb9c1a53ecb8f",
        url: "https://res.cloudinary.com/seekda-dev/image/upload/v1616688146/offer_builder_dev/Screenshot%202021-03-24%20at%202-46-07%20PM.png",
        createdAt: "2021-03-25T17:02:26.832568",
        updatedAt: "2021-03-25T17:02:26.832568",
        offerDetails: [],
      },
      {
        id: "test3.png",
        uploadedBy: "swapnil.deshmukh@kognitiv.com",
        checksum: "7634f719f11b8d5673b85b3707029863",
        url: "https://res.cloudinary.com/seekda-dev/image/upload/v1616688107/offer_builder_dev/Screenshot%202021-03-24%20at%201-30-49%20PM.png",
        createdAt: "2021-03-25T17:01:47.516244",
        updatedAt: "2021-03-25T17:01:47.516244",
        offerDetails: [],
      },
    ];
    const store = createStore(() => ({ ...selectImageStore }));
    store.dispatch = jest.fn();
    const props = {
      uploadedFiles: [],
      refreshSelectedImages: jest.fn(),
      displaySelectedImages: jest.fn(),
      isDetailsShown: false,
      hideModal: jest.fn(),
      toggleUploadModal: jest.fn(),
      setUpdatedSelectedImages: jest.fn(),
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
        <OfferImageSelectionModal {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );

    expect(
      getByTestId("user_1616577125384.png-image-list-display")
    ).toBeTruthy();
    const deselectAllBtn = getByTestId("deselect-image-all-btn");
    expect(deselectAllBtn).toBeTruthy();
    await act(async () => {
      await fireEvent.click(deselectAllBtn);
      expect(props.setUpdatedSelectedImages).toHaveBeenCalledWith([]);
    });
  });

  test("OfferImageSelectionModal components- click on filter btn and filter is shown and select images section is hidden", async () => {
    const selectImageStore = cloneDeep(tempStore);
    selectImageStore.newoffermarketinginfo.marketingInfo.images = [
      {
        id: "test.png",
        uploadedBy: "swapnil.deshmukh@kognitiv.com",
        checksum: "60eef42bf8d3b2a6578f59001af2fcf7",
        url: "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
        createdAt: "2021-03-30T09:45:15.200651",
        updatedAt: "2021-03-30T09:45:15.200651",
        offerDetails: [],
      },
      {
        id: "test2.png",
        uploadedBy: "swapnil.deshmukh@kognitiv.com",
        checksum: "8db052ac1d98a3a5a28eb9c1a53ecb8f",
        url: "https://res.cloudinary.com/seekda-dev/image/upload/v1616688146/offer_builder_dev/Screenshot%202021-03-24%20at%202-46-07%20PM.png",
        createdAt: "2021-03-25T17:02:26.832568",
        updatedAt: "2021-03-25T17:02:26.832568",
        offerDetails: [],
      },
      {
        id: "test3.png",
        uploadedBy: "swapnil.deshmukh@kognitiv.com",
        checksum: "7634f719f11b8d5673b85b3707029863",
        url: "https://res.cloudinary.com/seekda-dev/image/upload/v1616688107/offer_builder_dev/Screenshot%202021-03-24%20at%201-30-49%20PM.png",
        createdAt: "2021-03-25T17:01:47.516244",
        updatedAt: "2021-03-25T17:01:47.516244",
        offerDetails: [],
      },
    ];
    const store = createStore(() => ({ ...selectImageStore }));
    store.dispatch = jest.fn();
    const props = {
      uploadedFiles: [],
      refreshSelectedImages: jest.fn(),
      displaySelectedImages: jest.fn(),
      isDetailsShown: false,
      hideModal: jest.fn(),
      setUpdatedSelectedImages: jest.fn(),
      toggleUploadModal: jest.fn(),
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
    const { getByTestId, queryByTestId } = render(
      <MemoryRouter>
        <OfferImageSelectionModal {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );

    expect(
      getByTestId("user_1616577125384.png-image-list-display")
    ).toBeTruthy();
    const filterBtn = getByTestId("filter-ic-btn");
    expect(filterBtn).toBeTruthy();
    await act(async () => {
      await fireEvent.click(filterBtn);
      expect(
        queryByTestId("image-selection-for-offer-modal")
      ).not.toBeInTheDocument();
    });
  });
});
