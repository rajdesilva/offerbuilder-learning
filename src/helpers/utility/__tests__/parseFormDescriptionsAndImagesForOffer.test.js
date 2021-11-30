import {
  marketingActions,
} from "../../../pages/offers/actions";
import { store } from "../../../redux/store";
import { parseFormDescriptionsAndImagesForOffer } from "../parseFormDescriptionsAndImagesForOffer";
import { getValue } from "../getValue";

describe("parseFormDescriptionsAndImagesForOffer function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  test("parseFormDescriptionsAndImagesForOffer check if initial state with redux data for search state is correct or not", () => {
    store.dispatch({
      type: marketingActions.SET_MARKETING_LANGUAGES,
      payload: ["EN"],
    });
    const offerMarketingInfo = {
      images: [],
    };
    expect(
      parseFormDescriptionsAndImagesForOffer(offerMarketingInfo)
    ).toStrictEqual([]);
  });
});
