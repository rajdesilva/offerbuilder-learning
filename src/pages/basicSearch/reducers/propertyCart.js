import produce from "immer";
import { propertyCartActions } from "../actions";

export const propertyCart = produce(
  (draft, action) => {
    switch (action.type) {
      case propertyCartActions.UPDATE_SHORT_DESCRIPTION_FOR_CART_ITEM: {
        const index = action.payload.index;
        const languageId = action.payload.languageId;
        const shortDescription = action.payload.shortDescription;
        let propertyItem = draft.cartItems[index];
        // check if property has descriptions or marketing info in case of edit offfer flow
        // and use descriptions as per it
        // propertyItem.descriptions = propertyItem.descriptions || propertyItem.marketingInfo;
        const descriptionToBeUpdatedIndex = propertyItem.descriptions.findIndex(
          (description) => description.lang === languageId
        );
        if (descriptionToBeUpdatedIndex !== -1) {
          propertyItem.descriptions[descriptionToBeUpdatedIndex] = {
            ...propertyItem.descriptions[descriptionToBeUpdatedIndex],
            shortDescription: shortDescription,
          };
        } else {
          draft.cartItems[index].descriptions.push({
            shortDescription: shortDescription,
            lang: languageId,
          });
        }
        draft.cartItems[index] = propertyItem;
        return;
      }
      case propertyCartActions.UPDATE_DESCRIPTION_FOR_CART_ITEM: {
        const index = action.payload.index;
        const languageId = action.payload.languageId;
        const description = action.payload.description;
        let propertyItem = draft.cartItems[index];
        const descriptionToBeUpdatedIndex = propertyItem.descriptions.findIndex(
          (item) => item.lang === languageId
        );
        if (descriptionToBeUpdatedIndex !== -1) {
          propertyItem.descriptions[descriptionToBeUpdatedIndex] = {
            ...propertyItem.descriptions[descriptionToBeUpdatedIndex],
            description: description,
          };
        } else {
          draft.cartItems[index].descriptions.push({
            description: description,
            lang: languageId,
          });
        }
        draft.cartItems[index] = propertyItem;
        return;
      }
      case propertyCartActions.UPDATE_IMAGES_FOR_CART_ITEM: {
        const index = action.payload.index;
        draft.cartItems[index] = {
          ...draft.cartItems[index],
          marketingImages: action.payload.images,
        };
        return;
      }
      case propertyCartActions.UPDATE_ENTIRE_CART_LIST:
        draft.cartItems = action.payload || [];
        return;
      case propertyCartActions.DISCARD_CHANGES_IN_EDITED_CART_LIST:
        const propertyList = draft.cartItems;
        draft.cartItems = propertyList.filter(
          (property) => property.isSavedProperty === true
        );
        return;
      case propertyCartActions.ADD_PROPERTY_TO_CART:
        let cartItem = {
          ...action.payload,
          marketingImages: window.getValue(action, "payload.images")
            ? action.payload.images.slice(0, 1)
            : [],
        };
        delete cartItem.alternativeProperties;
        draft.cartItems.push(cartItem);
        return;
      case propertyCartActions.DELETE_CART_ITEM:
        const removedProperty = action.payload;
        draft.cartItems = draft.cartItems.filter(
          (property) =>
            !(
              property.propertyCode === removedProperty.propertyCode &&
              property.supplier === removedProperty.supplier &&
              property.channel === removedProperty.channel
            )
        );
        return;
      case propertyCartActions.EMPTY_CART:
        draft.cartItems = [];
        draft.cartChangeStatus = false;
        return;
      case propertyCartActions.UPDATE_CART_CHANGE_STATUS:
        draft.cartChangeStatus = action.payload;
        return;
      default:
        return draft;
    }
  },
  {
    cartItems: [],
    cartChangeStatus: false,
  }
);
