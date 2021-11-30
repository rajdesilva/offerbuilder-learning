var _ = require("lodash");
export const getValue = (object, path) => _.get(object, `${path}`, "");