import { act } from "react-dom/test-utils";
import * as service from "../../service";
import { store } from "../../../../redux/store";
import { getValue } from "../../../../helpers";

window.getValue = getValue;

describe("Test languages Redux", () => {
  test("Check initial state of store is empty", () => {
    expect(store.getState().languageinfo).toEqual({
      loading: false,
      languages: [
        {
          id: "EN",
          name: "English",
        },
      ],
    });
  });

  test("Check Languages store's state with reject response", async () => {
    window.fetchWrapper = jest.fn().mockRejectedValue("Not Found");

    await act(async () => {
      await service.getLanguages();
    });
    expect(store.getState().languageinfo).toEqual({
      loading: false,
      languages: [
        {
          id: "EN",
          name: "English",
        },
      ],
    });
  });

  test("Check Languages store's state with correct response", async () => {
    window.fetchWrapper = jest.fn().mockResolvedValue({
      success: true,
      data: {
        success: true,
        languages: [
          {
            id: "EN",
            name: "English",
          },
          {
            id: "ES",
            name: "Spanish",
          },
          {
            id: "FR",
            name: "French",
          },

          {
            id: "EL",
            name: "Greek",
          },
        ],
      },
      error: null,
    });

    await act(async () => {
      await service.getLanguages();
    });

    expect(store.getState().languageinfo).toEqual({
      loading: false,
      languages: [
        {
          id: "EN",
          name: "English",
        },
      ],
    });
  });
});
