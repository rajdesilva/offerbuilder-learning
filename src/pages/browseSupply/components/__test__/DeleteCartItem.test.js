import React from "react";
import { createStore } from "redux";
import { render, fireEvent, act } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import { DeleteCartItem } from "../DeleteCartItem";
import { tempStore } from "../../../offers/components/__test__/tempStore";

describe("DeleteCartItem component test cases", () => {
  test("cDeleteCartItem component snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    const wrapper = render(
      <MemoryRouter>
        <DeleteCartItem />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot();
  });
  test("DeleteCartItem - dispatch event on click on the delete btn", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/browse-supply/search-results"]}>
        <DeleteCartItem />
      </MemoryRouter>,
      {
        store,
      }
    );

    const deleteBtn = getByTestId("delete-filled-icon");
    act(() => {
      fireEvent.click(deleteBtn);
    });
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  test("DeleteCartItem - dispatch event on click on the delete btn when offer settings flow", async () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const props = {
      isForSettings: true,
    };
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/offers/edit/123"]}>
        <DeleteCartItem {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );

    const deleteBtn = getByTestId("delete-filled-icon");
    act(() => {
      fireEvent.click(deleteBtn);
    });
    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });
});
