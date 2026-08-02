import axios from "axios";
import { BASE_URL } from "../constants/ApiConstants";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 45000,

  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
