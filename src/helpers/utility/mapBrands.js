const _ = require("lodash");
export const mapBrands = (formBrandValues) => {
  let mappedBrands = [];
  try {
    mappedBrands = formBrandValues.map((brand) => {
      if (brand && brand.name) {
        let mappedBrand =
          brand.name.indexOf("{") === -1
            ? { ...brand }
            : JSON.parse(brand.name);
        mappedBrand.storefronts = brand.storefronts.map((storefront) => {
          let mappedStoreFront =
            storefront.name.indexOf("{") === -1
              ? { ...storefront }
              : JSON.parse(storefront.name);
          mappedStoreFront.suppliers =
            storefront.suppliers &&
            storefront.suppliers.map((supplier) => {
              let mappedSupplier;
              if (
                supplier.name &&
                _.isArray(supplier.name) &&
                supplier.name[0].indexOf("{") !== -1
              ) {
                mappedSupplier = JSON.parse(supplier.name);
              } else {
                mappedSupplier = supplier.id
                  ? { ...supplier }
                  : JSON.parse(supplier.name);
              }

              mappedSupplier.channels =
                supplier.channels &&
                supplier.channels.map((channel) =>
                  channel.id ? { ...channel } : JSON.parse(channel)
                );
              return mappedSupplier;
            });
          return mappedStoreFront;
        });
        return mappedBrand;
      }
      return brand;
    });
  } catch (error) {
    console.log(error.toString());
  }
  return mappedBrands;
};
