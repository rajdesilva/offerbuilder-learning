import React from "react";
import { createStore } from "redux";
import { render, cleanup } from "../../../../helpers/testUtils";
import { BrowseSupplyHeader } from "../BrowseSupplyHeader";
import { MemoryRouter } from "react-router-dom";
import { tempStore } from "../../../offers/components/__test__/tempStore";
import * as Util from "../../../../helpers/utility/checkIfUserHasRole";

afterEach(cleanup);
describe("BrowseSupplyHeader component test", () => {
  test("create BrowseSupplyHeader components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    const wrapper = render(
      <MemoryRouter initialEntries={["/browse-supply/search-results"]}>
        <BrowseSupplyHeader />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { container } = wrapper;

    expect(container.firstChild).toMatchSnapshot();
  });
  test("BrowseSupplyHeader - Admin Role and supplier flag is off", () => {
    const store = createStore(() => ({ ...tempStore }));
    const checkUserPermission = jest.spyOn(Util, "checkIfUserHasRole");
    checkUserPermission.mockReturnValue(true);

    const wrapper = render(
      <MemoryRouter initialEntries={["/browse-supply/search-results"]}>
        <BrowseSupplyHeader />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { getByText, getByTestId } = wrapper;

    expect(getByText("Create Offer With Search Result")).toBeInTheDocument();
    expect(getByTestId("create-offer-search-results-btn")).not.toBeDisabled();
  });
  test("BrowseSupplyHeader - Admin Role and supplier flag is on", () => {
    const ts = tempStore;
    ts.searchparams.onlySupplier = true;
    const store = createStore(() => ({ ...ts }));
    const checkUserPermission = jest.spyOn(Util, "checkIfUserHasRole");
    checkUserPermission.mockReturnValue(true);

    const wrapper = render(
      <MemoryRouter initialEntries={["/browse-supply/search-results"]}>
        <BrowseSupplyHeader />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { getByText, getByTestId } = wrapper;

    expect(getByText("Create Offer With Search Result")).toBeInTheDocument();
    expect(getByTestId("create-offer-search-results-btn")).toBeDisabled();
  });
});
