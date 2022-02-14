import React from "react";
import { MemoryRouter } from "react-router-dom";
import { createStore } from "redux";

import { UserConfirmation, showDialog } from "../UserConfirmation";
import { render } from "../../helpers/testUtils";

describe("Test UserConfirmation component", () => {
  test("create UserConfirmation Component snapshot matches or not", () => {
    const store = createStore(() => ({}));
    const { container } = render(
      <MemoryRouter initialEntries={["/offers/create-new-offer/"]}>
        <UserConfirmation />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  test("verify the show dialog logic", () => {
    expect(
      showDialog({ pathname: "create-new-offer" }, { pathname: "/" })
    ).toBe(true);
    expect(
      showDialog({ pathname: "user-management/list" }, { pathname: "/" })
    ).toBe(false);
    expect(showDialog({ pathname: "edit" }, { pathname: "/" })).toBe(true);
    expect(showDialog({ pathname: "edit", state: "" }, { pathname: "/" })).toBe(
      true
    );
    expect(showDialog({ pathname: "edit" }, { pathname: "/" })).toBe(true);
    expect(showDialog(null, null)).toBe(false);

    expect(
      showDialog(
        { pathname: "offers/create-new-offer" },
        { pathname: "/offers" }
      )
    ).toBe(true);
  });
});
