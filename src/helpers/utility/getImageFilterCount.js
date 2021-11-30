import { appConstants } from "../../common";

export const getImageFilterCount = (appliedFilters) => {
  let counter = 0;
  try {
    if (window.getValue(appliedFilters, "fileName.length") > 0) {
      counter++;
    }
    if (
      window.getValue(
        appliedFilters,
        "uploadDateRange.uploadedStartDate.length"
      ) > 0 &&
      window.getValue(
        appliedFilters,
        "uploadDateRange.uploadedEndDate.length"
      ) > 0
    ) {
      counter++;
    }
    if (window.getValue(appliedFilters, "uploadedByCurrentUser")) {
      if (
        appliedFilters.uploadedByCurrentUser !== appConstants.OFFER_IMAGE.ALL
      ) {
        counter++;
      }
    }
    if (window.getValue(appliedFilters, "usedInAnyOffer")) {
      if (appliedFilters.usedInAnyOffer !== appConstants.OFFER_IMAGE.ALL) {
        counter++;
      }
    }
    if (window.getValue(appliedFilters, "offerIds.length") > 0) {
      counter++;
    }
  } catch (error) {
    console.error(error.toString());
  }

  return counter;
};
