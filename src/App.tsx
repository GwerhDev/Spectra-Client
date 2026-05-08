import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader } from '@/app/components/ui/Loader/Loader';
import { EditorialShell } from '@/app/layouts/EditorialShell/EditorialShell';
import { EditorialHome } from '@/app/pages/Home/EditorialHome';
import { RoomScreen } from '@/app/pages/Room/RoomScreen';
import { Unauthorized } from '@/app/pages/Unauthorized/Unauthorized';
import { UnderConstruction } from '@/app/components/ui';
import { useInitSession } from '@/hooks/useInitSession';
import { useAppSelector } from '@/store/hooks';

function AppRoutes() {
  const [progress, setProgress] = useState(0);
  useInitSession(setProgress);
  const loader = useAppSelector(s => s.session.userData.loader);

  if (loader) {
    return <Loader progress={progress}/>;
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
