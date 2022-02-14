import React from "react";
import { Select } from "antd";
import { useIntl } from "react-intl";
import { appConstants } from "../../common";

function PropertyType(props) {
  const intl = useIntl();
  return (
    <React.Fragment>
      <Select
        value={props.value}
        placeholder={intl.formatMessage({ id: "nemo.select" })}
        data-testid="property-type-select"
        onChange={(value) => {
          if (props.onChange) {
            props.onChange(value);
          }
          if (props.onChangeType) {
            props.onChangeType(value);
          }
        }}
      >
        {appConstants.PROPERTY_TYPE_LIST.map((propertyType) => (
          <Select.Option value={propertyType.id} key={propertyType.id} data-testid={"property-type-select-" + propertyType.id}>
            {propertyType.name}
          </Select.Option>
        ))}
      </Select>
    </React.Fragment>
  );
}

export default PropertyType;
