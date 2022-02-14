import { appConstants } from "../../common";
import { store } from "../../redux/store";
import { mapOnlySuppliers } from "../utility";
import { mapBrands } from "./mapBrands";

export const getSearchStateBasicFromRedux = () => {
  try {
    const searchParams = store.getState().searchparamsBasic;
    return {
      Address: window.getValue(searchParams, "address"),
      countryCode: window.getValue(searchParams, "zip"),
      distance: window.getValue(searchParams, "distance"),
      globalSearchType: "ADVANCE",
      hotelName: window.getValue(searchParams, "hotelName"),
      id: '',
      languageCode: '',
      latitude: '',
      longitude: '',
      pageOffset: 1,
      pageSize: 10,
      sortCriteria: "NAME",
      sortOrder: "ASC",
    };
  } catch (e) {
    console.error(e.toString());
    return {};
  }
};
