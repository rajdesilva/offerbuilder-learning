import React from "react";
import { createStore } from "redux";
import { render, fireEvent } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import TravelProduct from "../TravelProduct";

import { tempStore } from "./tempStore";

describe("TravelProduct component test", () => {
  test("create TravelProduct components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    const wrapper = render(
      <MemoryRouter>
        <TravelProduct />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot();
  });
  test("check TravelProduct components Add Properties Button", () => {
    const props = {
      prev: jest.fn(),
    };
    const store = createStore(() => ({ ...tempStore }));
    const { getByText } = render(
      <MemoryRouter>
        <TravelProduct prev={props.prev} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const addPropertyBtn = getByText("Add Properties");
    fireEvent.click(addPropertyBtn);
    expect(props.prev).toHaveBeenCalled();
  });
});
