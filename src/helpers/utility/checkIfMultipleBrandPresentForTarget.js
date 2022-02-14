import { store } from "../../redux/store";

// check if supplier and channels for storefront present for other brands or not
export const checkIfMultipleBrandPresentForTarget = (brandToRemove) => {
  let brandCount = 0; // how may times, brand-> storefront's channel and supplier present in target
  try {
    const brands = store.getState().newoffersettingsparam.brands;
    if (brandToRemove && (brandToRemove.id || brandToRemove.name)) {
      if (
        brandToRemove.storefronts &&
        brandToRemove.storefronts[0] &&
        (brandToRemove.storefronts[0].id || brandToRemove.storefronts[0].name)
      ) {
        brandToRemove.storefronts.forEach((storefrontToRemove) => {
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
                                        brandCount++;
                                      }
                                    });
                                }
                              );
                            }
                          }
                        }
                      });
                  });
              });
          });
        });
      } else {
        brandCount = 2; // as brand's storefront is not valid or present in the remove process
      }
    } else {
      brandCount = 2; // as brand is not valid or present in the remove process
    }
  } catch (error) {
    console.log("error = ", error.toString());
  }

  return brandCount > 1;
};
