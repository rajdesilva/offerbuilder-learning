import qs from "qs";
import { store } from "../../redux/store";
import { getTrustYouIdListFromProperties } from "./getTrustYouIdListFromProperties";

export const getSearchParamsToFetchMarketPrice = () => {
  const searchparams = store.getState().searchparams;
  try {
    const marketRelatedPriceObject = {
      los: window.getValue(searchparams, "los"),
      startDate: window.getValue(searchparams, "dateRange.startDate"),
      endDate: window.getValue(searchparams, "dateRange.endDate"),
      trustYouIdList: getTrustYouIdListFromProperties(),
    };

    const url = qs.stringify(marketRelatedPriceObject, {
      addQueryPrefix: true,
      arrayFormat: "repeat",
      allowDots: true,
      skipNulls: true,
    });

    return url;
  } catch (e) {
    console.error(e.toString());
  }
  return "";
};
