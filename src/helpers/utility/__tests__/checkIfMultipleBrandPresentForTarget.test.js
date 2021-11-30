import { checkIfMultipleBrandPresentForTarget } from "../checkIfMultipleBrandPresentForTarget";
import { newOfferActions } from "../../../pages/offers/actions";
import { store } from "../../../redux/store";

describe("checkIfMultipleBrandPresentForTarget function test", () => {
  test("checkIfMultipleBrandPresentForTarget case when same brand is present in target to remove", () => {
    store.dispatch({
      type: newOfferActions.INITIAL_ADD_BRANDS,
      payload: [
        {
          id: "idb",
          name: "Internal Demo Brand",
          storefronts: [
            {
              id: "ids2",
              name: "Best Travel",
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
        },
      ],
    });

    const brandToRemove = {
      id: "idb",
      name: "Internal Demo Brand",
      storefronts: [
        {
          id: "ids2",
          name: "Best Travel",
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
    };

    expect(checkIfMultipleBrandPresentForTarget(brandToRemove)).toBe(false);
  });

  test("checkIfMultipleBrandPresentForTarget check case when store with multiple storefronts and remove brand has only one storefront", () => {
    store.dispatch({
      type: newOfferActions.INITIAL_ADD_BRANDS,
      payload: [
        {
          id: "idb",
          name: "Internal Demo Brand",
          storefronts: [
            {
              id: "ids2",
              name: "Best Travel",
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
            {
              id: "ids3",
              name: "PC Travel",
              suppliers: [
                {
                  id: "ntp",
                  name: "NTP",
                  channels: [
                    {
                      id: "DEMO_INDIA_CH",
                      name: "DEMO_INDIA_CH",
                    },
                    {
                      id: "DEMO_OFFERBUILDER",
                      name: "DEMO_OFFERBUILDER",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    const brandToRemove = {
      id: "idb",
      name: "Internal Demo Brand",
      storefronts: [
        {
          id: "ids2",
          name: "Best Travel",
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
    };

    expect(checkIfMultipleBrandPresentForTarget(brandToRemove)).toBe(true);
  });

  test("checkIfMultipleBrandPresentForTarget check case when store brand with multiple storefronts and remove brand has no valid storefront", () => {
    store.dispatch({
      type: newOfferActions.INITIAL_ADD_BRANDS,
      payload: [
        {
          id: "idb1",
          name: "Internal Demo Brand1",
          storefronts: [
            {
              id: "ids2",
              name: "Best Travel",
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
            {
              id: "ids3",
              name: "PC Travel",
              suppliers: [
                {
                  id: "ntp",
                  name: "NTP",
                  channels: [
                    {
                      id: "DEMO_INDIA_CH",
                      name: "DEMO_INDIA_CH",
                    },
                    {
                      id: "DEMO_OFFERBUILDER",
                      name: "DEMO_OFFERBUILDER",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    const brandToRemove = {
      id: "idb",
      name: "Internal Demo Brand",
      storefronts: [{}],
    };

    expect(checkIfMultipleBrandPresentForTarget(brandToRemove)).toBe(true);
  });

  test("checkIfMultipleBrandPresentForTarget check case when store brand no valid info and remove brand has no valid info", () => {
    store.dispatch({
      type: newOfferActions.INITIAL_ADD_BRANDS,
      payload: [
        {
          storefronts: [
            {
            },
          ],
        },
      ],
    });

    const brandToRemove = {
      storefronts: [{}],
    };

    expect(checkIfMultipleBrandPresentForTarget(brandToRemove)).toBe(true);
  });

  test("checkIfMultipleBrandPresentForTarget check case when store brand and remove brand is null", () => {
    store.dispatch({
      type: newOfferActions.INITIAL_ADD_BRANDS,
      payload: null,
    });

    const brandToRemove = null;

    expect(checkIfMultipleBrandPresentForTarget(brandToRemove)).toBe(true);
  });

  test("checkIfMultipleBrandPresentForTarget check case when store brand and remove brand is empty array and empty object", () => {
    store.dispatch({
      type: newOfferActions.INITIAL_ADD_BRANDS,
      payload: null,
    });

    const brandToRemove = {};

    expect(checkIfMultipleBrandPresentForTarget(brandToRemove)).toBe(true);
  });
});
