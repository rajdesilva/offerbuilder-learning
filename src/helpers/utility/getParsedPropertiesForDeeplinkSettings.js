import { store } from "../../redux/store";

export const getParsedPropertiesForDeeplinkSettings = () => {
  let parsedPropertyList = [];
  try {
    const cartItems = store.getState().propertycart.cartItems;
    if (cartItems)
      parsedPropertyList = cartItems.map((property) => ({
        id: property.internalId || property.propertyCode,
        name: property.name || property.hotelName,
      }));
  } catch (e) {
    console.error(e.toString());
  }
  return parsedPropertyList;
};
