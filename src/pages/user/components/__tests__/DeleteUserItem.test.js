import React from "react";
import { createStore } from "redux";
import {
  render,
  fireEvent,
  act,
  cleanup,
} from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import DeleteUserItem from "../DeleteUserItem";
import * as service from "./../../service";
import { tempStore } from "../../../offers/components/__test__/tempStore";
import { appConstants } from "../../../../common";

jest.mock("./../../service");

afterEach(cleanup);

describe("DeleteUserItem component test cases", () => {
  test("DeleteUserItem component snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    const row = {
      email: "test@test.com",
      userRole: appConstants.USER_ROLE.ADMIN,
    };
    const wrapper = render(
      <MemoryRouter>
        <DeleteUserItem row={row} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { container } = wrapper;
    expect(container).toMatchSnapshot();
  });
  test("DeleteUserItem - popup confirm displayed on click on the delete btn", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const row = {
      email: "test@test.com",
      userRole: appConstants.USER_ROLE.ADMIN,
    };
    const { getByTestId, getByText } = render(
      <MemoryRouter initialEntries={["/user-management/list"]}>
        <DeleteUserItem row={row} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const deleteBtn = getByTestId("test@test.com-delete-user-btn");
    await act(async () => {
      await fireEvent.click(deleteBtn);
    });
    expect(
      getByText("Are you sure you want to remove User?")
    ).toBeInTheDocument();
  });
  test("DeleteUserItem - popup confirm displayed and yes btn clicked", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const row = {
      email: "test@test.com",
      userRole: appConstants.USER_ROLE.ADMIN,
    };
    const { getByTestId, getByText, getByRole } = render(
      <MemoryRouter initialEntries={["/user-management/list"]}>
        <DeleteUserItem row={row} />
      </MemoryRouter>,
      {
        store,
      }
    );
    // mocking delete api when delete button is clicked
    service.deleteUser.mockImplementation((data) => {
      return Promise.resolve({
        success: true,
      });
    });
    const deleteBtn = getByTestId("test@test.com-delete-user-btn");
    await act(async () => {
      await fireEvent.click(deleteBtn);
    });
    expect(
      getByText("Are you sure you want to remove User?")
    ).toBeInTheDocument();
    const getUsersList = jest.spyOn(service, "getUsersList");
    const okBtn = getByRole("button", { name: /Remove User/i });
    await act(async () => {
      await fireEvent.click(okBtn);
    });
    expect();
    expect(getUsersList).toHaveBeenCalledTimes(1);
  });

  test("DeleteUserItem - popup confirm displayed and no btn clicked", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const row = {
      email: "test@test.com",
      userRole: appConstants.USER_ROLE.ADMIN,
    };
    const { getByTestId, getByText } = render(
      <MemoryRouter initialEntries={["/user-management/list"]}>
        <DeleteUserItem row={row} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const deleteBtn = getByTestId("test@test.com-delete-user-btn");
    await act(async () => {
      await fireEvent.click(deleteBtn);
    });
    expect(
      getByText("Are you sure you want to remove User?")
    ).toBeInTheDocument();
  });
});
