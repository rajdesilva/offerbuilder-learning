import React from "react";
import { createStore } from "redux";
import { render, fireEvent } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import OfferImageDetails from "../OfferImageDetails";
import { tempStore } from "./tempStore";
import { act } from "react-test-renderer";

describe("OfferImageDetails component test", () => {
  test("create OfferImageDetails components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      hideDetailsView: jest.fn(),
      image: {
        id: "Screenshot 2021-03-30 at 1-14-53 PM.png",
        uploadedBy: "swapnil.deshmukh@kognitiv.com",
        checksum: "60eef42bf8d3b2a6578f59001af2fcf7",
        url: "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
        createdAt: "2021-03-30T09:45:15.200651",
        updatedAt: "2021-03-30T09:45:15.200651",
        offerDetails: [
          {
            id: "EDITOFFERIMAEG",
            offerName: "EDITOFFERIMAEG",
          },
        ],
      },
    };
    const { container } = render(
      <MemoryRouter>
        <OfferImageDetails {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("OfferImageDetails click on close btn to hide view", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      hideDetailsView: jest.fn(),
      image: {
        id: "Screenshot 2021-03-30 at 1-14-53 PM.png",
        uploadedBy: "swapnil.deshmukh@kognitiv.com",
        checksum: "60eef42bf8d3b2a6578f59001af2fcf7",
        url: "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
        createdAt: "2021-03-30T09:45:15.200651",
        updatedAt: "2021-03-30T09:45:15.200651",
        offerDetails: [
          {
            id: "EDITOFFERIMAEG",
            offerName: "EDITOFFERIMAEG",
          },
        ],
      },
    };
    const { getByTestId, queryByTestId } = render(
      <MemoryRouter>
        <OfferImageDetails {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );

    const closeBtn = getByTestId("image-details-close-btn");
    expect(closeBtn).toBeTruthy();
    await act(async () => {
      await fireEvent.click(closeBtn);
      expect(props.hideDetailsView).toHaveBeenCalledTimes(1);
      expect(
        queryByTestId("user_1616577125384.png-image-details")
      ).not.toBeInTheDocument();
    });
  });

  test("OfferImageDetails null image data to display, component does not throw error", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      hideDetailsView: jest.fn(),
      image: null,
    };
    render(
      <MemoryRouter>
        <OfferImageDetails {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
  });

  test("OfferImageDetails click on image btn to call carousel view", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      hideDetailsView: jest.fn(),
      setCarouselImage: jest.fn(),
      imageDetails: {
        index: 0,
        isSelected: false,
        image: {
          id: "Screenshot 2021-03-30 at 1-14-53 PM.png",
          uploadedBy: "swapnil.deshmukh@kognitiv.com",
          checksum: "60eef42bf8d3b2a6578f59001af2fcf7",
          url: "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
          createdAt: "2021-03-30T09:45:15.200651",
          updatedAt: "2021-03-30T09:45:15.200651",
          offerDetails: [
            {
              id: "EDITOFFERIMAEG",
              offerName: "EDITOFFERIMAEG",
            },
          ],
        },
      },
    };
    const { getByTestId, queryByTestId } = render(
      <MemoryRouter>
        <OfferImageDetails {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );

    const viewCarouselImageBtn = getByTestId("image-big-details-view");
    expect(viewCarouselImageBtn).toBeTruthy();
    await act(async () => {
      await fireEvent.click(viewCarouselImageBtn);
      expect(props.setCarouselImage).toHaveBeenCalledTimes(1);
      expect(
        queryByTestId("user_1616577125384.png-image-details")
      ).not.toBeInTheDocument();
    });
  });
});
