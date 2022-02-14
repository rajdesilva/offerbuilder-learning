import { appConstants } from "../../common";
import { store } from "../../redux/store";

export const getOfferTypeFromPropertiesSelected = () => {
  const propertyList = store.getState().propertycart.cartItems || [];
  if (propertyList && propertyList.length > 0) {
    try {
      const isProd = propertyList.every(
        (property) =>
          window.getValue(property, "type") ===
          appConstants.PROPERTY_TYPE_LIST[1].id
      );
      return isProd ? "PROD" : "DEMO";
    } catch (e) {
      console.error(e.toString());
    }
  }
  return appConstants.PROPERTY_TYPE_LIST[1].id;
};
