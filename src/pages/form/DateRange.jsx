import React from "react";
import { DatePicker } from "antd";
import moment from "moment/min/moment-with-locales";

function DateRange(props) {
  const { RangePicker } = DatePicker;
  return (
    <RangePicker
      data-testid={props.dataTestId ? props.dataTestId : "range-picker"}
      format={moment.localeData().longDateFormat("L")}
      defaultValue={
        props.value && props.value.startDate && props.value.endDate
          ? [moment(props.value.startDate), moment(props.value.endDate)]
          : props.isEmptyDefaultRange
          ? []
          : [moment(), moment().add(60, "d")]
      }
      disabledDate={(current) =>
        moment().subtract(1, "days").isSameOrAfter(current)
      }
      onCalendarChange={(dates) => props.onChange(dates)}
    />
  );
}

export default DateRange;
