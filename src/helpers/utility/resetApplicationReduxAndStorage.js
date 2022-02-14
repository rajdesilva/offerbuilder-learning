import {
  browseSupplyActions,
  propertyCartActions,
  supplySearchActions,
} from "../../pages/browseSupply/actions";
import { marketingActions, newOfferActions, offerListSearchAndFilterActions } from "../../pages/offers/actions";
import { store } from "../../redux/store";

export const resetApplicationReduxAndStorage = () => {
  store.dispatch({
    type: propertyCartActions.EMPTY_CART,
  });
  store.dispatch({
    type: marketingActions.RESET_REDUX_STATE,
  });
  store.dispatch({
    type: newOfferActions.NEW_OFFER_RESET_REDUX_STATE,
  });
  store.dispatch({
    type: browseSupplyActions.RESET_TEMP_EDITED_BRANDS,
  });
  store.dispatch({
    type: supplySearchActions.RESET_SEARCH_PARAM_STATE,
  });
  store.dispatch({
    type: offerListSearchAndFilterActions.RESET_OFFER_FILTER_DATA
  });
};
