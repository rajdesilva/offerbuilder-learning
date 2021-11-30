import React from "react";
import { createStore } from "redux";
import { render, fireEvent, act } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import { ConfirmAddCartItemModal } from "../ConfirmAddCartItemModal";
import { tempStore } from "../../../offers/components/__test__/tempStore";

describe("ConfirmAddCartItemModal component test cases", () => {
  test("create ConfirmAddCartItemModal components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    const wrapper = render(
      <MemoryRouter>
        <ConfirmAddCartItemModal />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot();
  });
  test("ConfirmAddCartItemModal - verify component modal hideModal functionality", async () => {
    const hideModal = jest.fn();

    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const wrapper = render(
      <MemoryRouter initialEntries={["/browse-supply/search-results"]}>
        <ConfirmAddCartItemModal
          {...{
            hideModal,
            row: {},
          }}
        />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { getByText, queryByText } = wrapper;
    expect(getByText("OK")).toBeInTheDocument();
    await act(async () => {
      await fireEvent.click(getByText(/OK/i));
    });
    expect(store.dispatch).toHaveBeenCalledTimes(5);
    expect(hideModal).toHaveBeenCalledTimes(1);
    expect(queryByText("Cancel")).not.toBeInTheDocument();
  });
});
