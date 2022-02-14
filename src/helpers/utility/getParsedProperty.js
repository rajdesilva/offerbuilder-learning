import { appConstants } from "../../common";

export const getParsedProperty = (property, index, isParent) => {
  const parsedProperty = {
    img: window.getValue(property, "info.images[0]"),
    images: window.getValue(property, "info.images") || [],
    propertyCode: window.getValue(property, "propertyCode"),
    lcn: window.getValue(property, "lcn"),
    supplier: window.getValue(property, "supplier"),
    channel: window.getValue(property, "channel"),
    hotelName: window.getValue(property, "info.name"),
    remainingCapital: window.getValue(property, "remainingCapital"),
    city: window.getValue(property, "info.city"),
    arrivalDate: window.getValue(property, "arrivalDate"),
    latitude: window.getValue(property, "info.latitude"),
    longitude: window.getValue(property, "info.longitude"),
    highestMargin: window.getValue(property, "highestMargin"),
    lowestMargin: window.getValue(property, "lowestMargin"),
    b2bPrice: window.getValue(property, "b2bPrice"),
    b2cPrice: window.getValue(property, "b2cPrice"),
    margin: window.getValue(property, "margin"),
    country: window.getValue(property, "info.countryName"),
    rating: window.getValue(property, "info.award.value"),
    description: window.getValue(property, "info.description"),
    descriptions: (window.getValue(property, "info.descriptions") || []).map(
      (description) => {
        let finalDescription = { ...description };
        // replace text with description for consistancy in redux for updating property info
        delete Object.assign(finalDescription, {
          description: finalDescription.text,
        }).text;
        return finalDescription;
      }
    ),
    trustyou: window.getValue(property, "info.trustyou"),
    isParent,
    type: window.getValue(property, "type") || appConstants.PROPERTY_TYPE_LIST[0].id,
  };

  if (isParent) {
    return {
      ...parsedProperty,
      key: window.getValue(property, "propertyCode") + "-" + index + isParent,
    };
  } else {
    return {
      ...parsedProperty,
      key:
        window.getValue(property, "propertyCode") +
        "-" +
        window.getValue(property, "supplier") +
        "-" +
        window.getValue(property, "channel") +
        "-" +
        index,
    };
  }
};
