import http from "./http-common";

const getAll = (params) => {
  return http.get("/global/properties", { params });
};

// other CRUD methods

export default {
  getAll
};