import { appConstants } from "../../../common";
import { getUserOfferBuilderRole } from "../getUserOfferBuilderRole";

describe("getUserOfferBuilderRole function test", () => {
  test("getUserOfferBuilderRole check if use role to display is admin", () => {
    const roles = [
        'offerbuilder.admin',
        'evolve.admin',
        'TamasTest',
        'HolgersTestAppMainRole',
        'employee',
        'evolve.affiliate'
      ]
    expect(getUserOfferBuilderRole(roles)).toBe(appConstants.USER_ROLE.ADMIN);
  });
  test("getUserOfferBuilderRole check if use role to display is viewer", () => {
    const roles = [
        'offerbuilder.viewer',
        'evolve.admin',
        'TamasTest',
        'HolgersTestAppMainRole',
        'employee',
        'evolve.affiliate'
      ]
    expect(getUserOfferBuilderRole(roles)).toBe(appConstants.USER_ROLE.VIEWER);
  });

  test("getUserOfferBuilderRole check if use role to display is editor", () => {
    const roles = [
        'offerbuilder.editor',
        'evolve.admin',
        'TamasTest',
        'HolgersTestAppMainRole',
        'employee',
        'evolve.affiliate'
      ]
    expect(getUserOfferBuilderRole(roles)).toBe(appConstants.USER_ROLE.EDITOR);
  });

  test("getUserOfferBuilderRole check if use role to display is unknown as roles emtpy", () => {
    const roles = []
    expect(getUserOfferBuilderRole(roles)).toBe("");
  });
});
