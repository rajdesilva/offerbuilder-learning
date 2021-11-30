export const parsePropertyMarketingInfoToFormData = (propertyReduxData) => {
  const propertyFormData = [];
  try {
    propertyReduxData.forEach((property) => {
      let formProperty = {};
      // check if property has descriptions or marketing info (from property of offer in edit case)
      const propertyDescriptions = property.descriptions;
      propertyDescriptions &&
        propertyDescriptions.forEach((propertyDescription) => {
          formProperty[`${propertyDescription.lang}`] = {
            description: propertyDescription.description,
            shortDescription: propertyDescription.shortDescription
              ? propertyDescription.shortDescription
              : null,
          };
        });
      formProperty.images = property.images;
      propertyFormData.push(formProperty);
    });
  } catch (error) {
    console.log(error.toString());
  }
  return propertyFormData;
};
