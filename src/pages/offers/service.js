import { baseURL } from "../../helpers";
import {
  getParsedOffers,
  getSearchAndFilterImagesQueryUrl,
  getSearchAndFilterQueryURL,
  updateReduxWithOfferData,
} from "../../helpers/utility";
import { store } from "../../redux/store";
import {
  marketingActions,
  newOfferActions,
  offerListSearchAndFilterActions,
} from "./actions";
import { offerImageSearchAndFilterActions } from "./actions/offerImageSearchAndFilterActions";

export const validateOfferId = (offerId) => {
  return window
    .fetchWrapper(`${baseURL.API_URL_BASE}offers/${offerId}/exist`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.toString();
    });
};

export const getCloudinarySignature = () => {
  return window
    .fetchWrapper(`${baseURL.API_URL_BASE}cloudinary/signature`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.toString();
    });
};

export const getCityFromLatLong = (latLong) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLong.lat},${latLong.lng}&sensor=true&key=AIzaSyDydZJ7RZF1SAXwg4pZqnFFskYL8CW5RqA`;
  return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getLanguages = () => {
  store.dispatch({
    type: marketingActions.FETCH_LANGUAGE_LOADING,
    payload: true,
  });
  window
    .fetchWrapper(`${baseURL.API_URL_BASE}languages`)
    .then((response) => {
      if (response.success) {
        store.dispatch({
          type: marketingActions.FETCH_LANGUAGE_SUCCESS,
          payload: window.getValue(response, "data.languages"),
        });
      } else {
        store.dispatch({
          type: marketingActions.FETCH_LANGUAGE_FAILURE,
          payload: [],
        });
      }
    })
    .catch((error) => {
      store.dispatch({
        type: marketingActions.FETCH_LANGUAGE_FAILURE,
        payload: [],
      });
      return [];
    });
};

export const createNewOffer = (newOfferInfo) => {
  const url = `${baseURL.API_URL_BASE}offers`;
  store.dispatch({
    type: newOfferActions.CREATE_NEW_OFFER_LOADING,
    payload: true,
  });
  return window
    .fetchWrapper(url, {
      method: "POST",
      body: JSON.stringify(newOfferInfo),
    })
    .then((response) => response)
    .catch((error) => {
      return error;
    });
};

export const saveEditedOffer = (updatedOfferInfo) => {
  const url = `${baseURL.API_URL_BASE}offers/${updatedOfferInfo.id}`;
  return window
    .fetchWrapper(url, {
      method: "PATCH",
      body: JSON.stringify(updatedOfferInfo),
    })
    .then((response) => response)
    .catch((error) => {
      return error;
    });
};

export const getOfferDetails = (offerId) => {
  store.dispatch({
    type: offerListSearchAndFilterActions.OFFER_DETAILS_LOADING,
  });
  window
    .fetchWrapper(`${baseURL.API_URL_BASE}offers/${offerId}`)
    .then((response) => {
      if (response.success) {
        let offerData = window.getValue(response, "data.offer");
        offerData = getParsedOffers(offerData);
        updateReduxWithOfferData(offerData);
        store.dispatch({
          type: offerListSearchAndFilterActions.OFFER_DETAILS_SUCCESS,
        });
      } else {
        store.dispatch({
          type: offerListSearchAndFilterActions.OFFER_DETAILS_FAILURE,
        });
      }
    })
    .catch((error) => {
      console.log(error.toString());
      store.dispatch({
        type: offerListSearchAndFilterActions.OFFER_DETAILS_FAILURE,
      });
    });
};

export const deleteOffer = (offerId) => {
  return window
    .fetchWrapper(`${baseURL.API_URL_BASE}offers/${offerId}`, {
      method: "DELETE",
    })
    .then((response) => response);
};

export const updateOffer = (offerId, status) => {
  return window
    .fetchWrapper(`${baseURL.API_URL_BASE}offers/${offerId}/${status}`, {
      method: "PUT",
    })
    .then((response) => response);
};

export const searchAndFilterOffer = (offerType) => {
  store.dispatch({
    type: offerListSearchAndFilterActions.OFFER_LIST_LOADING,
    payload: true,
  });
  window
    .fetchWrapper(
      `${baseURL.API_URL_BASE}offers/search/` +
        getSearchAndFilterQueryURL(offerType)
    )
    .then((response) => {
      if (response.success) {
        store.dispatch({
          type: offerListSearchAndFilterActions.OFFER_LIST_SUCCESS,
          payload: window.getValue(response, "data"),
        });
      } else {
        store.dispatch({
          type: offerListSearchAndFilterActions.OFFER_LIST_FAILURE,
          payload: [],
        });
      }
    })
    .catch((error) => {
      console.error("error =", error.toString());
      store.dispatch({
        type: offerListSearchAndFilterActions.OFFER_LIST_FAILURE,
        payload: [],
      });
    });
};

export const getImagesFromProperties = (propertyCode) => {
  return window
    .fetchWrapper(`${baseURL.API_URL_BASE}search?propertyCode=${propertyCode}`)
    .then((response) => response);
};

export const searchAndFilterImages = () => {
  store.dispatch({
    type: offerImageSearchAndFilterActions.OFFER_IMAGE_LOADING,
    payload: true,
  });
  window
    .fetchWrapper(
      `${baseURL.API_URL_BASE}images/search` +
        getSearchAndFilterImagesQueryUrl()
    )
    .then((response) => {
      if (response.success) {
        store.dispatch({
          type: offerImageSearchAndFilterActions.OFFER_IMAGE_SUCCESS,
          payload: window.getValue(response, "data"),
        });
      } else {
        store.dispatch({
          type: offerImageSearchAndFilterActions.OFFER_IMAGE_FAILURE,
          payload: [],
        });
      }
    })
    .catch((error) => {
      console.error("error =", error.toString());
      store.dispatch({
        type: offerImageSearchAndFilterActions.OFFER_IMAGE_FAILURE,
        payload: [],
      });
    });
};

export const uploadImage = (file) => {
  let myHeaders = new Headers();

  myHeaders.append("Accept", "application/json");
  let formdata = new FormData();
  formdata.append("file", file);
  return window
    .fetchWrapper(`${baseURL.API_URL_BASE}images/upload`, {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    })
    .then((response) => response);
};
