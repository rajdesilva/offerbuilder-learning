import { appConstants } from "../../common";
import { store } from "../../redux/store";
import { mapOnlySuppliers } from "../utility";
import { mapBrands } from "./mapBrands";

export const getSearchStateFromRedux = () => {
  try {
    const searchParams = store.getState().searchparams;
    return {
      latitude: window.getValue(searchParams, "destination.lat"),
      longitude: window.getValue(searchParams, "destination.lng"),
      distance: window.getValue(searchParams, "distance"),
      hotelName: window.getValue(searchParams, "hotelName"),
      startDate: window.getValue(searchParams, "dateRange.startDate"),
      endDate: window.getValue(searchParams, "dateRange.endDate"),
      los: window.getValue(searchParams, "los") || 1,
      onlySupplier: searchParams.onlySupplier,
      lcn: searchParams.lcn || false,
      currencyCode: searchParams.currencyCode || "EUR",
      remainingCapitalPool: window.getValue(
        searchParams,
        "remainingCapitalPool"
      )
        ? parseInt(searchParams.remainingCapitalPool)
        : null,
      pageSize: searchParams.pageSize,
      pageOffset: searchParams.pageOffset,
      sortOrder: window.getValue(searchParams, "sortBy.sortOrder"),
      sortCriteria: window.getValue(searchParams, "sortBy.sortCriteria"),
      suppliers: searchParams.onlySupplier
        ? searchParams.target
          ? mapOnlySuppliers(searchParams.target)
          : searchParams.suppliers
        : [],
      brands:
        !searchParams.onlySupplier && window.getValue(searchParams, "brands")
          ? mapBrands(searchParams.brands)
          : [],
      type: searchParams.type || appConstants.PROPERTY_TYPE_LIST[0].id
    };
  } catch (e) {
    console.error(e.toString());
    return {};
  }
};
