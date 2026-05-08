import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { ACCOUNT_URL, CLIENT_URL, VITE_ENV } from '@/config/api';

export function Unauthorized() {
  const navigate = useNavigate();
  const logged = useAppSelector(s => s.session.logged);

  useEffect(() => {
    if (logged) {
      navigate('/');
      return;
    }
    if (VITE_ENV !== 'development') {
      window.location.href = `${ACCOUNT_URL}/login?callback=${encodeURIComponent(CLIENT_URL)}`;
    }
  }, [logged, navigate]);

  if (VITE_ENV !== 'development') return null;

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg)',
      flexDirection: 'column',
      gap: 24,
    }}>
      <div style={{ textAlign: 'center' }}>
        <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16 }}>
          dev mode
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.03em', margin: 0 }}>
          No autenticado
        </h1>
        <p className="mono" style={{ fontSize: 13, color: 'var(--fg-dim)', marginTop: 12, lineHeight: 1.6 }}>
          En producción redirige a accounts.nhexa.cl.<br/>
          Configura <code style={{ color: 'var(--accent)' }}>VITE_DUMMY_ID</code> en .env para saltar auth en dev.
        </p>
      </div>
    </div>
  );
}
