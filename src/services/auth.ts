import { NHEXA_API, DUMMY_ID } from '@/config/api';
import type { Session } from '@/interfaces';

export async function fetchAuth(): Promise<Session> {
  if (import.meta.env.DEV && DUMMY_ID) {
    const res = await fetch(`${NHEXA_API}/dev/account`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: DUMMY_ID }),
      credentials: 'include',
    });
    if (!res.ok) return { logged: false, userData: { loader: false } };
    return res.json();
  }

  const res = await fetch(`${NHEXA_API}/account`, { credentials: 'include' });
  if (!res.ok) return { logged: false, userData: { loader: false } };
  return res.json();
}

export async function fetchLogout(): Promise<void> {
  const res = await fetch(`${NHEXA_API}/logout`, { credentials: 'include' });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message ?? `HTTP ${res.status}`);
  }
}
