import React from "react";
import { createStore } from "redux";
import { render, fireEvent, cleanup } from "../../../../helpers/testUtils";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import { PropertyCartList } from "../PropertyCartList";
import { tempStore } from "../../../offers/components/__test__/tempStore";
jest.mock("./../../service");
const history = createMemoryHistory();

afterEach(cleanup);
describe("display property component test", () => {
  test("create display property components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    const wrapper = render(
      <Router history={history}>
        <PropertyCartList />
      </Router>,
      {
        store,
      }
    );
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot();
  });

  test("check all the property details is available or not", () => {
    const store = createStore(() => ({ ...tempStore }));
    const { getByText, getByTestId } = render(
      <Router history={history}>
        <PropertyCartList />
      </Router>,
      {
        store,
      }
    );
    expect(getByText(/Properties in offer/i)).toBeInTheDocument();
    expect(getByTestId("properties-count").textContent).toEqual("1");
  });
  test("check propertyList Button is Disabled or not when data is not there", () => {
    const store = createStore(() => ({ ...tempStore }));
    const { getByText } = render(
      <Router history={history}>
        <PropertyCartList />
      </Router>,
      {
        store,
      }
    );
    const propertyList = getByText(/Properties in offer/i);
    expect(propertyList).toBeEnabled();
  });

  test("check Modals is opening or not after click on property List Button", () => {
    const store = createStore(() => ({ ...tempStore }));
    const { getByTestId, getByText } = render(
      <Router history={history}>
        <PropertyCartList />
      </Router>,
      {
        store,
      }
    );
    const propertyListBtn = getByTestId("property-list-modal");
    fireEvent.click(propertyListBtn);

    // check two buttons
    expect(getByText("Cancel")).toBeInTheDocument();

    expect(getByTestId("proceed").textContent.trim()).toEqual(
      "Proceed to Settings"
    );

    // check for columns
    expect(getByText("Properties")).toBeInTheDocument();
    expect(getByText("Margin")).toBeInTheDocument();
    expect(getByText("Supplier")).toBeInTheDocument();
  });

  test("check cancel Button in the cart modal", () => {
    const store = createStore(() => ({ ...tempStore }));
    const handleProceed = jest.fn();

    const { getByTestId, queryByText } = render(
      <Router history={history}>
        <PropertyCartList
          {...{
            next: handleProceed,
            isEditFlow: false,
          }}
        />
      </Router>,
      {
        store,
      }
    );

    const propertyListBtn = getByTestId("property-list-modal");
    fireEvent.click(propertyListBtn);

    const cancel = getByTestId("cancel");
    fireEvent.click(cancel);
    expect(queryByText("Proceed to Settings")).not.toBeInTheDocument();
  });

  test("check proceed to Button in the cart modal", () => {
    const store = createStore(() => ({ ...tempStore }));

    const proceedFnHandler = jest.fn();

    const { getByTestId, queryByText } = render(
      <Router history={history}>
        <PropertyCartList
          {...{
            next: proceedFnHandler,
            isEditFlow: false,
          }}
        />
      </Router>,
      {
        store,
      }
    );
    const propertyListBtn = getByTestId("property-list-modal");
    fireEvent.click(propertyListBtn);

    const proceedBtn = getByTestId("proceed");
    fireEvent.click(proceedBtn);

    expect(queryByText("Cancel")).not.toBeInTheDocument();
    expect(proceedFnHandler).toHaveBeenCalledTimes(1);
  });

  test("check cart in the Edit Flow ", () => {
    const store = createStore(() => ({ ...tempStore }));

    const proceedFnHandler = jest.fn();

    const { getByTestId, queryByText } = render(
      <Router history={history}>
        <PropertyCartList
          {...{
            next: proceedFnHandler,
            isEditFlow: true,
          }}
        />
      </Router>,
      {
        store,
      }
    );
    const propertyListBtn = getByTestId("property-list-modal");
    fireEvent.click(propertyListBtn);

    expect(queryByText("Cancel")).not.toBeInTheDocument();
    expect(queryByText("Proceed to Settings")).not.toBeInTheDocument();
  });
});
