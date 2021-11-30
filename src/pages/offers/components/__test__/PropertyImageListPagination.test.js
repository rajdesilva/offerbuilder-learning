import React from "react";
import { createStore } from "redux";
import { render, fireEvent, act } from "../../../../helpers/testUtils";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import PropertyImageListPagination from "../PropertyImageListPagination";
import { tempStore } from "./tempStore";

const history = createMemoryHistory();

global.scrollTo = jest.fn();

describe("PropertyImageListPagination test", () => {
  test("create PropertyImageListPagination components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    const props = {
      images: [
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
      ],
    };
    const wrapper = render(
      <Router history={history}>
        <PropertyImageListPagination {...props} />
      </Router>,
      {
        store,
      }
    );
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot();
  });

  test("check pagination is available or not", async () => {
    const store = createStore(() => ({ ...tempStore }));
    const props = {
      images: [
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
      ],
    };
    const { getByText, getByTestId, getByTitle } = render(
      <Router history={history}>
        <PropertyImageListPagination {...props} />
      </Router>,
      {
        store,
      }
    );

    expect(getByTestId("property-image-list-pagination")).toBeInTheDocument();
    expect(getByText(/Images per page/i)).toBeInTheDocument();
    expect(getByTitle("1")).toBeInTheDocument();
  });

  test("check pagination for 20 per page available or not", async () => {
    const store = createStore(() => ({ ...tempStore }));
    const props = {
      setImages: jest.fn(),
      images: [
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/DSC00137-ch_simple2-e1511971588521.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/OIP.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/OIP2.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/DSC00137-ch_simple2-e1511971588521.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/OIP.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/OIP2.jpg",

        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/DSC00137-ch_simple2-e1511971588521.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/OIP.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/OIP2.jpg",

        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/chambre_double_green_fullsize_ecodef-1140x760.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/DSC00137-ch_simple2-e1511971588521.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/OIP.jpg",
        "https://res.cloudinary.com/seekda-dev/image/upload/w_1920,h_1080,c_fill,f_auto,fl_lossy,q_auto/development/DEMO_JEEVAN/OIP2.jpg",
      ],
    };
    const { getByText, getByTestId } = render(
      <Router history={history}>
        <PropertyImageListPagination {...props} />
      </Router>,
      {
        store,
      }
    );
    const onPageChange = getByTestId(
      "property-image-list-pagination"
    ).querySelector("input");
    await act(async () => {
      await fireEvent.mouseDown(onPageChange);
      await fireEvent.click(getByText("20 / page"));
      expect(props.setImages).toHaveBeenCalled();
    });
  });

  test("PropertyImageListPagination check if pagination available or not for total images 0", async () => {
    const store = createStore(() => ({ ...tempStore }));
    const props = {
      images: [
      ],
    };
    const { queryByText, queryByTestId } = render(
      <Router history={history}>
        <PropertyImageListPagination {...props} />
      </Router>,
      {
        store,
      }
    );

    expect(
      queryByTestId("property-image-list-pagination")
    ).not.toBeInTheDocument();
    expect(queryByText("Images per page")).not.toBeInTheDocument();
    expect(queryByText("Next Page")).not.toBeInTheDocument();
    expect(queryByText("Previous Page")).not.toBeInTheDocument();
  });
});
