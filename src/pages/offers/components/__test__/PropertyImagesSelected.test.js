import React from "react";
import { createStore } from "redux";
import { render, fireEvent } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import PropertyImagesSelected from "../PropertyImagesSelected";
import { tempStore } from "./tempStore";

describe("PropertyImagesSelected component test", () => {
  test("create PropertyImagesSelected components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      setSelectedImages: jest.fn(),
      setDisplayCarousel: jest.fn(),
      selectedImages: [
        "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
        "https://res.cloudinary.com/seekda-dev/image/upload/v1616688146/offer_builder_dev/Screenshot%202021-03-24%20at%202-46-07%20PM.png",
        "https://res.cloudinary.com/seekda-dev/image/upload/v1616688107/offer_builder_dev/Screenshot%202021-03-24%20at%201-30-49%20PM.png",
      ],
    };
    const { container } = render(
      <MemoryRouter>
        <PropertyImagesSelected {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );

    expect(container.firstChild).toMatchSnapshot();
  });
  test("PropertyImagesSelected components- click on deselect all to remove all images", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      setSelectedImages: jest.fn(),
      setDisplayCarousel: jest.fn(),
      selectedImages: [
        "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
        "https://res.cloudinary.com/seekda-dev/image/upload/v1616688146/offer_builder_dev/Screenshot%202021-03-24%20at%202-46-07%20PM.png",
        "https://res.cloudinary.com/seekda-dev/image/upload/v1616688107/offer_builder_dev/Screenshot%202021-03-24%20at%201-30-49%20PM.png",
      ],
    };
    const { getByTestId } = render(
      <MemoryRouter>
        <PropertyImagesSelected {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const deselectBtn = getByTestId("deselect-image-all-btn");
    fireEvent.click(deselectBtn);
    expect(props.setSelectedImages).toHaveBeenCalledTimes(1);
  });
  test("PropertyImagesSelected components- click on remove image to remove 1st selected image", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      setSelectedImages: jest.fn(),
      setDisplayCarousel: jest.fn(),
      selectedImages: [
        "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
        "https://res.cloudinary.com/seekda-dev/image/upload/v1616688146/offer_builder_dev/Screenshot%202021-03-24%20at%202-46-07%20PM.png",
        "https://res.cloudinary.com/seekda-dev/image/upload/v1616688107/offer_builder_dev/Screenshot%202021-03-24%20at%201-30-49%20PM.png",
      ],
    };
    const { getByTestId } = render(
      <MemoryRouter>
        <PropertyImagesSelected {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const removeBtn = getByTestId("0-remove-image-btn");
    fireEvent.click(removeBtn);
    expect(props.setSelectedImages).toHaveBeenCalledTimes(1);
  });

  test("PropertyImagesSelected components- Check if user click on image name to see image details", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      setSelectedImages: jest.fn(),
      setDisplayCarousel: jest.fn(),
      selectedImages: [
        "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/Screenshot%202021-03-30%20at%201-14-53%20PM.png",
        "https://res.cloudinary.com/seekda-dev/image/upload/v1616688146/offer_builder_dev/Screenshot%202021-03-24%20at%202-46-07%20PM.png",
        "https://res.cloudinary.com/seekda-dev/image/upload/v1616688107/offer_builder_dev/Screenshot%202021-03-24%20at%201-30-49%20PM.png",
      ],
    };
    const { getByTestId } = render(
      <MemoryRouter>
        <PropertyImagesSelected {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const imgBtn = getByTestId("0-selected-img");
    expect(imgBtn).toBeTruthy();
    expect(imgBtn).toBeInTheDocument();
    fireEvent.click(imgBtn);
    expect(props.setDisplayCarousel).toHaveBeenCalledTimes(1);
  });
});
