import React from "react";
import { createStore } from "redux";
import { render, fireEvent, cleanup } from "../../../../helpers/testUtils";
import * as Util from "../../../../helpers/utility/checkIfUserHasRole";
import * as service from "./../../service";
import { MemoryRouter } from "react-router-dom";
import OfferList from "../OfferList";
import { tempStore } from "./tempStore";
import { act } from "react-dom/test-utils";
import { history } from "../../../../helpers";
import { cloneDeep } from "lodash";

jest.mock("./../../service");

window.fetchWrapper = window.fetchWrapper = jest.fn().mockResolvedValue({
  success: true,
});
afterEach(cleanup);
describe("OfferList component test", () => {
  test("create OfferList components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const { container, getByText } = render(
      <MemoryRouter>
        <OfferList />
      </MemoryRouter>,
      {
        store,
      }
    );

    expect(container.firstChild).toMatchSnapshot();
    expect(getByText("Offer List")).toBeInTheDocument();
  });
  test("OfferList components- For admin add offer button visible", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const checkIfUserHasRole = jest.spyOn(Util, "checkIfUserHasRole");
    checkIfUserHasRole.mockReturnValue(true);

    const { queryByTestId } = render(
      <MemoryRouter>
        <OfferList />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(queryByTestId("add-offers-btn")).toBeInTheDocument();
  });
  test("OfferList components- For add offer button click verify function call", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const checkIfUserHasRole = jest.spyOn(Util, "checkIfUserHasRole");
    checkIfUserHasRole.mockReturnValue(true);
    const { queryByTestId, getByTestId } = render(
      <MemoryRouter>
        <OfferList />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(queryByTestId("add-offers-btn")).toBeInTheDocument();
    const addBtn = getByTestId("add-offers-btn");
    fireEvent.click(addBtn);
    expect(history.location.pathname).toBe("/offers/create-new-offer");
    expect(addBtn).toBeTruthy();
  });

  test("OfferList components- Check if user with editor role has access to create offer", async () => {
    const listStore = cloneDeep(tempStore);
    listStore.userinfo.userDetails.roles = ["offerbuilder.editor"];
    const store = createStore(() => ({ ...listStore }));
    store.dispatch = jest.fn();
    const { queryByTestId, getByTestId } = render(
      <MemoryRouter>
        <OfferList />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(queryByTestId("add-offers-btn")).toBeInTheDocument();
    const addBtn = getByTestId("add-offers-btn");
    expect(addBtn).toBeTruthy();
    expect(addBtn).toBeInTheDocument();
  });

  test("OfferList components- Check if user with viewer role does not have access to create offer", async () => {
    const listStore = cloneDeep(tempStore);
    listStore.userinfo.userDetails.roles = ["offerbuilder.viewer"];
    const store = createStore(() => ({ ...listStore }));
    store.dispatch = jest.fn();
    const checkIfUserHasRole = jest.spyOn(Util, "checkIfUserHasRole");
    checkIfUserHasRole.mockReturnValue(false);
    const { queryByTestId } = render(
      <MemoryRouter>
        <OfferList />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(queryByTestId("add-offers-btn")).not.toBeInTheDocument();
  });
  test("OfferList components- when user enters search key and its value is ready to consume when available for api", async () => {
    const listStore = cloneDeep(tempStore);
    listStore.userinfo.userDetails.roles = ["offerbuilder.editor"];
    const store = createStore(() => ({ ...listStore }));
    store.dispatch = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
        <OfferList />
      </MemoryRouter>,
      {
        store,
      }
    );
    const search = getByTestId("offer-list-search-input");
    act(() => {
      fireEvent.change(search, {
        target: { value: "offer" },
      });
    });
    expect(search.value).toBe("offer");
    act(() => {
      fireEvent.change(search, {
        target: { value: "" },
      });
    });
    expect(search.value).toBe("");
  });

  test("OfferList components- when user enters search key and pressed enter btn and search api is called ", async () => {
    const listStore = cloneDeep(tempStore);
    listStore.userinfo.userDetails.roles = ["offerbuilder.editor"];
    const store = createStore(() => ({ ...listStore }));
    store.dispatch = jest.fn();
    service.searchAndFilterOffer.mockImplementation(() => {
      return Promise.resolve({
        status: true,
      });
    });
    const { getByTestId } = render(
      <MemoryRouter>
        <OfferList />
      </MemoryRouter>,
      {
        store,
      }
    );
    const searchText = getByTestId("offer-list-search-input");
    const clickButton = getByTestId("offer-list-search-input-button");

    const searchAndFilterOffer = jest.spyOn(service, "searchAndFilterOffer");
    await act(async () => {
      await fireEvent.change(searchText, {
        target: { value: "offer" },
      });
      fireEvent.click(clickButton);
      // six for other testcase component load and 2 current testcase
      expect(searchAndFilterOffer).toHaveBeenCalledTimes(8);
      expect(store.dispatch).toHaveBeenCalledTimes(3);
    });
  });
});
