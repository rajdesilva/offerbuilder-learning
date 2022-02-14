import { store } from "../../redux/store";
import { supplySearchActions } from "../../pages/browseSupply/actions";
import { getSearchStateFromRedux } from "./getSearchStateFromRedux";
import { getObjectStringify } from "./getObjectStringify";

export const getSearchQueryURLForEditAddProperties = () => {
  const searchParams = store.getState().searchparams;
  try {
    const searchState = getSearchStateFromRedux();
    const reduxState = {
      ...searchState,
      city: window.getValue(searchParams, "destination.city"),
    };
    store.dispatch({
      type: supplySearchActions.SUPPLY_SEARCH_UPDATE_REDUX_STATE,
      payload: {
        ...reduxState,
        dateRange: window.getValue(searchParams, "dateRange"),
        destination: window.getValue(searchParams, "destination"),
      },
    });
    return getObjectStringify(searchState);
  } catch (e) {
    console.error(e.toString());
    return null;
  }
};
