import { store } from "../../redux/store";
import { history } from "../history";
import { supplySearchActions } from "../../pages/browseSupply/actions";
import { getSearchStateFromRedux } from "./getSearchStateFromRedux";
import { getObjectStringify } from "./getObjectStringify";

export const createSearchQueryURL = (
  routePostSearch,
  isForSearchSettingsURLUpdate
) => {
  try {
    const searchParams = store.getState().searchparams;
    const searchState = getSearchStateFromRedux();
    if (routePostSearch) {
      // Update url with search params that are entered/changed
      if (isForSearchSettingsURLUpdate) {
        history.push(routePostSearch);
        return;
      } else {
        const reduxState = {
          ...searchState,
          city: window.getValue(searchParams, "destination.city"),
        };
        history.push(routePostSearch);
        store.dispatch({
          type: supplySearchActions.SUPPLY_SEARCH_UPDATE_REDUX_STATE,
          payload: {
            ...reduxState,
            sortBy: window.getValue(searchParams, "sortBy"),
            dateRange: window.getValue(searchParams, "dateRange"),
            destination: window.getValue(searchParams, "destination"),
          },
        });
      }
    }
    return getObjectStringify(searchState);
  } catch (error) {
    console.error(error.toString());
    return null;
  }
};
