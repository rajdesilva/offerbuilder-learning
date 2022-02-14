export const parseOfferMarketingFromOffer = (offerData) => {
  let offerMarketingFormData = {};
  try {
    offerData.marketingInfo &&
      offerData.marketingInfo.forEach((offerDescription) => {
        offerMarketingFormData[`${offerDescription.lang}`] = {
          description: offerDescription.description,
          shortDescription: offerDescription.shortDescription,
          termsAndConditions: offerDescription.termsAndConditions,
          title: offerDescription.title,
        };
      });
    offerMarketingFormData.images = offerData.images || [];
  } catch (error) {
    console.log(error.toString());
  }
  return offerMarketingFormData;
};
