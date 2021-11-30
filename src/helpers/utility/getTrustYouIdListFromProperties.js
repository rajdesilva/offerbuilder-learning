import { store } from "../../redux/store";

export const getTrustYouIdListFromProperties = () => {
  const propertyList = store.getState().searchedproperties.properties || [];

  const trustYouIdList = [];

  try {
    propertyList.forEach((property) => {
      if (window.getValue(property, "mainProperty.info.trustyou.id")) {
        trustYouIdList.push(
          window.getValue(property, "mainProperty.info.trustyou.id")
        );
      }
    });
  } catch (e) {
    console.error(e.toString());
  }

  return trustYouIdList;
};
