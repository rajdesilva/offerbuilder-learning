import { marketingActions } from "../../../pages/offers/actions";
import { store } from "../../../redux/store";
import { parseOfferMarketingLanguagesFromOffer } from "../parseOfferMarketingLanguagesFromOffer";
import { getValue } from "../getValue";

describe("parseOfferMarketingLanguagesFromOffer function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  test("parseOfferMarketingLanguagesFromOffer check if offer marketing languages are parsed correctly or not", () => {
    store.dispatch({
      type: marketingActions.SET_LANGUAGES,
      payload: [
        {
          id: "EN",
          name: "English",
        },
        {
          id: "DE",
          name: "German",
        },
      ],
    });
    const offerLanguages = ["EN"];
    expect(
      parseOfferMarketingLanguagesFromOffer(offerLanguages)
    ).toStrictEqual([{ id: "EN", name: "English" }]);
  });
});
