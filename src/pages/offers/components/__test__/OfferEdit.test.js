import React from "react";
import { createStore } from "redux";
import { cloneDeep } from "lodash";

import {
  render,
  fireEvent,
  cleanup,
  waitFor,
} from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import OfferEdit from "../OfferEdit";

import { tempStore } from "./tempStore";
import { act } from "react-dom/test-utils";
import { history } from "../../../../helpers";

window.fetchWrapper = window.fetchWrapper = jest.fn().mockResolvedValue({
  success: true,
});

jest.mock("./../../service");

afterEach(cleanup);
beforeEach(cleanup);

describe("OfferEdit component test", () => {
  test("create OfferEdit components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const { container } = render(
      <MemoryRouter initialEntries={["/offers/edit/123"]}>
        <OfferEdit />
      </MemoryRouter>,
      {
        store,
      }
    );

    expect(container).toMatchSnapshot();
  });
  test("OfferEdit components- click on Cancel edit button", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/offers/edit/123"]}>
        <OfferEdit />
      </MemoryRouter>,
      {
        store,
      }
    );
    const cancelBtn = getByTestId("cancel-edit-offers-btn");
    fireEvent.click(cancelBtn);
    expect(cancelBtn).toBeTruthy();
    expect(history.location.pathname).toBe("/");
  });
  test("OfferEdit components- click on Save edit button, booking and travelling range are null so no error occurs", async () => {
    // both travelling and booking date range null
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const { getByTestId, queryByText } = render(
      <MemoryRouter initialEntries={["/offers/edit/123"]}>
        <OfferEdit />
      </MemoryRouter>,
      {
        store,
      }
    );
    const saveBtn = getByTestId("save-edit-offers-btn");
    await act(async () => {
      await fireEvent.click(saveBtn);
    });

    expect(saveBtn).toBeTruthy();
    expect(
      queryByText("Travelling Date Should Start On Or After Booking Date")
    ).not.toBeInTheDocument();
  });

  test("OfferEdit components- click on Save edit button and display booking and travelling error", async () => {
    const editStore = cloneDeep(tempStore);
    editStore.newoffersettingsparam.bookingDateRange = {
      startDate: "2021-03-01",
      endDate: "2021-03-08",
    };
    editStore.newoffersettingsparam.displayBookingDateRange = {
      startDate: "01.03.2021",
      endDate: "08.03.2021",
    };
    editStore.newoffersettingsparam.travellingDateRange = {
      startDate: "2021-02-01",
      endDate: "2021-03-08",
    };
    editStore.newoffersettingsparam.displayTravellingDateRange = {
      startDate: "01.02.2021",
      endDate: "08.03.2021",
    };

    const store = createStore(() => ({ ...editStore }));

    store.dispatch = jest.fn();
    const { getByTestId, getByText } = render(
      <MemoryRouter initialEntries={["/offers/edit/123"]}>
        <OfferEdit />
      </MemoryRouter>,
      {
        store,
      }
    );
    const saveBtn = getByTestId("save-edit-offers-btn");
    await act(async () => {
      await fireEvent.click(saveBtn);
    });

    expect(saveBtn).toBeTruthy();
    waitFor(() => {
      expect(
        getByText(/Travelling Date Should Start On Or After Booking Date/i)
      ).toBeInTheDocument();
    });
  });
});
