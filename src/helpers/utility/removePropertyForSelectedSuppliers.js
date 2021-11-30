import { propertyCartActions } from "../../pages/browseSupply/actions";
import { store } from "../../redux/store";

// update/remove property list in basket if supplier is not present for that property
export const removePropertyForSelectedSuppliers = (supplierToRemove) => {
  let propertycartItems = store.getState().propertycart.cartItems;
  try {
    propertycartItems = propertycartItems.filter(
      (cartProperty) => cartProperty.supplier !== supplierToRemove.id
    );
  } catch (error) {
    console.log(error.toString());
  }
  // replace entire cartlist items after updating items with existing suppliers
  store.dispatch({
    type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
    payload: propertycartItems || [],
  });
};
