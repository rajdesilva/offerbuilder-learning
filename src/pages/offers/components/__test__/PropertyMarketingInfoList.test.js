import React from "react";
import { createStore } from "redux";
import { render, fireEvent } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import PropertyMarketingInfoList from "../PropertyMarketingInfoList";

import { tempStore } from "./tempStore";

describe("PropertyMarketingInfoList component test", () => {
  test("create PropertyMarketingInfoList components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    const wrapper = render(
      <MemoryRouter>
        <PropertyMarketingInfoList />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot();
  });
  test("create PropertyMarketingInfoList collapsable or not", () => {
    const store = createStore(() => ({ ...tempStore }));
    const { getByText } = render(
      <MemoryRouter>
        <PropertyMarketingInfoList />
      </MemoryRouter>,
      {
        store,
      }
    );
    const collapse = getByText("AJSG Hotel");
    expect(collapse).toBeInTheDocument();
  });

  test("create PropertyMarketingInfoList validation", () => {
    const store = createStore(() => ({ ...tempStore }));
    const { getByText } = render(
      <MemoryRouter initialEntries={["/offers/create-new-offer/4"]}>
        <PropertyMarketingInfoList />
      </MemoryRouter>,
      {
        store,
      }
    );
    const collapse = getByText("AJSG Hotel");
    fireEvent.click(collapse);
    expect(() => getByText(/Description/i)).toThrow();
  });
});
