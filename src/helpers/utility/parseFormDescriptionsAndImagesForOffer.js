import { store } from "../../redux/store";

export const parseFormDescriptionsAndImagesForOffer = (offerMarketingInfo) => {
  // first add description to redux after parsing
  const descriptionArray = [];
  try {
    const selectedLanguages =
      store.getState().newoffermarketinginfo.selectedLanguages;

    selectedLanguages.forEach((language) => {
      if (offerMarketingInfo[language.id]) {
        descriptionArray.push({
          ...offerMarketingInfo[language.id],
          lang: language.id,
        });
      }
    });
  } catch (error) {
    console.log(error.toString());
  }

  return descriptionArray;
};
