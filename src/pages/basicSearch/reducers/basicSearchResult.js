import produce from "immer";
import moment from "moment";
import { appConstants } from "../../../common";
import { supplySearchActions } from "../actions/supplySearch";

const initialState = {};


export const searchParamsBasicResult = produce((initialState, action) => {
  switch (action.type) {
    case supplySearchActions.SUPPLY_SEARCH_UPDATE_BASIC_REDUX_STATE_ALL_FINAL:
      return{
        stateSearch : action.payload
      };
    
    default:
        return initialState;
  }
}, initialState);
