import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { setSession, setLoader } from '@/store/sessionSlice';
import { fetchAuth } from '@/services/auth';
import { VITE_ENV } from '@/config/api';

export function useInitSession() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setLoader(true));

    (async () => {
      const session = await fetchAuth();

      if (!session.logged) {
        if (VITE_ENV !== 'development') {
          navigate('/unauthorized');
        } else {
          dispatch(setSession({ logged: false, userData: { loader: false } }));
        }
      } else {
        dispatch(setSession({ ...session, userData: { ...session.userData, loader: false } }));
      }
    })();
  }, [dispatch, navigate]);
}
