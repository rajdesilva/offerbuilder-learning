import { baseURL } from "../../helpers";
import { userActions } from "./actions/userActions";
import { store } from "../../redux/store";

export const fetchUserInfo = () => {
  const url = `${baseURL.API_URL_BASE}user/`;
  store.dispatch({
    type: userActions.FETCH_USER_LOADING,
    payload: true,
  });
  window
    .fetchWrapper(url)
    .then((response) => {
      if (response.success) {
        store.dispatch({
          type: userActions.FETCH_USER_SUCCESS,
          payload: window.getValue(response, "data"),
        });
      } else {
        store.dispatch({
          type: userActions.FETCH_USER_FAILURE,
          payload: false,
        });
      }
    })
    .catch(() => {
      store.dispatch({
        type: userActions.FETCH_USER_FAILURE,
        payload: false,
      });
    });
};

export const getUsersList = () => {
  store.dispatch({
    type: userActions.FETCH_USER_MANAGEMENT_LIST_LOADING,
    payload: true,
  });
  window
    .fetchWrapper(
      `${baseURL.API_URL_BASE}users/`
    )
    .then((response) => {
      if (response.success) {
        store.dispatch({
          type: userActions.FETCH_USER_MANAGEMENT_LIST_SUCCESS,
          payload: window.getValue(response, "data"),
        });
      } else {
        store.dispatch({
          type: userActions.FETCH_USER_MANAGEMENT_LIST_FAILURE,
          payload: [],
        });
      }
    })
    .catch((error) => {
      store.dispatch({
        type: userActions.FETCH_USER_MANAGEMENT_LIST_FAILURE,
        payload: [],
      });
    });
};

export const addNewUser = (newUserInfo) => {
  const url = `${baseURL.API_URL_BASE}users/user`;
  return window
    .fetchWrapper(url, {
      method: "POST",
      body: JSON.stringify(newUserInfo),
    })
    .then((response) => response)
    .catch((error) => {
      return error;
    });
};

export const deleteUser = (email, userRole) => {
  const url = `${baseURL.API_URL_BASE}users/user/${email}?roleNames=${userRole}`;
  return window
    .fetchWrapper(url, {
      method: "DELETE",
    })
    .then((response) => response)
    .catch((error) => {
      return error;
    });
};
