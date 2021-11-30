import { propertyCartActions } from "../../pages/browseSupply/actions";
import { store } from "../../redux/store";

// update/remove property list in basket if storefront's supplier and channel combo is not present for that property
export const removePropertyForSelectedStorefront = (storefrontToBeRemoved) => {
  let propertycartItems = store.getState().propertycart.cartItems;
  storefrontToBeRemoved &&
    storefrontToBeRemoved.suppliers &&
    storefrontToBeRemoved.suppliers.forEach((supplier) => {
      if (supplier) {
        const supplierId = supplier.id
          ? supplier.id
          : supplier.name && supplier.name[0]
          ? JSON.parse(supplier.name[0]).id
          : null;
        supplier.channels &&
          supplier.channels.forEach((channel) => {
            channel = channel.id ? channel : JSON.parse(channel);
            propertycartItems = propertycartItems.filter((property) => {
              return !(
                supplierId === property.supplier &&
                channel.id === property.channel
              );
            });
          });
      }
    });

  // replace entire cartlist items after updating items with existing suppliers
  store.dispatch({
    type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
    payload: propertycartItems,
  });
};
