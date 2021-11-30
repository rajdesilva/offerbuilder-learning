import produce from "immer";
import moment from "moment";
import { appConstants } from "../../../common";
import { newOfferActions } from "../actions";

const initialState = {
  offerId: "",
  status: {
    id: "UNPUBLISHED",
    name: "UNPUBLISHED",
  },
  name: "",
  brands: [],
  lastSearchDistance: 10,
  bookingDateRange: {
    startDate: "",
    endDate: "",
  },
  travellingDateRange: {
    startDate: "",
    endDate: "",
  },
  bookingDatesTimezone: "",
  deepLinkSettingsInfo: {
    destination: null,
    adultOccupancy: 1,
    childOccupancy: 0,
    // specificHotel: null,
    includeAllProperties: true,
    checkInType: "rolling",
    los: 1,
    rollingOffset: 0,
    fixedDate: null,
  },
  type: appConstants.PROPERTY_TYPE_LIST[0].id,
};

export const newOfferSettingParams = produce((draft, action) => {
  switch (action.type) {
    case newOfferActions.NEW_OFFER_UPDATE_REDUX_STATE:
      let offerData = action.payload;
      if (offerData && offerData.properties) {
        delete offerData.properties;
      } else if (offerData && Object.keys(offerData).length === 0) {
        return initialState;
      }
      return offerData;
    case newOfferActions.NEW_OFFER_UPDATE_OFFER_NAME:
      draft.name = action.payload;
      return;
    case newOfferActions.NEW_OFFER_UPDATE_OFFER_ID:
      draft.offerId = action.payload;
      return;
    case newOfferActions.NEW_OFFER_UPDATE_STATUS:
      draft.status = action.payload;
      return;
    case newOfferActions.INITIAL_ADD_BRANDS:
      draft.brands = action.payload;
      return;
    case newOfferActions.NEW_OFFER_UPDATE_SUPPLIERS: {
      const supplierToUpdate = action.payload.value;
      const brandIndex = action.payload.brandIndex;
      const storefrontIndex = action.payload.storefrontIndex;

      draft.brands[brandIndex].storefronts[storefrontIndex].suppliers = [
        {
          ...supplierToUpdate,
          channels:
            draft.brands[brandIndex].storefronts[storefrontIndex].suppliers &&
            draft.brands[brandIndex].storefronts[storefrontIndex]
              .suppliers[0] &&
            draft.brands[brandIndex].storefronts[storefrontIndex].suppliers[0]
              .channels
              ? draft.brands[brandIndex].storefronts[storefrontIndex]
                  .suppliers[0].channels
              : [],
        },
      ];
      // }
      return;
    }
    case newOfferActions.NEW_OFFER_REMOVE_STOREFRONT:
      const brandInd = action.payload.brandIndex;
      const storefrontInd = action.payload.storefrontIndex;

      draft.brands[brandInd].storefronts = draft.brands[
        brandInd
      ].storefronts.filter((temp, index) => index !== storefrontInd);
      return;
    case newOfferActions.NEW_OFFER_REMOVE_BRAND:
      const brandId = action.payload;

      draft.brands = draft.brands.filter((temp, index) => index !== brandId);
      return;
    case newOfferActions.NEW_OFFER_UPDATE_CHANNELS: {
      const channelsToUpdate = action.payload.value;
      const brandIndex = action.payload.brandIndex;
      const storefrontIndex = action.payload.storefrontIndex;
      const supplierIndex = action.payload.supplierIndex;
      draft.brands[brandIndex].storefronts[storefrontIndex].suppliers[
        supplierIndex
      ] = {
        ...draft.brands[brandIndex].storefronts[storefrontIndex].suppliers[
          supplierIndex
        ],
      };
      draft.brands[brandIndex].storefronts[storefrontIndex].suppliers[
        supplierIndex
      ].channels.push(channelsToUpdate);
      return;
    }
    case newOfferActions.NEW_OFFER_REMOVE_CHANNEL: {
      const channelToRemove = action.payload.value;
      const brandIndex = action.payload.brandIndex;
      const storefrontIndex = action.payload.storefrontIndex;
      const supplierIndex = action.payload.supplierIndex;
      draft.brands[brandIndex].storefronts[storefrontIndex].suppliers[
        supplierIndex
      ] = {
        ...draft.brands[brandIndex].storefronts[storefrontIndex].suppliers[
          supplierIndex
        ],
        channels: draft.brands[brandIndex].storefronts[
          storefrontIndex
        ].suppliers[supplierIndex].channels.filter(
          (channel) => channel.id !== channelToRemove.id
        ),
      };
      return;
    }
    case newOfferActions.NEW_OFFER_UPDATE_STOREFRONT: {
      const storefrontToUpdate = action.payload.value;
      const brandIndex = action.payload.brandIndex;

      const storefrontIndex = action.payload.storefrontIndex;

      if (
        draft.brands[brandIndex].storefronts &&
        draft.brands[brandIndex].storefronts[storefrontIndex]
      ) {
        draft.brands[brandIndex].storefronts[storefrontIndex] = {
          ...storefrontToUpdate,
          suppliers:
            draft.brands[brandIndex].storefronts[storefrontIndex].suppliers,
        };
      } else {
        draft.brands[brandIndex].storefronts.push(storefrontToUpdate);
      }
      return;
    }
    case newOfferActions.NEW_OFFER_ADD_NEW_BRAND:
      const brandInfoToAdd = action.payload;

      draft.brands.push(brandInfoToAdd);
      return;
    case newOfferActions.NEW_OFFER_UPDATE_BRAND:
      const brandInfoToUpdate = action.payload.brandInfo;
      const brandPos = action.payload.brandIndex;
      draft.brands[brandPos] = {
        ...draft.brands[brandPos],
        ...brandInfoToUpdate,
      };
      return;
    case newOfferActions.NEW_OFFER_REMOVE_SUPPLIER: {
      const supplierToRemove = action.payload.value;
      const brandIndex = action.payload.brandIndex;
      const storefrontIndex = action.payload.storefrontIndex;
      draft.brands[brandIndex].storefronts[storefrontIndex].suppliers =
        draft.brands[brandIndex].storefronts[storefrontIndex].suppliers.filter(
          (supplier) => supplier.id !== supplierToRemove.id
        );
      return;
    }
    case newOfferActions.NEW_OFFER_RESET_REDUX_STATE:
      return initialState;
    case newOfferActions.NEW_OFFER_ADD_ROW_STOREFRONT: {
      const brandIndex = action.payload.brandIndex;
      draft.brands[brandIndex].storefronts.push({});
      return;
    }
    // for added deep link settings
    case newOfferActions.NEW_OFFER_DEEPLINK_DESTINATION:
      draft.deepLinkSettingsInfo.destination = action.payload;
      return;
    case newOfferActions.NEW_OFFER_DEEPLINK_LOS:
      draft.deepLinkSettingsInfo.los = action.payload;
      return;
    case newOfferActions.NEW_OFFER_DEEPLINK_CHECK_IN_TYPE:
      draft.deepLinkSettingsInfo.checkInType = action.payload;
      return;
    case newOfferActions.NEW_OFFER_DEEPLINK_ROLLING_DAYS:
      draft.deepLinkSettingsInfo.rollingOffset = action.payload;
      return;
    case newOfferActions.NEW_OFFER_DEEPLINK_CHILD_OCCUPANCY:
      draft.deepLinkSettingsInfo.childOccupancy = action.payload;
      return;
    case newOfferActions.NEW_OFFER_DEEPLINK_ADULT_OCCUPANCY:
      draft.deepLinkSettingsInfo.adultOccupancy = action.payload;
      return;
    case newOfferActions.NEW_OFFER_DEEPLINK_SPECIFIC_HOTEL:
      draft.deepLinkSettingsInfo.specificHotel = action.payload;
      return;
    case newOfferActions.NEW_OFFER_DEEPLINK_INCLUDE_ALL_PROPERTIES:
      draft.deepLinkSettingsInfo.includeAllProperties = action.payload;
      return;
    case newOfferActions.NEW_OFFER_DEEPLINK_CHECK_IN_FIXED_DATE:
      if (action.payload) {
        draft.deepLinkSettingsInfo.fixedDate = moment(action.payload).format(
          "YYYY-MM-DD"
        );
      } else {
        draft.deepLinkSettingsInfo.fixedDate = "";
      }

      return;
    case newOfferActions.NEW_OFFER_BOOKING_DATE_RANGE:
      if (action.payload) {
        draft.bookingDateRange = {
          startDate: moment(action.payload[0]).format("YYYY-MM-DD"),
          endDate: moment(action.payload[1]).format("YYYY-MM-DD"),
        };
      } else {
        draft.bookingDateRange = {
          startDate: "",
          endDate: "",
        };
      }
      return;
    case newOfferActions.NEW_OFFER_TRAVELLING_DATE_RANGE:
      if (action.payload) {
        draft.travellingDateRange = {
          startDate: moment(action.payload[0]).format("YYYY-MM-DD"),
          endDate: moment(action.payload[1]).format("YYYY-MM-DD"),
        };
      } else {
        draft.travellingDateRange = {
          startDate: "",
          endDate: "",
        };
      }
      return;
    case newOfferActions.NEW_OFFER_BOOKING_TIME_ZONE:
      draft.bookingDatesTimezone = action.payload;
      return;
    case newOfferActions.NEW_OFFER_LAST_SEARCH_DISTANCE:
      draft.lastSearchDistance = action.payload;
      return;
    case newOfferActions.NEW_OFFER_SET_OFFER_PROPERTY_TYPE:
      draft.type = action.payload;
      return;
    default:
      return draft;
  }
}, initialState);
