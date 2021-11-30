import { act } from "react-dom/test-utils";
import * as service from "../../service";
import { store } from "../../../../redux/store";
import { getValue } from "../../../../helpers";

window.getValue = getValue;

describe("Test Channels Redux", () => {
  test("Check initial state of store is empty", () => {
    expect(store.getState().channelinfo).toEqual({
      loading: false,
      channels: [],
    });
  });

  test("Check Channels store's state with reject response", async () => {
    window.fetchWrapper = jest.fn().mockRejectedValue("Not Found");

    await act(async () => {
      await service.getChannels();
    });
    expect(store.getState().channelinfo).toEqual({
      loading: false,
      channels: [],
    });
  });

  test("Check Channels store's state with correct response", async () => {
    window.fetchWrapper = jest.fn().mockResolvedValue({
      success: true,
      data: {
        success: true,
        result: [
          {
            id: "AT_CORDIAL",
            name: null,
            type: "Portal",
            status: "HIDDEN",
          },
          {
            id: "WORTSCHI",
            name: null,
            type: "Portal",
            status: "HIDDEN",
          },
        ],
      },
      error: null,
    });

    await act(async () => {
      await service.getChannels();
    });

    expect(store.getState().channelinfo).toEqual({
      channels: [],
      loading: false,
    });
  });
});
