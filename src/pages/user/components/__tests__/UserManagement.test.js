import React from "react";
import { createStore } from "redux";
import { render, cleanup } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import UserManagement from "../UserManagement";

window.fetchWrapper = window.fetchWrapper = jest.fn().mockResolvedValue({
  success: true,
});

jest.mock("./../../service");
const tempStore = {
  usermanagement: {
    loading: false,
    userList: [],
  },
};

afterEach(cleanup);

describe("UserManagement component test", () => {
  test("create UserManagement components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const { container } = render(
      <MemoryRouter>
        <UserManagement />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(container).toMatchSnapshot();
  });
});
