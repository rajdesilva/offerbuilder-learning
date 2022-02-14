import { propertyCartActions } from "../../pages/browseSupply/actions";
import { store } from "../../redux/store";

// update/remove property list in basket if supplier/channel for the brand is not present for that property
export const removePropertyForBrand = (brandToBeRemoved, index) => {
  let propertycartItems = store.getState().propertycart.cartItems;
  brandToBeRemoved &&
    brandToBeRemoved.storefronts &&
    brandToBeRemoved.storefronts.forEach((storefront) => {
      storefront &&
        storefront.suppliers &&
        storefront.suppliers.forEach((supplier) => {
          if (supplier) {
            const supplierId = supplier.id
              ? supplier.id
              : supplier.name
              ? JSON.parse(supplier.name).id
              : null;
            if (supplier.channels && supplier.channels.length > 0) {
              supplier.channels.forEach((channel) => {
                channel = channel.id ? channel : JSON.parse(channel);
                propertycartItems =
                  propertycartItems &&
                  propertycartItems.filter(
                    (property) =>
                      !(
                        supplierId === property.supplier &&
                        channel.id === property.channel
                      )
                  );
              });
            }
          }
        });
    });

  // replace entire cartlist items after updating items with existing suppliers
  store.dispatch({
    type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
    payload: propertycartItems,
  });
};
