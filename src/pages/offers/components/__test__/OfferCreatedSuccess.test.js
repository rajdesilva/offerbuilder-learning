import React from "react";
import { createStore } from "redux";
import { render, fireEvent, screen } from "../../../../helpers/testUtils";
import { MemoryRouter, Router } from "react-router-dom";
import { tempStore } from "./tempStore";
import OfferCreatedSuccess from "../OfferCreatedSuccess";
import { history } from "../../../../helpers";

describe("OfferCreatedSuccess component test", () => {
  test("create OfferCreatedSuccess components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    const wrapper = render(
      <MemoryRouter>
        <OfferCreatedSuccess />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot();
  });

  test("OfferCreatedSuccess components onclick of back to overview", () => {
    const store = createStore(() => ({ ...tempStore }));
    const { getByTestId } = render(
      <Router history={history}>
        <OfferCreatedSuccess />
      </Router>,
      {
        store,
      }
    );
    const backToOverviewBtn = getByTestId("back-to-overview-btn");
    fireEvent.click(backToOverviewBtn);
    screen.debug(backToOverviewBtn);
    expect(history.location.pathname).toBe("/");
  });
});
