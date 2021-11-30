import React from "react";
import { createStore } from "redux";
import { render } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import UserRoleDescription from "../UserRoleDescription";

describe("UserRoleDescription component test", () => {
  test("create UserRoleDescription components snapshot", () => {
    const store = createStore(() => {});
    store.dispatch = jest.fn();
    const { container } = render(
      <MemoryRouter>
        <UserRoleDescription />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(container).toMatchSnapshot();
  });
});
