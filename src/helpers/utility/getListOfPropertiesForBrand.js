import { store } from "../../redux/store";
import { isPropertySelected } from "./isPropertySelected";

export const getListOfPropertiesForBrand = (brandToBeRemoved) => {
  let filteredProperties = [];
  try {
    const cartProperties = store.getState().propertycart.cartItems;
    brandToBeRemoved && brandToBeRemoved.storefronts &&
      brandToBeRemoved.storefronts.forEach((storefront) => {
        storefront &&
          storefront.suppliers &&
          storefront.suppliers.forEach((supplier) => {
            const supplierId = supplier.id
              ? supplier.id
              : supplier.name && supplier.name[0]
              ? JSON.parse(supplier.name[0]).id
              : null;
            supplier.channels.forEach((channel) => {
              const channelId = channel.id
                ? channel.id
                : JSON.parse(channel).id;
              cartProperties &&
                cartProperties.forEach((property) => {
                  if (
                    supplierId === property.supplier &&
                    channelId === property.channel
                  ) {
                    if (!isPropertySelected(property, filteredProperties)) {
                      filteredProperties.push({ ...property });
                    }
                  }
                });
            });
          });
      });
  } catch (error) {
    console.log("error = ", error.toString());
  }

  return filteredProperties;
};
