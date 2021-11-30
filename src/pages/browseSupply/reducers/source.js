import produce from "immer";
import { supplySearchActions } from "../actions";

export const sourceInfo = produce(
  (draft, action) => {
    switch (action.type) {
      case supplySearchActions.SEARCH_BRANDS_LOADING:
        draft.loading = action.payload;
        draft.brands = [];
        return;
      case supplySearchActions.SEARCH_BRANDS_SUCCESS:
        draft.loading = false;
        draft.brands = action.payload;
        return;
      case supplySearchActions.SEARCH_BRANDS_FAILURE:
        draft.loading = false;
        draft.brands = [];
        return;
      default:
        return draft;
    }
  },
  {
    loading: false,
    brands: [],
  }
);
