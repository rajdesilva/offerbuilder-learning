import { browseSupplyActions } from "../../pages/browseSupply/actions";
import { store } from "../../redux/store";
import { checkIfItemAlreadyPresentInList } from "./checkIfItemAlreadyPresentInList";
import { getAllBrandsWithoutKeysFromTempBrands } from "./getAllBrandsWithoutKeysFromTempBrands";

export const updateSettingsBrandWithSearchedValues = () => {
  let filteredProperties = [];
  try {
    const brandInfo = getAllBrandsWithoutKeysFromTempBrands();
    let settingsBrands = store.getState().newoffersettingsparam.brands;
    settingsBrands =
      settingsBrands &&
      settingsBrands.map((toUpdatebrand) => {
        let newBrand = toUpdatebrand;
        let finalStorefronts = toUpdatebrand.storefronts;
        let newStorefrontList = [];
        brandInfo &&
          brandInfo.forEach((brand) => {
            if (toUpdatebrand.id === brand.id) {
              finalStorefronts =
                toUpdatebrand.storefronts &&
                toUpdatebrand.storefronts.map((toUpdateStorefront) => {
                  let finalSuppliers;
                  let finalStorefront = toUpdateStorefront;
                  brand.storefronts.forEach((storefront) => {
                    if (toUpdateStorefront.id === storefront.id) {
                      finalSuppliers =
                        toUpdateStorefront &&
                        toUpdateStorefront.suppliers &&
                        toUpdateStorefront.suppliers.map((toUpdateSupplier) => {
                          let newChannelsList = [];
                          newChannelsList.push(...toUpdateSupplier.channels);
                          storefront &&
                            storefront.suppliers &&
                            storefront.suppliers.forEach((supplier) => {
                              if (toUpdateSupplier.id === supplier.id) {
                                toUpdateSupplier.channels.forEach(
                                  (toUpdateChannel) => {
                                    supplier.channels.forEach((channel) => {
                                      if (toUpdateChannel.id === channel.id) {
                                        console.log(
                                          "same channel so go for next =",
                                          toUpdateChannel.id
                                        );
                                      } else {
                                        if (
                                          !checkIfItemAlreadyPresentInList(
                                            channel,
                                            newChannelsList
                                          )
                                        ) {
                                          // updatedChannels added to channels list
                                          newChannelsList.push({
                                            ...channel,
                                          });
                                        }
                                      }
                                    });
                                  }
                                );
                              } else {
                                if (
                                  !checkIfItemAlreadyPresentInList(
                                    supplier,
                                    toUpdateStorefront.suppliers
                                  )
                                ) {
                                  let suppliers = [];
                                  suppliers.push(
                                    ...toUpdateStorefront.suppliers
                                  );
                                  suppliers.push({ ...supplier });
                                  finalStorefront = {
                                    ...toUpdateStorefront,
                                    suppliers: suppliers,
                                  };
                                }
                              }
                            });
                          return {
                            ...toUpdateSupplier,
                            channels: newChannelsList,
                          };
                        });
                    } else {
                      if (
                        !checkIfItemAlreadyPresentInList(
                          storefront,
                          toUpdatebrand.storefronts
                        )
                      ) {
                        newStorefrontList.push({
                          ...storefront,
                        });
                      }
                      finalSuppliers = toUpdateStorefront.suppliers;
                    }
                  });
                  return {
                    ...finalStorefront,
                    suppliers: finalSuppliers,
                  };
                });
            } else {
              if (!checkIfItemAlreadyPresentInList(brand, settingsBrands)) {
                filteredProperties.push({
                  ...brand,
                });
              }
            }
          });
        if (newStorefrontList && newStorefrontList.length > 0) {
          finalStorefronts.push(...newStorefrontList);
        }
        return {
          ...newBrand,
          storefronts: finalStorefronts,
        };
      });
    filteredProperties.push(...settingsBrands);
  } catch (error) {
    console.log(error.toString());
  }
  store.dispatch({
    type: browseSupplyActions.RESET_TEMP_EDITED_BRANDS,
  });
  return filteredProperties;
};
