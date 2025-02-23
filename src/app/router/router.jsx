import { Routes, Route, Navigate } from 'react-router-dom';

import View from '../pages/View/View';
import Auth from '../pages/Auth/Auth';
import Login from '../pages/Login/Login';
import Search from '../pages/Search/Search';
import Donate from '../pages/Donate/Donate';
import Verify from '../pages/Verify/Verify';
import Profile from '../pages/Profile/Profile';
import Browser from '../pages/Browser/Browser';
import Dashboard from '../pages/Admin/Dashboard';
import Releases from '../pages/Releases/Releases';
import Checkout from '../pages/Checkout/Checkout';
import Favorites from '../pages/Favorites/Favorites';
import UserList from '../components/Admin/UserList/UserList';
import Subscription from '../pages/Subscription/Subscription';
import ContentListPage from '../pages/Admin/ContentListPage';
import ContentCreatePage from '../pages/Admin/ContentCreatePage';
import ContentUpdatePage from '../pages/Admin/ContentUpdatePage';

import { Toast } from '../utils/Toast';
import { Navigator } from '../components/Navigator/Navigator';
import { CanvasMenu } from '../components/Navigator/CanvasMenu';

function Router() {
  return (
    <div className="App">
      <Toast />
      <Navigator />
      <CanvasMenu />
      <div className='body-app'>
        <Routes>
          <Route path="/" element={<Navigate to="/browser" replace />} />

          <Route path="/auth" element={<Auth />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/browser" element={<Browser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/releases" element={<Releases />} />
          <Route path="/donate" element={<Donate />} />

          <Route path="/profile" element={<Navigate to="/u/profile" replace />} />
          <Route path="/u/profile" element={<Profile />} />
          <Route path="/favorites" element={<Navigate to="/u/favorites" replace />} />
          <Route path="/u/favorites" element={<Favorites />} />
          <Route path="/subscription" element={<Navigate to="/u/subscription" replace />} />
          <Route path="/u/subscription" element={<Subscription />} />

          <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/content/create" element={<ContentCreatePage />} />
          <Route path="/admin/content/edit/:id" element={<ContentUpdatePage />} />
          <Route path="/admin/content/edit" element={<ContentListPage />} />

          <Route path="/content/create" element={<Navigate to="/admin/content/create" replace />} />
          <Route path="/content/edit" element={<Navigate to="/admin/content/edit" replace />} />

          <Route path="/users/edit" element={<UserList />} />
          <Route path="/view/v=:id" element={<View />} />
          <Route path="/search/:search" element={<Search />} />
          <Route path="/checkout/:type" element={<Checkout />} />
        </Routes>
      </div>
    </div>
  );
}

export default Router;
