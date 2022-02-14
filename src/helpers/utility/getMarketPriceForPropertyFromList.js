import { store } from "../../redux/store";

export const getMarketPriceForPropertyFromList = (propertyTrustYouId) => {
  const marketPriceData = store.getState().marketprice.marketPriceData || [];

  try {
    const priceData = marketPriceData.find(
      (marketObj) => marketObj.trustYouId === propertyTrustYouId
    );
    return window.getValue(priceData, "price");
  } catch (e) {
    console.error(e.toString());
  }
  return "";
};
