import { checkIfMultipleChannelPresentForTarget } from "../checkIfMultipleChannelPresentForTarget";
import { newOfferActions } from "../../../pages/offers/actions";
import { store } from "../../../redux/store";

describe("checkIfMultipleChannelPresentForTarget function test", () => {
  test("checkIfMultipleChannelPresentForTarget case when same channel is present in target to remove channel", () => {
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

    const channelToRemove = {
      id: "DEMO_OFFERBUILDER",
      name: "DEMO_OFFERBUILDER",
    };

    expect(checkIfMultipleChannelPresentForTarget(channelToRemove)).toBe(false);
  });

  test("checkIfMultipleChannelPresentForTarget check case when store with multiple channel present including channel to be removed in storefronts", () => {
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

    const channelToRemove = 
                {
                  id: "DEMO_OFFERBUILDER",
                  name: "DEMO_OFFERBUILDER",
    };

    expect(checkIfMultipleChannelPresentForTarget(channelToRemove)).toBe(true);
  });

  test("checkIfMultipleChannelPresentForTarget check case when multiple brand has same channel that is to be removed", () => {
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

    const channelToRemove =  {
        id: "DEMO_OFFERBUILDER",
        name: "DEMO_OFFERBUILDER",
      };

    expect(checkIfMultipleChannelPresentForTarget(channelToRemove)).toBe(true);
  });

  test("checkIfMultipleChannelPresentForTarget check case when store brand no valid info and remove channel also has no valid info", () => {
    store.dispatch({
      type: newOfferActions.INITIAL_ADD_BRANDS,
      payload: [
        {
          storefronts: [{}],
        },
      ],
    });

    const channelToRemove = {
    };

    expect(checkIfMultipleChannelPresentForTarget(channelToRemove)).toBe(false);
  });

  test("checkIfMultipleChannelPresentForTarget check case when store brand and channel to be removed is null", () => {
    store.dispatch({
      type: newOfferActions.INITIAL_ADD_BRANDS,
      payload: null,
    });

    const channelToRemove = null;

    expect(checkIfMultipleChannelPresentForTarget(channelToRemove)).toBe(false);
  });

  test("checkIfMultipleChannelPresentForTarget check case when store brand and channel to be removed is empty array and empty object", () => {
    store.dispatch({
      type: newOfferActions.INITIAL_ADD_BRANDS,
      payload: [],
    });
    const channelToRemove = {};
    expect(checkIfMultipleChannelPresentForTarget(channelToRemove)).toBe(false);
  });
});
