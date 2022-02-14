export const isSavedOfferProperty = (currentProperty, propertyList) => {
  try {
    if (propertyList) {
      return (
        propertyList.findIndex(
          (property) =>
            property.propertyCode === currentProperty.propertyCode &&
            property.supplier === currentProperty.supplier &&
            property.channel === currentProperty.channel &&
            property.isSavedProperty === true
        ) !== -1
      );
    }
  } catch (error) {
    console.log("error = ", error.toString());
  }
  return false;
};
