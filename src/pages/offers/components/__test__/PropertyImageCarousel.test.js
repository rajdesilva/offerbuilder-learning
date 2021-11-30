import React from "react";
import { createStore } from "redux";
import { render, fireEvent } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import PropertyImageCarousel from "../PropertyImageCarousel";

import { tempStore } from "./tempStore";

window.fetchWrapper = window.fetchWrapper = jest.fn().mockResolvedValue({
  success: true,
});
jest.mock("./../../service");

describe("PropertyImageCarousel component test", () => {
  test("create PropertyImageCarousel components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      startIndex: 0,
      hideCarousel: jest.fn(),
      images: [
        "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-114,0,x760.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/DSC00137-ch_simple2-e1511971588521.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/OIP.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/OIP2.jpg",
      ],
    };
    const { container } = render(
      <MemoryRouter>
        <PropertyImageCarousel {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(container).toMatchSnapshot();
  });
  test("PropertyImageCarousel components- click on close btn and dismiss carousel", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      startIndex: 0,
      hideCarousel: jest.fn(),
      images: [
        "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-114,0,x760.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/DSC00137-ch_simple2-e1511971588521.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/OIP.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/OIP2.jpg",
      ],
    };
    const { getByTestId } = render(
      <MemoryRouter>
        <PropertyImageCarousel {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );

    const cancelBtn = getByTestId("property-img-carousel-close-btn");
    fireEvent.click(cancelBtn);
    expect(props.hideCarousel).toHaveBeenCalledTimes(1);
  });

  test("PropertyImageCarousel components- check if images given are rendered in component or not", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      startIndex: 0,
      hideCarousel: jest.fn(),
      images: [
        "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-114,0,x760.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/DSC00137-ch_simple2-e1511971588521.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/OIP.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/OIP2.jpg",
      ],
    };
    const { getByTestId } = render(
      <MemoryRouter>
        <PropertyImageCarousel {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(getByTestId("property-img-carousel-close-btn")).toBeTruthy();
    expect(getByTestId("property-image-1")).toBeInTheDocument();
    expect(getByTestId("property-image-2")).toBeInTheDocument();
    expect(getByTestId("property-image-3")).toBeInTheDocument();
    expect(getByTestId("property-image-4")).toBeInTheDocument();
  });

  test("PropertyImageCarousel components- check if images are empty then nothing is rendered in component", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      startIndex: 0,
      hideCarousel: jest.fn(),
      images: [],
    };
    const { queryByTestId } = render(
      <MemoryRouter>
        <PropertyImageCarousel {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(queryByTestId("carousel-right-btn")).not.toBeInTheDocument();

    expect(
      queryByTestId("property-img-carousel-close-btn")
    ).toBeInTheDocument();
    expect(queryByTestId("property-image-1")).not.toBeInTheDocument();
  });
});
