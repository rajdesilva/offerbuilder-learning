import { mapBrands } from "../mapBrands";

describe("mapBrands function test", () => {
  test("mapBrands check if function returns correct values or not case", () => {
    const formBrandValues = [
      {
        storefronts: [
          {
            id: "ids",
            name: "Internal Demo Storefront",
            suppliers: [
              {
                id: "ntp",
                name: "NTP",
                channels: [
                  { id: "DEMO_OFFERBUILDER", name: "DEMO_OFFERBUILDER" },
                ],
              },
            ],
          },
        ],
        id: "idb",
        name: "Internal Demo Brand",
      },
    ];
    expect(mapBrands(formBrandValues)).toStrictEqual([
      {
        storefronts: [
          {
            id: "ids",
            name: "Internal Demo Storefront",
            suppliers: [
              {
                id: "ntp",
                name: "NTP",
                channels: [
                  { id: "DEMO_OFFERBUILDER", name: "DEMO_OFFERBUILDER" },
                ],
              },
            ],
          },
        ],
        id: "idb",
        name: "Internal Demo Brand",
      },
    ]);
  });
  test("mapBrands check when function receives empty values case", () => {
    const formBrandValues = [];
    expect(mapBrands(formBrandValues)).toStrictEqual([]);
  });

  test("mapBrands check when function receives initial brands values case", () => {
    expect(mapBrands([{ storefronts: [{}] }])).toStrictEqual([
      {
        storefronts: [{}],
      },
    ]);
  });

  test("mapBrands check when function receives null values case", () => {
    expect(mapBrands(null)).toStrictEqual([]);
  });

  test("mapBrands check when function receives array of string in the supplier object.", () => {
    expect(
      mapBrands([
        {
          storefronts: [
            {
              id: "ids",
              name: "Internal Demo Storefront",
              suppliers: [
                {
                  id: "ntp",
                  name: ['{"id":"ntp","name":"NTP"}'],
                  channels: [
                    { id: "DEMO_OFFERBUILDER", name: "DEMO_OFFERBUILDER" },
                  ],
                },
              ],
            },
          ],
          id: "idb",
          name: "Internal Demo Brand",
        },
      ])
    ).toEqual([
      {
        storefronts: [
          {
            id: "ids",
            name: "Internal Demo Storefront",
            suppliers: [
              {
                id: "ntp",
                name: "NTP",
                channels: [
                  { id: "DEMO_OFFERBUILDER", name: "DEMO_OFFERBUILDER" },
                ],
              },
            ],
          },
        ],
        id: "idb",
        name: "Internal Demo Brand",
      },
    ]);
  });
});
