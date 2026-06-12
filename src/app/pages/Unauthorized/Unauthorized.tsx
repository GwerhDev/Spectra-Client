import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { ACCOUNT_URL, CLIENT_URL } from '@/config/api';

export function Unauthorized() {
  const navigate = useNavigate();
  const logged = useAppSelector(s => s.session.logged);

  useEffect(() => {
    if (logged) {
      navigate('/');
      return;
    }
    window.location.href = `${ACCOUNT_URL}/login?callback=${encodeURIComponent(CLIENT_URL)}`;
  }, [logged, navigate]);

  return null;
}
