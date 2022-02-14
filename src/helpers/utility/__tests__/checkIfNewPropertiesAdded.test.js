import { propertyCartActions } from "../../../pages/browseSupply/actions";
import { store } from "../../../redux/store";
import { checkIfNewPropertiesAdded } from "../checkIfNewPropertiesAdded";
import { getValue } from "../getValue";

describe("checkIfNewPropertiesAdded function test", () => {

beforeEach(() => {
    window.getValue = getValue;
})
  test("checkIfNewPropertiesAdded properties with saved property present case, no new properties", () => {
    store.dispatch({
      type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
      payload: [
        {
          internalId: 1660,
          propertyCode: 'DEMO_HEERO',
          name: 'HEERO Merriott STAR',
          channel: 'DEMO_OFFERBUILDER',
          supplier: 'ntp',
          city: 'Wien',
          rating: 4,
          ratingProvider: '',
          remainingCapitalPool: 0,
          lcn: false,
          images: [],
          hotelName: 'HEERO Merriott STAR',
          isSavedProperty: true,
          marketingImages: [],
          descriptions: [
            {
              lang: 'EN',
              shortDescription: 'Experience award-winning service',
              description: 'Experience award-winning service and sophisticated style at JW Marriott Hotel Vienna.'
            }
          ]
        }
      ],
    });
    expect(checkIfNewPropertiesAdded()).toBe(false);
  });
  test("checkIfNewPropertiesAdded properties without saved property case, new properties added case", () => {
    store.dispatch({
      type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
      payload: [
        {
          internalId: 1660,
          propertyCode: 'DEMO_HEERO',
          name: 'HEERO Merriott STAR',
          channel: 'DEMO_OFFERBUILDER',
          supplier: 'ntp',
          city: 'Wien',
          rating: 4,
          ratingProvider: '',
          remainingCapitalPool: 0,
          lcn: false,
          images: [],
          hotelName: 'HEERO Merriott STAR',
          marketingImages: [],
          descriptions: [
            {
              lang: 'EN',
              shortDescription: 'Experience award-winning service',
              description: 'Experience award-winning service and sophisticated style at JW Marriott Hotel Vienna.'
            }
          ]
        },
        {
            internalId: 16601,
            propertyCode: 'DEMO_HEERO1',
            name: 'HEERO Merriott STAR1',
            channel: 'DEMO_OFFERBUILDER1',
            supplier: 'ntp1',
            city: 'Wien1',
            rating: 41,
            ratingProvider: '1',
            remainingCapitalPool: 10,
            lcn: false,
            images: [],
            hotelName: 'HEERO Merriott STAR1',
            isSavedProperty: true,
            marketingImages: [],
            descriptions: [
              {
                lang: 'EN',
                shortDescription: 'Experience award-winning service',
                description: 'Experience award-winning service and sophisticated style at JW Marriott Hotel Vienna.'
              }
            ]
          }
      ],
    });
    expect(checkIfNewPropertiesAdded()).toBe(true);
  });

  test("checkIfNewPropertiesAdded check case with empty properties array ", () => {
    store.dispatch({
      type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
      payload: [
      ],
    });
    expect(checkIfNewPropertiesAdded()).toBe(false);
  });

  test("checkIfNewPropertiesAdded check case when properties array is null", () => {
    store.dispatch({
      type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
      payload: null,
    });
    expect(checkIfNewPropertiesAdded()).toBe(false);
  });
});
