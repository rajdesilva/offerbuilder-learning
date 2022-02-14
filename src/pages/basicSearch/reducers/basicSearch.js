import produce from "immer";
import moment from "moment";
import { appConstants } from "../../../common";
import { supplySearchActions } from "../actions/supplySearch";


const initialState = {
  Address: '',
  countryCode: '',
  distance: '',
  globalSearchType: '',
  hotelName: '',
  id: '',
  languageCode: '',
  latitude: '',
  longitude: '',
  pageOffset: 1,
  pageSize: 10,
  sortCriteria: '',
  sortOrder: '',
  zip: '',
  city: ''
};

let currentparam = {};

export const searchParamsBasic = produce((initialState, action) => {
  switch (action.type) {

    //Advanced Search
    case supplySearchActions.SUPPLY_SEARCH_UPDATE_BASIC_REDUX_STATE_ALL:

      let val = {
        Address: action.payload.address,
        distance: action.payload.distance,
        countryCode: action.payload.country,
        hotelName: action.payload.hotelName,
        latitude: action.payload.lat,
        longitude: action.payload.lan,
        zip: action.payload.zip,
        city: action.payload.city,
        globalSearchType: 'ADVANCE',
        propertyGroupType: 'ALL',
        pageSize: 10,
        pageOffset: 1
      }

      currentparam = val
      return val;

    //Search Result By
    case supplySearchActions.SUPPLY_SEARCH_UPDATE_SORT_BY_GBL:
      let valresulyBy = {
        Address: currentparam.Address,
        distance: currentparam.distance,
        countryCode: currentparam.countryCode,
        hotelName: currentparam.hotelName,
        latitude: currentparam.latitude,
        longitude: currentparam.longitude,
        zip: currentparam.zip,
        city: currentparam.city,
        globalSearchType: currentparam.globalSearchType,
        pageSize: currentparam.pageSize,
        pageOffset: 1,
        propertyGroupType: action.payload
      }

      currentparam = valresulyBy
      return valresulyBy;

    //Page Size
    case supplySearchActions.SUPPLY_SEARCH_UPDATE_PSIZE:

      let valBysize = {
        Address: currentparam.Address,
        distance: currentparam.distance,
        countryCode: currentparam.countryCode,
        hotelName: currentparam.hotelName,
        latitude: currentparam.latitude,
        longitude: currentparam.longitude,
        zip: currentparam.zip,
        city: currentparam.city,
        globalSearchType: currentparam.globalSearchType,
        propertyGroupType: currentparam.propertyGroupType,
        pageSize: action.payload,
        pageOffset: 1,
      }

      currentparam = valBysize
      return valBysize;

    //Page 
    case supplySearchActions.SUPPLY_SEARCH_UPDATE_PNUM:

      let valBynum = {
        Address: currentparam.Address,
        distance: currentparam.distance,
        countryCode: currentparam.countryCode,
        hotelName: currentparam.hotelName,
        latitude: currentparam.latitude,
        longitude: currentparam.longitude,
        zip: currentparam.zip,
        city: currentparam.city,
        globalSearchType: currentparam.globalSearchType,
        propertyGroupType: currentparam.propertyGroupType,
        pageSize: currentparam.pageSize,
        pageOffset: action.payload
      }

      currentparam = valBynum
      return valBynum;

    //basic search
    case supplySearchActions.SUPPLY_SEARCH_UPDATE_BASIC_SETTING_REDUX_STATE:

      let valbybasic = {
        Address: '',
        distance: action.payload.distance,
        countryCode: '',
        hotelName: '',
        latitude: action.payload.lat,
        longitude: action.payload.lan,
        zip: '',
        city: '',
        globalSearchType: 'BASIC',
        propertyGroupType: currentparam.propertyGroupType,
        pageSize: 10,
        pageOffset:1
      }

      currentparam = valbybasic;
      return valbybasic;

    case supplySearchActions.SUPPLY_SEARCH_UPDATE_BASIC_REDUX_STATE:
      return {
        ...action.payload,
        Address: window.getValue(action, "address"),
        countryCode: window.getValue(action, "zip"),
        distance: window.getValue(action, "distance"),
        globalSearchType: "ADVANCE",
        hotelName: window.getValue(action, "hotelName"),
        id: '',
        languageCode: '',
        latitude: '',
        longitude: '',
        pageOffset: 1,
        pageSize: 10,
        sortCriteria: "NAME",
        sortOrder: "ASC",
      };
    default:
      return initialState;
  }
}, initialState);
