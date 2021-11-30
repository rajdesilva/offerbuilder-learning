import { store } from "../../redux/store";

// check if same supplier present for other brands or storefronts
export const checkIfMultipleSupplierPresentForTarget = (supplierToRemove) => {
  let supplierCount = 0;
  try {
    const brands = store.getState().newoffersettingsparam.brands;
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
                    : supplier.name
                    ? JSON.parse(supplier.name).id
                    : null;
                  if (supplierId === supplierToRemove.id) {
                    supplierCount++;
                  }
                }
              });
          });
      });
  } catch (error) {
    console.log("error = ", error.toString());
  }

  return supplierCount > 1;
};
