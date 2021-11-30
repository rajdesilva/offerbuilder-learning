import React from "react";
import { createStore } from "redux";

import { render, fireEvent, cleanup } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import AddUser from "../AddUser";
import * as service from "./../../service";

import { act } from "react-dom/test-utils";
import { history } from "../../../../helpers";
import { appConstants } from "../../../../common";

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

describe("AddUser component test", () => {
  test("create AddUser components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const { container } = render(
      <MemoryRouter initialEntries={["/user-management/add-user"]}>
        <AddUser />
      </MemoryRouter>,
      {
        store,
      }
    );

    expect(container).toMatchSnapshot();
  });
  test("AddUser components- click on create user button and check validations messages", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const { findByText, getByTestId } = render(
      <MemoryRouter initialEntries={["/user-management/add-user"]}>
        <AddUser />
      </MemoryRouter>,
      {
        store,
      }
    );
    fireEvent.click(getByTestId("user-management-add-user-create-btn"));
    const items = await findByText(/Please Enter Name/);
    expect(items).toHaveTextContent("Please Enter Name");
    const items1 = await findByText(/Please Enter Valid Email/);
    expect(items1).toHaveTextContent("Please Enter Valid Email");
  });
  test("AddUser components- click on Cancel button", () => {
    act(() => {
      const store = createStore(() => ({ ...tempStore }));
      store.dispatch = jest.fn();
      const { getByTestId } = render(
        <MemoryRouter initialEntries={["/user-management/add-user"]}>
          <AddUser />
        </MemoryRouter>,
        {
          store,
        }
      );
      const cancelBtn = getByTestId("user-management-add-user-cancel-btn");
      fireEvent.click(cancelBtn);
      expect(cancelBtn).toBeTruthy();
      expect(history.location.pathname).toBe("/user-management/list");
    });
  });
  test("AddUser components- click on Create button for checking invalid entered values", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const { getByTestId, findByText, getByPlaceholderText } = render(
      <MemoryRouter initialEntries={["/user-management/add-user"]}>
        <AddUser />
      </MemoryRouter>,
      {
        store,
      }
    );
    //check for minimum limit chars
    let input = getByPlaceholderText(/User Name/);
    fireEvent.change(input, { target: { value: "Swa" } }); // 3 chars
    expect(input.value).toBe("Swa");
    fireEvent.click(getByTestId("user-management-add-user-create-btn"));
    const items = await findByText(/Name Must Be Minimum 5 Characters/);
    expect(items).toHaveTextContent("Name Must Be Minimum 5 Characters");

    //check for email entered valid or not
    let emailInput = getByPlaceholderText(/Email Address/);
    fireEvent.change(emailInput, { target: { value: "test@test" } }); // invalid email
    expect(emailInput.value).toBe("test@test");
    fireEvent.click(getByTestId("user-management-add-user-create-btn"));
    const items1 = await findByText(/Please Enter Valid Email/);
    expect(items1).toHaveTextContent("Please Enter Valid Email");
  });

  test("AddUser components- click on Create button for checking valid entered values", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const { getByTestId, queryByText, getByPlaceholderText } = render(
      <MemoryRouter initialEntries={["/user-management/add-user"]}>
        <AddUser />
      </MemoryRouter>,
      {
        store,
      }
    );
    //check for minimum limit chars
    let input = getByPlaceholderText(/User Name/);
    fireEvent.change(input, { target: { value: "Swapnil" } }); // 3 chars
    expect(input.value).toBe("Swapnil");

    fireEvent.click(getByTestId("user-management-add-user-create-btn"));
    const items = await queryByText(/Name Must Be Minimum 5 Characters/);
    expect(items).not.toBeInTheDocument();

    //check for email entered valid or not
    let emailInput = getByPlaceholderText(/Email Address/);
    fireEvent.change(emailInput, { target: { value: "test@test.com" } }); // invalid email
    expect(emailInput.value).toBe("test@test.com");
    fireEvent.click(getByTestId("user-management-add-user-create-btn"));
    const items1 = await queryByText(/Please Enter Valid Email/);
    expect(items1).not.toBeInTheDocument();
  });

  test("AddUser components- change radio button for changing roles values", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/user-management/add-user"]}>
        <AddUser />
      </MemoryRouter>,
      {
        store,
      }
    );
    const radio = getByTestId("admin-radio-btn");
    fireEvent.change(radio, {
      target: { value: appConstants.USER_ROLE.EDITOR },
    });
    expect(radio.value).toBe(appConstants.USER_ROLE.EDITOR);
  });

  test("AddUser components- Create clicked, All fields are valid and API is called and returned successful response", async () => {
    const tempStore1 = {
      usermanagement: {
        loading: false,
        userList: [],
      },
    };
    const store = createStore(() => ({ ...tempStore1 }));
    const { getByTestId, getByPlaceholderText } = render(
      <MemoryRouter initialEntries={["/user-management/add-user"]}>
        <AddUser />
      </MemoryRouter>,
      {
        store,
      }
    );
    // mocking post api when submit button is clicked
    service.addNewUser.mockImplementation((data) => {
      return Promise.resolve({
        success: true,
      });
    });

    const formData = {
      name: "Swapnil",
      email: "swapnil.deshmukh@kognitiv.com",
      customText: "Test",
      inviteEmail: true,
      userRole: appConstants.USER_ROLE.EDITOR,
    };

    let input = getByPlaceholderText(/Email Address/);
    fireEvent.change(input, { target: { value: formData.email } });
    input = getByPlaceholderText(/User Name/);
    fireEvent.change(input, { target: { value: formData.name } });
    input = getByPlaceholderText(/Text are a Placeholder/);
    fireEvent.change(input, { target: { value: formData.customText } });
    const radio = getByTestId("admin-radio-btn");
    fireEvent.change(radio, { target: { value: formData.userRole } });
    const switchBtn = getByTestId("add-user-send-invite-switch");
    fireEvent.change(switchBtn, { target: { value: formData.inviteEmail } });
    expect(switchBtn.value).toBe("true");
    await act(async () => {
      await fireEvent.click(getByTestId("user-management-add-user-create-btn"));
    });
    expect(history.location.pathname).toBe("/user-management/list");
  });
});
