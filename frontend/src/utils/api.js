/*

Connection to the backend api
Author: ODIN Thomas

*/
import axios from "axios";

const API = axios.create({
  //baseURL: "http://localhost:5019/api",
  baseURL: "https://wild-play-api.vercel.app/api",
  withCredentials: true,
});

export default API;
