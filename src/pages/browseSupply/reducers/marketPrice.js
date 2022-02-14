import produce from "immer";
import { supplySearchActions } from "../actions";

export const marketPrice = produce(
  (draft, action) => {
    switch (action.type) {
      case supplySearchActions.FETCH_MARKET_PRICE_LOADING:
        draft.loading = action.payload;
        draft.marketPriceData = [];
        return;
      case supplySearchActions.FETCH_MARKET_PRICE_SUCCESS:
        draft.loading = false;
        draft.marketPriceData = action.payload;
        return;
      case supplySearchActions.FETCH_MARKET_PRICE_FAILURE:
        draft.loading = false;
        draft.marketPriceData = [];
        return;
      case supplySearchActions.SET_INCLUDE_MARKET_PRICE_FLAG:
        draft.includeMarketPrice = action.payload;
        return;
      default:
        return draft;
    }
  },
  {
    loading: false,
    marketPriceData: [],
    includeMarketPrice: false,
  }
);
