import React from "react";
import { createStore } from "redux";
import { render } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import DescriptionTabs from "../DescriptionTabs";

import { tempStore } from "./tempStore";

describe("DescriptionTabs component test", () => {
  test("create DescriptionTabs components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    const props = {
      index: 0,
      isForProperty: false,
    };
    const wrapper = render(
      <MemoryRouter>
        <DescriptionTabs {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot();
  });
});
