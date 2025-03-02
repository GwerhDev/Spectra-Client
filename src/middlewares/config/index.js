import { environment } from "../../environment";
import { DEVELOPMENT } from "../misc";

export const URL_CLIENT = environment === DEVELOPMENT ? "http://localhost:5173":"https://spectra.nhexa.cl";
export const URL_STREAMBY = environment === DEVELOPMENT ? "http://localhost:1312":"https://streamby-api.vercel.app";
export const URL_NHEXA_API = environment === DEVELOPMENT ? "http://localhost:8080":"https://nhexa-api.fly.dev";
export const URL_SPECTRA_API = environment === DEVELOPMENT ? "http://localhost:8081":"https://spectra-nhexa-api.fly.dev";

export const URL_NHEXA_ACCOUNTS = "https://accounts.nhexa.cl";
