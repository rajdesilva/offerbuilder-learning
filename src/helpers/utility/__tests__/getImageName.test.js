import { getImageName } from "../getImageName";

describe("getImageName function test", () => {
  test("getImageName check value when image url present case", () => {
    const image = "https://res.cloudinary.com/seekda-dev/image/upload/v1617090314/offer_builder_dev/test.png";
    expect(getImageName(image)).toBe("test.png");
  });

  test("getImageName check value when valid image url not present case", () => {
    const image = "nourl";
    expect(getImageName(image)).toBe("");
  });

  test("getImageName check value when image url is absent case", () => {
    const image = null;
    expect(getImageName(image)).toBe("");
  });

  test("getImageName check value when image url is absent case", () => {
    const image = "";
    expect(getImageName(image)).toBe("");
  });
});
