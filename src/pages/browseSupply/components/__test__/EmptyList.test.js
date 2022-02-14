import React from "react";
import { createStore } from "redux";
import { render, fireEvent, act, cleanup } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import { EmptyList } from "../EmptyList";
import { history } from "../../../../helpers/history";
jest.spyOn(history, "goBack");

afterEach(cleanup);
describe("EmptyList component test cases", () => {
  test("EmptyList component snapshot", () => {
    const store = createStore(() => ({}));
    const wrapper = render(
      <MemoryRouter>
        <EmptyList />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot();
  });
  test("EmptyList - verify previous function being called,passed as prop to component", async () => {
    const store = createStore(() => ({}));
    store.dispatch = jest.fn();
    const prev = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
        <EmptyList
          {...{
            prev,
          }}
        />
      </MemoryRouter>,
      {
        store,
      }
    );
    const backButton = getByTestId("back-btn");
    act(() => {
      fireEvent.click(backButton);
    });
    expect(prev).toHaveBeenCalledTimes(1);
  });
  test("EmptyList - verify history.back being called on click of back button when no props passed", async () => {
    const store = createStore(() => ({}));

    const { getByTestId } = render(
      <MemoryRouter>
        <EmptyList />
      </MemoryRouter>,
      {
        store,
      }
    );
    const backButton = getByTestId("back-btn");
    act(() => {
      fireEvent.click(backButton);
    });
    expect(history.goBack).toHaveBeenCalledTimes(1);
  });

  test("EmptyList - back button is not displayed when edit flow is going on", async () => {
    const store = createStore(() => ({}));
    const props = {
      show: true,
      isEditFlow: true,
      prev: jest.fn(),
    };
    const { queryByTestId } = render(
      <MemoryRouter initialEntries={["/offers/edit/123"]}>
        <EmptyList {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(queryByTestId("back-btn")).not.toBeInTheDocument();
  });

  test("EmptyList - back button is not displayed when create flow is going on and show flag is true", async () => {
    const store = createStore(() => ({}));
    const props = {
      show: true,
      isEditFlow: false,
      prev: jest.fn(),
    };
    const { queryByTestId } = render(
      <MemoryRouter initialEntries={["/offers/create-new-offer/2"]}>
        <EmptyList {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(queryByTestId("back-btn")).not.toBeInTheDocument();
  });

  test("EmptyList - back button is displayed when create flow is going on and show flag is false", async () => {
    const store = createStore(() => ({}));
    const props = {
      show: false,
      isEditFlow: false,
      prev: jest.fn(),
    };
    const { queryByTestId } = render(
      <MemoryRouter initialEntries={["/offers/create-new-offer/2"]}>
        <EmptyList {...props} />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(queryByTestId("back-btn")).toBeInTheDocument();
  });
});
