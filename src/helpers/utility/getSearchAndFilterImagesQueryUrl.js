import { store } from "../../redux/store";
import moment from "moment";
import { getObjectStringify } from "./getObjectStringify";

export const getSearchAndFilterImagesQueryUrl = () => {
  let finalObj = {};
  try {
    const reduxObject = store.getState().offerimagesearchandfilters;
    finalObj = {
      fileName: window.getValue(reduxObject, "appliedImageFilters.fileName"),
      uploadedByCurrentUser: window.getValue(
        reduxObject,
        "appliedImageFilters.uploadedByCurrentUser"
      ),
      usedInAnyOffer: window.getValue(
        reduxObject,
        "appliedImageFilters.usedInAnyOffer"
      ),
      offerIds: window.getValue(reduxObject, "appliedImageFilters.offerIds")
        ? [window.getValue(reduxObject, "appliedImageFilters.offerIds")]
        : [],
      searchInputText: window.getValue(
        reduxObject,
        "appliedImageFilters.searchInputText"
      ),
      uploadedStartDate: window.getValue(
        reduxObject,
        "appliedImageFilters.uploadDateRange.uploadedStartDate"
      )
        ? moment(
            window.getValue(
              reduxObject,
              "appliedImageFilters.uploadDateRange.uploadedStartDate"
            )
          ).format("YYYY-MM-DD")
        : "",
      uploadedEndDate: window.getValue(
        reduxObject,
        "appliedImageFilters.uploadDateRange.uploadedEndDate"
      )
        ? moment(
            window.getValue(
              reduxObject,
              "appliedImageFilters.uploadDateRange.uploadedEndDate"
            )
          ).format("YYYY-MM-DD")
        : "",
      pageOffset: window.getValue(reduxObject, "pageOffset") || 0,
      pageSize: window.getValue(reduxObject, "pageSize") || 10,
    };
  } catch (error) {
    console.log(error.toString());
  }

  const query = getObjectStringify(finalObj);

  return query;
};
