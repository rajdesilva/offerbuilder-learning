import produce from "immer";
import moment from "moment";
import { appConstants } from "../../../common";
import { supplySearchActions } from "../actions/supplySearch";

const initialState = {
  destination: {
    lat: "",
    lng: "",
    city: "",
  },
  distance: 10,
  los: 1,
  hotelName: "",
  onlySupplier: false,
  target: {
    suppliers: [],
    channels: [],
  },
  brands: process.env.REACT_APP_HIDE_CLIENT_AND_STORE
    ? [
        {
          id: "idb",
          name: "Internal Demo Brand",
          storefronts: [
            {
              id: "ids",
              name: "Internal Demo Storefront",
              suppliers: [
                {
                  channels: [
                    {
                      id: "KOGNITIV_QA",
                      name: "QA for Kognitiv Onboarding Projects",
                    },
                  ],
                  id: "ntp",
                  name: "NTP",
                },
              ],
            },
          ],
        },
      ]
    : [],
  pageSize: 10,
  pageOffset: 0,
  dateRange: {
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().add(60, "d").format("YYYY-MM-DD"),
  },
  currencyCode: "EUR",
  lcn: false,
  sortBy: {
    sortOrder: appConstants.SORT_PROPERTY.NAME_ASCENDING_VALUE.sortOrder,
    sortCriteria: appConstants.SORT_PROPERTY.NAME_ASCENDING_VALUE.sortCriteria,
  },
  remainingCapitalPool: "",
  type: appConstants.PROPERTY_TYPE_LIST[2].id,
};

export const searchParams = produce((draft, action) => {
  switch (action.type) {
    case supplySearchActions.RESET_SEARCH_PARAM_STATE:
      return initialState;
    // entire supply search state is updated from Search settings form
    case supplySearchActions.SUPPLY_SEARCH_UPDATE_REDUX_STATE:
      // get values for pagesize and page offset as those are not part of forms
      return {
        ...action.payload,
        pageSize: window.getValue(action, "payload.pageSize") || 10, // set default value as user has changed the settings/trying new searching
        pageOffset: window.getValue(action, "payload.pageOffset") || 0, // // set default value as user has changed the settings/trying new searching
        sortBy: draft.sortBy,
        dateRange: {
          startDate: window.getValue(action, "payload.dateRange")
            ? moment(
                action.payload.dateRange[0] ||
                  action.payload.dateRange.startDate
              ).format("YYYY-MM-DD")
            : moment().format("YYYY-MM-DD"),
          endDate: window.getValue(action, "payload.dateRange")
            ? moment(
                action.payload.dateRange[1] || action.payload.dateRange.endDate
              ).format("YYYY-MM-DD")
            : moment().add(60, "d").format("YYYY-MM-DD"),
        },
      };
    case supplySearchActions.SUPPLY_SEARCH_UPDATE_DESTINATION:
      draft.destination = action.payload;
      return;
    case supplySearchActions.SUPPLY_SEARCH_UPDATE_DISTANCE:
      draft.distance = action.payload;
      return;
    case supplySearchActions.SUPPLY_SEARCH_UPDATE_HOTEL_NAME:
      draft.hotelName = action.payload;
      return;
    case supplySearchActions.SUPPLY_SEARCH_UPDATE_DATE_RANGE:
      draft.dateRange.startDate = moment(action.payload[0]).format(
        "YYYY-MM-DD"
      );
      draft.dateRange.endDate = moment(action.payload[1]).format("YYYY-MM-DD");
      return;
    case supplySearchActions.SUPPLY_SEARCH_UPDATE_LOS:
      draft.los = action.payload;
      return;
    case supplySearchActions.SUPPLY_SEARCH_UPDATE_IS_SUPPLIER:
      draft.onlySupplier = action.payload;
      return;
    case supplySearchActions.SUPPLY_SEARCH_UPDATE_SUPPLIERS:
      if (draft.onlySupplier) {
        if (draft.target) {
          draft.target.suppliers = action.payload;
        } else {
          draft.target = {
            suppliers: action.payload,
            channels: [],
          };
        }
      }
      return;
    case supplySearchActions.SUPPLY_SEARCH_UPDATE_CHANNELS:
      if (draft.onlySupplier) {
        if (draft.target) {
          draft.target.channels = action.payload;
        } else {
          draft.target = {
            channels: action.payload,
            suppliers: [],
          };
        }
      }
      return;
    case supplySearchActions.SUPPLY_SEARCH_UPDATE_LCN_FLAG:
      draft.lcn = action.payload;
      if (!action.payload) {
        draft.remainingCapitalPool = "";
      }
      return;
    case supplySearchActions.SUPPLY_SEARCH_UPDATE_REMAINING_CAPITAL_POOL:
      if (draft.lcn) {
        draft.remainingCapitalPool = action.payload;
      }
      return;
    case supplySearchActions.SEARCH_UPDATE_SUPPLIER:
      const supplierToUpdate = action.payload.value;
      const brandIndex11 = action.payload.brandIndex;
      const storefrontIndex11 = action.payload.storefrontIndex;

      draft.brands[brandIndex11].storefronts[storefrontIndex11].suppliers = [
        {
          ...supplierToUpdate,
          channels:
            draft.brands[brandIndex11].storefronts[storefrontIndex11]
              .suppliers &&
            draft.brands[brandIndex11].storefronts[storefrontIndex11]
              .suppliers[0] &&
            draft.brands[brandIndex11].storefronts[storefrontIndex11]
              .suppliers[0].channels
              ? draft.brands[brandIndex11].storefronts[storefrontIndex11]
                  .suppliers[0].channels
              : [],
        },
      ];
      return;
    case supplySearchActions.SEARCH_REMOVE_STOREFRONT:
      const brandInd = action.payload.brandIndex;
      const storefrontInd = action.payload.storefrontIndex;

      draft.brands[brandInd].storefronts = draft.brands[
        brandInd
      ].storefronts.filter((temp, index) => index !== storefrontInd);
      return;
    case supplySearchActions.SEARCH_REMOVE_BRAND:
      const brandId = action.payload;
      draft.brands = draft.brands.filter((temp, index) => index !== brandId);
      return;

    case supplySearchActions.SEARCH_UPDATE_CHANNEL:
      const channelsToUpdate = action.payload.value;
      const brandIndex1111 = action.payload.brandIndex;
      const storefrontIndex1111 = action.payload.storefrontIndex;
      const supplierIndex1111 = action.payload.supplierIndex;
      draft.brands[brandIndex1111].storefronts[storefrontIndex1111].suppliers[
        supplierIndex1111
      ] = {
        ...draft.brands[brandIndex1111].storefronts[storefrontIndex1111]
          .suppliers[supplierIndex1111],
      };
      draft.brands[brandIndex1111].storefronts[storefrontIndex1111].suppliers[
        supplierIndex1111
      ].channels.push(channelsToUpdate);
      return;

    case supplySearchActions.SEARCH_REMOVE_CHANNEL:
      const channelToRemove = action.payload.value;
      const brandIndex11111 = action.payload.brandIndex;
      const storefrontIndex11111 = action.payload.storefrontIndex;
      const supplierIndex11111 = action.payload.supplierIndex;
      draft.brands[brandIndex11111].storefronts[storefrontIndex11111].suppliers[
        supplierIndex11111
      ] = {
        ...draft.brands[brandIndex11111].storefronts[storefrontIndex11111]
          .suppliers[supplierIndex11111],
        channels: draft.brands[brandIndex11111].storefronts[
          storefrontIndex11111
        ].suppliers[supplierIndex11111].channels.filter(
          (channel) => channel.id !== channelToRemove.id
        ),
      };
      return;

    case supplySearchActions.SEARCH_UPDATE_STOREFRONT:
      const storefrontToUpdate = action.payload.value;
      const brandIndex111 = action.payload.brandIndex;

      const storefrontIndex111 = action.payload.storefrontIndex;

      if (
        draft.brands[brandIndex111].storefronts &&
        draft.brands[brandIndex111].storefronts[storefrontIndex111]
      ) {
        draft.brands[brandIndex111].storefronts[storefrontIndex111] =
          storefrontToUpdate;
      } else {
        draft.brands[brandIndex111].storefronts.push(storefrontToUpdate);
      }
      return;

    case supplySearchActions.SEARCH_ADD_BRAND:
      const brandInfoToAdd = action.payload;
      draft.brands.push(brandInfoToAdd);
      return;

    case supplySearchActions.SEARCH_UPDATE_BRAND:
      const brandInfoToUpdate = action.payload.brandInfo;
      const brandPos = action.payload.brandIndex;
      draft.brands[brandPos] = {
        ...draft.brands[brandPos],
        ...brandInfoToUpdate,
      };
      return;

    case supplySearchActions.SEARCH_REMOVE_SUPPLIER:
      const supplierToRemove = action.payload.value;
      const brandIndex = action.payload.brandIndex;
      const storefrontIndex = action.payload.storefrontIndex;
      draft.brands[brandIndex].storefronts[storefrontIndex].suppliers =
        draft.brands[brandIndex].storefronts[storefrontIndex].suppliers.filter(
          (supplier) => supplier.id !== supplierToRemove.id
        );
      return;

    case supplySearchActions.SEARCH_ADD_ROW_STOREFRONT:
      const brandIndex01 = action.payload.brandIndex;
      draft.brands[brandIndex01].storefronts.push({});
      return;

    case supplySearchActions.SUPPLY_SEARCH_UPDATE_PAGE_OFFSET:
      draft.pageOffset = action.payload;
      return;
    case supplySearchActions.SUPPLY_SEARCH_UPDATE_PAGE_SIZE:
      draft.pageSize = action.payload;
      return;
    case supplySearchActions.SUPPLY_SEARCH_UPDATE_CURRENCY:
      draft.currencyCode = action.payload;
      return;
    case supplySearchActions.SUPPLY_SEARCH_UPDATE_SORT_BY:
      try {
        draft.sortBy = JSON.parse(action.payload);
      } catch (e) {
        console.log(e.toString());
      }
      return;
    case supplySearchActions.SUPPLY_SEARCH_UPDATE_PROPERTY_TYPE:
      draft.type = action.payload;
      return;
    default:
      return draft;
  }
}, initialState);
