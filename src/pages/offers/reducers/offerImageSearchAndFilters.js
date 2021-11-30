import produce from "immer";
import { appConstants } from "../../../common";
import { offerImageSearchAndFilterActions } from "../actions/offerImageSearchAndFilterActions";

const getInitialSearchAndFilterState = () => {
  return {
    loading: false,
    offerImageList: [],
    pageOffset: 0,
    pageSize: 10,
    totalOfferImages: 0,
    appliedImageFilters: {
      fileName: "",
      uploadDateRange: {
        uploadedStartDate: "",
        uploadedEndDate: "",
      },
      uploadedByCurrentUser: appConstants.OFFER_IMAGE.ALL,
      usedInAnyOffer: appConstants.OFFER_IMAGE.ALL,
      offerIds: "",
      searchInputText: "",
    },
  };
};

export const offerImageSearchAndFilters = produce((draft, action) => {
  switch (action.type) {
    case offerImageSearchAndFilterActions.APPLY_OFFER_IMAGE_FILTERS:
      const reduxSearchedKey = draft.appliedImageFilters.searchInputText;
      draft.appliedImageFilters = action.payload;
      draft.appliedImageFilters.searchInputText = reduxSearchedKey;
      return;
    case offerImageSearchAndFilterActions.APPLY_SEARCH_KEY:
      draft.appliedImageFilters.searchInputText = action.payload;
      return;
    // offerImageList image list related
    case offerImageSearchAndFilterActions.OFFER_IMAGE_LOADING:
      draft.loading = true;
      return;
    case offerImageSearchAndFilterActions.OFFER_IMAGE_SUCCESS:
      draft.loading = false;
      draft.offerImageList = action.payload.images;
      draft.totalOfferImages = action.payload.totalImages;
      draft.pageSize = action.payload.pageSize;
      draft.pageOffset = action.payload.pageOffset;
      return;
    case offerImageSearchAndFilterActions.OFFER_IMAGE_FAILURE:
      draft.loading = false;
      draft.offerImageList = [];
      return;
    case offerImageSearchAndFilterActions.OFFER_IMAGE_LIST_PAGE_OFFSET:
      draft.pageOffset = action.payload;
      return;
    case offerImageSearchAndFilterActions.OFFER_IMAGE_LIST_PAGE_SIZE:
      draft.pageSize = action.payload;
      return;
    case offerImageSearchAndFilterActions.RESET_OFFERS_PAGINATION:
      draft.pageSize = 10;
      draft.pageOffset = 0;
      draft.totalOfferImages = 0;
      return;
    case offerImageSearchAndFilterActions.SET_OFFER_FILTER_DATA:
      draft.appliedImageFilters = action.payload.appliedImageFilters;
      draft.pageSize = action.payload.pageSize;
      draft.pageOffset = action.payload.pageOffset;
      return;
      case offerImageSearchAndFilterActions.APPLY_OFFER_IMAGE_INITIAL_STATE:
        return getInitialSearchAndFilterState();
    default:
      return draft;
  }
}, getInitialSearchAndFilterState());
