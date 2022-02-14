export const isParentOrChildrenPropertyAdded = (
  clickedRow,
  selectedProperties
) => {
  try {
    if (selectedProperties) {
      return (
        selectedProperties.findIndex(
          (property) => property.propertyCode === clickedRow.propertyCode
        ) !== -1
      );
    }
  } catch (error) {
    console.log(error.toString());
  }
  return false;
};
