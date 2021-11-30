import React from "react";
import { createStore } from "redux";
import { render } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import { SettingsPropertyList } from "../SettingsPropertyList";
import { tempStore } from "./tempStore";

describe("SettingsPropertyList component test", () => {
  test("create SettingsPropertyList components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    const wrapper = render(
      <MemoryRouter>
        <SettingsPropertyList />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot();
  });
});
