import { supplySearchActions } from "../../../pages/browseSupply/actions";
import { store } from "../../../redux/store";
import { getMarketPriceForPropertyFromList } from "../getMarketPriceForPropertyFromList";
import { getValue } from "../getValue";

describe("getMarketPriceForPropertyFromList function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  test("getMarketPriceForPropertyFromList when price present for trust you id in list", () => {
    const propertyTrustYouId = "6c9991fe-e182-447b-8e87-dc261b3ab3f3";
    store.dispatch({
      type: supplySearchActions.FETCH_MARKET_PRICE_SUCCESS,
      payload: [
        {
          price: 475,
          trustYouId: "6c9991fe-e182-447b-8e87-dc261b3ab3f3",
          provider: "expedia",
        },
      ],
    });
    expect(getMarketPriceForPropertyFromList(propertyTrustYouId)).toBe(475);
  });
  test("getMarketPriceForPropertyFromList when price is not present for trust you id in the list", () => {
    const propertyTrustYouId = "23456789-e182-447b-8e87-dc261b3ab3f3";
    store.dispatch({
      type: supplySearchActions.FETCH_CURRENCIES_SUCCESS,
      payload: [
        {
          price: 475,
          trustYouId: "6c9991fe-e182-447b-8e87-dc261b3ab3f3",
          provider: "expedia",
        },
      ],
    });
    expect(getMarketPriceForPropertyFromList(propertyTrustYouId)).toBe("");
  });

  test("getMarketPriceForPropertyFromList trust you value sent is null", () => {
    expect(getMarketPriceForPropertyFromList(null)).toBe("");
  });
});
