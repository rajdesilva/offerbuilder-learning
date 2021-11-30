import React from "react";
import { createStore } from "redux";
import { render, fireEvent, act } from "../../../../helpers/testUtils";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import * as service from "./../../service";
import { SearchResultPagination } from "../SearchResultPagination";
import { PaginationStore } from "./ReduxSearchResultPagination";
jest.mock("./../../service");
const history = createMemoryHistory();

describe("display property component test", () => {
  test("create display property components snapshot", () => {
    const store = createStore(() => ({ ...PaginationStore }));
    const wrapper = render(
      <Router history={history}>
        <SearchResultPagination />
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
        <SearchResultPagination />
      </Router>,
      {
        store,
      }
    );
    service.searchSupply.mockImplementation(() => {
      return Promise.resolve({
        status: true,
      });
    });
    const searchSupplyFn = jest.spyOn(service, "searchSupply");

    expect(getByTestId("pagination")).toBeInTheDocument();
    expect(getByText(/Row per page/i)).toBeInTheDocument();
    expect(getByTitle("Next Page")).toBeInTheDocument();
    expect(getByTitle("Previous Page")).toBeInTheDocument();
    expect(getByTitle("1")).toBeInTheDocument();
    expect(getByTitle("2")).toBeInTheDocument();

    fireEvent.click(getByTitle("2"));
    expect(searchSupplyFn).toHaveBeenCalledTimes(1);
    fireEvent.click(getByTitle("1"));
    expect(searchSupplyFn).toHaveBeenCalledTimes(1);
  });
  test("check pagination for 20 per page available or not", async () => {
    const store = createStore(() => ({ ...PaginationStore }));
    const { getByText, getByTestId } = render(
      <Router history={history}>
        <SearchResultPagination />
      </Router>,
      {
        store,
      }
    );
    service.searchSupply.mockImplementation(() => {
      return Promise.resolve({
        status: true,
      });
    });
    const searchSupplyFn = jest.spyOn(service, "searchSupply");
    const onPageChange = getByTestId("pagination").querySelector("input");
    await act(async () => {
      await fireEvent.mouseDown(onPageChange);
      await fireEvent.click(getByText("20 / page"));
      expect(searchSupplyFn).toHaveBeenCalled();
    });
  });
});
