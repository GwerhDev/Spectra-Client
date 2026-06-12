import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { setSession, setLoader } from '@/store/sessionSlice';
import { fetchAuth } from '@/services/auth';
import { ACCOUNT_URL, CLIENT_URL } from '@/config/api';

export function useInitSession(
  onProgress?: (progress: number) => void,
) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setLoader(true));
    onProgress?.(0);

    (async () => {
      let sim = 0;
      const interval = setInterval(() => {
        sim += (55 - sim) * 0.12;
        onProgress?.(Math.round(sim));
      }, 150);

      const session = await fetchAuth();
      clearInterval(interval);
      onProgress?.(80);

      if (!session.logged) {
        onProgress?.(100);
        window.location.href = `${ACCOUNT_URL}/login?callback=${encodeURIComponent(CLIENT_URL)}`;
        return;
      } else {
        onProgress?.(100);
        setTimeout(() => {
          dispatch(setSession({ ...session, userData: { ...session.userData, loader: false } }));
        }, 300);
      }
    })();
  }, [dispatch, navigate]);
}
