import { browseSupplyActions, supplySearchActions } from "./actions";
import { store } from "./../../redux/store";
import { globalActions } from "../../redux/globalActions";
import { baseURL } from "../../helpers";
import {
  createSearchQueryURL,
  getSearchParamsToFetchMarketPrice,
} from "../../helpers/utility";
import { offerListSearchAndFilterActions } from "../offers/actions";

export const searchSupply = (routePostSearch, isEditFlow) => {
  store.dispatch({
    type: browseSupplyActions.BROWSE_SUPPLY_SEARCH_LOADING,
    payload: true,
  });
  store.dispatch({
    type: supplySearchActions.SET_INCLUDE_MARKET_PRICE_FLAG,
    payload: false,
  });

  window
    .fetchWrapper(`${baseURL.API_URL_BASE}search/` + createSearchQueryURL(routePostSearch))
    .then((response) => {
      if (response.success) {
        store.dispatch({
          type: browseSupplyActions.BROWSE_SUPPLY_SEARCH_SUCCESS,
          payload: window.getValue(response, "data.properties"),
          totalMatch: window.getValue(response, "data.totalMatchedProperties"),
          pageOffset: window.getValue(response, "data.pageOffset"),
          pageSize: window.getValue(response, "data.pageSize"),
        });
      } else {
        store.dispatch({
          type: browseSupplyActions.BROWSE_SUPPLY_SEARCH_FAILURE,
          payload: window.getValue(response, "error.apierror.message"),
        });
      }
    })
    .catch((error) => {
      store.dispatch({
        type: browseSupplyActions.BROWSE_SUPPLY_SEARCH_FAILURE,
        payload: error.toString(),
      });
      store.dispatch({
        type: globalActions.SET_ERROR,
        payload: error.toString(),
      });
    });
};

export const advancedSearch = (
  params,
  searchType,
  page,
  pageSize,
  sortBy,
  order,
  groupType
  ) => {
    return window.fetchWrapper(`${baseURL.API_URL_BASE}global/properties?address=${params.address}&city=${params.city}&countryCode=${params.countryCode}&distance=${params.distance}&hotelName=${params.hotelName}&latitude=${params.latitude}&longitude=${params.longitude}&zip=${params.zip}&pageOffset=${page}&pageSize=${pageSize}&propertyGroupType=${groupType}&sortCriteria=${sortBy}&sortOrder=${order}&globalSearchType=${searchType}`);

    //return window.fetchWrapper(`https://offerbuilder-api-dev.kognitiv.com/global/properties?distance=10&globalSearchType=BASIC&latitude=47.2816&longitude=15.48809&propertyGroupType=ALL`);
}

export const globalSearchResult =(params)=>{
  
  window
    .fetchWrapper(`/global/properties?address=${params.address}`)
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
      store.dispatch({
        type: supplySearchActions.SEARCH_CHANNELS_FAILURE,
        payload: [],
      });
      return [];
    });
}

export const getChannels = () => {
  store.dispatch({
    type: supplySearchActions.SEARCH_CHANNELS_LOADING,
    payload: true,
  });
  window
    .fetchWrapper(`${baseURL.API_URL_BASE}portals`)
    .then((response) => {
      if (response.success) {
        store.dispatch({
          type: supplySearchActions.SEARCH_CHANNELS_SUCCESS,
          payload: window.getValue(response, "data.result"),
        });
      } else {
        store.dispatch({
          type: supplySearchActions.SEARCH_CHANNELS_FAILURE,
          payload: [],
        });
      }
    })
    .catch((error) => {
      store.dispatch({
        type: supplySearchActions.SEARCH_CHANNELS_FAILURE,
        payload: [],
      });
      return [];
    });
};

export const getBrands = async () => {
  store.dispatch({
    type: supplySearchActions.SEARCH_BRANDS_LOADING,
    payload: true,
  });
  window
    .fetchWrapper(`${baseURL.API_URL_BASE}sources`)
    .then((response) => {
      if (response.success) {
        store.dispatch({
          type: supplySearchActions.SEARCH_BRANDS_SUCCESS,
          payload: window.getValue(response, "data.brands"),
        });
        store.dispatch({
          type: offerListSearchAndFilterActions.UPDATE_OFFER_SELECTORS,
          payload: window.getValue(response, "data.brands"),
        });
      } else {
        store.dispatch({
          type: supplySearchActions.SEARCH_BRANDS_FAILURE,
          payload: [],
        });
      }
      return window.getValue(response, "data.brands");
    })
    .catch((error) => {
      store.dispatch({
        type: supplySearchActions.SEARCH_BRANDS_FAILURE,
        payload: [],
      });
      return [];
    });
};

export const getCurrencies = async () => {
  store.dispatch({
    type: supplySearchActions.FETCH_CURRENCIES_LOADING,
    payload: true,
  });
  window
    .fetchWrapper(`${baseURL.API_URL_BASE}currencies`)
    .then((response) => {
      if (response.success) {
        store.dispatch({
          type: supplySearchActions.FETCH_CURRENCIES_SUCCESS,
          payload: window.getValue(response, "data.currencies"),
        });
      } else {
        store.dispatch({
          type: supplySearchActions.FETCH_CURRENCIES_FAILURE,
          payload: [],
        });
      }
    })
    .catch((error) => {
      store.dispatch({
        type: supplySearchActions.FETCH_CURRENCIES_FAILURE,
        payload: [],
      });
      return [];
    });
};

export const getMarketPricesForListOfProperties = () => {
  store.dispatch({
    type: supplySearchActions.FETCH_MARKET_PRICE_LOADING,
    payload: true,
  });

  window
    .fetchWrapper(
      `${baseURL.API_URL_BASE}search/marketprice/` +
        getSearchParamsToFetchMarketPrice()
    )
    .then((response) => {
      if (response.success) {
        store.dispatch({
          type: supplySearchActions.FETCH_MARKET_PRICE_SUCCESS,
          payload: window.getValue(response, "data"),
        });
      } else {
        store.dispatch({
          type: supplySearchActions.FETCH_MARKET_PRICE_FAILURE,
          payload: [],
        });
      }
    })
    .catch((error) => {
      store.dispatch({
        type: supplySearchActions.FETCH_MARKET_PRICE_FAILURE,
        payload: [],
      });
      return [];
    });
};
