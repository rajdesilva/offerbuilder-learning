import React from "react";
import { createStore } from "redux";
import { render, fireEvent } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import ViewPropertyMarketingInfoList from "../ViewPropertyMarketingInfoList";
import { tempStore } from "./tempStore";

describe("ViewPropertyMarketingInfoList.test component test", () => {
  test("create ViewPropertyMarketingInfoList.test components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    const wrapper = render(
      <MemoryRouter>
        <ViewPropertyMarketingInfoList />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot();
  });
  test("create ViewPropertyMarketingInfoList collapsable or not", () => {
    const store = createStore(() => ({ ...tempStore }));
    const { getByText } = render(
      <MemoryRouter>
        <ViewPropertyMarketingInfoList />
      </MemoryRouter>,
      {
        store,
      }
    );
    const collapse = getByText("AJSG Hotel");
    expect(collapse).toBeInTheDocument();
  });

  test("create ViewPropertyMarketingInfoList validation", () => {
    const store = createStore(() => ({ ...tempStore }));
    const { getByText } = render(
      <MemoryRouter initialEntries={["/offers/view/123"]}>
        <ViewPropertyMarketingInfoList />
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
