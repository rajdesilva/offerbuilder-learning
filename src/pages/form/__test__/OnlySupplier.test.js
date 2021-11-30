import React from "react";
import OnlySupplier from "../OnlySupplier";
import { ReduxForOnlySupplier } from "./ReduxForOnlySupplier";
import { createStore } from "redux";
import { Form } from "antd";

import { act, render, fireEvent, cleanup } from "../../../helpers/testUtils";
import { supplySearchActions } from "../../browseSupply/actions";

afterEach(cleanup);

describe("OnlySupplier component test cases", () => {
  test("OnlySupplier components snapshot", () => {
    const props = {};
    const store = createStore(() => ({ ...ReduxForOnlySupplier }));

    const FormWrapper = (props) => {
      const [form] = Form.useForm();
      return (
        <Form form={form} initialValues={{}}>
          <OnlySupplier {...{ ...props, form }} />
        </Form>
      );
    };

    const { container } = render(<FormWrapper {...props} />, {
      store,
    });

    expect(container.firstChild).toMatchSnapshot();
  });
  test("render onlysupplier component having nothing pass in the store and nothing needs to selected in the dom ", () => {
    const props = {};
    const store = createStore(() => ({ ...ReduxForOnlySupplier }));

    const FormWrapper = (props) => {
      const [form] = Form.useForm();
      return (
        <Form form={form} initialValues={{}}>
          <OnlySupplier {...{ ...props, form }} />
        </Form>
      );
    };
    const { queryAllByText } = render(<FormWrapper {...props} />, {
      store,
    });
    expect(queryAllByText("Please Select")).toHaveLength(2);
  });
  test("display the value from store to component for supplier and channels ", () => {
    const props = {};
    const store = createStore(() => ({ ...ReduxForOnlySupplier }));

    const FormWrapper = (props) => {
      const [form] = Form.useForm();
      return (
        <Form form={form} initialValues={ReduxForOnlySupplier.searchparams}>
          <OnlySupplier {...{ ...props, form }} />
        </Form>
      );
    };
    const { getByText } = render(<FormWrapper {...props} />, {
      store,
    });
    expect(
      getByText(ReduxForOnlySupplier.searchparams.target.suppliers[0].name)
    ).toBeInTheDocument();
    expect(
      getByText(ReduxForOnlySupplier.searchparams.target.channels[0].id)
    ).toBeInTheDocument();
  });
  test("add more values to channels and verify it ", async () => {
    const props = {};
    const store = createStore(() => ({ ...ReduxForOnlySupplier }));
    store.dispatch = jest.fn();
    const FormWrapper = (props) => {
      const [form] = Form.useForm();
      return (
        <Form form={form} initialValues={ReduxForOnlySupplier.searchparams}>
          <OnlySupplier {...{ ...props, form }} />
        </Form>
      );
    };
    const { getByTestId, queryAllByRole } = render(<FormWrapper {...props} />, {
      store,
    });
    const select = queryAllByRole("combobox");
    await act(async () => {
      await fireEvent.keyDown(select[select.length - 1], { key: "ArrowDown" });
      await fireEvent.click(
        getByTestId(
          "nemo-select-brw-search-channel-option-" +
            ReduxForOnlySupplier.channelinfo.channels[1].id
        )
      );
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: supplySearchActions.SUPPLY_SEARCH_UPDATE_CHANNELS,
      payload: ReduxForOnlySupplier.channelinfo.channels.map((c) => ({
        id: c.id,
        name: c.name,
      })),
    });
  });
});
