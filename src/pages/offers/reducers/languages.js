import produce from "immer";
import { marketingActions } from "../actions";

export const languageInfo = produce(
  (draft, action) => {
    switch (action.type) {
      case marketingActions.FETCH_LANGUAGE_LOADING:
        draft.loading = true;
        return;
      case marketingActions.FETCH_LANGUAGE_SUCCESS:
        draft.loading = false;
        draft.languages = action.payload;
        return;
      case marketingActions.SET_LANGUAGES:
        draft.languages = action.payload;
        return;
      case marketingActions.FETCH_LANGUAGE_FAILURE:
        draft.loading = false;
        return;
      default:
        return draft;
    }
  },
  {
    loading: false,
    languages: [
      {
        id: "EN",
        name: "English",
      },
    ],
  }
);
