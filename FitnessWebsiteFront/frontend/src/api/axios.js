import axios from "axios";
import React from "react";
const BASE_URL = "https://localhost:7097/api";
//http://localhost:5150/api

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
