import { useSelector } from 'react-redux';
import s from './Auth.module.css';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../../middlewares/redux/actions/auth';
import { setUserToken } from '../../../middlewares/helpers';
import { Loader } from '../../utils/Loader';

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const backRoute = useSelector(state => state.navigation?.backRoute) || null;
  const params = new URLSearchParams(location.search);
  const userToken = params.get('token');
  
  useEffect(() => {
    if (userToken) {
      setUserToken(userToken);
      dispatch(auth(navigate, backRoute));
    }
  }, [dispatch, userToken, navigate, backRoute]);

  return (
    <div className={s.loaderContainer}>
      <Loader message={"Autenticando..."} width={"50px"} />
    </div>
  )
}

export default Auth;