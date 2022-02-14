import React from "react";
import { FormattedMessage } from "react-intl";
export const labelForBrands = (props, isBrowseSupplyPage) =>
  window.getValue(props, "field.key") === 0 ? (
    isBrowseSupplyPage && isBrowseSupplyPage.isExact ? (
      ""
    ) : props.isSettingsPage ? (
      <FormattedMessage id="nemo.target" />
    ) : (
      <FormattedMessage id="nemo.source" />
    )
  ) : (
    ""
  );
