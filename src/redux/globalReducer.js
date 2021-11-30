import { globalActions } from "./globalActions";
import produce from "immer";

const initialState = {
  error: "",
  success: "",
  language: "",
};
export const globalReducer = produce((draft, action) => {
  switch (action.type) {
    case globalActions.SET_ERROR:
      draft.success = "";
      draft.error = action.payload;
      return;
    case globalActions.SET_SUCCESS:
      draft.error = "";
      draft.success = action.payload;
      return;
    case globalActions.SET_LANGUAGE:
      draft.language = localStorage.getItem('language')
      return;
    case globalActions.CLEAR:
      return initialState;
    default:
      return draft;
  }
}, initialState);
