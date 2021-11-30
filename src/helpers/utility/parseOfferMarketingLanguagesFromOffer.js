import { store } from "../../redux/store";

export const parseOfferMarketingLanguagesFromOffer = (offerLanguages) => {
  let selectedLanguages = [];
  try {
    const languages = store.getState().languageinfo.languages;
    offerLanguages &&
      offerLanguages.forEach((languageId) => {
        const foundLanguage = languages.find(
          (language) => language.id === languageId
        );
        selectedLanguages.push(foundLanguage);
      });
  } catch (error) {
    console.log(error.toString());
  }
  return selectedLanguages;
};
