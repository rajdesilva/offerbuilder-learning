import React from "react";
import { createStore } from "redux";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import * as service from "./../../service";
import { render, fireEvent, act } from "../../../../helpers/testUtils";
import { PropertySort } from "../PropertySort";
import { tempStore } from "../../../offers/components/__test__/tempStore";

jest.mock("./../../service");
const history = createMemoryHistory();

describe("PropertySort component test cases", () => {
  test("PropertySort component snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    const props = {
      sortBy: {
        sortOrder: "DESCENDING",
        sortCriteria: "PRICE",
      },
    };
    const wrapper = render(
      <Router history={history}>
        <PropertySort {...props} />
      </Router>,
      {
        store,
      }
    );
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot();
  });

  test("PropertySort - dispatch event when the option in sort is changed", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      sortBy: {
        sortOrder: "DESCENDING",
        sortCriteria: "PRICE",
      },
    };
    const { getByTestId } = render(
      <Router history={history}>
        <PropertySort {...props} />
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
    const onPageChange = getByTestId("property-sort-order-by").querySelector(
      "input"
    );
    await act(async () => {
      await fireEvent.mouseDown(onPageChange);
      await fireEvent.click(getByTestId("sort-name-descending"));
      expect(searchSupplyFn).toHaveBeenCalled();
    });
  });
});
