import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Request } from '../../Request/Request';
import { setOption } from '../../../../middlewares/redux/actions';
import { RequestProfile } from '../../RequestProfile/RequestProfile';
import { OptionSelector } from '../../../utils/OptionSelector';
import createIcon from '../../../../assets/images/svg/create-icon.svg';
import editIcon from '../../../../assets/images/svg/edit-icon.svg';
import userIcon from '../../../../assets/images/svg/user-icon.svg';
import { setNavigationDashboard } from '../../../../middlewares/redux/actions/navigation';

export const AdminDashboard = () => {
  const dispatch = useDispatch();
  const dashboard = useSelector(state => state.navigation?.dashboard);

  useEffect(() => {
    dispatch(setOption('dashboard'));
    dispatch(setNavigationDashboard("content"));
  }, [dispatch]);

  return (
    <main className='main-container'>
      <div className='nav-fixed' />
      <div className='section-container'>
        <div className='header-container'>
          <span className='section-description-container'>
            <h1>Bienvenido a tu dashboard</h1>
            <h3>¿Qué quieres hacer?</h3>
          </span>
          <OptionSelector content users settings onClick={setNavigationDashboard} />
        </div>
        {
          dashboard.option === 'content' &&
          <>
            <Request title={"Crear contenido"} icon={createIcon} route={"/content/create"} />
            <Request title={"Modificar Contenido"} icon={editIcon} route={"/content/edit"} />
          </>
        }

        {
          dashboard.option === 'users' &&
          <>
            <Request title={"Administrar Usuarios"} icon={userIcon} route={"/users/edit"} />
          </>
        }
      </div>
      <RequestProfile />
    </main>
  )
}