import qs from "qs";

export const getObjectStringify = (objectToStringify) => {
  return qs.stringify(objectToStringify, {
    addQueryPrefix: true,
    arrayFormat: "indices",
    allowDots: true,
    skipNulls: true,
  });
};
