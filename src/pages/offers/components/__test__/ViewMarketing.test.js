import React from "react";
import { createStore } from "redux";
import { render } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import { tempStore } from "./tempStore";
import ViewMarketing from "../ViewMarketing";

describe("Marketing component test", () => {
  test("create Marketing components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    const submitForm = jest.fn();
    const wrapper = render(
      <MemoryRouter>
        <ViewMarketing submitForm={submitForm} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot();
  });
});
