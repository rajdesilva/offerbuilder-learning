import { Select } from "antd";
import React, { Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { appConstants } from "../../../common";
import { supplySearchActions } from "../actions";
import { searchSupply } from "../service";
import styles from "./css/PropertySort.module.less";

const { Option } = Select;

export function PropertySort(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <React.Fragment>
      <span className={styles.sortBy}>
        <FormattedMessage id="nemo.sortBy" />
      </span>{" "}
      &nbsp;
      <Select
        data-testid="property-sort-order-by"
        dropdownMatchSelectWidth={false}
        defaultValue={JSON.stringify(props.sortBy)}
        onChange={(value) => {
          dispatch({
            type: supplySearchActions.SUPPLY_SEARCH_UPDATE_SORT_BY,
            payload: value,
          });
          searchSupply(history.location.pathname);
        }}
      >
        <Option
          data-testid="sort-name-ascending"
          value={JSON.stringify(
            appConstants.SORT_PROPERTY.NAME_ASCENDING_VALUE
          )}
        >
          {appConstants.SORT_PROPERTY.NAME_ASCENDING}
        </Option>
        <Option
          data-testid="sort-name-descending"
          value={JSON.stringify(
            appConstants.SORT_PROPERTY.NAME_DESCENDING_VALUE
          )}
        >
          {appConstants.SORT_PROPERTY.NAME_DESCENDING}
        </Option>
        <Option
          data-testid="sort-price-ascending"
          value={JSON.stringify(
            appConstants.SORT_PROPERTY.PRICE_ASCENDING_VALUE
          )}
        >
          {appConstants.SORT_PROPERTY.PRICE_ASCENDING}
        </Option>
        <Option
          data-testid="sort-price-descending"
          value={JSON.stringify(
            appConstants.SORT_PROPERTY.PRICE_DESCENDING_VALUE
          )}
        >
          {appConstants.SORT_PROPERTY.PRICE_DESCENDING}
        </Option>
      </Select>{" "}
      </React.Fragment>
  );
}
