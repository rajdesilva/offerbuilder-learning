import { appConstants } from "../../common";

export const getUserOfferBuilderRole = (userRolesList) => {
  let userRoleToDisplay = "";
  userRolesList.forEach((role) => {
    if (role === appConstants.USER_ROLE.ADMIN) {
      userRoleToDisplay = role;
      return;
    } else if (role === appConstants.USER_ROLE.EDITOR && userRoleToDisplay.length === 0) {
      userRoleToDisplay = role;
    } else if (role === appConstants.USER_ROLE.VIEWER && userRoleToDisplay.length === 0) {
      userRoleToDisplay = role;
    }
  });
  return userRoleToDisplay;
};
