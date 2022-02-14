import produce from "immer";
import { appConstants } from "../../../common";
import { getFilterData } from "../../../helpers/utility";
import { offerListSearchAndFilterActions } from "../actions";

const initialState = {
  selectedTab: appConstants.offerListTab.ACTIVE,
  loading: false,
  offerDetailsLoading: false,
  offers: [],
  pageOffset: 0,
  pageSize: 10,
  totalOffers: 0,
  // used  for storing parsed brands, storefronts, suppliers, channels
  targetfilterdata: {
    brands: [],
    storefronts: [],
    suppliers: [],
    channels: [],
    propertyTypes: appConstants.PROPERTY_TYPE_LIST
  },
  appliedFilters: {
    brands: [],
    storefronts: [],
    suppliers: [],
    channels: [],
    propertyTypes: [],
    lcn: false,
    status: [
      appConstants.OFFER_STATUS_OPTIONS[0],
      appConstants.OFFER_STATUS_OPTIONS[1],
    ],
    searchInputText: "",
  },
};

export const offerListSearchAndFilters = produce((draft, action) => {
  switch (action.type) {
    case offerListSearchAndFilterActions.UPDATE_OFFER_SELECTORS:
      const filterData = getFilterData(action.payload);
      if (filterData) {
        draft.targetfilterdata = filterData;
      }
      return;
    case offerListSearchAndFilterActions.APPLY_OFFER_LIST_FILTERS:
      const reduxSearchedKey = draft.appliedFilters.searchInputText;
      draft.appliedFilters = action.payload;
      draft.appliedFilters.searchInputText = reduxSearchedKey;
      return;
    case offerListSearchAndFilterActions.APPLY_SEARCH_KEY:
      draft.appliedFilters.searchInputText = action.payload;
      return;
    // offers list related
    case offerListSearchAndFilterActions.OFFER_LIST_LOADING:
      draft.loading = true;
      return;
    case offerListSearchAndFilterActions.OFFER_LIST_SUCCESS:
      draft.loading = false;
      draft.offers = action.payload.offers;
      draft.totalOffers = action.payload.totalOffers;
      draft.pageSize = action.payload.pageSize;
      draft.pageOffset = action.payload.pageOffset;
      return;
    case offerListSearchAndFilterActions.OFFER_LIST_FAILURE:
      draft.loading = false;
      draft.offers = [];
      return;
    case offerListSearchAndFilterActions.OFFER_LIST_PAGE_OFFSET:
      draft.pageOffset = action.payload;
      return;
    case offerListSearchAndFilterActions.OFFER_LIST_PAGE_SIZE:
      draft.pageSize = action.payload;
      return;
    case offerListSearchAndFilterActions.SELECTED_TAB_KEY:
      // basically we are switching the tab from archieve to active
      if (
        draft.selectedTab === appConstants.offerListTab.ARCHIVE &&
        action.payload === appConstants.offerListTab.ACTIVE
      ) {
        draft.appliedFilters.status = [
          appConstants.OFFER_STATUS_OPTIONS[0],
          appConstants.OFFER_STATUS_OPTIONS[1],
        ];
      }
      draft.selectedTab = action.payload;
      return;
    case offerListSearchAndFilterActions.RESET_OFFERS_PAGINATION:
      draft.pageSize = 10;
      draft.pageOffset = 0;
      draft.totalOffers = 0;
      return;
    case offerListSearchAndFilterActions.SET_OFFER_FILTER_DATA:
      draft.appliedFilters = action.payload.appliedFilters;
      draft.pageSize = action.payload.pageSize;
      draft.pageOffset = action.payload.pageOffset;
      return;
    case offerListSearchAndFilterActions.RESET_OFFER_FILTER_DATA:
      return {
        ...initialState,
        targetfilterdata : draft.targetfilterdata
      };
    case offerListSearchAndFilterActions.OFFER_DETAILS_LOADING:
      draft.offerDetailsLoading = true;
      return;
    case offerListSearchAndFilterActions.OFFER_DETAILS_SUCCESS:
    case offerListSearchAndFilterActions.OFFER_DETAILS_FAILURE:
      draft.offerDetailsLoading = false;
      return;
    default:
      return draft;
  }
}, initialState);
