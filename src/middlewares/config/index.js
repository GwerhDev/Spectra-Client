import { environment } from "../../environment";
import { DEVELOPMENT } from "../misc";

export const URL_CLIENT = environment === DEVELOPMENT ? "http://localhost:5174":"https://spectra.nhexa.cl";
export const URL_STREAMBY = environment === DEVELOPMENT ? "http://localhost:1312":"https://streamby-api.vercel.app";
export const URL_NHEXA_API = environment === DEVELOPMENT ? "http://localhost:8080":"https://api.nhexa.cl";
export const URL_SPECTRA_API = environment === DEVELOPMENT ? "http://localhost:8081":"https://spectra-nhexa-api.fly.dev";

export const URL_NHEXA_ACCOUNTS = environment === DEVELOPMENT ? "http://localhost:5173" : "https://accounts.nhexa.cl";
export const URL_NHEXA = environment === DEVELOPMENT ? "http://localhost:5175" : "https://nhexa.cl"