import { environment } from "../../environment";
import { DEVELOPMENT } from "../misc";

export const URL_API = environment === DEVELOPMENT ? "http://localhost:8080":"https://nhexa-api.fly.dev";
export const URL_STREAMBY = environment === DEVELOPMENT ? "http://localhost:1312":"https://streamby-api.vercel.app";

export const URL_NHEXA_REGISTER = "https://accounts.nhexa.cl/register";
export const URL_NHEXA_LOGIN = "https://accounts.nhexa.cl/oauth/chooseaccount/tv.laruina.cl";