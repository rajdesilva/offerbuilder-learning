import React from "react";
import { Select } from "antd";
import { useIntl } from "react-intl";
import styles from './css/NemoSelect.module.less';
const _ = require("lodash");

const { Option } = Select;

const converter = (item) => {
  try {
    if (_.isString(item) || item === undefined) {
      return item;
    }
    if (item.id && (item.name === "" || item.name)) {
      return converter(JSON.stringify({ id: item.id, name: item.name }));
    }
    if (item.name) {
      return converter(item.name);
    }
    if (_.isArray(item)) {
      if (item[0] && _.isArray(item[0].name)) {
        return item[0].name.map((option) => converter(option));
      } else {
        return item.map((option) => converter(option));
      }
    }
    return undefined;
  } catch (e) {
    console.error(e);
  }
};
const NemoSelect = (props) => {
  const intl = useIntl();
  let defaultValue = props.defaultValue ? props.defaultValue : props.value;
  defaultValue = converter(defaultValue);
  const children = [];
  const options = props.optionsList || [];

  for (let i = 0; i < options.length; i++) {
    children.push(
      <Option
        key={options[i].id}
        value={JSON.stringify({ id: options[i].id, name: options[i].name })}
        data-testid={"nemo-select-" + props.id + "-option-" + options[i].id}
      >
        {options[i].name
          ? props.id === "brw-search-channel" ||
            props.id === "brand-search-channel"
            ? `${options[i].name} (${options[i].id})`
            : options[i].name
          : options[i].id}
      </Option>
    );
  }
  return (
    <Select
      mode={props.mode}
      key={props.id}
      maxTagCount={props.maxTagCount ? props.maxTagCount : null}
      className={props.className ? props.className : styles["width-100"]}
      disabled={props.disabled}
      allowClear={props.allowClear}
      onSelect={props.onSelect}
      placeholder={intl.formatMessage({ id: "nemo.notSelected" })}
      value={defaultValue}
      onChange={props.onChange}
      onDeselect={props.onDeselect}
      data-testid={"nemo-select-" + props.id}
    >
      {children}
    </Select>
  );
};
export default NemoSelect;
