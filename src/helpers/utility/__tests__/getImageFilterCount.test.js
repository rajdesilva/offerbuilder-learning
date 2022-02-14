import { getImageFilterCount } from "../getImageFilterCount";
import { getValue } from "../getValue";

describe("getImageFilterCount function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  test("getImageFilterCount check initial values case", () => {
    const appliedImageFilters = {
        fileName: '',
        uploadDateRange: {
          uploadedStartDate: '',
          uploadedEndDate: ''
        },
        uploadedByCurrentUser: 'ALL',
        usedInAnyOffer: 'ALL',
        offerIds: '',
        searchInputText: ''
    };
    expect(getImageFilterCount(appliedImageFilters)).toBe(0);
  });
  test("getImageFilterCount check if fileName is entered case", () => {
    const appliedImageFilters = {
        fileName: 'testfile',
        uploadDateRange: {
          uploadedStartDate: '',
          uploadedEndDate: ''
        },
        uploadedByCurrentUser: 'ALL',
        usedInAnyOffer: 'ALL',
        offerIds: '',
        searchInputText: ''
    };
    expect(getImageFilterCount(appliedImageFilters)).toBe(1);
  });

  test("getImageFilterCount check if offerIds & filename is entered case", () => {
    const appliedImageFilters = {
        fileName: 'testfile',
        uploadDateRange: {
          uploadedStartDate: '',
          uploadedEndDate: ''
        },
        uploadedByCurrentUser: 'ALL',
        usedInAnyOffer: 'ALL',
        offerIds: 'offer123',
        searchInputText: ''
    };
    expect(getImageFilterCount(appliedImageFilters)).toBe(2);
  });

  test("getImageFilterCount check if upload date range is selected case", () => {
    const appliedImageFilters = {
        fileName: '',
        uploadDateRange: {
          uploadedStartDate: '2020-12-01',
          uploadedEndDate: '2021-02-11'
        },
        uploadedByCurrentUser: 'ALL',
        usedInAnyOffer: 'ALL',
        offerIds: '',
        searchInputText: ''
    };
    expect(getImageFilterCount(appliedImageFilters)).toBe(1);
  });

  test("getImageFilterCount check if uploadedByCurrentUser and upload date is selected case", () => {
    const appliedImageFilters = {
        fileName: '',
        uploadDateRange: {
          uploadedStartDate: '2020-12-01',
          uploadedEndDate: '2021-02-11'
        },
        uploadedByCurrentUser: 'INCLUDE',
        usedInAnyOffer: 'ALL',
        offerIds: '',
        searchInputText: ''
    };
    expect(getImageFilterCount(appliedImageFilters)).toBe(2);
  });

  test("getImageFilterCount check if usedInAnyOffer and upload date is selected case", () => {
    const appliedImageFilters = {
        fileName: '',
        uploadDateRange: {
          uploadedStartDate: '2020-12-01',
          uploadedEndDate: '2021-02-11'
        },
        uploadedByCurrentUser: 'ALL',
        usedInAnyOffer: 'EXCLUDE',
        offerIds: '',
        searchInputText: ''
    };
    expect(getImageFilterCount(appliedImageFilters)).toBe(2);
  });

  test("getImageFilterCount check if all filters are selected case", () => {
    const appliedImageFilters = {
        fileName: 'Test',
        uploadDateRange: {
          uploadedStartDate: '2020-12-01',
          uploadedEndDate: '2021-02-11'
        },
        uploadedByCurrentUser: 'INCLUDE',
        usedInAnyOffer: 'EXCLUDE',
        offerIds: 'offer123',
        searchInputText: ''
    };
    expect(getImageFilterCount(appliedImageFilters)).toBe(5);
  });

  test("getImageFilterCount check if filter data is null/empty with ACTIVE TAB selected", () => {
    let appliedImageFilters = null;
    expect(getImageFilterCount(appliedImageFilters)).toBe(0);

    appliedImageFilters = {};
    expect(getImageFilterCount(appliedImageFilters)).toBe(0);
  });
});
