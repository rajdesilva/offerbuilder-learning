import React from "react";
import { createStore } from "redux";
import Currency from "../Currency";
import { act, render, fireEvent, cleanup } from "../../../helpers/testUtils";

afterEach(cleanup);
describe("Currency component test", () => {
  test("Currency components snapshot", () => {
    const reduxStore = {
      currency: {
        loading: false,
        currencyList: ["INR"],
      },
    };
    const props = {
      onChange: jest.fn(),
      value: "INR",
      datatestid: "search-panel-currency-code",
    };
    const store = createStore(() => ({ ...reduxStore }));
    const { container } = render(<Currency {...props} />, {
      store,
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  test("verify input set using props is working or not", () => {
    const reduxStore = {
      currency: {
        loading: false,
        currencyList: ["INR"],
      },
    };
    const store = createStore(() => ({ ...reduxStore }));
    const props = {
      onChange: jest.fn(),
      value: "INR",
      datatestid: "search-panel-currency-code",
    };
    const { getByText } = render(<Currency {...props} />, {
      store,
    });

    expect(getByText("INR")).toBeInTheDocument();
  });

  test("on change of currency it should trigger event and get the value", async () => {
    const reduxStore = {
      currency: {
        loading: false,
        currencyList: ["INR", "USD"],
      },
    };
    const store = createStore(() => ({ ...reduxStore }));
    const onChangeMock = jest.fn();
    const props = {
      onChange: onChangeMock,
      onChangeCurrency: onChangeMock,
      value: "INR",
      datatestid: "search-panel-currency-code",
    };
    const {
      getByTestId,

      getByRole,
    } = render(<Currency {...props} />, {
      store,
    });
    const select = getByRole("combobox");

    await act(async () => {
      await fireEvent.keyDown(select, { key: "ArrowDown" });
      await fireEvent.click(getByTestId("USD"));
    });
    expect(onChangeMock).toHaveBeenCalledTimes(2);
  });
});
