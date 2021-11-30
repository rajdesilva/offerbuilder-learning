import produce from "immer";
import { supplySearchActions } from "../actions";

export const channelsInfo = produce(
  (draft, action) => {
    switch (action.type) {
      case supplySearchActions.SEARCH_CHANNELS_LOADING:
        draft.loading = action.payload;
        draft.channels = [];
        return;
      case supplySearchActions.SEARCH_CHANNELS_SUCCESS:
        draft.loading = false;
        if (action.payload) {
          draft.channels = action.payload
            .filter((channel) => channel.id || channel.name)
            .map((channel) => {
              return {
                id: channel.id,
                name: channel.name || "",
              };
            });
        } else {
          draft.channels = [];
        }
        return;
      case supplySearchActions.SEARCH_CHANNELS_FAILURE:
        draft.loading = false;
        draft.channels = [];
        return;
      default:
        return draft;
    }
  },
  {
    loading: false,
    channels: [],
  }
);
