import React from "react";
import { createStore } from "redux";
import { render, cleanup } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import ChangeOfferStatusModal from "../ChangeOfferStatusModal";

import { tempStore } from "./tempStore";

import { appConstants } from "../../../../common";

window.fetchWrapper = window.fetchWrapper = jest.fn().mockResolvedValue({
  success: true,
});

afterEach(cleanup);

describe("ChangeOfferStatusModal component test", () => {
  test("create ChangeOfferStatusModal components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const { container } = render(
      <MemoryRouter>
        <ChangeOfferStatusModal
          offerInfo={{
            bookingDateRange: {
              startDate: "2021-02-02",
              endDate: "2021-02-06",
            },
            bookingDatesTimezone: { value: "Europe/Amsterdam" },
            brandName: "Client Demo Brand",
            createdDate: "02.02.2021",
            currency: "EUR",
            deepLinkSettingsInfo: {
              destination: {
                lat: 48.2081743,
                lng: 16.3738189,
                city: "Pune",
              },
              adultOccupancy: 1,
              childOccupancy: 0,
              checkInType: "rolling",
              includeAllProperties: true,
            },
            displayBookingDateRange: {
              startDate: "02.02.2021",
              endDate: "06.02.2021",
            },
            displayTravellingDateRange: {
              startDate: "02.02.2021",
              endDate: "06.02.2021",
            },
            images: [],
            key: "02Feb2021_1833",
            languages: ["EN"],
            lcn: false,
            name: "PKM Sacher Offer",
            offerId: "02Feb2021_1833",
            status: { id: "PUBLISHED", name: "PUBLISHED" },
            storefrontName: "PC Travel",
            travellingDateRange: {
              startDate: "2021-02-02",
              endDate: "2021-02-06",
            },
            id: "16118406",
            internalName: "Cypress Offer - Edit",
            currencyCode: "EUR",
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
            brands: [
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
            bookingStartDate: null,
            bookingEndDate: null,
            bookingZoneId: null,
            travelStartDate: null,
            travelEndDate: null,
          }}
          actionType={appConstants.OFFER_STATUS_ACTION.PUBLISH}
          hideModal={() => {}}
        />
      </MemoryRouter>,
      {
        store,
      }
    );

    expect(container.firstChild).toMatchSnapshot();
  });
  test("ChangeOfferStatusModal components- Change offer status to PUBLISH ", () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const hideModal = (value) => jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <ChangeOfferStatusModal
          offerInfo={{
            bookingDateRange: {
              startDate: "2021-02-02",
              endDate: "2021-02-06",
            },
            bookingDatesTimezone: { value: "Europe/Amsterdam" },
            brandName: "Client Demo Brand",
            createdDate: "02.02.2021",
            currency: "EUR",
            deepLinkSettingsInfo: {
              destination: {
                lat: 48.2081743,
                lng: 16.3738189,
                city: "Pune",
              },
              adultOccupancy: 1,
              childOccupancy: 0,
              checkInType: "rolling",
              includeAllProperties: true,
            },
            displayBookingDateRange: {
              startDate: "02.02.2021",
              endDate: "06.02.2021",
            },
            displayTravellingDateRange: {
              startDate: "02.02.2021",
              endDate: "06.02.2021",
            },
            images: [],
            key: "02Feb2021_1833",
            languages: ["EN"],
            lcn: false,
            name: "PKM Sacher Offer",
            offerId: "02Feb2021_1833",
            status: { id: "UNPUBLISHED", name: "UNPUBLISHED" },
            storefrontName: "PC Travel",
            travellingDateRange: {
              startDate: "2021-02-02",
              endDate: "2021-02-06",
            },
            id: "16118406",
            internalName: "Cypress Offer - Edit",
            currencyCode: "EUR",
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
            brands: [
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
            bookingStartDate: null,
            bookingEndDate: null,
            bookingZoneId: null,
            travelStartDate: null,
            travelEndDate: null,
          }}
          actionType={appConstants.OFFER_STATUS_ACTION.PUBLISH}
          hideModal={hideModal}
        />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(getByText("Do You Want To Publish This Offer?")).toBeInTheDocument();
    expect(
      getByText(
        "Depending on where offer is to show, it may not show. To show, action may be needed where to show. Do you wish to proceed?"
      )
    ).toBeInTheDocument();
  });
  test("ChangeOfferStatusModal components- Change offer status to UNPUBLISH ", () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const hideModal = (value) => jest.fn();
    const { getByText, queryByTestId } = render(
      <MemoryRouter>
        <ChangeOfferStatusModal
          offerInfo={{
            bookingDateRange: {
              startDate: "2021-02-02",
              endDate: "2021-02-06",
            },
            bookingDatesTimezone: { value: "Europe/Amsterdam" },
            brandName: "Client Demo Brand",
            createdDate: "02.02.2021",
            currency: "EUR",
            deepLinkSettingsInfo: {
              destination: {
                lat: 48.2081743,
                lng: 16.3738189,
                city: "Pune",
              },
              adultOccupancy: 1,
              childOccupancy: 0,
              checkInType: "rolling",
              includeAllProperties: true,
            },
            displayBookingDateRange: {
              startDate: "02.02.2021",
              endDate: "06.02.2021",
            },
            displayTravellingDateRange: {
              startDate: "02.02.2021",
              endDate: "06.02.2021",
            },
            images: [],
            key: "02Feb2021_1833",
            languages: ["EN"],
            lcn: false,
            name: "PKM Sacher Offer",
            offerId: "02Feb2021_1833",
            status: { id: "PUBLISHED", name: "PUBLISHED" },
            storefrontName: "PC Travel",
            travellingDateRange: {
              startDate: "2021-02-02",
              endDate: "2021-02-06",
            },
            id: "16118406",
            internalName: "Cypress Offer - Edit",
            currencyCode: "EUR",
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
            brands: [
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
            bookingStartDate: null,
            bookingEndDate: null,
            bookingZoneId: null,
            travelStartDate: null,
            travelEndDate: null,
          }}
          actionType={appConstants.OFFER_STATUS_ACTION.UNPUBLISH}
          hideModal={hideModal}
        />
      </MemoryRouter>,
      {
        store,
      }
    );

    expect(
      getByText("Do You Want To UnPublish This Offer?")
    ).toBeInTheDocument();
    expect(
      queryByTestId("unpublish-archive-offer-change-str")
    ).not.toBeInTheDocument();
    expect(queryByTestId("unpublish-offer-change-str")).toBeInTheDocument();
    expect(queryByTestId("publish-offer-change-str")).not.toBeInTheDocument();
    expect(
      queryByTestId("archive-unpublish-offer-change-str")
    ).not.toBeInTheDocument();
  });
  test("ChangeOfferStatusModal components- Change offer status to ARCHIVE ", () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const hideModal = (value) => jest.fn();
    const { getByText, queryByTestId } = render(
      <MemoryRouter>
        <ChangeOfferStatusModal
          offerInfo={{
            bookingDateRange: {
              startDate: "2021-02-02",
              endDate: "2021-02-06",
            },
            bookingDatesTimezone: { value: "Europe/Amsterdam" },
            brandName: "Client Demo Brand",
            createdDate: "02.02.2021",
            currency: "EUR",
            deepLinkSettingsInfo: {
              destination: {
                lat: 48.2081743,
                lng: 16.3738189,
                city: "Pune",
              },
              adultOccupancy: 1,
              childOccupancy: 0,
              checkInType: "rolling",
              includeAllProperties: true,
            },
            displayBookingDateRange: {
              startDate: "02.02.2021",
              endDate: "06.02.2021",
            },
            displayTravellingDateRange: {
              startDate: "02.02.2021",
              endDate: "06.02.2021",
            },
            images: [],
            key: "02Feb2021_1833",
            languages: ["EN"],
            lcn: false,
            name: "PKM Sacher Offer",
            offerId: "02Feb2021_1833",
            status: { id: "PUBLISHED", name: "PUBLISHED" },
            storefrontName: "PC Travel",
            travellingDateRange: {
              startDate: "2021-02-02",
              endDate: "2021-02-06",
            },
            id: "16118406",
            internalName: "Cypress Offer - Edit",
            currencyCode: "EUR",
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
            brands: [
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
            bookingStartDate: null,
            bookingEndDate: null,
            bookingZoneId: null,
            travelStartDate: null,
            travelEndDate: null,
          }}
          actionType={appConstants.OFFER_STATUS_ACTION.ARCHIVE}
          hideModal={hideModal}
        />
      </MemoryRouter>,
      {
        store,
      }
    );

    expect(getByText("Do You Want To Archive This Offer?")).toBeInTheDocument();
    expect(
      queryByTestId("unpublish-archive-offer-change-str")
    ).not.toBeInTheDocument();
    expect(queryByTestId("unpublish-offer-change-str")).not.toBeInTheDocument();
    expect(queryByTestId("publish-offer-change-str")).not.toBeInTheDocument();
    expect(
      queryByTestId("archive-unpublish-offer-change-str")
    ).not.toBeInTheDocument();
  });
  test("ChangeOfferStatusModal components- Change offer status to UNPUBLISH WHEN ARCHIVE OFFER", () => {
    const store = createStore(() => ({ ...tempStore }));
    store.dispatch = jest.fn();
    const hideModal = (value) => jest.fn();
    const { getByText, queryByTestId } = render(
      <MemoryRouter>
        <ChangeOfferStatusModal
          offerInfo={{
            bookingDateRange: {
              startDate: "2021-02-02",
              endDate: "2021-02-06",
            },
            bookingDatesTimezone: { value: "Europe/Amsterdam" },
            brandName: "Client Demo Brand",
            createdDate: "02.02.2021",
            currency: "EUR",
            deepLinkSettingsInfo: {
              destination: {
                lat: 48.2081743,
                lng: 16.3738189,
                city: "Pune",
              },
              adultOccupancy: 1,
              childOccupancy: 0,
              checkInType: "rolling",
              includeAllProperties: true,
            },
            displayBookingDateRange: {
              startDate: "02.02.2021",
              endDate: "06.02.2021",
            },
            displayTravellingDateRange: {
              startDate: "02.02.2021",
              endDate: "06.02.2021",
            },
            images: [],
            key: "02Feb2021_1833",
            languages: ["EN"],
            lcn: false,
            name: "PKM Sacher Offer",
            offerId: "02Feb2021_1833",
            status: { id: "UNPUBLISHED", name: "UNPUBLISHED" },
            storefrontName: "PC Travel",
            travellingDateRange: {
              startDate: "2021-02-02",
              endDate: "2021-02-06",
            },
            id: "16118406",
            internalName: "Cypress Offer - Edit",
            currencyCode: "EUR",
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
            brands: [
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
            bookingStartDate: null,
            bookingEndDate: null,
            bookingZoneId: null,
            travelStartDate: null,
            travelEndDate: null,
          }}
          actionType={appConstants.OFFER_STATUS_ACTION.ARCHIVE}
          hideModal={hideModal}
        />
      </MemoryRouter>,
      {
        store,
      }
    );

    expect(getByText("Do You Want To Archive This Offer?")).toBeInTheDocument();
    expect(
      queryByTestId("unpublish-archive-offer-change-str")
    ).toBeInTheDocument();
    expect(queryByTestId("unpublish-offer-change-str")).not.toBeInTheDocument();
    expect(queryByTestId("publish-offer-change-str")).not.toBeInTheDocument();
    expect(
      queryByTestId("archive-unpublish-offer-change-str")
    ).not.toBeInTheDocument();
  });
});
