import { appConstants } from "../../common";

export const getFilterCount = (appliedFilters, tabSelected) => {
  let counter = 0;
  if (window.getValue(appliedFilters, "brands")) {
    if (appliedFilters.brands.length > 0) {
      counter++;
    }
  }
  if (window.getValue(appliedFilters, "storefronts")) {
    if (appliedFilters.storefronts.length > 0) {
      counter++;
    }
  }
  if (window.getValue(appliedFilters, "suppliers")) {
    if (appliedFilters.suppliers.length > 0) {
      counter++;
    }
  }
  if (window.getValue(appliedFilters, "channels")) {
    if (appliedFilters.channels.length > 0) {
      counter++;
    }
  }
  if (window.getValue(appliedFilters, "propertyTypes")) {
    if (appliedFilters.propertyTypes.length > 0) {
      counter++;
    }
  }
  if (window.getValue(appliedFilters, "lcn") === true) {
    counter++;
  }
  if (window.getValue(appliedFilters, "status")) {
    if (
      tabSelected === appConstants.offerListTab.ACTIVE &&
      appliedFilters.status.length === 1
    ) {
      counter++;
    }
  }

  return counter;
};
