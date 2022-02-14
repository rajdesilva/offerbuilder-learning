import { store } from "../../redux/store";

export const checkIfUserHasRole = (roleToFind) => {
  try {
    const userRoles =
      window.getValue(store.getState(), "userinfo.userDetails.roles") || [];
    return userRoles.findIndex((role) => role === roleToFind) !== -1;
  } catch (error) {
    console.log("error = ", error.toString());
  }
  return false;
};
