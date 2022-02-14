import { cloneDeep } from "lodash";
import { store } from "../../redux/store";
import { getDistanceFromLatLonInKm } from "./getDistanceFromLatLonInKm";

export const checkIfPropertiesHaveMultipleLocations = () => {
  try {
    const lastSearchDistance =
      store.getState().newoffersettingsparam.lastSearchDistance;
    const propertyList = cloneDeep(
      window.getValue(store.getState(), "propertycart.cartItems") || []
    );
    // get destination coords from 
    const baseCoOrds = window.getValue(store.getState(),'newoffersettingsparam.deepLinkSettingsInfo.destination') || {};
    return !propertyList.every((property) => {
      return lastSearchDistance >=
      getDistanceFromLatLonInKm(
        baseCoOrds.lat,
        baseCoOrds.lng,
        property.latitude,
        property.longitude
      );
    });
  } catch (error) {
    console.log("error = ", error.toString());
  }
  return false;
};
