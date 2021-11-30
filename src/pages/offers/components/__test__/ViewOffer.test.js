import React from "react";
import { createStore } from "redux";
import { render, fireEvent, cleanup } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import ViewOffer from "../ViewOffer";
import * as Util from "../../../../helpers/utility/checkIfUserHasRole";
import { tempStore } from "./tempStore";
import { history } from "../../../../helpers";
import { cloneDeep } from "lodash";

window.fetchWrapper = window.fetchWrapper = jest.fn().mockResolvedValue({
  success: true,
});

jest.mock("./../../service");

afterEach(cleanup);
beforeEach(cleanup);

describe("ViewOffer component test", () => {
  test("create ViewOffer components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const { container } = render(
      <MemoryRouter initialEntries={["/offers/view/123"]}>
        <ViewOffer />
      </MemoryRouter>,
      {
        store,
      }
    );

    expect(container).toMatchSnapshot();
  });
  test("ViewOffer components- click on Close view button", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/offers/view/123"]}>
        <ViewOffer />
      </MemoryRouter>,
      {
        store,
      }
    );
    const closeBtn = getByTestId("view-close-view-offers-btn");
    fireEvent.click(closeBtn);
    expect(closeBtn).toBeTruthy();
    expect(history.location.pathname).toBe("/");
  });

  test("ViewOffer components- click on edit button", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const checkUserPermission = jest.spyOn(Util, "checkIfUserHasRole");
    checkUserPermission.mockReturnValue(false); // if user is not viewer
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/offers/view/123"]}>
        <ViewOffer />
      </MemoryRouter>,
      {
        store,
      }
    );
    const editBtn = getByTestId("view-display-edit-offers-btn");
    fireEvent.click(editBtn);
    expect(editBtn).toBeTruthy();
    expect(editBtn).not.toBeDisabled();
  });

  test("ViewOffer components- edit button is disabled when user has role as viewer", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();

    const checkUserPermission = jest.spyOn(Util, "checkIfUserHasRole");
    checkUserPermission.mockReturnValue(true); // if user is viewer

    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/offers/view/123"]}>
        <ViewOffer />
      </MemoryRouter>,
      {
        store,
      }
    );
    const editBtn = getByTestId("view-display-edit-offers-btn");
    fireEvent.click(editBtn);
    expect(editBtn).toBeTruthy();
    expect(editBtn).toBeDisabled();
  });

  test("ViewOffer components- check if edit button is absent for archive offer in view mode", async () => {
    const viewArchiveStore = cloneDeep(tempStore);
    viewArchiveStore.newoffersettingsparam.status = {
      id: "ARCHIVED",
      name: "ARCHIVED",
    };
    const store = createStore(() => ({ ...viewArchiveStore }));
    store.dispatch = jest.fn();
    const checkUserPermission = jest.spyOn(Util, "checkIfUserHasRole");
    checkUserPermission.mockReturnValue(false); // if user is not viewer
    const { queryByTestId } = render(
      <MemoryRouter initialEntries={["/offers/view/123"]}>
        <ViewOffer />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(
      queryByTestId("view-display-edit-offers-btn")
    ).not.toBeInTheDocument();
  });
});
