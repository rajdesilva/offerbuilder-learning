import moment from "moment";
import { appConstants } from "../../common";
import { getValue } from "./getValue";

window.getValue = getValue;

export const getInitializedState = (decodedQueryObj) => {
  try {
    return {
      destination: {
        lat: window.getValue(decodedQueryObj, "latitude"),
        lng: window.getValue(decodedQueryObj, "longitude"),
        city: window.getValue(decodedQueryObj, "city"),
      },
      distance: window.getValue(decodedQueryObj, "distance") || 10,
      los: window.getValue(decodedQueryObj, "los") || 1,
      hotelName: window.getValue(decodedQueryObj, "hotelName"),
      onlySupplier: window.getValue(decodedQueryObj, "onlySupplier")
        ? decodedQueryObj.onlySupplier === false
          ? decodedQueryObj.onlySupplier
          : true
        : false,

      target: {
        suppliers:
          window.getValue(decodedQueryObj, "onlySupplier") &&
          window.getValue(decodedQueryObj, "suppliers")
            ? decodedQueryObj.suppliers
            : [],
        channels:
          window.getValue(decodedQueryObj, "onlySupplier") &&
          window.getValue(decodedQueryObj, "suppliers") &&
          window.getValue(decodedQueryObj, "suppliers[0].channels")
            ? decodedQueryObj.suppliers[0].channels
            : [],
      },
      brands: !window.getValue(decodedQueryObj, "onlySupplier")
        ? window.getValue(decodedQueryObj, "brands")
          ? decodedQueryObj.brands
          : process.env.REACT_APP_HIDE_CLIENT_AND_STORE
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
          : []
        : process.env.REACT_APP_HIDE_CLIENT_AND_STORE
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
      pageSize: window.getValue(decodedQueryObj, "pageSize")
        ? decodedQueryObj.pageSize
        : 10,
      pageOffset: window.getValue(decodedQueryObj, "pageOffset")
        ? decodedQueryObj.pageOffset
        : 0,
      dateRange: {
        startDate:
          window.getValue(decodedQueryObj, "startDate") ||
          moment().format("YYYY-MM-DD"),
        endDate:
          window.getValue(decodedQueryObj, "endDate") ||
          moment().add(60, "d").format("YYYY-MM-DD"),
      },
      currencyCode: window.getValue(decodedQueryObj, "currencyCode") || "EUR",
      lcn: window.getValue(decodedQueryObj, "lcn"),
      sortBy: {
        sortOrder:
          window.getValue(decodedQueryObj, "sortOrder") ||
          appConstants.SORT_PROPERTY.NAME_ASCENDING_VALUE.sortOrder,
        sortCriteria:
          window.getValue(decodedQueryObj, "sortCriteria") ||
          appConstants.SORT_PROPERTY.NAME_ASCENDING_VALUE.sortCriteria,
      },
      remainingCapitalPool: window.getValue(
        decodedQueryObj,
        "remainingCapitalPool"
      )
        ? parseInt(decodedQueryObj.remainingCapitalPool)
        : "",
    };
  } catch (error) {
    console.error(error.toString());
    return null;
  }
};
