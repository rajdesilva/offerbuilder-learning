import React from "react";
import Brands from "../Brands";
import { ReduxForBrands } from "./ReduxForBrands";
import { createStore } from "redux";
import { Form } from "antd";
import { MemoryRouter } from "react-router-dom";

import { act, render, fireEvent, cleanup } from "../../../helpers/testUtils";

afterEach(cleanup);

describe("Brands component test cases", () => {
  test("Brands components snapshot and nothing is selected in the dropdowns", () => {
    const props = {
      field: {
        key: 0,
        name: 0,
      },
    };
    const store = createStore(() => ({ ...ReduxForBrands }));
    const FormWrapper = (props) => {
      const [form] = Form.useForm();
      return (
        <MemoryRouter initialEntries={["/browse-supply/"]}>
          <Form form={form} initialValues={{}}>
            <Brands {...{ ...props, form }} />
          </Form>
        </MemoryRouter>
      );
    };

    const { container, queryAllByText } = render(<FormWrapper {...props} />, {
      store,
    });

    expect(container.firstChild).toMatchSnapshot();
    expect(queryAllByText("Please Select").length).toBe(3); // // REACT_APP_HIDE_CLIENT_AND_STORE brand is displayed
  });
  test("Brand component is rendered corrected using searchparams", () => {
    const props = {
      field: {
        key: 0,
        name: 0,
      },
    };
    const store = createStore(() => ({ ...ReduxForBrands }));
    const FormWrapper = (props) => {
      const [form] = Form.useForm();
      return (
        <MemoryRouter initialEntries={["/browse-supply/"]}>
          <Form form={form} initialValues={ReduxForBrands.searchparams}>
            <Brands {...{ ...props, form }} />
          </Form>
        </MemoryRouter>
      );
    };

    const { queryAllByText } = render(<FormWrapper {...props} />, {
      store,
    });

    expect(queryAllByText("Please Select").length).toBe(0);
  });
  test("Brand component - add and remove storefrontns using click of buttons", async () => {
    const props = {
      field: {
        key: 0,
        name: 0,
      },
    };
    const store = createStore(() => ({ ...ReduxForBrands }));
    const FormWrapper = (props) => {
      const [form] = Form.useForm();
      return (
        <MemoryRouter initialEntries={["/browse-supply/"]}>
          <Form form={form} initialValues={ReduxForBrands.searchparams}>
            <Brands {...{ ...props, form }} />
          </Form>
        </MemoryRouter>
      );
    };

    const { getAllByTestId, queryAllByText, getByTestId } = render(
      <FormWrapper {...props} />,
      {
        store,
      }
    );

    expect(getByTestId("add-storefront")).toBeInTheDocument();
    await act(async () => {
      await fireEvent.click(getByTestId("add-storefront"));
      await fireEvent.click(getByTestId("add-storefront"));
    });

    expect(queryAllByText("Please Select").length).toBe(6);
    await act(async () => {
      await fireEvent.click(getAllByTestId("remove-storefront")[0]);
      await fireEvent.click(getAllByTestId("remove-storefront")[0]);
    });
    expect(queryAllByText("Please Select").length).toBe(0);
  });
});
