import { getFormattedValue } from "../getFormattedValue";

describe("getFormattedValue function test", () => {
  test("getFormattedValue check output based on values", () => {
    const value = 123.100;
    expect(getFormattedValue(value)).toBe("123.10");

    const value1 = 123.16666666;
    expect(getFormattedValue(value1)).toBe("123.167");

    const value2 = 123.888;
    expect(getFormattedValue(value2)).toBe("123.888");

    const value3 = 123;
    expect(getFormattedValue(value3)).toBe(123);

    const value4 = null;
    expect(getFormattedValue(value4)).toBe(null);

    const value5 = "";
    expect(getFormattedValue(value5)).toBe("");

  });
});
