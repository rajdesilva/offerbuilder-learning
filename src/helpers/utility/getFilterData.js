import { appConstants } from "../../common";

export const getFilterData = (brands) => {
  let brandsForFilter = [];
  let storefrontsForFilter = [];
  let suppliersForFilter = [];
  let channelsForFilter = [];
  try {
    brands &&
      brands.forEach((brand) => {
        if (brandsForFilter.findIndex((temp) => temp.id === brand.id) === -1) {
          brandsForFilter.push({
            id: brand.id,
            name: brand.name,
          });
        }
        brand &&
          brand.storefronts &&
          brand.storefronts.forEach((storefront) => {
            if (
              storefrontsForFilter.findIndex(
                (temp) => temp.id === storefront.id
              ) === -1
            ) {
              storefrontsForFilter.push({
                id: storefront.id,
                name: storefront.name,
              });
            }
            storefront &&
              storefront.suppliers &&
              storefront.suppliers.forEach((supplier) => {
                if (
                  suppliersForFilter.findIndex(
                    (temp) => temp.id === supplier.id
                  ) === -1
                ) {
                  suppliersForFilter.push({
                    id: supplier.id,
                    name: supplier.name,
                  });
                }
                supplier &&
                  supplier.channels &&
                  supplier.channels.forEach((channel) => {
                    if (
                      channelsForFilter.findIndex(
                        (temp) => temp.id === channel.id
                      ) === -1
                    ) {
                      channelsForFilter.push({
                        id: channel.id,
                        name: channel.name,
                      });
                    }
                  });
              });
          });
      });
    return {
      brands: brandsForFilter,
      storefronts: storefrontsForFilter,
      suppliers: suppliersForFilter,
      channels: channelsForFilter,
      propertyTypes: appConstants.PROPERTY_TYPE_LIST
    };
  } catch (e) {
    console.error(e.toString());
    return null;
  }
};
