import { Routes, Route, Navigate } from 'react-router-dom';
import { EditorialShell } from '@/app/layouts/EditorialShell/EditorialShell';
import { EditorialHome } from '@/app/pages/Home/EditorialHome';
import { RoomScreen } from '@/app/pages/Room/RoomScreen';
import { Unauthorized } from '@/app/pages/Unauthorized/Unauthorized';
import { UnderConstruction } from '@/app/components/ui';
import { useInitSession } from '@/hooks/useInitSession';
import { useAppSelector } from '@/store/hooks';

function AppRoutes() {
  useInitSession();
  const loader = useAppSelector(s => s.session.userData.loader);

  if (loader) {
    return (
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        background: 'var(--bg)',
        animation: 'pulse 1.5s ease-in-out infinite',
      }}>
        <img
          src="/logo.png"
          alt="Spectra"
          style={{
            width: 36, height: 36,
            filter: 'brightness(0) saturate(100%) invert(15%) sepia(94%) saturate(5640%) hue-rotate(330deg) brightness(91%) contrast(101%)',
          }}
        />
        <span className="mono" style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          SPECTRA
        </span>
        <style>{`@keyframes pulse { 0%,100% { opacity: 0.3 } 50% { opacity: 1 } }`}</style>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/unauthorized" element={<Unauthorized/>}/>
      <Route element={<EditorialShell/>}>
        <Route index element={<EditorialHome/>}/>
        <Route path="/room/:id" element={<RoomScreen/>}/>
        <Route path="/live"      element={<UnderConstruction label="Live"/>}/>
        <Route path="/catalog"   element={<UnderConstruction label="Catalog"/>}/>
        <Route path="/agenda"    element={<UnderConstruction label="Schedule"/>}/>
        <Route path="/colaborar" element={<UnderConstruction label="Collaborate"/>}/>
        <Route path="/create"    element={<UnderConstruction label="Create a room"/>}/>
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Route>
    </Routes>
  );
}

export default function App() {
  return <AppRoutes/>;
}
