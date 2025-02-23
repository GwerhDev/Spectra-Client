import ContentUpdate from '../../components/Admin/ContentUpdate/ContentUpdate';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEdition } from '../../../middlewares/redux/actions/admin';

const ContentUpdatePage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser);

  useEffect(() => {
    dispatch(setEdition(true));
  }, [dispatch]);

  return (
    currentUser?.role === 'admin' &&
    <ContentUpdate />
  )
}

export default ContentUpdatePage;