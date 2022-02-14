import React from "react";
import { DatePicker } from "antd";
import moment from "moment/min/moment-with-locales";
import { useIntl } from "react-intl";

function FixedDate(props) {
  const intl = useIntl();

  return (
    <DatePicker
      data-testid="deeplink-fixed-date"
      format={moment.localeData().longDateFormat("L")}
      defaultValue={props.value ? moment(props.value) : ""}
      placeholder={intl.formatMessage({
        id: "nemo.fixedDate",
      })}
      disabledDate={(current) =>
        moment().subtract(1, "days").isSameOrAfter(current)
      }
      onChange={(dates) => props.onChange(dates)}
    />
  );
}

export default FixedDate;
