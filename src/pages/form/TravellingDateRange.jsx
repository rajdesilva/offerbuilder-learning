import React from "react";
import { DatePicker } from "antd";
import moment from "moment/min/moment-with-locales";
import { useSelector } from "react-redux";

function TravellingDateRange(props) {
  const { RangePicker } = DatePicker;
  const bookingDateRange = useSelector((state) =>
    window.getValue(state, "newoffersettingsparam.bookingDateRange")
  );

  return (
    <RangePicker
      data-testid="settings-travelling-date-range"
      format={moment.localeData().longDateFormat("L")}
      defaultValue={
        props.value && props.value.startDate && props.value.endDate
          ? [moment(props.value.startDate), moment(props.value.endDate)]
          : props.isEmptyDefaultRange
          ? []
          : [moment(), moment().add(60, "d")]
      }
      disabledDate={(current) =>
        bookingDateRange && bookingDateRange.startDate
          ? moment(bookingDateRange.startDate).isSameOrAfter(current)
          : moment().subtract(1, "days").isSameOrAfter(current)
      }
      onCalendarChange={(dates) =>
        props.onChange ? props.onChange(dates) : ""
      }
    />
  );
}

export default TravellingDateRange;
