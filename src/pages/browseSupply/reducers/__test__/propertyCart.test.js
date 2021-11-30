import { store } from "../../../../redux/store";
import { getValue } from "../../../../helpers";

window.getValue = getValue;
describe("Test Channels Redux", () => {
  test("Check initial state of propertyCart store is empty", () => {
    expect(store.getState().propertycart).toEqual({
      cartItems: [],
      cartChangeStatus: false,
    });
  });
});
