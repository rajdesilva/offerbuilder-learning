import { checkIfMultipleStorefrontPresentForTarget } from "../checkIfMultipleStorefrontPresentForTarget";
import { newOfferActions } from "../../../pages/offers/actions";
import { store } from "../../../redux/store";

describe("checkIfMultipleStorefrontPresentForTarget function test", () => {
  test("checkIfMultipleStorefrontPresentForTarget case when same storefront is present in target that is to be removed", () => {
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

    const storefrontToRemove = 
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
        };

    expect(checkIfMultipleStorefrontPresentForTarget(storefrontToRemove)).toBe(false);
  });

  test("checkIfMultipleStorefrontPresentForTarget check case when store with multiple storefronts and to be removed storefront is one of them", () => {
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

    const storefrontToRemove = 
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
        };

    expect(checkIfMultipleStorefrontPresentForTarget(storefrontToRemove)).toBe(true);
  });

  test("checkIfMultipleStorefrontPresentForTarget check case when store brand with multiple storefronts and storefront to remove has no valid info", () => {
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

    const storefrontToRemove = {
      storefronts: [{}],
    };

    expect(checkIfMultipleStorefrontPresentForTarget(storefrontToRemove)).toBe(true);
  });

  test("checkIfMultipleStorefrontPresentForTarget check case when store brand no valid info and storefront to remove has no valid info", () => {
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

    const storefrontToRemove = {
      storefronts: [{}],
    };

    expect(checkIfMultipleStorefrontPresentForTarget(storefrontToRemove)).toBe(true);
  });

  test("checkIfMultipleStorefrontPresentForTarget check case when store brand and storefront to remove is null", () => {
    store.dispatch({
      type: newOfferActions.INITIAL_ADD_BRANDS,
      payload: null,
    });

    const storefrontToRemove = null;

    expect(checkIfMultipleStorefrontPresentForTarget(storefrontToRemove)).toBe(true);
  });

  test("checkIfMultipleStorefrontPresentForTarget check case when store brand and storefront to remove is empty array and empty object", () => {
    store.dispatch({
      type: newOfferActions.INITIAL_ADD_BRANDS,
      payload: null,
    });

    const storefrontToRemove = {};

    expect(checkIfMultipleStorefrontPresentForTarget(storefrontToRemove)).toBe(true);
  });
});
