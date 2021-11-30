export const ReduxForOnlySupplier = {
  searchparams: {
    destination: {},
    los: 1,
    onlySupplier: true,
    target: {
      suppliers: [
        {
          id: "ntp",
          name: "NTP",
        },
      ],
      channels: [
        {
          id: "AT_CORDIAL",
          name: "",
        },
      ],
    },
    dateRange: {
      startDate: "2020-09-18",
      endDate: "2020-11-24",
    },

    lcn: false,
    remainingCapitalPool: "",
  },
  channelinfo: {
    loading: false,
    channels: [
      {
        id: "AT_CORDIAL",
        name: "",
        type: "Portal",
        status: "HIDDEN",
      },
      {
        id: "india_channel",
        name: "indian channel",
        type: "Portal",
        status: "HIDDEN",
      },
    ],
  },
};
