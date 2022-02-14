import { getFilterData } from "../getFilterData";

describe("getFilterData function test", () => {
  test("getFilterData get filter data from brands provided", () => {
    const brands = [
      {
        id: "idb",
        name: "Internal Demo Brand",
        storefronts: [
          {
            id: "ids",
            name: "Internal Demo Storefront",
            suppliers: [
              {
                id: "ntp",
                name: "NTP",
                channels: [
                  {
                    id: "DEMO_OFFERBUILDER",
                    name: "DEMO_OFFERBUILDER",
                  },
                  {
                    id: "DEMO_INDIA_CH",
                    name: "DEMO_INDIA_CH",
                  },
                  {
                    id: "NEMO_CH_01",
                    name: "NEMO_CH_01",
                  },
                  {
                    id: "NEMO_CH_02",
                    name: "NEMO_CH_02",
                  },
                  {
                    id: "NEMO_CH_03",
                    name: "NEMO_CH_03",
                  },
                  {
                    id: "NEMO_CH_04",
                    name: "NEMO_CH_04",
                  },
                  {
                    id: "NEMO_CH_05",
                    name: "NEMO_CH_05",
                  },
                  {
                    id: "NEMO_CH_06",
                    name: "NEMO_CH_06",
                  },
                ],
              },
            ],
          },
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
                  {
                    id: "DEMO_INDIA_CH",
                    name: "DEMO_INDIA_CH",
                  },
                  {
                    id: "NEMO_CH_01",
                    name: "NEMO_CH_01",
                  },
                  {
                    id: "NEMO_CH_02",
                    name: "NEMO_CH_02",
                  },
                  {
                    id: "NEMO_CH_03",
                    name: "NEMO_CH_03",
                  },
                  {
                    id: "NEMO_CH_04",
                    name: "NEMO_CH_04",
                  },
                  {
                    id: "NEMO_CH_05",
                    name: "NEMO_CH_05",
                  },
                  {
                    id: "NEMO_CH_06",
                    name: "NEMO_CH_06",
                  },
                ],
              },
            ],
          },
          {
            id: "ids3",
            name: "PC Travel",
            suppliers: [
              {
                id: "ntp",
                name: "NTP",
                channels: [
                  {
                    id: "DEMO_OFFERBUILDER",
                    name: "DEMO_OFFERBUILDER",
                  },
                  {
                    id: "DEMO_INDIA_CH",
                    name: "DEMO_INDIA_CH",
                  },
                  {
                    id: "NEMO_CH_01",
                    name: "NEMO_CH_01",
                  },
                  {
                    id: "NEMO_CH_02",
                    name: "NEMO_CH_02",
                  },
                  {
                    id: "NEMO_CH_03",
                    name: "NEMO_CH_03",
                  },
                  {
                    id: "NEMO_CH_04",
                    name: "NEMO_CH_04",
                  },
                  {
                    id: "NEMO_CH_05",
                    name: "NEMO_CH_05",
                  },
                  {
                    id: "NEMO_CH_06",
                    name: "NEMO_CH_06",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "cdb",
        name: "Client Demo Brand",
        storefronts: [
          {
            id: "cds",
            name: "Client Demo Storefront",
            suppliers: [
              {
                id: "ntp",
                name: "NTP",
                channels: [
                  {
                    id: "DEMO_OFFERBUILDER",
                    name: "DEMO_OFFERBUILDER",
                  },
                  {
                    id: "DEMO_INDIA_CH",
                    name: "DEMO_INDIA_CH",
                  },
                  {
                    id: "NEMO_CH_01",
                    name: "NEMO_CH_01",
                  },
                  {
                    id: "NEMO_CH_02",
                    name: "NEMO_CH_02",
                  },
                  {
                    id: "NEMO_CH_03",
                    name: "NEMO_CH_03",
                  },
                  {
                    id: "NEMO_CH_04",
                    name: "NEMO_CH_04",
                  },
                  {
                    id: "NEMO_CH_05",
                    name: "NEMO_CH_05",
                  },
                  {
                    id: "NEMO_CH_06",
                    name: "NEMO_CH_06",
                  },
                ],
              },
            ],
          },
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
                  {
                    id: "DEMO_INDIA_CH",
                    name: "DEMO_INDIA_CH",
                  },
                  {
                    id: "NEMO_CH_01",
                    name: "NEMO_CH_01",
                  },
                  {
                    id: "NEMO_CH_02",
                    name: "NEMO_CH_02",
                  },
                  {
                    id: "NEMO_CH_03",
                    name: "NEMO_CH_03",
                  },
                  {
                    id: "NEMO_CH_04",
                    name: "NEMO_CH_04",
                  },
                  {
                    id: "NEMO_CH_05",
                    name: "NEMO_CH_05",
                  },
                  {
                    id: "NEMO_CH_06",
                    name: "NEMO_CH_06",
                  },
                ],
              },
            ],
          },
          {
            id: "ids3",
            name: "PC Travel",
            suppliers: [
              {
                id: "ntp",
                name: "NTP",
                channels: [
                  {
                    id: "DEMO_OFFERBUILDER",
                    name: "DEMO_OFFERBUILDER",
                  },
                  {
                    id: "DEMO_INDIA_CH",
                    name: "DEMO_INDIA_CH",
                  },
                  {
                    id: "NEMO_CH_01",
                    name: "NEMO_CH_01",
                  },
                  {
                    id: "NEMO_CH_02",
                    name: "NEMO_CH_02",
                  },
                  {
                    id: "NEMO_CH_03",
                    name: "NEMO_CH_03",
                  },
                  {
                    id: "NEMO_CH_04",
                    name: "NEMO_CH_04",
                  },
                  {
                    id: "NEMO_CH_05",
                    name: "NEMO_CH_05",
                  },
                  {
                    id: "NEMO_CH_06",
                    name: "NEMO_CH_06",
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
    expect(getFilterData(brands)).toStrictEqual({
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
      propertyTypes: [
        {
          name: 'DEMO',
          id: 'DEMO'
        },
        {
          name: 'PROD',
          id: 'PROD'
        },
        {
          name: 'ALL (DEMO + PROD)',
          id: 'ALL'
        },
      ]
    });
  });

  test("getFilterData get filter data from brands with only brands info", () => {
    const brands = [
      {
        id: "idb",
        name: "Internal Demo Brand",
        storefronts: [],
      },
      {
        id: "cdb",
        name: "Client Demo Brand",
        storefronts: [],
      },
    ];
    expect(getFilterData(brands)).toStrictEqual({
      brands: [
        {
          id: "idb",
          name: "Internal Demo Brand",
        },
        {
          id: "cdb",
          name: "Client Demo Brand",
        },
      ],
      channels: [],
      storefronts: [],
      suppliers: [],
      propertyTypes: [
        {
          name: 'DEMO',
          id: 'DEMO'
        },
        {
          name: 'PROD',
          id: 'PROD'
        },
        {
          name: 'ALL (DEMO + PROD)',
          id: 'ALL'
        },
      ]
    });
  });

  test("getFilterData get filter data from brands with empty info", () => {
    const brands = [];
    expect(getFilterData(brands)).toStrictEqual({
      brands: [],
      channels: [],
      storefronts: [],
      suppliers: [],
      propertyTypes: [
        {
          name: 'DEMO',
          id: 'DEMO'
        },
        {
          name: 'PROD',
          id: 'PROD'
        },
        {
          name: 'ALL (DEMO + PROD)',
          id: 'ALL'
        },
      ]
    });
  });

  test("getFilterData get filter data from brands with null info", () => {
    const brands = null;
    expect(getFilterData(brands)).toStrictEqual({
      brands: [],
      channels: [],
      storefronts: [],
      suppliers: [],
      propertyTypes: [
        {
          name: 'DEMO',
          id: 'DEMO'
        },
        {
          name: 'PROD',
          id: 'PROD'
        },
        {
          name: 'ALL (DEMO + PROD)',
          id: 'ALL'
        },
      ]
    });
  });
});
