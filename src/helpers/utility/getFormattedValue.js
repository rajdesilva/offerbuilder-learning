export const getFormattedValue = (value) =>
  Number(value) === value && value % 1 !== 0
    ? value.toLocaleString("en", {
        useGrouping: false,
        minimumFractionDigits: 2,
      })
    : value;