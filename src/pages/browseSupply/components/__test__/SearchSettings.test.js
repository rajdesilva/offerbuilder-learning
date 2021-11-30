import React from "react";
import { createStore } from "redux";
import { SearchSettings } from "../SearchSettings";
import { render, fireEvent, act, cleanup } from "../../../../helpers/testUtils";
import * as Util from "../../../../helpers/utility/checkIfUserHasRole";
import { ReduxForSearchSettings } from "./ReduxForSearchSettings";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../service");

window.scrollTo = jest.fn();

afterEach(cleanup);
describe("SearchSettings component test-cases", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  test("create SearchSettings components snapshot", () => {
    const store = createStore(() => ({ ...ReduxForSearchSettings }));
    const wrapper = render(
      <MemoryRouter initialEntries={["/browse-supply/"]}>
        <SearchSettings />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot();
  });
  test("onlysupplier flag is false and target component should have brand, storefront, supplier and channels select dropdown", () => {
    process.env.REACT_APP_HIDE_CLIENT_AND_STORE = true;
    const store = createStore(() => ({ ...ReduxForSearchSettings }));

    const { getByText, getByTestId, queryByText } = render(
      <MemoryRouter initialEntries={["/browse-supply/"]}>
        <SearchSettings />
      </MemoryRouter>,
      {
        store,
      }
    );

    const searchBtn = getByTestId("browse-supply-search-submit-btn");
    act(async () => {
      await fireEvent.click(searchBtn);
    });
    expect(getByText("Target")).toBeInTheDocument();
    expect(queryByText("Client")).not.toBeInTheDocument(); // REACT_APP_HIDE_CLIENT_AND_STORE
    expect(getByText("Store")).toBeInTheDocument();
    expect(getByText("Supplier")).toBeInTheDocument();
    expect(getByText("Channels Only For NTP")).toBeInTheDocument();
    expect(queryByText("Add client")).not.toBeInTheDocument(); // REACT_APP_HIDE_CLIENT_AND_STORE
  });

  test("onlysupplier flag is false and Click on Add Brand Button, it should have remove from source text on the dom", async () => {
    const store = createStore(() => ({ ...ReduxForSearchSettings }));
    const { getByText, getByTestId, queryByText } = render(
      <MemoryRouter initialEntries={["/browse-supply/"]}>
        <SearchSettings />
      </MemoryRouter>,
      {
        store,
      }
    );

    const addBrand = getByTestId("add-brand");
    await act(() => {
      fireEvent.click(addBrand);
    });
    expect(getByText("Remove this source")).toBeInTheDocument();
    expect(queryByText("Add client")).not.toBeInTheDocument();
  });

  test("onlysupplier flag is true then component should render only supplier and channel on the dom", async () => {
    const tempStore = { ...ReduxForSearchSettings };
    tempStore.searchparams.onlySupplier = true;
    const store = createStore(() => ({ ...tempStore }));
    const { queryByText } = render(
      <MemoryRouter initialEntries={["/browse-supply/"]}>
        <SearchSettings />
      </MemoryRouter>,
      {
        store,
      }
    );

    expect(queryByText("Client")).not.toBeInTheDocument();
    expect(queryByText("Store")).not.toBeInTheDocument();
    expect(queryByText("Add client")).not.toBeInTheDocument();
  });

  test("check all form labels are available or not", () => {
    const ReduxForSearchSettings = {
      searchparams: {},
    };
    const store = createStore(() => ({ ...ReduxForSearchSettings }));
    const { getByText, getByTestId } = render(
      <MemoryRouter initialEntries={["/browse-supply/"]}>
        <SearchSettings />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(getByText(/Destination/i)).toBeInTheDocument();
    expect(getByText(/Hotel Name/i)).toBeInTheDocument();
    expect(getByText(/Date Range/i)).toBeInTheDocument();
    expect(getByText(/Length Of Stay/i)).toBeInTheDocument();
    expect(getByText(/Target/i)).toBeInTheDocument();
    expect(getByText(/LCN/i)).toBeInTheDocument();
    expect(getByTestId("browse-supply-search-submit-btn")).toBeInTheDocument();
  });

  test("click on the search button and verify form has correct values", async () => {
    const tempStore = { ...ReduxForSearchSettings };
    tempStore.searchparams.onlySupplier = false;
    tempStore.searchparams.brands = [
      {
        storefronts: [
          {
            id: "ids",
            name: "Internal Demo Storefront",
            suppliers: [
              {
                id: "ntp",
                name: "NTP",
                channels: [
                  {
                    id: "DEMO_OFFERBUILDER",
                    name: "DEMO_OFFERBUILDER",
                  },
                ],
              },
            ],
          },
        ],
        id: "idb",
        name: "Internal Demo Brand",
      },
    ];

    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const { getByText } = render(
      <MemoryRouter initialEntries={["/browse-supply/"]}>
        <SearchSettings />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(
      getByText(tempStore.searchparams.brands[0]["name"])
    ).toBeInTheDocument();
    expect(
      getByText(tempStore.searchparams.brands[0].storefronts[0].name)
    ).toBeInTheDocument();
    expect(
      getByText(
        tempStore.searchparams.brands[0].storefronts[0].suppliers[0].name
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        tempStore.searchparams.brands[0].storefronts[0].suppliers[0].channels[0]
          .name
      )
    ).toBeInTheDocument();
  });

  test("brand, storefront, supplier and channel validation", async () => {
    const tempStore = { ...ReduxForSearchSettings };
    tempStore.searchparams.onlySupplier = false;
    tempStore.searchparams.brands = [
      {
        storefronts: [
          {
            id: "ids",
            name: "Internal Demo Storefront",
            suppliers: [
              {
                id: "ntp",
                name: "NTP",
                channels: [
                  {
                    id: "DEMO_OFFERBUILDER",
                    name: "DEMO_OFFERBUILDER",
                  },
                ],
              },
            ],
          },
        ],
        id: "idb",
        name: "Internal Demo Brand",
      },
    ];
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const { getByText, getByTestId, queryByText } = render(
      <MemoryRouter initialEntries={["/browse-supply/"]}>
        <SearchSettings />
      </MemoryRouter>,
      {
        store,
      }
    );
    const supplierSwitch = getByTestId("supplier-switch");
    act(() => {
      fireEvent.click(supplierSwitch);
    });
    expect(
      queryByText(tempStore.searchparams.brands[0]["name"])
    ).not.toBeInTheDocument();

    act(() => {
      fireEvent.click(supplierSwitch);
    });

    expect(
      getByText(tempStore.searchparams.brands[0]["name"])
    ).toBeInTheDocument();
    expect(
      getByText(tempStore.searchparams.brands[0].storefronts[0].name)
    ).toBeInTheDocument();
    expect(
      getByText(
        tempStore.searchparams.brands[0].storefronts[0].suppliers[0].name
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        tempStore.searchparams.brands[0].storefronts[0].suppliers[0].channels[0]
          .name
      )
    ).toBeInTheDocument();

    // Click on the search btn
    const searchBtn = getByTestId("browse-supply-search-submit-btn");
    act(async () => {
      await fireEvent.click(searchBtn);
    });
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenLastCalledWith({
      payload: false,
      type: "SUPPLY_SEARCH_UPDATE_IS_SUPPLIER",
    });
  });

  test("Click on search button and verify we receive the correct values from form", async () => {
    const tempStore = { ...ReduxForSearchSettings };
    tempStore.searchparams.onlySupplier = false;
    tempStore.searchparams.brands = [
      {
        storefronts: [
          {
            id: "ids",
            name: "Internal Demo Storefront",
            suppliers: [
              {
                id: "ntp",
                name: "NTP",
                channels: [
                  {
                    id: "DEMO_OFFERBUILDER",
                    name: "DEMO_OFFERBUILDER",
                  },
                ],
              },
            ],
          },
        ],
        id: "idb",
        name: "Internal Demo Brand",
      },
    ];
    const store = createStore(() => ({ ...tempStore }));

    store.dispatch = jest.fn();

    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/browse-supply/"]}>
        <SearchSettings />
      </MemoryRouter>,
      {
        store,
      }
    );

    // Click on the search btn
    const searchBtn = getByTestId("browse-supply-search-submit-btn");
    act(() => {
      fireEvent.click(searchBtn);
    });
  });

  test("In SearchSettings, check if dropdown for property type, is not present for user other than admin", async () => {
    const tempStore = { ...ReduxForSearchSettings };
    tempStore.searchparams.onlySupplier = false;
    tempStore.searchparams.brands = [
      {
        storefronts: [
          {
            id: "ids",
            name: "Internal Demo Storefront",
            suppliers: [
              {
                id: "ntp",
                name: "NTP",
                channels: [
                  {
                    id: "DEMO_OFFERBUILDER",
                    name: "DEMO_OFFERBUILDER",
                  },
                ],
              },
            ],
          },
        ],
        id: "idb",
        name: "Internal Demo Brand",
      },
    ];
    const checkIfUserHasRole = jest.spyOn(Util, "checkIfUserHasRole");
    checkIfUserHasRole.mockReturnValue(false);
    const store = createStore(() => ({ ...tempStore }));

    store.dispatch = jest.fn();

    const { queryByTestId } = render(
      <MemoryRouter initialEntries={["/browse-supply/"]}>
        <SearchSettings />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(queryByTestId("property-type-select")).not.toBeInTheDocument();
  });

  test("In SearchSettings, for admin, check if on changing dropdown value for property type, store dispatch is called", async () => {
    const tempStore = { ...ReduxForSearchSettings };
    tempStore.searchparams.onlySupplier = false;
    tempStore.searchparams.brands = [
      {
        storefronts: [
          {
            id: "ids",
            name: "Internal Demo Storefront",
            suppliers: [
              {
                id: "ntp",
                name: "NTP",
                channels: [
                  {
                    id: "DEMO_OFFERBUILDER",
                    name: "DEMO_OFFERBUILDER",
                  },
                ],
              },
            ],
          },
        ],
        id: "idb",
        name: "Internal Demo Brand",
      },
    ];
    const checkIfUserHasRole = jest.spyOn(Util, "checkIfUserHasRole");
    checkIfUserHasRole.mockReturnValue(true);
    const store = createStore(() => ({ ...tempStore }));

    store.dispatch = jest.fn();

    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/browse-supply/"]}>
        <SearchSettings />
      </MemoryRouter>,
      {
        store,
      }
    );
    const onTypeChange = getByTestId("property-type-select").querySelector(
      "input"
    );
    await act(async () => {
      await fireEvent.mouseDown(onTypeChange);
      await fireEvent.click(getByTestId("property-type-select-DEMO"));
      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
