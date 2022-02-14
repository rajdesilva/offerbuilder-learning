import React from "react";
import { createStore } from "redux";
import { render } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import { tempStore } from "./tempStore";
import ViewDescriptions from "../ViewDescriptions";

describe("View Descriptions component test", () => {
  test("For Property, Descriptions components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    const props = {
      isForProperty: true,
      languageId: "EN",
      propertyIndex: 0,
    };
    const wrapper = render(
      <MemoryRouter>
        <ViewDescriptions {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot();
  });
});
