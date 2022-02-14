import { store } from "../../redux/store";
import { parseFormDescriptionsAndImagesForOffer } from "./parseFormDescriptionsAndImagesForOffer";

export const createOfferRequestObject = () => {
  try {
    let propertycartItems = store.getState().propertycart.cartItems;
    const marketingInfo = store.getState().newoffermarketinginfo;
    const newOfferParams = store.getState().newoffersettingsparam;
    return {
      id: window.getValue(newOfferParams, "offerId"),
      internalName: window.getValue(newOfferParams, "name"),
      type: window.getValue(newOfferParams, "type"),
      currencyCode:
        window.getValue(store.getState(), "currency.selectedCurrency") || "EUR",
      languages: marketingInfo.selectedLanguages.map((language) => language.id),
      status:
        window.getValue(newOfferParams, "status.id") ||
        (window.getValue(newOfferParams, "status")
          ? JSON.parse(window.getValue(newOfferParams, "status")).id
          : {}),
      targets: window.getValue(newOfferParams, "brands") || [],
      images: window.getValue(marketingInfo, "marketingInfo.images") || [],
      marketingInfo: window.getValue(marketingInfo, "marketingInfo")
        ? parseFormDescriptionsAndImagesForOffer(marketingInfo.marketingInfo)
        : {},
      lastSearchDistance: window.getValue(newOfferParams, "lastSearchDistance"),
      properties:
        (propertycartItems &&
          propertycartItems.map((property) => {
            let finalProperty = { ...property };
            delete Object.assign(finalProperty, {
              marketingInfo: window.getValue(finalProperty, "descriptions"),
            }).descriptions;
            finalProperty.ratingProvider = "";
            finalProperty.images =
              window.getValue(finalProperty, "marketingImages") || [];
            delete finalProperty.marketingImages;
            delete Object.assign(finalProperty, {
              name: window.getValue(finalProperty, "hotelName"),
            }).hotelName;
            return finalProperty;
          })) ||
        [],
      bookingStartDate:
        window.getValue(newOfferParams, "bookingDateRange.startDate") || null,
      bookingEndDate:
        window.getValue(newOfferParams, "bookingDateRange.endDate") || null,
      bookingZoneId:
        window.getValue(newOfferParams, "bookingDatesTimezone.value") || null,
      travelStartDate:
        window.getValue(newOfferParams, "travellingDateRange.startDate") ||
        null,
      travelEndDate:
        window.getValue(newOfferParams, "travellingDateRange.endDate") || null,
      deepLinkSettingsInfo: {
        adultOccupancy: window.getValue(
          newOfferParams,
          "deepLinkSettingsInfo.adultOccupancy"
        ),
        checkinDate:
          window.getValue(
            newOfferParams,
            "deepLinkSettingsInfo.checkInType"
          ) === "fixed"
            ? window.getValue(newOfferParams, "deepLinkSettingsInfo.fixedDate")
            : null,
        childOccupancy: window.getValue(
          newOfferParams,
          "deepLinkSettingsInfo.childOccupancy"
        ),
        latitude: window.getValue(
          newOfferParams,
          "deepLinkSettingsInfo.destination"
        )
          ? newOfferParams.deepLinkSettingsInfo.destination.lat
          : "",
        longitude: window.getValue(
          newOfferParams,
          "deepLinkSettingsInfo.destination"
        )
          ? newOfferParams.deepLinkSettingsInfo.destination.lng
          : "",
        includeAllProperties: window.getValue(
          newOfferParams,
          "deepLinkSettingsInfo.includeAllProperties"
        ),
        los: window.getValue(newOfferParams, "deepLinkSettingsInfo.los"),
        rollingOffset:
          window.getValue(
            newOfferParams,
            "deepLinkSettingsInfo.checkInType"
          ) === "rolling"
            ? window.getValue(
                newOfferParams,
                "deepLinkSettingsInfo.rollingOffset"
              )
            : -1, // in case of fixed case
      },
    };
  } catch (error) {
    console.log("error = ", error.toString());
    return {};
  }
};
