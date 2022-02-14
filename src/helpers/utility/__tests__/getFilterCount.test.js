import { appConstants } from "../../../common";
import { getFilterCount } from "../getFilterCount";
import { getValue } from "../getValue";

describe("getFilterCount function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  test("getFilterCount check initial values case", () => {
    const appliedFilters = {
      brands: [],
      storefronts: [],
      suppliers: [],
      channels: [],
      lcn: false,
      status: [
        { id: "UNPUBLISHED", name: "UNPUBLISHED" },
        { id: "PUBLISHED", name: "PUBLISHED" },
      ],
    };
    const tabSelected = appConstants.offerListTab.ACTIVE;
    expect(getFilterCount(appliedFilters, tabSelected)).toBe(0);
  });
  test("getFilterCount check if supplier is selected case and ACTIVE tab", () => {
    const appliedFilters = {
      brands: [],
      storefronts: [],
      suppliers: [
        {
          id: "NTP",
          name: "NTP",
        },
      ],
      channels: [],
      lcn: false,
      status: [
        { id: "UNPUBLISHED", name: "UNPUBLISHED" },
        { id: "PUBLISHED", name: "PUBLISHED" },
      ],
    };
    const tabSelected = appConstants.offerListTab.ACTIVE;
    expect(getFilterCount(appliedFilters, tabSelected)).toBe(1);
  });

  test("getFilterCount check if supplier is selected case and ARCHIVE TAB", () => {
    const appliedFilters = {
      brands: [],
      storefronts: [],
      suppliers: [
        {
          id: "NTP",
          name: "NTP",
        },
      ],
      channels: [],
      lcn: false,
      status: [
        { id: "UNPUBLISHED", name: "UNPUBLISHED" },
        { id: "PUBLISHED", name: "PUBLISHED" },
      ],
    };
    const tabSelected = appConstants.offerListTab.ARCHIVE;
    expect(getFilterCount(appliedFilters, tabSelected)).toBe(1);
  });

  test("getFilterCount check if multiple CHANNEL is selected case and ACTIVE TAB", () => {
    const appliedFilters = {
      brands: [],
      storefronts: [],
      suppliers: [],
      channels: [
        {
          id: "DEMO_INDIA_CH",
          name: "DEMO_INDIA_CH",
        },
        {
          id: "DEMO_OFFERBUILDER",
          name: "Demo for Nemo / Offerbuilder",
        },
      ],
      lcn: false,
      status: [
        { id: "UNPUBLISHED", name: "UNPUBLISHED" },
        { id: "PUBLISHED", name: "PUBLISHED" },
      ],
    };
    const tabSelected = appConstants.offerListTab.ACTIVE;
    expect(getFilterCount(appliedFilters, tabSelected)).toBe(1);
  });

  test("getFilterCount check if channels are selected with STATUS selected as PUBLISHED in ACTIVE TAB", () => {
    const appliedFilters = {
      brands: [],
      storefronts: [],
      suppliers: [],
      channels: [
        {
          id: "DEMO_INDIA_CH",
          name: "DEMO_INDIA_CH",
        },
        {
          id: "DEMO_OFFERBUILDER",
          name: "Demo for Nemo / Offerbuilder",
        },
      ],
      lcn: false,
      status: [{ id: "PUBLISHED", name: "PUBLISHED" }],
    };
    const tabSelected = appConstants.offerListTab.ACTIVE;
    expect(getFilterCount(appliedFilters, tabSelected)).toBe(2);
  });

  test("getFilterCount check if status is published and lcn is true with ACTIVE TAB selected", () => {
    const appliedFilters = {
      brands: [],
      storefronts: [],
      suppliers: [],
      channels: [],
      lcn: true,
      status: [{ id: "PUBLISHED", name: "PUBLISHED" }],
    };
    const tabSelected = appConstants.offerListTab.ACTIVE;
    expect(getFilterCount(appliedFilters, tabSelected)).toBe(2);
  });

  test("getFilterCount check if filter data is null/empty with ACTIVE TAB selected", () => {
    let appliedFilters = null;
    const tabSelected = appConstants.offerListTab.ACTIVE;
    expect(getFilterCount(appliedFilters, tabSelected)).toBe(0);

    appliedFilters = {};
    expect(getFilterCount(appliedFilters, tabSelected)).toBe(0);
  });
});
