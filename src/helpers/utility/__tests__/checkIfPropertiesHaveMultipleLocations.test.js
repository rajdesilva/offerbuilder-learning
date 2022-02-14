import { propertyCartActions } from "../../../pages/browseSupply/actions";
import { newOfferActions } from "../../../pages/offers/actions";
import { store } from "../../../redux/store";
import { checkIfPropertiesHaveMultipleLocations } from "../checkIfPropertiesHaveMultipleLocations";
import { getValue } from "../getValue";

describe("checkIfPropertiesHaveMultipleLocations function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  test("checkIfPropertiesHaveMultipleLocations check if properties with same locations in given distance range", () => {
    store.dispatch({
      type: newOfferActions.NEW_OFFER_DEEPLINK_DESTINATION,
      payload: {
        city: "Wien",
        lat: 18.486303, // warje co-ords
        lng: 73.796585,
      },
    })
    store.dispatch({
      type: newOfferActions.NEW_OFFER_LAST_SEARCH_DISTANCE,
      payload: 10,
    });
    store.dispatch({
      type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
      payload: [
        {
          internalId: 1660,
          propertyCode: "DEMO_HEERO",
          name: "HEERO Merriott STAR",
          city: "Wien",
          latitude: 18.486303, // warje co-ords
          longitude: 73.796585, // warje co-ords
        },
        {
          internalId: 16601,
          propertyCode: "DEMO_HEERO1",
          name: "HEERO Merriott STAR1",
          city: "Wien",
          latitude: 18.489759, // karvenagar co-ords
          longitude: 73.820297, // karvenagar co-ords
        },
      ],
    });
    expect(checkIfPropertiesHaveMultipleLocations()).toBe(false);
  });

  test("checkIfPropertiesHaveMultipleLocations check if properties with locations out of range from distance given", () => {
    store.dispatch({
      type: newOfferActions.NEW_OFFER_LAST_SEARCH_DISTANCE,
      payload: 10,
    });
    store.dispatch({
      type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
      payload: [
        {
          internalId: 1660,
          propertyCode: "DEMO_HEERO",
          name: "HEERO Merriott STAR",
          city: "Wien",
          latitude: 18.516726, // Pune only these values are checked so updated those only for testing
          longitude: 73.856255, // Pune only these values are checked so updated those only for testing
        },
        {
          internalId: 16601,
          propertyCode: "DEMO_HEERO1",
          name: "HEERO Merriott STAR1",
          city: "Wien",
          latitude: 19.07609, // Mumbai only these values are checked so updated those only for testing
          longitude: 72.877426, // Mumbai only these values are checked so updated those only for testing
        },
      ],
    });
    expect(checkIfPropertiesHaveMultipleLocations()).toBe(true);
  });
  
  test("checkIfPropertiesHaveMultipleLocations check if properties with locations in same range from bigger distance area given", () => {
    store.dispatch({
      type: newOfferActions.NEW_OFFER_DEEPLINK_DESTINATION,
      payload: {
        city: "Wien",
        lat: 18.486303, // warje co-ords
        lng: 73.796585,
      },
    })
    store.dispatch({
      type: newOfferActions.NEW_OFFER_LAST_SEARCH_DISTANCE,
      payload: 200,
    });
    store.dispatch({
      type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
      payload: [
        {
          internalId: 1660,
          propertyCode: "DEMO_HEERO",
          name: "HEERO Merriott STAR",
          city: "Wien",
          latitude: 18.516726, // Pune only these values are checked so updated those only for testing
          longitude: 73.856255, // Pune only these values are checked so updated those only for testing
        },
        {
          internalId: 16601,
          propertyCode: "DEMO_HEERO1",
          name: "HEERO Merriott STAR1",
          city: "Wien",
          latitude: 19.07609, // Mumbai only these values are checked so updated those only for testing
          longitude: 72.877426, // Mumbai only these values are checked so updated those only for testing
        },
      ],
    });
    expect(checkIfPropertiesHaveMultipleLocations()).toBe(false);
  });

  test("checkIfPropertiesHaveMultipleLocations check if properties with location details are missing then it considers as a different location", () => {
    store.dispatch({
      type: newOfferActions.NEW_OFFER_LAST_SEARCH_DISTANCE,
      payload: 200,
    });
    store.dispatch({
      type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
      payload: [
        {
          internalId: 1660,
          propertyCode: "DEMO_HEERO",
          name: "HEERO Merriott STAR",
          city: "Pune",
        },
        {
          internalId: 16601,
          propertyCode: "DEMO_HEERO1",
          name: "HEERO Merriott STAR1",
          city: "Wien",
        },
      ],
    });
    expect(checkIfPropertiesHaveMultipleLocations()).toBe(true);
  });

  test("checkIfPropertiesHaveMultipleLocations check case with empty properties array ", () => {
    store.dispatch({
      type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
      payload: [],
    });
    expect(checkIfPropertiesHaveMultipleLocations()).toBe(false);
  });

  test("checkIfPropertiesHaveMultipleLocations check case when properties array is null", () => {
    store.dispatch({
      type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
      payload: null,
    });
    expect(checkIfPropertiesHaveMultipleLocations()).toBe(false);
  });
});
