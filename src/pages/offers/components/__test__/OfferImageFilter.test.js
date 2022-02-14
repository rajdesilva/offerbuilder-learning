import React from "react";
import { createStore } from "redux";
import {
  render,
  fireEvent,
  cleanup,
  waitFor,
} from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import OfferImageFilter from "../OfferImageFilter";
import { tempStore } from "./tempStore";
import { act } from "react-dom/test-utils";
import * as service from "./../../service";
import { appConstants } from "../../../../common";

import { cloneDeep } from "lodash";

window.fetchWrapper = window.fetchWrapper = jest.fn().mockResolvedValue({
  success: true,
});
jest.mock("./../../service");
afterEach(cleanup);
describe("OfferImageFilter component test", () => {
  test("create OfferImageFilter components snapshot", async () => {
    const filterStore = cloneDeep(tempStore);
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const { container, getByTestId } = render(
      <MemoryRouter>
        <OfferImageFilter />
      </MemoryRouter>,
      {
        store,
      }
    );

    const filterBtn = getByTestId("filter-ic-btn");
    act(() => {
      fireEvent.click(filterBtn);
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  test("OfferImageFilter components- click on cancel ", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      hideDetailsView: jest.fn(),
    }
    const { getByTestId, queryByText } = render(
      <MemoryRouter>
        <OfferImageFilter {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const filterBtn = getByTestId("filter-ic-btn");
    act(() => {
      fireEvent.click(filterBtn);
    });
    // screen.debug();
    const cancelBtn = getByTestId("filter-offer-image-cancel-btn");
    act(() => {
      fireEvent.click(cancelBtn);
    });
    waitFor(() => {
      expect(queryByText("Filter By")).not.toBeInTheDocument();
    })
  });

  test("OfferImageFilter components- click on reset and see dispatch is called", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      hideDetailsView: jest.fn(),
    };
    const { getByTestId } = render(
      <MemoryRouter>
        <OfferImageFilter {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const filterBtn = getByTestId("filter-ic-btn");
    await act(async () => {
      await fireEvent.click(filterBtn);
    });
    const resetBtn = getByTestId("filter-offer-image-reset-btn");
    act(() => {
      fireEvent.click(resetBtn);
    });
    expect(service.searchAndFilterImages).toHaveBeenCalledTimes(1);
    expect(props.hideDetailsView).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });

  test("OfferImageFilter components- click on apply and see if service is called", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      hideDetailsView: jest.fn(),
    }
    const { getByTestId } = render(
      <MemoryRouter>
        <OfferImageFilter {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const filterBtn = getByTestId("filter-ic-btn");
    await act(async () => {
      await fireEvent.click(filterBtn);
    });
    const applyBtn = getByTestId("filter-offer-image-apply-btn");
    act(() => {
      fireEvent.click(applyBtn);
    });
    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });

  test("OfferImageFilter components- check if badge is in the DOM or not and counter is hidden for initial case", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      hideDetailsView: jest.fn(),
    };
    const { getByTestId } = render(
      <MemoryRouter>
        <OfferImageFilter {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const filterBtn = getByTestId("filter-ic-btn");
    act(() => {
      fireEvent.click(filterBtn);
    });
    const badge = getByTestId("offers-image-filter-badge");
    expect(badge).toBeTruthy();
    const counter = badge.querySelector(
      '[class="ant-scroll-number-only-unit current"]'
    );
    expect(counter).toBe(null);
  });

  test("OfferImageFilter components- check if badge is in the DOM with filter selected count as 1", async () => {
    const filterStore = cloneDeep(tempStore);
    filterStore.offerimagesearchandfilters.appliedImageFilters.fileName =
      "testfile";
    const store = createStore(() => ({ ...filterStore }));
    store.dispatch = jest.fn();
    const props = {
      hideDetailsView: jest.fn(),
    };
    const { getByTestId } = render(
      <MemoryRouter>
        <OfferImageFilter {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const filterBtn = getByTestId("filter-ic-btn");
    act(() => {
      fireEvent.click(filterBtn);
    });
    const badge = getByTestId("offers-image-filter-badge");
    const counter = badge.querySelector(
      '[class="ant-scroll-number-only-unit current"]'
    );
    expect(counter.textContent).toBe("1");
  });

  test("OfferImageFilter components- check if badge is in the DOM with count as 5 for filter selected brand, storefront, supplier, channel", async () => {
    const filterStore = cloneDeep(tempStore);
    filterStore.offerimagesearchandfilters.appliedImageFilters = {
      fileName: "testing",
      uploadDateRange: {
        uploadedStartDate: "2020-01-01",
        uploadedEndDate: "2021-03-01",
      },
      uploadedByCurrentUser: appConstants.OFFER_IMAGE.INCLUDE,
      usedInAnyOffer: appConstants.OFFER_IMAGE.EXCLUDE,
      offerIds: "offer123",
    };
    const props = {
      hideDetailsView: jest.fn(),
    };
    const store = createStore(() => ({ ...filterStore }));
    store.dispatch = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
        <OfferImageFilter {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const filterBtn = getByTestId("filter-ic-btn");
    act(() => {
      fireEvent.click(filterBtn);
    });
    const badge = getByTestId("offers-image-filter-badge");
    const counter = badge.querySelector(
      '[class="ant-scroll-number-only-unit current"]'
    );
    expect(counter.textContent).toBe("5");
  });
});
