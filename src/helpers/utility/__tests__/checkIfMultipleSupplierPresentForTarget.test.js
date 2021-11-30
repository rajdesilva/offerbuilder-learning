import { checkIfMultipleSupplierPresentForTarget } from "../checkIfMultipleSupplierPresentForTarget";
import { newOfferActions } from "../../../pages/offers/actions";
import { store } from "../../../redux/store";

describe("checkIfMultipleSupplierPresentForTarget function test", () => {
  test("checkIfMultipleSupplierPresentForTarget case when same supplier is present in target to remove supplier", () => {
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

    const supplierToRemove = {
      id: "ntp",
      name: "NTP",
    };

    expect(checkIfMultipleSupplierPresentForTarget(supplierToRemove)).toBe(false);
  });

  test("checkIfMultipleSupplierPresentForTarget check case when store with multiple supplier present including supplier to be removed in storefronts", () => {
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

    const supplierToRemove = 
                {
                  id: "ntp",
                  name: "NTP",
    };

    expect(checkIfMultipleSupplierPresentForTarget(supplierToRemove)).toBe(true);
  });

  test("checkIfMultipleSupplierPresentForTarget check case when multiple brand has same supplier that is to be removed", () => {
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
          ],
        },
        {
            id: "idb11",
            name: "Internal Demo Brand11",
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

    const supplierToRemove =  {
        id: "ntp",
                    name: "NTP",
      };

    expect(checkIfMultipleSupplierPresentForTarget(supplierToRemove)).toBe(true);
  });

  test("checkIfMultipleSupplierPresentForTarget check case when store brand no valid info and remove supplier also has no valid info", () => {
    store.dispatch({
      type: newOfferActions.INITIAL_ADD_BRANDS,
      payload: [
        {
          storefronts: [{}],
        },
      ],
    });

    const supplierToRemove = {
    };

    expect(checkIfMultipleSupplierPresentForTarget(supplierToRemove)).toBe(false);
  });

  test("checkIfMultipleSupplierPresentForTarget check case when store brand and supplier to be removed is null", () => {
    store.dispatch({
      type: newOfferActions.INITIAL_ADD_BRANDS,
      payload: null,
    });

    const supplierToRemove = null;

    expect(checkIfMultipleSupplierPresentForTarget(supplierToRemove)).toBe(false);
  });

  test("checkIfMultipleSupplierPresentForTarget check case when store brand and supplier to be removed is empty array and empty object", () => {
    store.dispatch({
      type: newOfferActions.INITIAL_ADD_BRANDS,
      payload: [],
    });
    const supplierToRemove = {};
    expect(checkIfMultipleSupplierPresentForTarget(supplierToRemove)).toBe(false);
  });
});
