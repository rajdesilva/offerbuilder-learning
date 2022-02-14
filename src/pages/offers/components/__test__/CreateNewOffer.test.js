import React from "react";
import { createStore } from "redux";
import {
  render,
  fireEvent,
  cleanup,
  waitFor,
} from "../../../../helpers/testUtils";

import { createMemoryHistory } from "history";
import { MemoryRouter, Router } from "react-router-dom";
import { act } from "react-dom/test-utils";
import CreateNewOffer from "../CreateNewOffer";
import { tempStore } from "./tempStore";
import { history } from "../../../../helpers";
import { cloneDeep } from "lodash";

jest.mock("./../../service");

const history1 = createMemoryHistory({ initialEntries: ["/"] });

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => {
    return {
      step: 3,
    };
  },
  useRouteMatch: () => ({ url: "/offers/create-new-offer/3" }),
}));

window.fetchWrapper = jest.fn();
afterEach(cleanup);
const OLD_ENV = process.env;

describe("CreateNewOffer component test", () => {
  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });
  test("create CreateNewOffer components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    const wrapper = render(
      <Router history={history1}>
        <CreateNewOffer />
      </Router>,
      {
        store,
      }
    );
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot();
  });
  test("create CreateNewOffer cancel button route ", () => {
    const store = createStore(() => ({ ...tempStore }));
    const { getByText } = render(
      <MemoryRouter initialEntries={["/offers/create-new-offer/2"]}>
        <CreateNewOffer />
      </MemoryRouter>,
      {
        store,
      }
    );

    const cancelBtn = getByText("Cancel");
    expect(cancelBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(cancelBtn);
    });
    expect(cancelBtn).toHaveAttribute("href", "/");
  });
  test("create CreateNewOffer next step updating in route", () => {
    const createOfferTempStore = cloneDeep(tempStore);
    createOfferTempStore.searchparams.onlySupplier = false;
    createOfferTempStore.searchparams.target = {
      supplier: [],
      channels: [],
    };
    const store = createStore(() => ({ ...createOfferTempStore }));
    store.dispatch = jest.fn();

    const { getByText } = render(
      <MemoryRouter initialEntries={["/offers/create-new-offer/"]}>
        <CreateNewOffer />
      </MemoryRouter>,
      {
        store,
      }
    );
    const nextStep = getByText("Next Step");
    expect(nextStep).toBeInTheDocument();
    act(() => {
      fireEvent.click(nextStep);
    });
    waitFor(() => {
      expect(history.location.pathname).toBe("/offers/create-new-offer/2");
    });
  });

  test("CreateNewOffer next step if we are on settings, updating in route to fourth step with include properties flag as true", async () => {
    process.env.REACT_APP_HIDE_CLIENT_AND_STORE = true;
    act(() => {
      history1.push("/offers/create-new-offer/3");
    });
    const createOfferTempStore = cloneDeep(tempStore);
    createOfferTempStore.searchparams.onlySupplier = false;
    createOfferTempStore.searchparams.target = {
      supplier: [],
      channels: [],
    };
    createOfferTempStore.sourceinfo = {
      loading: false,
      brands: [
        {
          id: "idb",
          name: "Internal Demo Brand",
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
                      id: "KOGNITIV_QA",
                      name: "QA for Kognitiv Onboarding Projects",
                    },
                    {
                      id: "DEMO_OFFERBUILDER",
                      name: "DEMO_OFFERBUILDER",
                    },
                    {
                      id: "DEMO_INDIA_CH",
                      name: "DEMO_INDIA_CH",
                    },
                    {
                      id: "NEMO_CH_01",
                      name: "NEMO_CH_01",
                    },
                    {
                      id: "NEMO_CH_02",
                      name: "NEMO_CH_02",
                    },
                    {
                      id: "NEMO_CH_03",
                      name: "NEMO_CH_03",
                    },
                    {
                      id: "NEMO_CH_04",
                      name: "NEMO_CH_04",
                    },
                    {
                      id: "NEMO_CH_05",
                      name: "NEMO_CH_05",
                    },
                    {
                      id: "NEMO_CH_06",
                      name: "NEMO_CH_06",
                    },
                  ],
                },
              ],
            },
            {
              id: "ids2",
              name: "Best Travel",
              suppliers: [
                {
                  id: "ntp",
                  name: "NTP",
                  channels: [
                    {
                      id: "KOGNITIV_QA",
                      name: "QA for Kognitiv Onboarding Projects",
                    },
                    {
                      id: "DEMO_OFFERBUILDER",
                      name: "DEMO_OFFERBUILDER",
                    },
                    {
                      id: "DEMO_INDIA_CH",
                      name: "DEMO_INDIA_CH",
                    },
                    {
                      id: "NEMO_CH_01",
                      name: "NEMO_CH_01",
                    },
                    {
                      id: "NEMO_CH_02",
                      name: "NEMO_CH_02",
                    },
                    {
                      id: "NEMO_CH_03",
                      name: "NEMO_CH_03",
                    },
                    {
                      id: "NEMO_CH_04",
                      name: "NEMO_CH_04",
                    },
                    {
                      id: "NEMO_CH_05",
                      name: "NEMO_CH_05",
                    },
                    {
                      id: "NEMO_CH_06",
                      name: "NEMO_CH_06",
                    },
                  ],
                },
              ],
            },
            {
              id: "ids3",
              name: "PC Travel",
              suppliers: [
                {
                  id: "ntp",
                  name: "NTP",
                  channels: [
                    {
                      id: "KOGNITIV_QA",
                      name: "QA for Kognitiv Onboarding Projects",
                    },
                    {
                      id: "DEMO_OFFERBUILDER",
                      name: "DEMO_OFFERBUILDER",
                    },
                    {
                      id: "DEMO_INDIA_CH",
                      name: "DEMO_INDIA_CH",
                    },
                    {
                      id: "NEMO_CH_01",
                      name: "NEMO_CH_01",
                    },
                    {
                      id: "NEMO_CH_02",
                      name: "NEMO_CH_02",
                    },
                    {
                      id: "NEMO_CH_03",
                      name: "NEMO_CH_03",
                    },
                    {
                      id: "NEMO_CH_04",
                      name: "NEMO_CH_04",
                    },
                    {
                      id: "NEMO_CH_05",
                      name: "NEMO_CH_05",
                    },
                    {
                      id: "NEMO_CH_06",
                      name: "NEMO_CH_06",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "cdb",
          name: "Client Demo Brand",
          storefronts: [
            {
              id: "cds",
              name: "Client Demo Storefront",
              suppliers: [
                {
                  id: "ntp",
                  name: "NTP",
                  channels: [
                    {
                      id: "KOGNITIV_QA",
                      name: "QA for Kognitiv Onboarding Projects",
                    },
                    {
                      id: "DEMO_OFFERBUILDER",
                      name: "DEMO_OFFERBUILDER",
                    },
                    {
                      id: "DEMO_INDIA_CH",
                      name: "DEMO_INDIA_CH",
                    },
                    {
                      id: "NEMO_CH_01",
                      name: "NEMO_CH_01",
                    },
                    {
                      id: "NEMO_CH_02",
                      name: "NEMO_CH_02",
                    },
                    {
                      id: "NEMO_CH_03",
                      name: "NEMO_CH_03",
                    },
                    {
                      id: "NEMO_CH_04",
                      name: "NEMO_CH_04",
                    },
                    {
                      id: "NEMO_CH_05",
                      name: "NEMO_CH_05",
                    },
                    {
                      id: "NEMO_CH_06",
                      name: "NEMO_CH_06",
                    },
                  ],
                },
              ],
            },
            {
              id: "ids2",
              name: "Best Travel",
              suppliers: [
                {
                  id: "ntp",
                  name: "NTP",
                  channels: [
                    {
                      id: "KOGNITIV_QA",
                      name: "QA for Kognitiv Onboarding Projects",
                    },
                    {
                      id: "DEMO_OFFERBUILDER",
                      name: "DEMO_OFFERBUILDER",
                    },
                    {
                      id: "DEMO_INDIA_CH",
                      name: "DEMO_INDIA_CH",
                    },
                    {
                      id: "NEMO_CH_01",
                      name: "NEMO_CH_01",
                    },
                    {
                      id: "NEMO_CH_02",
                      name: "NEMO_CH_02",
                    },
                    {
                      id: "NEMO_CH_03",
                      name: "NEMO_CH_03",
                    },
                    {
                      id: "NEMO_CH_04",
                      name: "NEMO_CH_04",
                    },
                    {
                      id: "NEMO_CH_05",
                      name: "NEMO_CH_05",
                    },
                    {
                      id: "NEMO_CH_06",
                      name: "NEMO_CH_06",
                    },
                  ],
                },
              ],
            },
            {
              id: "ids3",
              name: "PC Travel",
              suppliers: [
                {
                  id: "ntp",
                  name: "NTP",
                  channels: [
                    {
                      id: "KOGNITIV_QA",
                      name: "QA for Kognitiv Onboarding Projects",
                    },
                    {
                      id: "DEMO_OFFERBUILDER",
                      name: "DEMO_OFFERBUILDER",
                    },
                    {
                      id: "DEMO_INDIA_CH",
                      name: "DEMO_INDIA_CH",
                    },
                    {
                      id: "NEMO_CH_01",
                      name: "NEMO_CH_01",
                    },
                    {
                      id: "NEMO_CH_02",
                      name: "NEMO_CH_02",
                    },
                    {
                      id: "NEMO_CH_03",
                      name: "NEMO_CH_03",
                    },
                    {
                      id: "NEMO_CH_04",
                      name: "NEMO_CH_04",
                    },
                    {
                      id: "NEMO_CH_05",
                      name: "NEMO_CH_05",
                    },
                    {
                      id: "NEMO_CH_06",
                      name: "NEMO_CH_06",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    const store = createStore(() => ({ ...createOfferTempStore }));
    store.dispatch = jest.fn();
    const { getByText } = render(
      <Router history={history1}>
        <CreateNewOffer />
      </Router>,
      {
        store,
      }
    );
    const nextStep = getByText("Next Step");
    expect(nextStep).toBeInTheDocument();
    // screen.debug(null, 1000000)
    act(() => {
      fireEvent.click(nextStep);
    });
    expect(
      store.getState().newoffersettingsparam.deepLinkSettingsInfo
        .includeAllProperties
    ).toBe(true);
  });

  test("CreateNewOffer next step if we are on settings, store updated with include properties flag as false", async () => {
    process.env.REACT_APP_HIDE_CLIENT_AND_STORE = true;
    act(() => {
      history1.push("/offers/create-new-offer/3");
    });
    const createOfferTempStore = cloneDeep(tempStore);
    createOfferTempStore.searchparams.onlySupplier = false;
    createOfferTempStore.searchparams.target = {
      supplier: [],
      channels: [],
    };
    createOfferTempStore.newoffersettingsparam.deepLinkSettingsInfo.includeAllProperties = false;
    createOfferTempStore.sourceinfo = {
      loading: false,
      brands: [
        {
          id: "idb",
          name: "Internal Demo Brand",
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
                      id: "KOGNITIV_QA",
                      name: "QA for Kognitiv Onboarding Projects",
                    },
                    {
                      id: "DEMO_OFFERBUILDER",
                      name: "DEMO_OFFERBUILDER",
                    },
                    {
                      id: "DEMO_INDIA_CH",
                      name: "DEMO_INDIA_CH",
                    },
                    {
                      id: "NEMO_CH_01",
                      name: "NEMO_CH_01",
                    },
                    {
                      id: "NEMO_CH_02",
                      name: "NEMO_CH_02",
                    },
                    {
                      id: "NEMO_CH_03",
                      name: "NEMO_CH_03",
                    },
                    {
                      id: "NEMO_CH_04",
                      name: "NEMO_CH_04",
                    },
                    {
                      id: "NEMO_CH_05",
                      name: "NEMO_CH_05",
                    },
                    {
                      id: "NEMO_CH_06",
                      name: "NEMO_CH_06",
                    },
                  ],
                },
              ],
            },
            {
              id: "ids2",
              name: "Best Travel",
              suppliers: [
                {
                  id: "ntp",
                  name: "NTP",
                  channels: [
                    {
                      id: "KOGNITIV_QA",
                      name: "QA for Kognitiv Onboarding Projects",
                    },
                    {
                      id: "DEMO_OFFERBUILDER",
                      name: "DEMO_OFFERBUILDER",
                    },
                    {
                      id: "DEMO_INDIA_CH",
                      name: "DEMO_INDIA_CH",
                    },
                    {
                      id: "NEMO_CH_01",
                      name: "NEMO_CH_01",
                    },
                    {
                      id: "NEMO_CH_02",
                      name: "NEMO_CH_02",
                    },
                    {
                      id: "NEMO_CH_03",
                      name: "NEMO_CH_03",
                    },
                    {
                      id: "NEMO_CH_04",
                      name: "NEMO_CH_04",
                    },
                    {
                      id: "NEMO_CH_05",
                      name: "NEMO_CH_05",
                    },
                    {
                      id: "NEMO_CH_06",
                      name: "NEMO_CH_06",
                    },
                  ],
                },
              ],
            },
            {
              id: "ids3",
              name: "PC Travel",
              suppliers: [
                {
                  id: "ntp",
                  name: "NTP",
                  channels: [
                    {
                      id: "KOGNITIV_QA",
                      name: "QA for Kognitiv Onboarding Projects",
                    },
                    {
                      id: "DEMO_OFFERBUILDER",
                      name: "DEMO_OFFERBUILDER",
                    },
                    {
                      id: "DEMO_INDIA_CH",
                      name: "DEMO_INDIA_CH",
                    },
                    {
                      id: "NEMO_CH_01",
                      name: "NEMO_CH_01",
                    },
                    {
                      id: "NEMO_CH_02",
                      name: "NEMO_CH_02",
                    },
                    {
                      id: "NEMO_CH_03",
                      name: "NEMO_CH_03",
                    },
                    {
                      id: "NEMO_CH_04",
                      name: "NEMO_CH_04",
                    },
                    {
                      id: "NEMO_CH_05",
                      name: "NEMO_CH_05",
                    },
                    {
                      id: "NEMO_CH_06",
                      name: "NEMO_CH_06",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "cdb",
          name: "Client Demo Brand",
          storefronts: [
            {
              id: "cds",
              name: "Client Demo Storefront",
              suppliers: [
                {
                  id: "ntp",
                  name: "NTP",
                  channels: [
                    {
                      id: "KOGNITIV_QA",
                      name: "QA for Kognitiv Onboarding Projects",
                    },
                    {
                      id: "DEMO_OFFERBUILDER",
                      name: "DEMO_OFFERBUILDER",
                    },
                    {
                      id: "DEMO_INDIA_CH",
                      name: "DEMO_INDIA_CH",
                    },
                    {
                      id: "NEMO_CH_01",
                      name: "NEMO_CH_01",
                    },
                    {
                      id: "NEMO_CH_02",
                      name: "NEMO_CH_02",
                    },
                    {
                      id: "NEMO_CH_03",
                      name: "NEMO_CH_03",
                    },
                    {
                      id: "NEMO_CH_04",
                      name: "NEMO_CH_04",
                    },
                    {
                      id: "NEMO_CH_05",
                      name: "NEMO_CH_05",
                    },
                    {
                      id: "NEMO_CH_06",
                      name: "NEMO_CH_06",
                    },
                  ],
                },
              ],
            },
            {
              id: "ids2",
              name: "Best Travel",
              suppliers: [
                {
                  id: "ntp",
                  name: "NTP",
                  channels: [
                    {
                      id: "KOGNITIV_QA",
                      name: "QA for Kognitiv Onboarding Projects",
                    },
                    {
                      id: "DEMO_OFFERBUILDER",
                      name: "DEMO_OFFERBUILDER",
                    },
                    {
                      id: "DEMO_INDIA_CH",
                      name: "DEMO_INDIA_CH",
                    },
                    {
                      id: "NEMO_CH_01",
                      name: "NEMO_CH_01",
                    },
                    {
                      id: "NEMO_CH_02",
                      name: "NEMO_CH_02",
                    },
                    {
                      id: "NEMO_CH_03",
                      name: "NEMO_CH_03",
                    },
                    {
                      id: "NEMO_CH_04",
                      name: "NEMO_CH_04",
                    },
                    {
                      id: "NEMO_CH_05",
                      name: "NEMO_CH_05",
                    },
                    {
                      id: "NEMO_CH_06",
                      name: "NEMO_CH_06",
                    },
                  ],
                },
              ],
            },
            {
              id: "ids3",
              name: "PC Travel",
              suppliers: [
                {
                  id: "ntp",
                  name: "NTP",
                  channels: [
                    {
                      id: "KOGNITIV_QA",
                      name: "QA for Kognitiv Onboarding Projects",
                    },
                    {
                      id: "DEMO_OFFERBUILDER",
                      name: "DEMO_OFFERBUILDER",
                    },
                    {
                      id: "DEMO_INDIA_CH",
                      name: "DEMO_INDIA_CH",
                    },
                    {
                      id: "NEMO_CH_01",
                      name: "NEMO_CH_01",
                    },
                    {
                      id: "NEMO_CH_02",
                      name: "NEMO_CH_02",
                    },
                    {
                      id: "NEMO_CH_03",
                      name: "NEMO_CH_03",
                    },
                    {
                      id: "NEMO_CH_04",
                      name: "NEMO_CH_04",
                    },
                    {
                      id: "NEMO_CH_05",
                      name: "NEMO_CH_05",
                    },
                    {
                      id: "NEMO_CH_06",
                      name: "NEMO_CH_06",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    const store = createStore(() => ({ ...createOfferTempStore }));
    store.dispatch = jest.fn();
    const { getByText } = render(
      <Router history={history1}>
        <CreateNewOffer />
      </Router>,
      {
        store,
      }
    );
    const nextStep = getByText("Next Step");
    expect(nextStep).toBeInTheDocument();
    // screen.debug(null, 1000000)
    act(() => {
      fireEvent.click(nextStep);
    });
    expect(
      store.getState().newoffersettingsparam.deepLinkSettingsInfo
        .includeAllProperties
    ).toBe(false);
  });
});
