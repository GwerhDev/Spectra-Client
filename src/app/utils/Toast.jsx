import s from './Toast.module.css';
import closeIcon from '../../assets/images/svg/close-icon.svg'
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetToast } from '../../middlewares/redux/actions/toast';
import favoriteIcon from '../../assets/images/svg/like-icon.svg';
import adminIcon from '../../assets/images/svg/admin-icon.svg';
import defaultImage from '../../assets/images/svg/profile-icon.svg';

export const Toast = () => {
  const dispatch = useDispatch();
  const toast = useSelector(state => state.toast);

  function closeToast() {
    dispatch(resetToast());
  };

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(resetToast());
      toast.image === "favorite" ? toast.image = favoriteIcon : toast.image = adminIcon;
    }, 3000);

    return () => {
      clearInterval(interval);
    }
  }, [dispatch, toast]);

  return (
    <>
      {
        toast?.show &&
        <motion.div
          className={s.container}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <img
            className={s.toastImg}
            alt=""
            src={(toast.image === "favorite" && favoriteIcon) || (toast.image === "admin" && adminIcon ) || toast.image || defaultImage}
          />
          <span>
            <div className={s.toastMessage}>
              <p className={s.title}>{toast.title}</p>
            </div>
            <p className={s.description}>{toast.message}</p>
          </span>
          <button className={s.closeButton} onClick={closeToast}>
            <img src={closeIcon} alt="Cerrar" width={20} />
          </button>
        </motion.div>
      }
    </>
  )
}

