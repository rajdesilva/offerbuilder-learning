import produce from "immer";
import { browseSupplyActions } from "../actions/browseSupply";

export const searchedProperties = produce(
  (draft, action) => {
    switch (action.type) {
      case browseSupplyActions.BROWSE_SUPPLY_SEARCH_LOADING:
        draft.loading = action.payload;
        return;
      case browseSupplyActions.BROWSE_SUPPLY_SEARCH_SUCCESS:
        draft.loading = false;
        draft.properties = action.payload;
        draft.totalMatch = action.totalMatch;
        return;
      case browseSupplyActions.RESET_SEARCHED_PROPERTIES:
          draft.loading = false;
          draft.properties = null;
          draft.totalMatch = null;
          return;
      case browseSupplyActions.BROWSE_SUPPLY_SEARCH_FAILURE:
        draft.loading = false;
        draft.properties = null;
        return;
      case browseSupplyActions.ADD_TEMP_EDITED_BRANDS:
        draft.searchedBrands.push({
          brands: window.getValue(action, 'payload.brands') || [],
          key: window.getValue(action, 'payload.key') || '', // combination of property id + supplier + channel
        });
        return;
      case browseSupplyActions.REMOVE_TEMP_EDITED_BRANDS:
        draft.searchedBrands = draft.searchedBrands.filter(
          (brandInfo) => action.payload !== brandInfo.key
        );
        return;
      case browseSupplyActions.RESET_TEMP_EDITED_BRANDS:
        draft.searchedBrands = [];
        return;
      default:
        return draft;
    }
  },
  {
    loading: false,
    properties: null,
    searchedBrands: [],
  }
);
