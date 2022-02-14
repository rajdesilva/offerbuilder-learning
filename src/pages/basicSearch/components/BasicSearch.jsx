import React from "react";

import { useRouteMatch } from "react-router-dom";
import { BrowseSupplyHeader } from "./BrowseSupplyHeader";
import { SearchSettings } from "./SearchSettings";
import { SearchResultContainer } from "./SearchResultContainer";
import styles from './css/BrowseSupply.module.less';

export function BasicSearch() {
  const isBrowseSupplyPage = useRouteMatch({
    path: "/browse-supply/:page",
    strict: true,
    sensitive: true,
  });
  
  return (
    <div >
      <BrowseSupplyHeader />
      {isBrowseSupplyPage ? <SearchResultContainer /> : <SearchSettings />}
    </div>
  );
}
