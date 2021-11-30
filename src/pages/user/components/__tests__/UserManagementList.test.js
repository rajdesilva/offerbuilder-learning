import React from "react";
import { createStore } from "redux";
import * as service from "./../../service";
import { render, cleanup } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import UserManagementList from "../UserManagementList";

window.fetchWrapper = window.fetchWrapper = jest.fn().mockResolvedValue({
  success: true,
});

jest.mock("./../../service");
const tempStore = {
  usermanagement: {
    loading: false,
    userList: [
      {
        name: "Swapnil Deshmukh",
        uid: "swapnil.deshmukh@kognitiv.com",
        roles: ["offerbuilder.admin", "employee"],
        adminRoles: [],
        email: "swapnil.deshmukh@kognitiv.com",
        dn: "uid=swapnil.deshmukh@kognitiv.com,ou=customers,dc=ldap,dc=seekda,dc=com",
        company: "Kognitiv",
        status: "ACTIVE",
        userRole: "offerbuilder.admin",
      },
    ],
  },
};

afterEach(cleanup);

describe("UserManagementList component test", () => {
  test("create UserManagementList components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const { container } = render(
      <MemoryRouter initialEntries={["/user-management/list"]}>
        <UserManagementList />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(container).toMatchSnapshot();
  });
  test("UserManagementList component >> check if getuser list called onloading component", () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    render(
      <MemoryRouter initialEntries={["/user-management/list"]}>
        <UserManagementList />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(service.getUsersList).toHaveBeenCalledTimes(2);
  });
});
