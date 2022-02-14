import moment from "moment";

export const checkIfTravellingDateValidAsPerBookingDate = (
  travellingDateRange,
  bookingDateRange
) => {
  try {
    if (travellingDateRange && bookingDateRange) {
      let bookingStartDate;
      let travellingStartDate;
      if (bookingDateRange instanceof Array && bookingDateRange[0]) {
        bookingStartDate = moment(bookingDateRange[0]).format("YYYY-MM-DD");
      } else if (bookingDateRange.startDate) {
        bookingStartDate = bookingDateRange.startDate;
      } else {
        return true;
      }
      if (travellingDateRange instanceof Array && travellingDateRange[0]) {
        travellingStartDate = moment(travellingDateRange[0]).format(
          "YYYY-MM-DD"
        );
      } else if (travellingDateRange.startDate) {
        travellingStartDate = travellingDateRange.startDate;
      } else {
        return true;
      }

      if (bookingStartDate && travellingStartDate) {
        return moment(travellingStartDate).isSameOrAfter(
          moment(bookingStartDate)
        );
      } else {
        return true;
      }
    } else {
      return true;
    }
  } catch (error) {
    console.log("error = ", error.toString());
    return true;
  }
};
