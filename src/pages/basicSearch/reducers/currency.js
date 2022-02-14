import produce from "immer";
import { supplySearchActions } from "../actions";

export const currency = produce(
  (draft, action) => {
    switch (action.type) {
      case supplySearchActions.FETCH_CURRENCIES_LOADING:
        draft.loading = action.payload;
        draft.currencyList = [];
        return;
      case supplySearchActions.FETCH_CURRENCIES_SUCCESS:
        draft.loading = false;
        draft.currencyList = action.payload;
        return;
      case supplySearchActions.FETCH_CURRENCIES_FAILURE:
        draft.loading = false;
        draft.currencyList = [];
        return;
      case supplySearchActions.SET_SELECTED_CURRENCY:
        draft.selectedCurrency = action.payload;
        return;
      default:
        return draft;
    }
  },
  {
    loading: false,
    currencyList: [],
    selectedCurrency: "EUR",
  }
);
