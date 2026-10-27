export const VITE_ENV   = import.meta.env.VITE_ENV as string;
export const NHEXA_API  = import.meta.env.VITE_NHEXA_API_URL as string;
export const CLIENT_URL = import.meta.env.VITE_CLIENT_URL as string;
export const ACCOUNT_URL = import.meta.env.VITE_ACCOUNT_URL as string;
// Nhexa's home (the desktop dock's): production's unless the environment says otherwise.
export const NHEXA_URL  = (import.meta.env.VITE_NHEXA_URL as string | undefined) || 'https://nhexa.cl';
export const DUMMY_ID   = import.meta.env.VITE_DUMMY_ID as string | undefined;
