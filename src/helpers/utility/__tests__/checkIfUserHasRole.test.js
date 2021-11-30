import { appConstants } from "../../../common";
import { userActions } from "../../../pages/user/actions/userActions";
import { store } from "../../../redux/store";
import { checkIfUserHasRole } from "../checkIfUserHasRole";
import { getValue } from "../getValue";

describe("checkIfUserHasRole function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  test("checkIfUserHasRole check if user has admin role", () => {
    store.dispatch({
      type: userActions.SET_USER_DETAILS,
      payload: {
        name: "Swapnil Deshmukh",
        uid: "swapnil.deshmukh@kognitiv.com",
        roles: ["offerbuilder.admin", "employee"],
        adminRoles: [],
        email: "swapnil.deshmukh@kognitiv.com",
        dn:
          "uid=swapnil.deshmukh@kognitiv.com,ou=customers,dc=ldap,dc=seekda,dc=com",
        company: "Kognitiv",
        status: "ACTIVE",
      },
    });
    expect(checkIfUserHasRole(appConstants.USER_ROLE.ADMIN)).toBe(true);
  });
  test("checkIfUserHasRole check if user has editor role", () => {
    store.dispatch({
      type: userActions.SET_USER_DETAILS,
      payload: {
        name: "Swapnil Deshmukh",
        uid: "swapnil.deshmukh@kognitiv.com",
        roles: ["offerbuilder.editor", "employee"],
        adminRoles: [],
        email: "swapnil.deshmukh@kognitiv.com",
        dn:
          "uid=swapnil.deshmukh@kognitiv.com,ou=customers,dc=ldap,dc=seekda,dc=com",
        company: "Kognitiv",
        status: "ACTIVE",
      },
    });
    expect(checkIfUserHasRole(appConstants.USER_ROLE.EDITOR)).toBe(true);
  });

  test("checkIfUserHasRole check if user has viewer role", () => {
    store.dispatch({
      type: userActions.SET_USER_DETAILS,
      payload: {
        name: "Swapnil Deshmukh",
        uid: "swapnil.deshmukh@kognitiv.com",
        roles: ["offerbuilder.viewer", "employee"],
        adminRoles: [],
        email: "swapnil.deshmukh@kognitiv.com",
        dn:
          "uid=swapnil.deshmukh@kognitiv.com,ou=customers,dc=ldap,dc=seekda,dc=com",
        company: "Kognitiv",
        status: "ACTIVE",
      },
    });
    expect(checkIfUserHasRole(appConstants.USER_ROLE.VIEWER)).toBe(true);
  });

  test("checkIfUserHasRole check if user does not have admin role", () => {
    store.dispatch({
      type: userActions.SET_USER_DETAILS,
      payload: {
        name: "Swapnil Deshmukh",
        uid: "swapnil.deshmukh@kognitiv.com",
        roles: ["offerbuilder.editor", "employee"],
        adminRoles: [],
        email: "swapnil.deshmukh@kognitiv.com",
        dn:
          "uid=swapnil.deshmukh@kognitiv.com,ou=customers,dc=ldap,dc=seekda,dc=com",
        company: "Kognitiv",
        status: "ACTIVE",
      },
    });
    expect(checkIfUserHasRole(appConstants.USER_ROLE.ADMIN)).toBe(false);
  });

  test("checkIfUserHasRole check case when role values and user details are null", () => {
    store.dispatch({
      type: userActions.SET_USER_DETAILS,
      payload: null,
    });
    expect(checkIfUserHasRole(null)).toBe(false);
  });
});
