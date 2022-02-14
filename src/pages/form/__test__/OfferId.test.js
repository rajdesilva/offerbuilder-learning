import React from "react";
import OfferId from "../OfferId";
import * as service from "../../offers/service";
import { act, render, fireEvent, cleanup } from "../../../helpers/testUtils";

afterEach(cleanup);

describe("OfferId component test cases", () => {
  test("OfferId components snapshot", () => {
    const props = {
      onChange: jest.fn(),
    };
    const { container } = render(<OfferId {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("validate offer id by changing input field for offer id", async () => {
    const onChangeMock = jest.fn();
    const validateOfferId = jest.spyOn(service, "validateOfferId");
    validateOfferId.mockResolvedValue({
      success: true,
      data: {
        available: true,
      },
    });
    const newOfferId = "NEWYEAR2021";
    const props = {
      onChange: onChangeMock,
      value: "YEAR2021",
    };
    const { getByTestId } = render(<OfferId {...props} />);

    await act(async () => {
      await fireEvent.change(getByTestId("settings-offer-id"), {
        target: { value: newOfferId },
      });
    });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(validateOfferId).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(newOfferId);
  });
  test("validate offer id by changing input field for offer id and offerid is not available from backend", async () => {
    const onChangeMock = jest.fn();
    const validateOfferId = jest.spyOn(service, "validateOfferId");
    validateOfferId.mockResolvedValue({
      success: true,
      data: {
        available: false,
      },
    });
    const newOfferId = "NEWYEAR2021";
    const props = {
      onChange: onChangeMock,
      value: "YEAR2021",
    };
    const { getByTestId } = render(<OfferId {...props} />);

    await act(async () => {
      await fireEvent.change(getByTestId("settings-offer-id"), {
        target: { value: newOfferId },
      });
    });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith("error");
  });
});
