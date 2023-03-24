import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./errors/AuthTokenError";

import { AuthContext } from "../context/auth";

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
      Authorization: `Bearer ${cookies["@startpn"]}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      if (err.response.statusCode === 401) {
        if (window !== undefined) {
          //deslogar
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }
      return Promise.reject(err.response.data.error);
    }
  );
  return api;
}
