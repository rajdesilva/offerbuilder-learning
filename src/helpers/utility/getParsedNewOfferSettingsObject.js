import { getValue } from "./getValue";
import { mapBrands } from "./mapBrands";

window.getValue = getValue;

export const getParsedNewOfferSettingsObject = (
  decodedQueryObj,
  isForQueryURL
) => {
  try {
    return {
      offerId: window.getValue(decodedQueryObj, "offerId"),
      status: window.getValue(decodedQueryObj, "status") || {
        id: "UNPUBLISHED",
        name: "UNPUBLISHED",
      },
      name: window.getValue(decodedQueryObj, "name"),
      brands: window.getValue(decodedQueryObj, "brands")
        ? isForQueryURL
          ? mapBrands(decodedQueryObj.brands)
          : decodedQueryObj.brands
        : [],
      lastSearchDistance:
        window.getValue(decodedQueryObj, "lastSearchDistance") || 10,
      bookingDateRange: window.getValue(decodedQueryObj, "bookingDateRange")
        ? {
            startDate: decodedQueryObj.bookingDateRange.startDate || "",
            endDate: decodedQueryObj.bookingDateRange.endDate || "",
          }
        : null,
      travellingDateRange: window.getValue(
        decodedQueryObj,
        "travellingDateRange"
      )
        ? {
            startDate: decodedQueryObj.travellingDateRange.startDate || "",
            endDate: decodedQueryObj.travellingDateRange.endDate || "",
          }
        : null,
      bookingDatesTimezone: window.getValue(
        decodedQueryObj,
        "bookingDatesTimezone"
      )
        ? decodedQueryObj.bookingDatesTimezone
        : "",
      deepLinkSettingsInfo: window.getValue(
        decodedQueryObj,
        "deepLinkSettingsInfo"
      )
        ? {
            destination: window.getValue(
              decodedQueryObj,
              "deepLinkSettingsInfo.destination"
            ),
            adultOccupancy:
              window.getValue(
                decodedQueryObj,
                "deepLinkSettingsInfo.adultOccupancy"
              ) || 1,
            childOccupancy:
              window.getValue(
                decodedQueryObj,
                "deepLinkSettingsInfo.childOccupancy"
              ) || 0,
            includeAllProperties:
              window.getValue(
                decodedQueryObj,
                "deepLinkSettingsInfo.includeAllProperties"
              ) === false ||
              window.getValue(
                decodedQueryObj,
                "deepLinkSettingsInfo.includeAllProperties"
              ) === "false"
                ? false
                : true,
            checkInType:
              window.getValue(
                decodedQueryObj,
                "deepLinkSettingsInfo.checkInType"
              ) || "rolling",
            los:
              window.getValue(decodedQueryObj, "deepLinkSettingsInfo.los") || 1,
            rollingOffset:
              window.getValue(
                decodedQueryObj,
                "deepLinkSettingsInfo.rollingOffset"
              ) || 0,
            fixedDate: window.getValue(
              decodedQueryObj,
              "deepLinkSettingsInfo.fixedDate"
            ),
          }
        : {
            destination: null,
            adultOccupancy: 1,
            childOccupancy: 0,
            includeAllProperties: true,
            checkInType: "rolling",
            los: 1,
            rollingOffset: 0,
            fixedDate: null,
          },
    };
  } catch (error) {
    console.log("error = ", error.toString());
  }
  return {};
};
