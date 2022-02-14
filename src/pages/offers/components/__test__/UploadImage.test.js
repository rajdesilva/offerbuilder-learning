import React from "react";
import { createStore } from "redux";
import { render, fireEvent, cleanup } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import UploadImage from "../UploadImage";
import * as service from "./../../service";
import { tempStore } from "./tempStore";
import { act } from "react-test-renderer";

window.fetchWrapper = window.fetchWrapper = jest.fn().mockResolvedValue({
  success: true,
});
jest.mock("./../../service");
afterEach(cleanup);

describe("UploadImage component test", () => {
  test("create UploadImage components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      toggleUploadModal: jest.fn(),
    };
    const { container } = render(
      <MemoryRouter>
        <UploadImage {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );

    expect(container).toMatchSnapshot();
  });

  test("UploadImage click on close btn to hide upload view", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      toggleUploadModal: jest.fn(),
    };
    const { queryByTestId, getByTestId } = render(
      <MemoryRouter>
        <UploadImage {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );

    const cancelBtn = getByTestId("upload-image-cancel-btn");
    expect(cancelBtn).toBeTruthy();
    await act(async () => {
      await fireEvent.click(cancelBtn);
      expect(props.toggleUploadModal).toHaveBeenCalledTimes(1);
      expect(
        queryByTestId("image-upload-for-offer-modal")
      ).not.toBeInTheDocument();
    });
  });

  test("UploadImage click on upload btn and service is not called as filelist is 0", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      toggleUploadModal: jest.fn(),
    };
    const { getByTestId } = render(
      <MemoryRouter>
        <UploadImage {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );

    const uploadBtn = getByTestId("image-upload-btn");
    expect(uploadBtn).toBeTruthy();
    await act(async () => {
      await fireEvent.click(uploadBtn);
      expect(props.toggleUploadModal).toHaveBeenCalledTimes(0);
    });
  });

  test("UploadImage click on upload btn and service is called with file selected to upload and successful", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      toggleUploadModal: jest.fn(),
    };
    const { queryByTestId, getByTestId } = render(
      <MemoryRouter>
        <UploadImage {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    service.uploadImage.mockImplementation((data) => {
      return Promise.resolve({
        success: true,
        data: {
          id: "chucknorris.png",
          uploadedBy: "swapnil.deshmukh@kognitiv.com",
          checksum: "7634f719f11b8d5673b85b3707029863",
          url: "https://res.cloudinary.com/seekda-dev/image/upload/v1616688107/offer_builder_dev/chucknorris.png",
          createdAt: "2021-03-25T17:01:47.516244",
          updatedAt: "2021-03-25T17:01:47.516244",
        },
        error: null,
      });
    });
    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    const inputEl = getByTestId("image-file-upload-dragger");
    Object.defineProperty(inputEl, "files", {
      value: [file],
    });
    const uploadBtn = getByTestId("image-upload-btn");
    expect(uploadBtn).toBeTruthy();
    await act(async () => {
      await fireEvent.change(inputEl);
      await fireEvent.click(uploadBtn);
      expect(props.toggleUploadModal).toHaveBeenCalledTimes(1);
      expect(
        queryByTestId("image-upload-for-offer-modal")
      ).not.toBeInTheDocument();
    });
  });

  test("UploadImage click on upload btn and service is called with file selected to upload and failed", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      toggleUploadModal: jest.fn(),
    };
    const { getByTestId } = render(
      <MemoryRouter>
        <UploadImage {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    service.uploadImage.mockImplementation((data) => {
      return Promise.reject({
        success: false,
        data: null,
        error: null,
      });
    });
    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    const inputEl = getByTestId("image-file-upload-dragger");
    Object.defineProperty(inputEl, "files", {
      value: [file],
    });
    const uploadBtn = getByTestId("image-upload-btn");
    expect(uploadBtn).toBeTruthy();
    await act(async () => {
      await fireEvent.change(inputEl);
      await fireEvent.click(uploadBtn);
      expect(props.toggleUploadModal).toHaveBeenCalledTimes(0);
    });
  });
});
