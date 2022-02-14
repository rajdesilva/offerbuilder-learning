import { browseSupplyActions } from "../../../pages/browseSupply/actions";
import { userActions } from "../../../pages/user/actions/userActions";
import { store } from "../../../redux/store";
import { getAllBrandsWithoutKeysFromTempBrands } from "../getAllBrandsWithoutKeysFromTempBrands";
import { getValue } from "../getValue";

describe("getAllBrandsWithoutKeysFromTempBrands function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  test("getAllBrandsWithoutKeysFromTempBrands check if function returns correct brands or not", () => {
    store.dispatch({
      type: browseSupplyActions.ADD_TEMP_EDITED_BRANDS,
      payload: {
        key: "DEMO_BANJAREntpDEMO_OFFERBUILDER",
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
      },
    });
    expect(getAllBrandsWithoutKeysFromTempBrands()).toStrictEqual([
      {
        id: "idb",
        name: "Internal Demo Brand",
        storefronts: [
          {
            id: "ids",
            name: "Internal Demo Storefront",
            suppliers: [
              {
                channels: [
                  {
                    id: "DEMO_OFFERBUILDER",
                    name: "DEMO_OFFERBUILDER",
                  },
                ],
                id: "ntp",
                name: "NTP",
              },
            ],
          },
        ],
      },
    ]);
  });
  test("getAllBrandsWithoutKeysFromTempBrands check if function returns values if multiple keys are present", () => {
    store.dispatch({
      type: browseSupplyActions.RESET_TEMP_EDITED_BRANDS,
    });
    store.dispatch({
      type: browseSupplyActions.ADD_TEMP_EDITED_BRANDS,
      payload: {
        key: "DEMO_BANJAREntpDEMO_OFFERBUILDER123",
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
      },
    });

    store.dispatch({
      type: browseSupplyActions.ADD_TEMP_EDITED_BRANDS,
      payload: {
        key: "XS_NM_0001ntpDEMO_INDIA_CH",
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
                        id: "DEMO_OFFERBUILDER",
                        name: "DEMO_OFFERBUILDER",
                      },
                      {
                        id: "DEMO_INDIA_CH",
                        name: "DEMO_INDIA_CH",
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
    expect(getAllBrandsWithoutKeysFromTempBrands()).toStrictEqual([
      {
        id: "idb",
        name: "Internal Demo Brand",
        storefronts: [
          {
            id: "ids",
            name: "Internal Demo Storefront",
            suppliers: [
              {
                channels: [
                  { id: "DEMO_OFFERBUILDER", name: "DEMO_OFFERBUILDER" },
                ],
                id: "ntp",
                name: "NTP",
              },
            ],
          },
        ],
      },
      {
        id: "idb",
        name: "Internal Demo Brand",
        storefronts: [
          {
            id: "ids",
            name: "Internal Demo Storefront",
            suppliers: [
              {
                channels: [
                  { id: "DEMO_OFFERBUILDER", name: "DEMO_OFFERBUILDER" },
                  { id: "DEMO_INDIA_CH", name: "DEMO_INDIA_CH" },
                ],
                id: "ntp",
                name: "NTP",
              },
            ],
          },
        ],
      },
    ]);
  });

  test("getAllBrandsWithoutKeysFromTempBrands check if function returns empty brands when empty brands present", () => {
    store.dispatch({
      type: browseSupplyActions.RESET_TEMP_EDITED_BRANDS,
    });
    store.dispatch({
      type: browseSupplyActions.ADD_TEMP_EDITED_BRANDS,
      payload: {
        key: "DEMO_BANJAREntpDEMO_OFFERBUILDER123",
        brands: [],
      },
    });
    expect(getAllBrandsWithoutKeysFromTempBrands()).toStrictEqual([]);
  });

  test("getAllBrandsWithoutKeysFromTempBrands check if function returns empty brands for null values", () => {
    store.dispatch({
      type: browseSupplyActions.RESET_TEMP_EDITED_BRANDS,
    });
    store.dispatch({
      type: browseSupplyActions.ADD_TEMP_EDITED_BRANDS,
      payload: null,
    });
    expect(getAllBrandsWithoutKeysFromTempBrands()).toStrictEqual([]);
  });

  test("getAllBrandsWithoutKeysFromTempBrands check case when role values and user details are null", () => {
    store.dispatch({
      type: browseSupplyActions.RESET_TEMP_EDITED_BRANDS,
    });
    store.dispatch({
      type: userActions.SET_USER_DETAILS,
      payload: null,
    });
    expect(getAllBrandsWithoutKeysFromTempBrands(null)).toStrictEqual([]);
  });
});
