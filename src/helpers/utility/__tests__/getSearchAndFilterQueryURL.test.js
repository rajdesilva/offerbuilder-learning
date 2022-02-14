import { getSearchAndFilterQueryURL } from "../getSearchAndFilterQueryURL";
import {
  offerListSearchAndFilterActions,
} from "../../../pages/offers/actions";
import { store } from "../../../redux/store";
import { propertyCartActions } from "../../../pages/browseSupply/actions";
import { cleanup } from "@testing-library/react-hooks";
import { getValue } from "../getValue";
import { history } from "../../history";

afterEach(cleanup);

describe("getSearchAndFilterQueryURL function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  test("getSearchAndFilterQueryURL case when loading results with default data for active tab", () => {
    store.dispatch({
      type: offerListSearchAndFilterActions.SET_OFFER_FILTER_DATA,
      payload: {
        selectedTab: "active",
        loading: false,
        offers: [],
        pageOffset: 0,
        pageSize: 10,
        totalOffers: 0,
        targetfilterdata: {
          brands: [],
          storefronts: [],
          suppliers: [],
          channels: [],
        },
        appliedFilters: {
          brands: [],
          storefronts: [],
          suppliers: [],
          channels: [],
          status: [
            {
              id: "UNPUBLISHED",
              name: "UNPUBLISHED",
            },
            {
              id: "PUBLISHED",
              name: "PUBLISHED",
            },
          ],
          searchInputText: "",
        },
      },
    });

    const offerType = "active";

    expect(getSearchAndFilterQueryURL(offerType)).toStrictEqual(
      "?lcn=false&searchInputText=&pageOffset=0&pageSize=10&type=&status%5B0%5D=UNPUBLISHED&status%5B1%5D=PUBLISHED"
    );
    expect(history.location.pathname ).toBe("/");
  });

  test("getSearchAndFilterQueryURL case when loading results with default data for archive tab", () => {
    store.dispatch({
      type: offerListSearchAndFilterActions.SET_OFFER_FILTER_DATA,
      payload: {
        selectedTab: "archive",
        loading: true,
        offers: [],
        pageOffset: 0,
        pageSize: 10,
        totalOffers: 537,
        targetfilterdata: {
          brands: [
            { id: "idb", name: "Internal Demo Brand" },
            { id: "cdb", name: "Client Demo Brand" },
          ],
          storefronts: [
            { id: "ids", name: "Internal Demo Storefront" },
            { id: "ids2", name: "Best Travel" },
            { id: "ids3", name: "PC Travel" },
            { id: "cds", name: "Client Demo Storefront" },
          ],
          suppliers: [{ id: "ntp", name: "NTP" }],
          channels: [
            { id: "DEMO_OFFERBUILDER", name: "DEMO_OFFERBUILDER" },
            { id: "DEMO_INDIA_CH", name: "DEMO_INDIA_CH" },
            { id: "NEMO_CH_01", name: "NEMO_CH_01" },
            { id: "NEMO_CH_02", name: "NEMO_CH_02" },
            { id: "NEMO_CH_03", name: "NEMO_CH_03" },
            { id: "NEMO_CH_04", name: "NEMO_CH_04" },
            { id: "NEMO_CH_05", name: "NEMO_CH_05" },
            { id: "NEMO_CH_06", name: "NEMO_CH_06" },
          ],
        },
        appliedFilters: {
          brands: [],
          storefronts: [],
          suppliers: [],
          channels: [],
          status: [
            { id: "UNPUBLISHED", name: "UNPUBLISHED" },
            { id: "PUBLISHED", name: "PUBLISHED" },
          ],
          searchInputText: "",
        },
      },
    });

    const offerType = "archive";

    expect(getSearchAndFilterQueryURL(offerType)).toStrictEqual(
      "?lcn=false&searchInputText=&pageOffset=0&pageSize=10&type=&status%5B0%5D=ARCHIVED"
    );
    expect(history.location.pathname).toBe("/");
  });

  test("getSearchAndFilterQueryURL case when redux data is empty/null", () => {
    store.dispatch({
      type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
      payload: [],
    });
    const offerType = "active";
    expect(getSearchAndFilterQueryURL(offerType)).toStrictEqual(
      "?lcn=false&searchInputText=&pageOffset=0&pageSize=10&type=&status%5B0%5D=UNPUBLISHED&status%5B1%5D=PUBLISHED"
    );
    expect(history.location.pathname).toBe("/");
  });
});
