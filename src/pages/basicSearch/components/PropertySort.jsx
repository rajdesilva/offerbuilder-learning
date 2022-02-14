import { Select } from "antd";
import React, { Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { appConstants_results } from "../../../common";
import { supplySearchActions } from "../actions";
import { searchSupply } from "../service";
import styles from "./css/PropertySort.module.less";

const { Option } = Select;

export function PropertySort(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Fragment>
      
      <Select span={3}
        className={styles.sltBox}
        style={{fontSize: '14px'}}
        data-testid="property-sort-order-by"
        dropdownMatchSelectWidth={false}
        defaultValue="ALL"
        onChange={(value) => {
          console.log(value)
          dispatch({
            type: supplySearchActions.SUPPLY_SEARCH_UPDATE_SORT_BY_GBL,
            payload: value,
          });
        }}
      >
       <option value="ALL"><FormattedMessage id="nemo.result.allproperties" /></option>
       <option value="NTP_SUPPLIER"><FormattedMessage id="nemo.result.withoutsuppliers" /></option>
       <option value="WITH_SUPPLIER"><FormattedMessage id="nemo.withsuppliers" /></option>
      </Select>{" "}
    </Fragment>
  );
}
