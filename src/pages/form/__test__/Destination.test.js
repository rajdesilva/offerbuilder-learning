import React from "react";
import { createStore } from "redux";
import { Destination } from "../Destination";
import { act, render, fireEvent, cleanup } from "../../../helpers/testUtils";

afterEach(cleanup);
describe("Destination component test", () => {
  test("create Destination components snapshot", () => {
    const reduxStore = {
      supplysearchParams: {
        destination: {},
        los: 1,
        onlySupplier: true,
        target: {
          suppliers: [],
          channels: [],
        },
        dateRange: {
          startDate: "2020-09-18",
          endDate: "2020-11-24",
        },

        lcn: false,
        remainingCapitalPool: "",
      },
      channels: {
        // loading: false,
        channels: [
          {
            id: "AT_CORDIAL",
            name: null,
            type: "Portal",
            status: "HIDDEN",
          },
          {
            id: "AT_KINDERHOTELS",
            name: "Ihr Bett im Allgäu",
            type: "Portal",
            status: "HIDDEN",
          },
        ],
      },
    };

    const store = createStore(() => ({ ...reduxStore }));
    const wrapper = render(<Destination />, {
      store,
    });
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot();
  });

  test("verify input set using props is working or not", () => {
    const reduxStore = {
      supplysearchParams: {},
    };
    const store = createStore(() => ({ ...reduxStore }));
    const geo = {
      value: {
        city: "Pune",
      },
    };
    const { getByTestId } = render(<Destination {...geo} />, {
      store,
    });
    const city = getByTestId("search-city-input").getAttribute("value");
    expect(city).toEqual(geo.value.city);
  });

  test("clear city (clear button) it should trigger callback", async () => {
    const reduxStore = {
      supplysearchParams: {},
    };
    const store = createStore(() => ({ ...reduxStore }));
    const onChangeDestinationMock = jest.fn();
    let props = {
      value: { city: "Vienna", lat: 48.2081743, lng: 16.3738189 },
      onChangeDestination: onChangeDestinationMock,
    };
    const { getByLabelText, getByTestId } = render(<Destination {...props} />, {
      store,
    });

    const clearBtn = getByLabelText("close-circle");
    act(() => {
      fireEvent.click(clearBtn);
    });
    const city = getByTestId("search-city-input").getAttribute("value");
    expect(city).not.toEqual(props.value.city);
    expect(onChangeDestinationMock).toHaveBeenCalledTimes(1);
  });
});
