import produce from "immer";
import { marketingActions } from "../actions";

const initialState = {
  marketingInfo: {
    images: [],
  },
  selectedLanguages: [
    {
      id: "EN",
      name: "English",
    },
  ],
};

export const newOfferMarketingInfo = produce((draft, action) => {
  switch (action.type) {
    case marketingActions.RESET_REDUX_STATE:
      return initialState;
    case marketingActions.SET_MARKETING_LANGUAGES:
      draft.selectedLanguages = action.payload || [];
      return;
    case marketingActions.SET_OFFER_DESCRIPTION_INFO:
      draft.marketingInfo.descriptions = action.payload;
      return;
    case marketingActions.SET_OFFER_IMAGE_ARRAY:
      draft.marketingInfo.images = action.payload;
      return;
    case marketingActions.UPDATE_OFFER_MARKETING_INFO:
      draft.marketingInfo = action.payload && Object.keys(action.payload).length === 0 ? initialState.marketingInfo : action.payload;
      return;
    case marketingActions.SET_OFFER_DESCRIPTION:
      const descriptionToUpdate = action.payload.description;
      draft.marketingInfo[`${action.payload.languageId}`] = {
        ...draft.marketingInfo[`${action.payload.languageId}`],
        description: descriptionToUpdate,
      };
      return;
    case marketingActions.SET_OFFER_SHORT_DESCRIPTION:
      const shortDescriptionToUpdate = action.payload.shortDescription;
      draft.marketingInfo[`${action.payload.languageId}`] = {
        ...draft.marketingInfo[`${action.payload.languageId}`],
        shortDescription: shortDescriptionToUpdate,
      };
      return;
    case marketingActions.SET_OFFER_TITLE:
      const titleToUpdate = action.payload.title;
      draft.marketingInfo[`${action.payload.languageId}`] = {
        ...draft.marketingInfo[`${action.payload.languageId}`],
        title: titleToUpdate,
      };
      return;
    case marketingActions.SET_OFFER_TERMS_AND_CONDITION:
      const termsAndConditionsToUpdate = action.payload.termsAndConditions;
      draft.marketingInfo[`${action.payload.languageId}`] = {
        ...draft.marketingInfo[`${action.payload.languageId}`],
        termsAndConditions: termsAndConditionsToUpdate,
      };
      return;
    default:
      return draft;
  }
}, initialState);
