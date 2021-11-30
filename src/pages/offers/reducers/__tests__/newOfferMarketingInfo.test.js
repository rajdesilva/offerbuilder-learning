import { store } from "../../../../redux/store";
import { getValue } from "../../../../helpers";

window.getValue = getValue;

describe("Test newOfferMarketingInfo Redux", () => {
  test("Check initial state of store is empty", () => {
    expect(store.getState().newoffermarketinginfo).toEqual({
      marketingInfo: {
        images: [],
      },
      selectedLanguages: [
        {
          id: "EN",
          name: "English",
        },
      ],
    });
  });
});
