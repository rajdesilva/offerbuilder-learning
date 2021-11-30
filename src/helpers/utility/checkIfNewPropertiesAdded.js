import { store } from "../../redux/store";

export const checkIfNewPropertiesAdded = () => {
  const cartItems = window.getValue(store.getState(), 'propertycart.cartItems') || [];
  try {
    return (
      cartItems.findIndex((property) => property.isSavedProperty !== true) !== -1
    );
  } catch (error) {
    console.log("error = ", error.toString());
  }
  return false;
};