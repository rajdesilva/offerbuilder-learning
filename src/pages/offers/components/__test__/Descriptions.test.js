import React from "react";
import { createStore } from "redux";
import { render } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import Descriptions from "../Descriptions";

import { tempStore } from "./tempStore";

describe("Descriptions component test", () => {
  test("For Property, Descriptions components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    const props = {
      isForProperty: true,
      languageId: "EN",
      propertyIndex: 0,
    };
    const wrapper = render(
      <MemoryRouter>
        <Descriptions {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot();
  });
});
