import axios from "axios";

export const dAxios = axios.create({
  baseURL: process.env.DEPLOYMENT_API,
})
