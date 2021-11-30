import React from "react";
import { createStore } from "redux";
import {
  render,
  fireEvent,
  cleanup,
  waitFor,
} from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import OfferFilters from "../OfferFilters";
import * as Util from "../../../../helpers/utility/checkIfUserHasRole";
import { tempStore } from "./tempStore";
import { act } from "react-dom/test-utils";
import { appConstants } from "../../../../common";
import { history } from "../../../../helpers";
import { cloneDeep } from "lodash";

window.fetchWrapper = window.fetchWrapper = jest.fn().mockResolvedValue({
  success: true,
});
afterEach(cleanup);
describe("OfferFilters component test", () => {
  test("create OfferFilters components snapshot", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const { container, getByTestId } = render(
      <MemoryRouter>
        <OfferFilters currentSelectedTab={appConstants.offerListTab.ACTIVE} />
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
  test("OfferFilters components- click on cancel ", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const { getByTestId, queryByText } = render(
      <MemoryRouter>
        <OfferFilters currentSelectedTab={appConstants.offerListTab.ACTIVE} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const filterBtn = getByTestId("filter-ic-btn");
    act(() => {
      fireEvent.click(filterBtn);
    });

    const cancelBtn = getByTestId("filter-offer-cancel-btn");
    act(() => {
      fireEvent.click(cancelBtn);
    });
    waitFor(() => expect(queryByText("Filter By")).not.toBeInTheDocument());
  });
  test("OfferFilters components- click on reset ", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const resetCallback = jest.fn();
    const { queryByText, getByTestId } = render(
      <MemoryRouter>
        <OfferFilters
          currentSelectedTab={appConstants.offerListTab.ACTIVE}
          resetCallback={resetCallback}
        />
      </MemoryRouter>,
      {
        store,
      }
    );
    const filterBtn = getByTestId("filter-ic-btn");
    await act(async () => {
      await fireEvent.click(filterBtn);
    });
    const resetBtn = getByTestId("filter-offer-reset-btn");
    act(() => {
      fireEvent.click(resetBtn);
      expect(resetCallback).toHaveBeenCalledTimes(1);
    });
    waitFor(() => {
      expect(queryByText("Filter By")).not.toBeInTheDocument();
      expect(history.location.pathname).toBe("/");
    });
  });
  test("OfferFilters components- click on apply ", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const { queryByText, getByTestId } = render(
      <MemoryRouter>
        <OfferFilters currentSelectedTab={appConstants.offerListTab.ACTIVE} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const filterBtn = getByTestId("filter-ic-btn");
    await act(async () => {
      await fireEvent.click(filterBtn);
    });
    const applyBtn = getByTestId("filter-offer-filter-btn");
    act(() => {
      fireEvent.click(applyBtn);
    });
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    waitFor(() => {
      expect(queryByText("Filter By")).not.toBeInTheDocument();
    });
  });

  test("OfferFilters components- check if badge is in the DOM or not and counter is hidden for initial case", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
        <OfferFilters currentSelectedTab={appConstants.offerListTab.ACTIVE} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const filterBtn = getByTestId("filter-ic-btn");
    act(() => {
      fireEvent.click(filterBtn);
    });
    const badge = getByTestId("offers-filter-badge");
    expect(badge).toBeTruthy();
    const counter = badge.querySelector(
      '[class="ant-scroll-number-only-unit current"]'
    );
    expect(counter).toBe(null);
  });

  test("OfferFilters components- check if badge is in the DOM with filter selected count as 1", async () => {
    const filterStore = cloneDeep(tempStore);
    filterStore.offerlistsearchandfilters.appliedFilters.lcn = true;
    const store = createStore(() => ({ ...filterStore }));
    store.dispatch = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
        <OfferFilters currentSelectedTab={appConstants.offerListTab.ACTIVE} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const filterBtn = getByTestId("filter-ic-btn");
    act(() => {
      fireEvent.click(filterBtn);
    });
    const badge = getByTestId("offers-filter-badge");
    const counter = badge.querySelector(
      '[class="ant-scroll-number-only-unit current"]'
    );
    expect(counter.textContent).toBe("1");
  });

  test("OfferFilters components- check if badge is in the DOM with count as 4 for filter selected brand, storefront, supplier, channel", async () => {
    const filterStore = cloneDeep(tempStore);
    filterStore.offerlistsearchandfilters.appliedFilters = {
      brands: ["idb"],
      storefronts: ["ids"],
      suppliers: ["ntp"],
      channels: ["DEMO_OFFERBUILDER"],
      status: [
        {
          id: "UNPUBLISHED",
          name: "UNPUBLISHED",
        },
        {
          id: "PUBLISHED",
          name: "PUBLISHED",
        },
      ],
      searchInputText: "",
    };
    const store = createStore(() => ({ ...filterStore }));
    store.dispatch = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
        <OfferFilters currentSelectedTab={appConstants.offerListTab.ACTIVE} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const filterBtn = getByTestId("filter-ic-btn");
    act(() => {
      fireEvent.click(filterBtn);
    });
    const badge = getByTestId("offers-filter-badge");
    const counter = badge.querySelector(
      '[class="ant-scroll-number-only-unit current"]'
    );
    expect(counter.textContent).toBe("4");
  });

  test("OfferFilters components- check if badge is in the DOM with count as 2 for filter selected supplier, channel", async () => {
    const filterStore = cloneDeep(tempStore);
    filterStore.offerlistsearchandfilters.appliedFilters = {
      brands: [],
      storefronts: [],
      suppliers: ["ntp"],
      channels: ["DEMO_OFFERBUILDER"],
      status: [
        {
          id: "UNPUBLISHED",
          name: "UNPUBLISHED",
        },
        {
          id: "PUBLISHED",
          name: "PUBLISHED",
        },
      ],
      searchInputText: "",
    };
    const store = createStore(() => ({ ...filterStore }));
    store.dispatch = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
        <OfferFilters currentSelectedTab={appConstants.offerListTab.ACTIVE} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const filterBtn = getByTestId("filter-ic-btn");
    act(() => {
      fireEvent.click(filterBtn);
    });
    const badge = getByTestId("offers-filter-badge");
    const counter = badge.querySelector(
      '[class="ant-scroll-number-only-unit current"]'
    );
    expect(counter.textContent).toBe("2");
  });

  test("OfferFilters components- check if badge is in the DOM with count as 6 for filter selected brand, storefront, supplier, channel, lcn and status", async () => {
    const filterStore = cloneDeep(tempStore);
    filterStore.offerlistsearchandfilters.appliedFilters = {
      brands: ["idb"],
      storefronts: ["ids"],
      suppliers: ["ntp"],
      channels: ["DEMO_OFFERBUILDER"],
      status: [
        {
          id: "UNPUBLISHED",
          name: "UNPUBLISHED",
        },
      ],
      lcn: true,
      searchInputText: "",
    };
    const store = createStore(() => ({ ...filterStore }));
    store.dispatch = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
        <OfferFilters currentSelectedTab={appConstants.offerListTab.ACTIVE} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const filterBtn = getByTestId("filter-ic-btn");
    act(() => {
      fireEvent.click(filterBtn);
    });
    const badge = getByTestId("offers-filter-badge");
    const counter = badge.querySelector(
      '[class="ant-scroll-number-only-unit current"]'
    );
    expect(counter.textContent).toBe("6");
  });

  test("OfferFilters components- check if badge is in the DOM with filter selected count as 0 when status is published on archive tab ", async () => {
    const filterStore = cloneDeep(tempStore);
    filterStore.offerlistsearchandfilters.appliedFilters = {
      brands: [],
      storefronts: [],
      suppliers: [],
      channels: [],
      status: [
        {
          id: "PUBLISHED",
          name: "PUBLISHED",
        },
      ],
      searchInputText: "",
    };
    const store = createStore(() => ({ ...filterStore }));
    store.dispatch = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
        <OfferFilters currentSelectedTab={appConstants.offerListTab.ARCHIVE} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const filterBtn = getByTestId("filter-ic-btn");
    act(() => {
      fireEvent.click(filterBtn);
    });
    const badge = getByTestId("offers-filter-badge");
    const counter = badge.querySelector(
      '[class="ant-scroll-number-only-unit current"]'
    );
    expect(counter).toBe(null);
  });

  test("OfferFilters components- check if badge is in the DOM with filter selected count as 1 when status is published on active tab ", async () => {
    const filterStore = cloneDeep(tempStore);
    filterStore.offerlistsearchandfilters.appliedFilters = {
      brands: [],
      storefronts: [],
      suppliers: [],
      channels: [],
      status: [
        {
          id: "PUBLISHED",
          name: "PUBLISHED",
        },
      ],
      searchInputText: "",
    };
    const store = createStore(() => ({ ...filterStore }));
    store.dispatch = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
        <OfferFilters currentSelectedTab={appConstants.offerListTab.ACTIVE} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const filterBtn = getByTestId("filter-ic-btn");
    act(() => {
      fireEvent.click(filterBtn);
    });
    const badge = getByTestId("offers-filter-badge");
    const counter = badge.querySelector(
      '[class="ant-scroll-number-only-unit current"]'
    );
    expect(counter.textContent).toBe("1");
  });

  test("OfferFilters components- check if badge is in the DOM with filter selected count as 0 when status is empty on active tab ", async () => {
    const filterStore = cloneDeep(tempStore);
    filterStore.offerlistsearchandfilters.appliedFilters = {
      brands: [],
      storefronts: [],
      suppliers: [],
      channels: [],
      status: [],
      searchInputText: "",
    };
    const store = createStore(() => ({ ...filterStore }));
    store.dispatch = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
        <OfferFilters currentSelectedTab={appConstants.offerListTab.ACTIVE} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const filterBtn = getByTestId("filter-ic-btn");
    act(() => {
      fireEvent.click(filterBtn);
    });
    const badge = getByTestId("offers-filter-badge");
    const counter = badge.querySelector(
      '[class="ant-scroll-number-only-unit current"]'
    );
    expect(counter).toBe(null);
  });

  test("OfferFilters components- check if property type filter is in the DOM for admin user", async () => {
    const filterStore = cloneDeep(tempStore);
    filterStore.offerlistsearchandfilters.appliedFilters = {
      brands: [],
      storefronts: [],
      suppliers: [],
      channels: [],
      status: [],
      propertyTypes: [],
      searchInputText: "",
    };
    const checkIfUserHasRole = jest.spyOn(Util, "checkIfUserHasRole");
    checkIfUserHasRole.mockReturnValue(true);
    const store = createStore(() => ({ ...filterStore }));

    store.dispatch = jest.fn();
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <OfferFilters currentSelectedTab={appConstants.offerListTab.ACTIVE} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const filterBtn = getByTestId("filter-ic-btn");
    act(() => {
      fireEvent.click(filterBtn);
    });
    expect(getByText(/Property type/i)).toBeInTheDocument();
  });

  test("OfferFilters components- check if property type filter is not in the DOM for users other than admin", async () => {
    const filterStore = cloneDeep(tempStore);
    filterStore.offerlistsearchandfilters.appliedFilters = {
      brands: [],
      storefronts: [],
      suppliers: [],
      channels: [],
      status: [],
      propertyTypes: [],
      searchInputText: "",
    };
    const checkIfUserHasRole = jest.spyOn(Util, "checkIfUserHasRole");
    checkIfUserHasRole.mockReturnValue(false);
    const store = createStore(() => ({ ...filterStore }));

    store.dispatch = jest.fn();
    const { getByTestId, queryByTestId } = render(
      <MemoryRouter>
        <OfferFilters currentSelectedTab={appConstants.offerListTab.ACTIVE} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const filterBtn = getByTestId("filter-ic-btn");
    act(() => {
      fireEvent.click(filterBtn);
    });
    expect(queryByTestId("property-type-filter")).not.toBeInTheDocument();
  });

  test("OfferFilters components- check if property type is in the DOM with filter selected count as 1 when type is selected on active tab ", async () => {
    const filterStore = cloneDeep(tempStore);
    filterStore.offerlistsearchandfilters.targetfilterdata = {
      brands: [],
      storefronts: [],
      suppliers: [],
      channels: [],
      propertyTypes: appConstants.PROPERTY_TYPE_LIST
    };
    filterStore.offerlistsearchandfilters.appliedFilters = {
      brands: [],
      storefronts: [],
      suppliers: [],
      channels: [],
      status: [],
      propertyTypes: 'DEMO',
      searchInputText: "",
    };
    const checkIfUserHasRole = jest.spyOn(Util, "checkIfUserHasRole");
    checkIfUserHasRole.mockReturnValue(true);
    const store = createStore(() => ({ ...filterStore }));
    store.dispatch = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
        <OfferFilters currentSelectedTab={appConstants.offerListTab.ACTIVE} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const filterBtn = getByTestId("filter-ic-btn");
    act(() => {
      fireEvent.click(filterBtn);
    });
    const badge = getByTestId("offers-filter-badge");
    const counter = badge.querySelector(
      '[class="ant-scroll-number-only-unit current"]'
    );
    expect(counter.textContent).toBe("1");
  });
});
