import React from "react";
import { createStore } from "redux";
import { render, fireEvent, act } from "../../../../helpers/testUtils";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import * as service from "./../../service";
import ArchiveOffersPagination from "../ArchiveOffersPagination";
import { cloneDeep } from "lodash";
jest.mock("./../../service");
const history = createMemoryHistory();

const PaginationStore = {
  offerlistsearchandfilters: {
    loading: false,
    offers: [{}],
    totalOffers: 15,
    pageOffset: 0,
    pageSize: 10,
  },
};

describe("ArchiveOffersPagination test", () => {
  test("create ArchiveOffersPagination components snapshot", () => {
    const store = createStore(() => ({ ...PaginationStore }));
    const wrapper = render(
      <Router history={history}>
        <ArchiveOffersPagination />
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
        <ArchiveOffersPagination />
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
    const searchAndFilterOfferFn = jest.spyOn(service, "searchAndFilterOffer");

    expect(getByTestId("archive-offer-list-pagination")).toBeInTheDocument();
    expect(getByText(/Row per page/i)).toBeInTheDocument();
    expect(getByTitle("Next Page")).toBeInTheDocument();
    expect(getByTitle("Previous Page")).toBeInTheDocument();
    expect(getByTitle("1")).toBeInTheDocument();
    expect(getByTitle("2")).toBeInTheDocument();

    fireEvent.click(getByTitle("2"));
    expect(searchAndFilterOfferFn).toHaveBeenCalledTimes(1);
    fireEvent.click(getByTitle("1"));
    expect(searchAndFilterOfferFn).toHaveBeenCalledTimes(1);
  });
  test("check pagination for 20 per page available or not", async () => {
    const store = createStore(() => ({ ...PaginationStore }));
    const { getByText, getByTestId } = render(
      <Router history={history}>
        <ArchiveOffersPagination />
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
    const searchAndFilterOfferFn = jest.spyOn(service, "searchAndFilterOffer");
    const onPageChange = getByTestId(
      "archive-offer-list-pagination"
    ).querySelector("input");
    await act(async () => {
      await fireEvent.mouseDown(onPageChange);
      await fireEvent.click(getByText("20 / page"));
      expect(searchAndFilterOfferFn).toHaveBeenCalled();
    });
  });

  test("ArchiveOffersPagination check if pagination available or not for total offers 0", async () => {
    const tempStore = cloneDeep(PaginationStore);
    tempStore.offerlistsearchandfilters.totalOffers = 0;
    const store = createStore(() => ({ ...tempStore }));
    const { queryByText, queryByTestId } = render(
      <Router history={history}>
        <ArchiveOffersPagination />
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
      queryByTestId("archive-offer-list-pagination")
    ).not.toBeInTheDocument();
    expect(queryByText("Row per page")).not.toBeInTheDocument();
    expect(queryByText("Next Page")).not.toBeInTheDocument();
    expect(queryByText("Previous Page")).not.toBeInTheDocument();
  });
});
