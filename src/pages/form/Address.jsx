import React from "react";
import { Input } from "antd";
import { useIntl } from "react-intl";

function Address(props) {
  const intl = useIntl();
  return (
    <Input
      defaultValue={props.value}
      placeholder={intl.formatMessage({
        id: "nemo.address.name",
      })}
      maxLength={200}
      onChange={(event) => {
        if (props.onChange) {
          props.onChange(event.target.value);
        }
        if (props.onAddrressChange) {
          props.onAddrressChange(event.target.value);
        }
      }}
    />
  );
}

export default Address;
