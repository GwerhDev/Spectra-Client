import ContentCreate from '../../components/Admin/ContentCreate/ContentCreate';
import { useSelector } from 'react-redux';

const ContentCreatePage = () => {
  const currentUser = useSelector(state => state.currentUser);

  return (
    currentUser?.role === 'admin' &&
    <ContentCreate />
  )
}

export default ContentCreatePage;