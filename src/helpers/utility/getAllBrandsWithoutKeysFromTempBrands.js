import { store } from "../../redux/store";

export const getAllBrandsWithoutKeysFromTempBrands = () => {
  let finalBrandsList = [];
  try {
    let brandKeyInfo = store.getState().searchedproperties.searchedBrands;
    brandKeyInfo &&
      brandKeyInfo.forEach((brandKeyObject) => {
        if (brandKeyObject && brandKeyObject.brands) {
          finalBrandsList.push(...brandKeyObject.brands);
        }
      });
  } catch (error) {
    console.log("error = ", error.toString());
  }

  return finalBrandsList;
};
