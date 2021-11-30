import React from "react";
import { Select } from "antd";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { isEqual } from "lodash";

function Currency(props) {
  const intl = useIntl();
  const currencyList = useSelector(
    (state) => window.getValue(state, "currency.currencyList") || ["-"],
    isEqual
  );
  return (
    <React.Fragment>
      <Select
        value={props.value}
        placeholder={intl.formatMessage({ id: "nemo.select" })}
        data-testid={props.datatestid}
        onChange={(value) => {
          if (props.onChange) {
            props.onChange(value);
          }
          if (props.onChangeCurrency) {
            props.onChangeCurrency(value);
          }
        }}
      >
        {currencyList.map((currency) => (
          <Select.Option value={currency} key={currency} data-testid={currency}>
            {currency}
          </Select.Option>
        ))}
      </Select>
    </React.Fragment>
  );
}

export default Currency;
