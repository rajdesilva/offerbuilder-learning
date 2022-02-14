import React from "react";
import { createStore } from "redux";
import { render } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import ViewDescriptionTabs from "../ViewDescriptionTabs";
import { tempStore } from "./tempStore";

describe("ViewDescriptionTabs component test", () => {
  test("create ViewDescriptionTabs components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    const props = {
      index: 0,
      isForProperty: false,
    };
    const wrapper = render(
      <MemoryRouter>
        <ViewDescriptionTabs {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot();
  });
});
