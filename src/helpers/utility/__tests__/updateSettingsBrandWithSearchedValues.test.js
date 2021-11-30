import { newOfferActions } from "../../../pages/offers/actions";
import { store } from "../../../redux/store";

import { updateSettingsBrandWithSearchedValues } from "../updateSettingsBrandWithSearchedValues";
import { getValue } from "../getValue";
import { browseSupplyActions } from "../../../pages/browseSupply/actions";

describe("updateSettingsBrandWithSearchedValues function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  test("updateSettingsBrandWithSearchedValues check if for settings brands are updated correctly to return or not", async () => {
    store.dispatch({
      type: newOfferActions.INITIAL_ADD_BRANDS,
      payload: [
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
      ],
    });
    updateSettingsBrandWithSearchedValues();
    expect(updateSettingsBrandWithSearchedValues()).toStrictEqual([
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
                  { id: "DEMO_OFFERBUILDER", name: "DEMO_OFFERBUILDER" },
                ],
              },
            ],
          },
        ],
        id: "idb",
        name: "Internal Demo Brand",
      },
    ]);
    expect(store.getState().searchedproperties.searchedBrands).toStrictEqual(
      []
    );
  });

  test("updateSettingsBrandWithSearchedValues check if for settings brands are updated with temp brands to return correctly or not", async () => {
    store.dispatch({
      type: newOfferActions.INITIAL_ADD_BRANDS,
      payload: [],
    });
    store.dispatch({
      type: newOfferActions.INITIAL_ADD_BRANDS,
      payload: [
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
      ],
    });
    store.dispatch({
      type: browseSupplyActions.ADD_TEMP_EDITED_BRANDS,
      payload: {
        key: "DEMO_BANJAREntpDEMO_OFFERBUILDER",
        brands: [
          {
            id: "idb1",
            name: "Internal Demo Brand1",
            storefronts: [
              {
                id: "ids1",
                name: "Internal Demo Storefront1",
                suppliers: [
                  {
                    id: "ntp",
                    name: "NTP",
                    channels: [
                      {
                        id: "NEMO_CH_01",
                        name: "NEMO_CH_01",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    });
    expect(updateSettingsBrandWithSearchedValues()).toStrictEqual([
      {
        id: "idb1",
        name: "Internal Demo Brand1",
        storefronts: [
          {
            id: "ids1",
            name: "Internal Demo Storefront1",
            suppliers: [
              {
                channels: [
                  {
                    id: "NEMO_CH_01",
                    name: "NEMO_CH_01",
                  },
                ],
                id: "ntp",
                name: "NTP",
              },
            ],
          },
        ],
      },
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
                  { id: "DEMO_OFFERBUILDER", name: "DEMO_OFFERBUILDER" },
                ],
              },
            ],
          },
        ],
        id: "idb",
        name: "Internal Demo Brand",
      },
    ]);
    expect(store.getState().searchedproperties.searchedBrands).toStrictEqual(
      []
    );
  });

  test("updateSettingsBrandWithSearchedValues check if for settings brands are empty and function returns with temp brands or not", async () => {
    store.dispatch({
      type: newOfferActions.INITIAL_ADD_BRANDS,
      payload: [],
    });
    store.dispatch({
      type: browseSupplyActions.ADD_TEMP_EDITED_BRANDS,
      payload: {
        key: "DEMO_BANJAREntpDEMO_OFFERBUILDER",
        brands: [
          {
            id: "idb1",
            name: "Internal Demo Brand1",
            storefronts: [
              {
                id: "ids1",
                name: "Internal Demo Storefront1",
                suppliers: [
                  {
                    id: "ntp",
                    name: "NTP",
                    channels: [
                      {
                        id: "NEMO_CH_01",
                        name: "NEMO_CH_01",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    });
    expect(updateSettingsBrandWithSearchedValues()).toStrictEqual([]);
    expect(store.getState().searchedproperties.searchedBrands).toStrictEqual(
      []
    );
  });
});
