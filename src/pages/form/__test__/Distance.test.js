import React from "react";

import Distance from "../Distance.jsx";
import { act, render, fireEvent, cleanup } from "../../../helpers/testUtils";

afterEach(cleanup);
describe("Distance component test cases", () => {
  test("Distance components snapshot", () => {
    const props = {
      onChange: jest.fn(),
      value: 10,
    };

    const { container } = render(<Distance {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test("on change of distance it should trigger event and get the value", async () => {
    const onChangeMock = jest.fn();
    const props = {
      onChange: onChangeMock,
      onChangeDistance: onChangeMock,
      value: 10,
      datatestid: "test-distance",
    };
    const { getByTestId, getByRole } = render(<Distance {...props} />);
    const select = getByRole("combobox");

    await act(async () => {
      await fireEvent.keyDown(select, { key: "ArrowDown" });
      await fireEvent.click(getByTestId("distance-km-25"));
    });
    expect(onChangeMock).toHaveBeenCalledTimes(2);
  });
});
