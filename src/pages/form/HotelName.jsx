import React from "react";
import { Input } from "antd";
import { useIntl } from "react-intl";

function HotelName(props) {
  const intl = useIntl();
  return (
    <Input
      defaultValue={props.value}
      placeholder={intl.formatMessage({
        id: "nemo.mediumInput",
      })}
      maxLength={200}
      data-testid="hotel-name"
      onChange={(event) => {
        if (props.onChange) {
          props.onChange(event.target.value);
        }
        if (props.onHotelChange) {
          props.onHotelChange(event.target.value);
        }
      }}
    />
  );
}

export default HotelName;
