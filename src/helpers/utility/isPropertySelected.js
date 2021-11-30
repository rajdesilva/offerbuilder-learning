export const isPropertySelected = (currentProperty, propertyList) => {
  try {
    if (propertyList) {
      return (
        propertyList.findIndex(
          (property) =>
            property.propertyCode === currentProperty.propertyCode &&
            property.supplier === currentProperty.supplier &&
            property.channel === currentProperty.channel
        ) !== -1
      );
    }
  } catch (error) {
    console.log("error = ", error.toString());
  }
  return false;
};
