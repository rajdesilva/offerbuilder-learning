import React from "react";
import { Input } from "antd";
import { useIntl } from "react-intl";

function OfferName(props) {
  const intl = useIntl();
  return (
    <Input
      defaultValue={props.value}
      maxLength={100}
      placeholder={intl.formatMessage({ id: "nemo.mediumInput" })}
      data-testid="offer-name"
      onChange={(event) =>
        props.onChange ? props.onChange(event.target.value) : ""
      }
    />
  );
}

export default OfferName;
