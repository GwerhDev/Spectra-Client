import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { setSession, setLoader } from '@/store/sessionSlice';
import { fetchAuth } from '@/services/auth';
import { VITE_ENV } from '@/config/api';

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
        if (VITE_ENV !== 'development') {
          navigate('/unauthorized');
        } else {
          dispatch(setSession({ logged: false, userData: { loader: false } }));
        }
      } else {
        onProgress?.(100);
        setTimeout(() => {
          dispatch(setSession({ ...session, userData: { ...session.userData, loader: false } }));
        }, 300);
      }
    })();
  }, [dispatch, navigate]);
}
