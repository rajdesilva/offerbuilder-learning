import { combineReducers } from "redux";
import { globalReducer } from "./globalReducer";
import {
  searchParams,
  searchedProperties,
  channelsInfo,
  sourceInfo,
  propertyCart,
  marketPrice
} from "../pages/browseSupply/reducers";
import { searchParamsBasic, searchParamsBasicResult } from "../pages/basicSearch/reducers";
import { newOfferSettingParams } from "../pages/offers/reducers/newOfferSettings";
import { languageInfo } from "../pages/offers/reducers/languages";
import { newOfferMarketingInfo, offerImageSearchAndFilters, offerListSearchAndFilters } from "../pages/offers/reducers";
import { userInfo, userManagement } from "../pages/user/reducers";
import { currency } from "../pages/browseSupply/reducers/currency";

const rootReducer = combineReducers({
  globalreducer: globalReducer,
  searchparams: searchParams,
  searchParamsBasic: searchParamsBasic,
  searchedproperties: searchedProperties,
  userinfo: userInfo,
  channelinfo: channelsInfo,
  sourceinfo: sourceInfo,
  propertycart: propertyCart,
  newoffersettingsparam: newOfferSettingParams,
  languageinfo: languageInfo,
  newoffermarketinginfo: newOfferMarketingInfo,
  offerlistsearchandfilters : offerListSearchAndFilters,
  usermanagement: userManagement,
  currency: currency,
  marketprice: marketPrice,
  offerimagesearchandfilters : offerImageSearchAndFilters,
  searchParamsBasicResult : searchParamsBasicResult
});

export default (state, action) => {
  return rootReducer(state, action);
};
