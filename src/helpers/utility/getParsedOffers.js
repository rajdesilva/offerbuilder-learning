export const getParsedOffers = (offerToBeParsed) => {
  try {
    return {
      key: offerToBeParsed.id,
      offerId: offerToBeParsed.id,
      properties: getParsedProperties(offerToBeParsed.properties),
      lcn: offerToBeParsed.lcn,
      type: offerToBeParsed.type,
      status: {
        id: offerToBeParsed.status,
        name: offerToBeParsed.status,
      },
      lastSearchDistance: offerToBeParsed.lastSearchDistance,
      images: offerToBeParsed.images || [],
      name: offerToBeParsed.internalName,
      brands: offerToBeParsed.targets,
      marketingInfo: offerToBeParsed.marketingInfo,
      languages: offerToBeParsed.languages,
      storefrontName: getStorefrontName(offerToBeParsed.targets),
      brandName: getBrandsName(offerToBeParsed.targets),
      bookingDatesTimezone: offerToBeParsed.bookingStartDate
        ? {
            value: offerToBeParsed.bookingZoneId,
          }
        : "",
      deepLinkSettingsInfo: offerToBeParsed.deepLinkSettingsInfo
        ? {
            destination: offerToBeParsed.deepLinkSettingsInfo.latitude
              ? {
                  lat: offerToBeParsed.deepLinkSettingsInfo.latitude,
                  lng: offerToBeParsed.deepLinkSettingsInfo.longitude,
                }
              : null,
            adultOccupancy:
              offerToBeParsed.deepLinkSettingsInfo.adultOccupancy || 1,
            childOccupancy:
              offerToBeParsed.deepLinkSettingsInfo.childOccupancy || 0,
            checkInType:
              offerToBeParsed.deepLinkSettingsInfo.rollingOffset !== -1
                ? "rolling"
                : "fixed",
            includeAllProperties:
              offerToBeParsed.deepLinkSettingsInfo.includeAllProperties ===
              false
                ? offerToBeParsed.deepLinkSettingsInfo.includeAllProperties
                : true,
            los: offerToBeParsed.deepLinkSettingsInfo.los || 1,
            rollingOffset:
              offerToBeParsed.deepLinkSettingsInfo.rollingOffset || 0,
            fixedDate:
              window.getValue(
                offerToBeParsed,
                "deepLinkSettingsInfo.rollingOffset"
              ) === -1 &&
              window.getValue(
                offerToBeParsed,
                "deepLinkSettingsInfo.checkinDate"
              )
                ? offerToBeParsed.deepLinkSettingsInfo.checkinDate
                : null,
          }
        : {},
      bookingDateRange: offerToBeParsed.bookingStartDate
        ? {
            startDate: offerToBeParsed.bookingStartDate,
            endDate: offerToBeParsed.bookingEndDate,
          }
        : null,
      displayBookingDateRange: offerToBeParsed.bookingStartDate
        ? {
            startDate: offerToBeParsed.bookingStartDate,
            endDate: offerToBeParsed.bookingEndDate,
          }
        : null,
      currency: offerToBeParsed.currencyCode || "EUR",
      createdDate: offerToBeParsed.createdAt,
      travellingDateRange: offerToBeParsed.travelStartDate
        ? {
            startDate: offerToBeParsed.travelStartDate,
            endDate: offerToBeParsed.travelEndDate,
          }
        : null,
      displayTravellingDateRange: offerToBeParsed.travelStartDate
        ? {
            startDate: offerToBeParsed.travelStartDate,
            endDate: offerToBeParsed.travelEndDate,
          }
        : null,
    };
  } catch (e) {
    console.error(e);
    return {};
  }
};

const getParsedProperties = (properties) => {
  return properties.map((property, index) => {
    let finalProperty = {
      ...property,
      hotelName: property.name,
      key: index,
      // added to differentiate already saved Property in offer with newly added in edit offer case when
      // going to add new properties
      isSavedProperty: true,
      marketingImages: property.images,
    };
    // update key name for displaying in marekting page
    delete Object.assign(finalProperty, {
      descriptions: finalProperty.marketingInfo,
    }).marketingInfo;
    return finalProperty;
  });
};

const getBrandsName = (brands) => {
  let brandName = "";
  brands.forEach((brand) => {
    brandName = brandName ? brandName.concat(" , " + brand.name) : brand.name;
  });

  return brandName;
};

const getStorefrontName = (brands) => {
  let storefrontName = "";
  try {
    brands.forEach((brand) => {
      brand.storefronts &&
        brand.storefronts.forEach((storefront) => {
          storefrontName = storefrontName
            ? storefrontName.concat(" , " + storefront.name)
            : storefront.name;
        });
    });

    return storefrontName;
  } catch (e) {
    console.error(e);
    return storefrontName;
  }
};
