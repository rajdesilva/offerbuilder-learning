import { appConstants } from "../../common";
import { store } from "../../redux/store";
import { getObjectStringify } from "./getObjectStringify";

export const getSearchAndFilterQueryURL = (offerType) => {
  const reduxObject = store.getState().offerlistsearchandfilters;
  let finalObj = {
    storefronts: window.getValue(reduxObject, "appliedFilters.storefronts"),
    suppliers: window.getValue(reduxObject, "appliedFilters.suppliers"),
    channels: window.getValue(reduxObject, "appliedFilters.channels"),
    lcn: window.getValue(reduxObject, "appliedFilters.lcn") || false,
    statusForFilter:
      offerType === appConstants.offerListTab.ARCHIVE
        ? [appConstants.OFFER_STATUS_OPTIONS[2]]
        : window.getValue(reduxObject, "appliedFilters.status")
        ? window.getValue(reduxObject, "appliedFilters.status")
        : [
            appConstants.OFFER_STATUS_OPTIONS[0],
            appConstants.OFFER_STATUS_OPTIONS[1],
          ],
    searchInputText: window.getValue(
      reduxObject,
      "appliedFilters.searchInputText"
    ),
    pageOffset: window.getValue(reduxObject, "pageOffset") || 0,
    pageSize: window.getValue(reduxObject, "pageSize") || 10,
    selectedTab: offerType,
    type: window.getValue(reduxObject, "appliedFilters.propertyTypes"),
  };
 
 // set object as it is for front-end refresh case in url
  // updated brands to brandsForFilter to avoid same key used in search properties case
  finalObj.brandsForFilter = window.getValue(reduxObject, "appliedFilters.brands");

  // update status in url to send for API
  finalObj = {
    ...finalObj,
    brands: window.getValue(reduxObject, "appliedFilters.brands"),
    status:
      offerType === appConstants.offerListTab.ARCHIVE
        ? [appConstants.OFFER_STATUS_OPTIONS[2].id]
        : window.getValue(reduxObject, "appliedFilters.status")
        ? getOnlyIdsFromStatusArray(window.getValue(reduxObject, "appliedFilters.status"))
        : [
            appConstants.OFFER_STATUS_OPTIONS[0].id,
            appConstants.OFFER_STATUS_OPTIONS[1].id,
          ]
  }
  delete finalObj.brandsForFilter;
  delete finalObj.statusForFilter;
  delete finalObj.selectedTab;
  const query = getObjectStringify(finalObj);
  return query;
};

const getOnlyIdsFromStatusArray = (statusArray) => {
  return statusArray.map((status) => status.id)
}
