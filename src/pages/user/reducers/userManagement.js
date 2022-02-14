import produce from "immer";
import { getUserOfferBuilderRole } from "../../../helpers/utility";
import { userActions } from "../actions/userActions";

export const userManagement = produce(
  (draft, action) => {
    switch (action.type) {
      case userActions.FETCH_USER_MANAGEMENT_LIST_LOADING:
        draft.loading = true;
        return;
      case userActions.FETCH_USER_MANAGEMENT_LIST_SUCCESS:
        draft.loading = false;
        let usersList = action.payload;
        usersList = usersList.map(user => {
          return {
            ...user,
            userRole : getUserOfferBuilderRole(user.roles)
          }
        });
        draft.userList = usersList;
        return;
      case userActions.FETCH_USER_MANAGEMENT_LIST_FAILURE:
        draft.loading = false;
        draft.userList = [];
        return;
      default:
        return draft;
    }
  },
  {
    loading: false,
    userList: [],
  }
);
