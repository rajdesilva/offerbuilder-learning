import React from "react";
import { Select } from "antd";
import { useIntl } from "react-intl";

const KMS = [5, 10, 25, 50, 100, 200];
function Distance(props) {
  const intl = useIntl();

  return (
    <React.Fragment>
      <Select
        value={props.value + " km"}
        placeholder={intl.formatMessage({ id: "nemo.select" })}
        data-testid="test-distance"
        onChange={(value) => {
          if (props.onChange) {
            props.onChange(value);
          }
          if (props.onChangeDistance) {
            props.onChangeDistance(value);
          }
        }}
      >
        {KMS.map((km) => (
          <Select.Option value={km} key={km} data-testid={"distance-km-" + km}>
            {km + " km"}
          </Select.Option>
        ))}
      </Select>{" "}
    </React.Fragment>
  );
}

export default Distance;
