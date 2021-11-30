import { act } from "react-dom/test-utils";
import * as service from "../../service";
import { store } from "../../../../redux/store";
import { getValue } from "../../../../helpers";

window.getValue = getValue;
describe("Test properties Redux", () => {
  test("Check getBrands store's initial value", () => {
    expect(store.getState().sourceinfo).toEqual({
      loading: false,
      brands: []
    });
  });

  test("Check getBrands store's state with reject response", async () => {
    window.fetchWrapper = jest.fn().mockRejectedValue("Not Found");

    await act(async () => {
      await service.getBrands();
    });
    expect(store.getState().sourceinfo).toEqual(
      {
        "loading": false,
        "brands": [],
      }
    );
  });

  test("Check getBrands store's state with correct response", async () => {
    window.fetchWrapper = jest.fn().mockResolvedValue({
      "success": true,
      "data": {
        "brands": [
          {
            "id": "idb",
            "name": "Internal Demo Brand",
            "storefronts": [
              {
                "id": "ids",
                "name": "Internal Demo Storefront",
                "suppliers": [
                  {
                    "id": "ntp",
                    "name": "NTP",
                    "channels": [
                      {
                        "id": "DEMO_OFFERBUILDER",
                        "name": "DEMO_OFFERBUILDER"
                      },
                      {
                        "id": "DEMO_INDIA_CH",
                        "name": "DEMO_INDIA_CH"
                      },
                      {
                        "id": "NEMO_CH_01",
                        "name": "NEMO_CH_01"
                      },
                      {
                        "id": "NEMO_CH_02",
                        "name": "NEMO_CH_02"
                      },
                      {
                        "id": "NEMO_CH_03",
                        "name": "NEMO_CH_03"
                      },
                      {
                        "id": "NEMO_CH_04",
                        "name": "NEMO_CH_04"
                      },
                      {
                        "id": "NEMO_CH_05",
                        "name": "NEMO_CH_05"
                      },
                      {
                        "id": "NEMO_CH_06",
                        "name": "NEMO_CH_06"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "id": "cdb",
            "name": "Client Demo Brand",
            "storefronts": [
              {
                "id": "cds",
                "name": "Client Demo Storefront",
                "suppliers": [
                  {
                    "id": "ntp",
                    "name": "NTP",
                    "channels": [
                      {
                        "id": "DEMO_OFFERBUILDER",
                        "name": "DEMO_OFFERBUILDER"
                      },
                      {
                        "id": "DEMO_INDIA_CH",
                        "name": "DEMO_INDIA_CH"
                      },
                      {
                        "id": "NEMO_CH_01",
                        "name": "NEMO_CH_01"
                      },
                      {
                        "id": "NEMO_CH_02",
                        "name": "NEMO_CH_02"
                      },
                      {
                        "id": "NEMO_CH_03",
                        "name": "NEMO_CH_03"
                      },
                      {
                        "id": "NEMO_CH_04",
                        "name": "NEMO_CH_04"
                      },
                      {
                        "id": "NEMO_CH_05",
                        "name": "NEMO_CH_05"
                      },
                      {
                        "id": "NEMO_CH_06",
                        "name": "NEMO_CH_06"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      "error": null
    });

    await act(async () => {
      await service.getBrands();
    });
  });
});
