import React from "react";
import { createStore } from "redux";
import { render, fireEvent, act } from "../../../../helpers/testUtils";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import * as service from "./../../service";
import OfferImagesPagination from "../OfferImagesPagination";
import { cloneDeep } from "lodash";
jest.mock("./../../service");
const history = createMemoryHistory();

const PaginationStore = {
  offerimagesearchandfilters: {
    loading: false,
    offerImageList: [],
    pageOffset: 0,
    pageSize: 10,
    totalOfferImages: 12,
  },
};

global.scrollTo = jest.fn()

describe("OfferImagesPagination test", () => {
  test("create OfferImagesPagination components snapshot", () => {
    const store = createStore(() => ({ ...PaginationStore }));
    const wrapper = render(
      <Router history={history}>
        <OfferImagesPagination />
      </Router>,
      {
        store,
      }
    );
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot();
  });

  test("check pagination is available or not", async () => {
    const store = createStore(() => ({ ...PaginationStore }));
    const { getByText, getByTestId, getByTitle } = render(
      <Router history={history}>
        <OfferImagesPagination />
      </Router>,
      {
        store,
      }
    );
    service.searchAndFilterImages.mockImplementation(() => {
      return Promise.resolve({
        status: true,
      });
    });
    const searchAndFilterImagesBtn = jest.spyOn(
      service,
      "searchAndFilterImages"
    );

    expect(getByTestId("offer-image-list-pagination")).toBeInTheDocument();
    expect(getByText(/Images per page/i)).toBeInTheDocument();
    expect(getByTitle("Next Page")).toBeInTheDocument();
    expect(getByTitle("Previous Page")).toBeInTheDocument();
    expect(getByTitle("1")).toBeInTheDocument();
    expect(getByTitle("2")).toBeInTheDocument();

    fireEvent.click(getByTitle("2"));
    expect(searchAndFilterImagesBtn).toHaveBeenCalledTimes(1);
    fireEvent.click(getByTitle("1"));
    expect(searchAndFilterImagesBtn).toHaveBeenCalledTimes(1);
  });

  test("check pagination for 20 per page available or not", async () => {
    const store = createStore(() => ({ ...PaginationStore }));
    const { getByText, getByTestId } = render(
      <Router history={history}>
        <OfferImagesPagination />
      </Router>,
      {
        store,
      }
    );
    service.searchAndFilterImages.mockImplementation(() => {
      return Promise.resolve({
        status: true,
      });
    });
    const searchAndFilterImagesBtn = jest.spyOn(
      service,
      "searchAndFilterImages"
    );
    const onPageChange = getByTestId(
      "offer-image-list-pagination"
    ).querySelector("input");
    await act(async () => {
      await fireEvent.mouseDown(onPageChange);
      await fireEvent.click(getByText("20 / page"));
      expect(searchAndFilterImagesBtn).toHaveBeenCalled();
    });
  });

  test("OfferImagesPagination check if pagination available or not for total offers 0", async () => {
    const tempStore = cloneDeep(PaginationStore);
    tempStore.offerimagesearchandfilters.totalOfferImages = 0;
    const store = createStore(() => ({ ...tempStore }));
    const { queryByText, queryByTestId } = render(
      <Router history={history}>
        <OfferImagesPagination />
      </Router>,
      {
        store,
      }
    );
    service.searchAndFilterOffer.mockImplementation(() => {
      return Promise.resolve({
        status: true,
      });
    });

    expect(
      queryByTestId("offer-image-list-pagination")
    ).not.toBeInTheDocument();
    expect(queryByText("Images per page")).not.toBeInTheDocument();
    expect(queryByText("Next Page")).not.toBeInTheDocument();
    expect(queryByText("Previous Page")).not.toBeInTheDocument();
  });
});
