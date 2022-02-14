import { propertyCartActions } from "../../pages/browseSupply/actions";
import { store } from "../../redux/store";

// update/remove property list in basket if channel is not present for that property
export const removePropertyForSelectedChannels = (channelToBeRemoved) => {
  let propertycartItems = store.getState().propertycart.cartItems
  try {
    propertycartItems = propertycartItems.filter((cartProperty) => {
      return cartProperty.channel !== channelToBeRemoved.id;
    });
  } catch (error) {
    console.log(error.toString());
  }
  // replace entire cartlist items after updating items with existing suppliers
  store.dispatch({
    type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
    payload: propertycartItems || [],
  });
};
