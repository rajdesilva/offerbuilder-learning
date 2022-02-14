import React from "react";
import { createStore } from "redux";
import { render } from "../../../../helpers/testUtils";
import * as Util from "../../../../helpers/utility/checkIfUserHasRole";
import { MemoryRouter } from "react-router-dom";
import ActiveOffers from "../ActiveOffers";
import { cloneDeep } from "lodash";

window.fetchWrapper = window.fetchWrapper = jest.fn().mockResolvedValue({
  success: true,
});
const activeOffersStore = {
  offerlistsearchandfilters: {
    selectedTab: "active",
    loading: false,
    offers: [
      {
        id: "16118406",
        internalName: "Cypress Offer - Edit",
        status: "UNPUBLISHED",
        currencyCode: "EUR",
        images: [],
        languages: ["EN"],
        deepLinkSettingsInfo: {
          latitude: 48.2081743,
          longitude: 16.3738189,
          includeAllProperties: true,
          adultOccupancy: 1,
          childOccupancy: 0,
          los: 1,
          rollingOffset: 0,
          checkinDate: "2021-01-28",
          checkoutDate: "2021-01-29",
        },
        marketingInfo: [
          {
            title: "JWM Start Hotels",
            lang: "EN",
            shortDescription: "Experience award-winning service",
            description:
              "Experience award-winning service and sophisticated style at JW Marriott Hotel Vienna.",
            termsAndConditions: "Standard terms and conditions",
          },
        ],
        properties: [
          {
            internalId: 1199,
            propertyCode: "DEMO_BANJARE",
            name: "BANJARE & BANJARE STAR HOTEL",
            channel: "DEMO_OFFERBUILDER",
            supplier: "ntp",
            city: "Vienna",
            rating: 4,
            ratingProvider: "",
            remainingCapitalPool: 0,
            lcn: false,
            images: [],
            marketingInfo: [
              {
                lang: "EN",
                shortDescription: "Experience award-winning service",
                description:
                  "Experience award-winning service and sophisticated style at JW Marriott Hotel Vienna.",
              },
            ],
          },
        ],
        targets: [
          {
            id: "idb",
            name: "Internal Demo Brand",
            storefronts: [
              {
                id: "ids2",
                name: "Best Travel",
                suppliers: [
                  {
                    id: "ntp",
                    name: "NTP",
                    channels: [
                      {
                        id: "DEMO_OFFERBUILDER",
                        name: "DEMO_OFFERBUILDER",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        createdAt: "2021-01-28T13:30:33.188+0000",
        updatedAt: "2021-01-28T14:01:21.818+0000",
        lcn: false,
        bookingStartDate: null,
        bookingEndDate: null,
        bookingZoneId: null,
        travelStartDate: null,
        travelEndDate: null,
      },
    ],
    pageOffset: 0,
    pageSize: 10,
    totalOffers: 1,
  },
};
describe("ActiveOffers component test", () => {
  test("create ActiveOffers components snapshot", () => {
    const store = createStore(() => ({ ...activeOffersStore }));
    store.dispatch = jest.fn();
    const { container } = render(
      <MemoryRouter>
        <ActiveOffers />
      </MemoryRouter>,
      {
        store,
      }
    );

    expect(container.firstChild).toMatchSnapshot();
  });
  test("ActiveOffers components- click on 3 dots menu offer button", async () => {
    const store = createStore(() => ({ ...activeOffersStore }));
    store.dispatch = jest.fn();
    const checkUserPermission = jest.spyOn(Util, "checkIfUserHasRole");

    checkUserPermission.mockReturnValue(false); // if user is not viewer
    const { getByTestId } = render(
      <MemoryRouter>
        <ActiveOffers />
      </MemoryRouter>,
      {
        store,
      }
    );
    // first item from offers list
    const menuBtn = getByTestId("16118406-active-offer-item-menu-btn");
    expect(menuBtn).toBeInTheDocument();
  });

  test("ActiveOffers components- menu offer button is not present when user has only viewing role", async () => {
    const store = createStore(() => ({ ...activeOffersStore }));
    store.dispatch = jest.fn();
    const checkUserPermission = jest.spyOn(Util, "checkIfUserHasRole");

    checkUserPermission.mockReturnValue(true); // if user is viewer
    const { queryByTestId } = render(
      <MemoryRouter>
        <ActiveOffers />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(
      queryByTestId("16118406-active-offer-item-menu-btn")
    ).not.toBeInTheDocument();
  });

  test("ActiveOffers components- if image is present for offer then it is displayed with url given", async () => {
    const tempStore = cloneDeep(activeOffersStore);
    tempStore.offerlistsearchandfilters.offers[0].images = [
      {
        id: "user_1616585539025.png",
        url: "https://res.cloudinary.com/seekda-dev/image/upload/v1616585540/offer_builder_dev/user_1616585539025.jpg",
      },
      {
        id: "user_1616577125384.png",
        url: "https://res.cloudinary.com/seekda-dev/image/upload/v1616577125/offer_builder_dev/user_1616577125384.jpg",
      },
      {
        id: "user_1616585486465.png",
        url: "https://res.cloudinary.com/seekda-dev/image/upload/v1616585487/offer_builder_dev/user_1616585486465.jpg",
      },
    ];
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const checkUserPermission = jest.spyOn(Util, "checkIfUserHasRole");

    checkUserPermission.mockReturnValue(true); // if user is viewer
    const { getByTestId } = render(
      <MemoryRouter>
        <ActiveOffers />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(getByTestId("16118406-active-image")).toBeInTheDocument();
  });
});
