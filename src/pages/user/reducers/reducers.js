import produce from "immer";
import { userActions } from "../actions/userActions";

export const userInfo = produce(
  (draft, action) => {
    switch (action.type) {
      case userActions.FETCH_USER_LOADING:
        draft.loggedIn = "loading";
        return;
      case userActions.FETCH_USER_SUCCESS:
        draft.loggedIn = "success";
        draft.userDetails = action.payload;
        return;
        case userActions.SET_USER_DETAILS:
          draft.userDetails = action.payload;
          return;
      case userActions.FETCH_USER_FAILURE:
        draft.loggedIn = "failed";
        draft.userDetails = null;
        return;
      default:
        return draft;
    }
  },
  {
    loggedIn: false,
    userDetails: null,
  }
);
