import { store } from "../../redux/store";

// check if supplier and channels for storefront present for other brands or not
export const checkIfMultipleStorefrontPresentForTarget = (
  storefrontToRemove
) => {
  let storefrontCount = 0; // how may time storefront's channel and supplier present for other brands or same brand
  try {
    const brands = store.getState().newoffersettingsparam.brands;
    if (storefrontToRemove && storefrontToRemove.suppliers) {
      storefrontToRemove.suppliers.forEach((supplierToRemove) => {
        const supplierToRemoveId = supplierToRemove.id
          ? supplierToRemove.id
          : supplierToRemove.name && supplierToRemove.name[0]
          ? JSON.parse(supplierToRemove.name[0]).id
          : null;
        supplierToRemoveId &&
          brands &&
          brands.forEach((brand) => {
            brand.storefronts &&
              brand.storefronts.forEach((storefront) => {
                storefront &&
                  storefront.suppliers &&
                  storefront.suppliers.forEach((supplier) => {
                    if (supplier) {
                      const supplierId = supplier.id
                        ? supplier.id
                        : supplier.name && supplier.name[0]
                        ? JSON.parse(supplier.name[0]).id
                        : null;
                      if (supplierToRemoveId === supplierId) {
                        if (supplierToRemove.channels) {
                          supplierToRemove.channels.forEach(
                            (channelToRemove) => {
                              channelToRemove = channelToRemove.id
                                ? channelToRemove
                                : JSON.parse(channelToRemove);
                              supplier.channels &&
                                supplier.channels.forEach((channel) => {
                                  channel = channel.id
                                    ? channel
                                    : JSON.parse(channel);
                                  if (channel.id === channelToRemove.id) {
                                    storefrontCount++;
                                  }
                                });
                            }
                          );
                        } else {
                          // as channels not added for supplier in storefront
                          // but supplier present in other brand or storefronts
                          // skip display dialog
                          storefrontCount = 2;
                        }
                      }
                    }
                  });
              });
          });
      });
    } else {
      storefrontCount = 2; // as storefront or supplier is not valid or present in the remove process
    }
  } catch (error) {
    console.error("error = ", error.toString());
  }

  return storefrontCount > 1;
};
