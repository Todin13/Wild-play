// src/utils/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://wild-play-api-git-bookingfrontend-todin13s-projects.vercel.app/api",
  //baseURL: "http://localhost:5019/api",
  withCredentials: true,
});

export default API;
