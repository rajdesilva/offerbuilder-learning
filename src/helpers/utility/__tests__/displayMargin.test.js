import { displayMargin } from "../displayMargin";

describe("displayMargin function test", () => {
  test("displayMargin lowestMargin, highestMargin both are same and valid case", () => {
    expect(displayMargin(11, 11)).toBe("11 %");
  });
  test("displayMargin lowestMargin, highestMargin both are different and valid case", () => {
    expect(displayMargin(5, 6)).toBe("5-6 %");
  });

  test("displayMargin lowestMargin, highestMargin both are invalid case", () => {
    expect(displayMargin("", "")).toBe("");
    expect(displayMargin(null, null)).toBe("");
  });

  test("displayMargin only lowestMargin present and valid case", () => {
    expect(displayMargin("5", "")).toBe("5 %");
  });

  test("displayMargin only highestMargin present and valid case", () => {
    expect(displayMargin("", "8")).toBe("8 %");
  });
});
