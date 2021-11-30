import { checkIfItemAlreadyPresentInList } from "../checkIfItemAlreadyPresentInList";

describe("checkIfItemAlreadyPresentInList function test", () => {
  test("checkIfItemAlreadyPresentInList item present case", () => {
    const itemToCheck = {
      id: 11,
    };
    const itemList = [
      {
        id: 11,
      },
      {
        id: 12,
      },
      {
        id: 13,
      },
    ];
    expect(checkIfItemAlreadyPresentInList(itemToCheck, itemList)).toBe(true);
  });
  test("checkIfItemAlreadyPresentInList item absent case", () => {
    const itemToCheck = {
      id: 21,
    };
    const itemList = [
      {
        id: 11,
      },
      {
        id: 12,
      },
      {
        id: 13,
      },
    ];
    expect(checkIfItemAlreadyPresentInList(itemToCheck, itemList)).toBe(false);
  });

  test("checkIfItemAlreadyPresentInList values sent are null", () => {
    expect(checkIfItemAlreadyPresentInList(null, null)).toBe(false);
  });
});
