import moment from "moment";
import { checkIfTravellingDateValidAsPerBookingDate } from "../checkIfTravellingDateValidAsPerBookingDate";

describe("checkIfTravellingDateValidAsPerBookingDate function test", () => {
  test("checkIfTravellingDateValidAsPerBookingDate travellingDate and booking dates start at the same day", () => {
    const travellingDateRange = {
        startDate: '2021-02-01',
        endDate: '2021-02-01',
      };
    const bookingDateRange = 
      {
        startDate: '2021-02-01',
        endDate: '2021-02-01',
      };
    expect(checkIfTravellingDateValidAsPerBookingDate(travellingDateRange, bookingDateRange)).toBe(true);
  });

  test("checkIfTravellingDateValidAsPerBookingDate travellingDate and booking both dates are moment objects and start at the same day", () => {
    const travellingDateRange = {
        startDate: moment("2021-02-01"),
        endDate: moment("2021-03-01"),
      };
    const bookingDateRange = 
      {
        startDate: moment("2021-02-01"),
        endDate: moment("2021-03-01"),
      };
    expect(checkIfTravellingDateValidAsPerBookingDate(travellingDateRange, bookingDateRange)).toBe(true);
  });

  test("checkIfTravellingDateValidAsPerBookingDate travellingDate is moment object and booking dates is simple object and start at the same day", () => {
    const travellingDateRange = {
        startDate: moment("2021-02-01"),
        endDate: moment("2021-03-01"),
      };
    const bookingDateRange = 
      {
        startDate: "2021-02-01",
        endDate: "2021-03-01",
      };
    expect(checkIfTravellingDateValidAsPerBookingDate(travellingDateRange, bookingDateRange)).toBe(true);
  });

  test("checkIfTravellingDateValidAsPerBookingDate bookingDateRange is moment object and travellingDateRange is simple object and start at the same day", () => {
    const bookingDateRange = {
        startDate: moment("2021-02-01"),
        endDate: moment("2021-03-01"),
      };
    const travellingDateRange = 
      {
        startDate: "2021-02-01",
        endDate: "2021-03-01",
      };
    expect(checkIfTravellingDateValidAsPerBookingDate(travellingDateRange, bookingDateRange)).toBe(true);
  });

  test("checkIfTravellingDateValidAsPerBookingDate bookingDateRange is moment object and travellingDateRange is simple object and travel starts before booking", () => {
    const bookingDateRange = {
        startDate: moment("2021-03-10"),
        endDate: moment("2021-04-01"),
      };
    const travellingDateRange = 
      {
        startDate: "2021-03-01",
        endDate: "2021-04-01",
      };
    expect(checkIfTravellingDateValidAsPerBookingDate(travellingDateRange, bookingDateRange)).toBe(false);
  });

  test("checkIfTravellingDateValidAsPerBookingDate travellingDateRange is moment object and bookingDateRange is simple object and booking starts before travelling", () => {
    const travellingDateRange = {
        startDate: moment("2021-03-10"),
        endDate: moment("2021-04-01"),
      };
    const bookingDateRange  = 
      {
        startDate: "2021-03-01",
        endDate: "2021-04-01",
      };
    expect(checkIfTravellingDateValidAsPerBookingDate(travellingDateRange, bookingDateRange)).toBe(true);
  });

  test("checkIfTravellingDateValidAsPerBookingDate travellingDate starts before booking date", () => {
    const travellingDateRange = {
        startDate: '2021-02-01',
        endDate: '2021-02-011',
      };
    const bookingDateRange = 
      {
        startDate: '2021-03-01',
        endDate: '2021-04-01',
      };
    expect(checkIfTravellingDateValidAsPerBookingDate(travellingDateRange, bookingDateRange)).toBe(false);
  });

  test("checkIfTravellingDateValidAsPerBookingDate travellingDate starts after booking date", () => {
    const travellingDateRange = {
        startDate: '2021-03-11',
        endDate: '2021-02-01',
      };
    const bookingDateRange = 
      {
        startDate: '2021-03-01',
        endDate: '2021-02-01',
      };
    expect(checkIfTravellingDateValidAsPerBookingDate(travellingDateRange, bookingDateRange)).toBe(true);
  });

  test("checkIfTravellingDateValidAsPerBookingDate values sent are null", () => {
    expect(checkIfTravellingDateValidAsPerBookingDate(null, null)).toBe(true);
  });

  test("checkIfTravellingDateValidAsPerBookingDate values sent are empty objects", () => {
    expect(checkIfTravellingDateValidAsPerBookingDate({}, {})).toBe(true);
  });
});
