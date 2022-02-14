import React from "react";
import { createStore } from "redux";
import { render } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import * as Util from "../../../../helpers/utility/checkIfUserHasRole";
import ViewSettings from "../ViewSettings";
import { tempStore } from "./tempStore";

jest.mock("./../../service");

describe.only("ViewSettings component test", () => {
  test("create ViewSettings components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    const wrapper = render(
      <MemoryRouter initialEntries={["/offers/view/123"]}>
        <ViewSettings />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot();
  });

  test("ViewSettings, incase of admin, offer type is displayed", () => {
    const store = createStore(() => ({ ...tempStore }));
    const checkIfUserHasRole = jest.spyOn(Util, "checkIfUserHasRole");
    checkIfUserHasRole.mockReturnValue(true);
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/offers/view/123"]}>
        <ViewSettings />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(getByTestId('offer-type')).toBeInTheDocument()
  });

  test("ViewSettings, incase of users other than admin, offer type is hidden", () => {
    const store = createStore(() => ({ ...tempStore }));
    const checkIfUserHasRole = jest.spyOn(Util, "checkIfUserHasRole");
    checkIfUserHasRole.mockReturnValue(false);
    const { queryByTestId } = render(
      <MemoryRouter initialEntries={["/offers/view/123"]}>
        <ViewSettings />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(queryByTestId('offer-type')).not.toBeInTheDocument()
  });
});
