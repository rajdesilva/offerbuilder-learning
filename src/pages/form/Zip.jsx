import React from "react";
import { Input } from "antd";
import { useIntl } from "react-intl";

function Zip(props) {
  const intl = useIntl();
  return (
    <Input
      defaultValue={props.value}
      placeholder={intl.formatMessage({
        id: "nemo.zip.name",
      })}
      maxLength={200}
      onChange={(event) => {
        if (props.onChange) {
          props.onChange(event.target.value);
        }
        if (props.onZipChange) {
          props.onZipChange(event.target.value);
        }
      }}
    />
  );
}

export default Zip;
