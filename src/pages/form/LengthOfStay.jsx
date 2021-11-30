import React from "react";
import { InputNumber } from "antd";
import { useIntl } from "react-intl";

function LengthOfStay(props) {
  const intl = useIntl();
  return (
    <InputNumber
      placeholder={intl.formatMessage({ id: "nemo.none" })}
      min={1}
      max={1000}
      value={props.value}
      data-testid="length-of-stay"
      onChange={(value) => {
        if (value && value != null) {
          if (props.onChange) {
            props.onChange(value);
          }
          if (props.onLengthOfStayChange) {
            props.onLengthOfStayChange(value);
          }
        }
      }}
    />
  );
}

export default LengthOfStay;
