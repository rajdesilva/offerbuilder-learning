import { mapOnlySuppliers } from "../mapOnlySuppliers";

describe("mapOnlySuppliers function test", () => {
  test("mapOnlySuppliers check if function returns correct values for formvalues with supplier or not case", () => {
    const formValues = {
      channels: [],
      suppliers: [{ id: "ntp", name: "NTP" }],
    };
    expect(mapOnlySuppliers(formValues)).toStrictEqual([
      {
        channels: [],
        id: "ntp",
        name: "NTP",
      },
    ]);
  });

  test("mapOnlySuppliers check if function returns correct values for formvalues with supplier and channels or not case", () => {
    const formValues = {
      channels: [
        {
          id: "DEMO_OFFERBUILDER",
          name: "Demo for Nemo / Offerbuilder",
        },
      ],
      suppliers: [{ id: "ntp", name: "NTP" }],
    };
    expect(mapOnlySuppliers(formValues)).toStrictEqual([
      {
        channels: [
          {
            id: "DEMO_OFFERBUILDER",
            name: "Demo for Nemo / Offerbuilder",
          },
        ],
        id: "ntp",
        name: "NTP",
      },
    ]);
  });
  test("mapOnlySuppliers check when function receives empty values case", () => {
    const formValues = {
      channels: [],
      suppliers: [],
    };
    expect(mapOnlySuppliers(formValues)).toStrictEqual([]);
  });

  test("mapOnlySuppliers check when function receives null values case", () => {
    expect(mapOnlySuppliers(null)).toStrictEqual([]);
  });
});
