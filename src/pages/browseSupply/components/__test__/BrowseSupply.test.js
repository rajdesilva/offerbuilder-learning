import React from "react";
import { createStore } from "redux";
import { render } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import { BrowseSupply } from "../BrowseSupply";
import { tempStore } from "../../../offers/components/__test__/tempStore";

window.fetchWrapper = window.fetchWrapper = jest.fn().mockResolvedValue({
  success: true,
});

describe("BrowseSupply component test", () => {
  test("create BrowseSupply components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    const wrapper = render(
      <MemoryRouter initialEntries={["/browse-supply/"]}>
        <BrowseSupply />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot();
  });

  test("create BrowseSupply - search-result - verify text on the components", () => {
    const store = createStore(() => ({ ...tempStore }));
    const wrapper = render(
      <MemoryRouter initialEntries={["/browse-supply/search-results"]}>
        <BrowseSupply />
      </MemoryRouter>,
      {
        store,
      }
    );

    const { getByText } = wrapper;
    expect(getByText("Browse Supply")).toBeInTheDocument();
    expect(getByText("Search Parameters")).toBeInTheDocument();
    expect(getByText(/Lowest Price On/i)).toBeInTheDocument();
  });
});
