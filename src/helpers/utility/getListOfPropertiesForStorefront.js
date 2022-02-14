import { store } from "../../redux/store";
import { isPropertySelected } from "./isPropertySelected";

export const getListOfPropertiesForStorefront = (storefrontToBeRemoved) => {
  let filteredProperties = [];
  try {
    const cartProperties = store.getState().propertycart.cartItems;

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
              cartProperties &&
                cartProperties.forEach((property) => {
                  if (
                    supplierId === property.supplier &&
                    channel.id === property.channel
                  ) {
                    if (!isPropertySelected(property, filteredProperties)) {
                      filteredProperties.push({ ...property });
                    }
                  }
                });
            });
        }
      });
  } catch (error) {
    console.error(error.toString());
  }

  return filteredProperties;
};
