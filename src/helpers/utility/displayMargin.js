export const displayMargin = (lowestMargin, highestMargin) => {
  if (lowestMargin && highestMargin) {
    if (lowestMargin === highestMargin) {
      return lowestMargin + " %"; // for same margin case
    }
    return lowestMargin + "-" + highestMargin + " %";
  } else if (lowestMargin) {
    return lowestMargin + " %";
  } else if (highestMargin) {
    return highestMargin + " %";
  }
  return "";
};
