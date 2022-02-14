import { store } from "../../redux/store";

export const getListOfPropertiesForSupplier = (supplierToBeRemoved) => {
  let filteredProperties = [];
  try {
    const cartProperties = store.getState().propertycart.cartItems;
    if (cartProperties) {
      filteredProperties = cartProperties.filter(
        (property) => supplierToBeRemoved.id === property.supplier
      );
    }
  } catch (error) {
    console.error(error.toString());
  }
  return filteredProperties;
};
