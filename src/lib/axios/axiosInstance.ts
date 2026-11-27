import { env } from "@/env";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 60000, // 60 seconds
  withCredentials: true,
});