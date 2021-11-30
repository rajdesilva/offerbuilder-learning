import { store } from "../../../redux/store";
import { getValue } from "../getValue";

describe("getValue function test", () => {
  test("getValue used in case of accessing store values", () => {
    Date.now = jest.fn(() => new Date("2021-01-01"));
    // path does not exists case
    expect(getValue(store.getState(), "test")).toBe("");
    // path exists case
    expect(getValue(store.getState(), "searchparams.destination.city")).toStrictEqual("");
    // deep path case
    expect(
      getValue(store.getState(), "searchparams.los")
    ).toStrictEqual(1);

     // deep path case accessing number
     expect(
        getValue(store.getState(), "searchparams.target.channels")
      ).toStrictEqual([]);

    // deep path case with incorrect access index
    expect(
      getValue(store.getState(), "searchparams.target.channels[0]")
    ).toStrictEqual("");
  });

  test("getValue used in case of accessing null, empty and correct object values", () => {
    // deep path case with null access index
    expect(getValue(null, "searchparams.target.channels[0]")).toStrictEqual("");

    const testObject = {
      first: {
        second: {
          testArray: ["1", "2", "3"],
        },
      },
    };

    // access index from array object
    expect(
      getValue(testObject, "first.second.testArray[1]")
    ).toStrictEqual("2");
  });
});
