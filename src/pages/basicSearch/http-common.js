import axios from "axios";
import { baseURL } from "../../helpers";

export default axios.create({
  baseURL: `${baseURL.API_URL_BASE}`,
  headers: {
    "Content-Type": "application/json",
  },
});