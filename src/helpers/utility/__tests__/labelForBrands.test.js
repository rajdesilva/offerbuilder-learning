import React from "react";
import { FormattedMessage } from "react-intl";
import { getValue } from "../getValue";
import { labelForBrands } from "../labelForBrands";

describe("labelForBrands function test", () => {
  beforeEach(() => {
    window.getValue = getValue;
  });
  test("labelForBrands check if function called when search setting page in create offer flow is displayed and not settings page ", () => {
    const props = {
      field: {
        key: 0,
      },
      isSettingsPage: false,
    };
    const isBrowseSupplyPage = false;
    expect(labelForBrands(props, isBrowseSupplyPage)).toStrictEqual(
      <FormattedMessage id="nemo.source" />
    );
  });

  test("labelForBrands check if function called when search setting page in browse supply flow is displayed and not settings page ", () => {
    const props = {
      field: {
        key: 0,
      },
      isSettingsPage: {
        isExact: true,
      },
    };
    const isBrowseSupplyPage = true;
    expect(labelForBrands(props, isBrowseSupplyPage)).toStrictEqual(
      <FormattedMessage id="nemo.target" />
    );
  });

  test("labelForBrands check if function called when search setting page in create new offer flow is displayed and is part of settings page ", () => {
    const props = {
      field: {
        key: 0,
      },
      isSettingsPage: true,
    };
    const isBrowseSupplyPage = null;
    expect(labelForBrands(props, isBrowseSupplyPage)).toStrictEqual(
      <FormattedMessage id="nemo.target" />
    );
  });

  test("labelForBrands check if function called when search setting page in create new offer flow is displayed and brands field index is 1", () => {
    const props = {
      field: {
        key: 1,
      },
      isSettingsPage: true,
    };
    const isBrowseSupplyPage = false;
    expect(labelForBrands(props, isBrowseSupplyPage)).toStrictEqual("");
  });

  test("labelForBrands check if function called with null values", () => {
    expect(labelForBrands(null, null)).toStrictEqual("");
  });
});
