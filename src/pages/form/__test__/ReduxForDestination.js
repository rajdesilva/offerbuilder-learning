export const reduxStore = {
  supplysearchParams: {
    destination: {},
    los: 1,
    onlySupplier: true,
    target: {
      suppliers: [],
      channels: [],
    },
    dateRange: {
      startDate: "2020-09-18",
      endDate: "2020-11-24",
    },

    lcn: false,
    remainingCapitalPool: "",
  },
  channels: {
    // loading: false,
    channels: [
      {
        id: "AT_CORDIAL",
        name: null,
        type: "Portal",
        status: "HIDDEN",
      },
      {
        id: "AT_KINDERHOTELS",
        name: "Ihr Bett im Allgäu",
        type: "Portal",
        status: "HIDDEN",
      },
    ],
  },
};
