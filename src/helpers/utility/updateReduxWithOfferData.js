import { propertyCartActions } from "../../pages/browseSupply/actions";
import { marketingActions, newOfferActions } from "../../pages/offers/actions";
import { store } from "../../redux/store";
import { parseOfferMarketingFromOffer } from "./parseOfferMarketingFromOffer";
import { parseOfferMarketingLanguagesFromOffer } from "./parseOfferMarketingLanguagesFromOffer";

export const updateReduxWithOfferData = (offerData) => {
  store.dispatch({
    type: newOfferActions.NEW_OFFER_UPDATE_REDUX_STATE,
    payload: { ...offerData },
  });
  store.dispatch({
    type: marketingActions.SET_MARKETING_LANGUAGES,
    payload:
      offerData && offerData.languages
        ? parseOfferMarketingLanguagesFromOffer(offerData.languages)
        : [],
  });
  store.dispatch({
    type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
    payload: window.getValue(offerData, "properties") || [],
  });
  store.dispatch({
    type: marketingActions.UPDATE_OFFER_MARKETING_INFO,
    payload: parseOfferMarketingFromOffer(offerData),
  });
};
