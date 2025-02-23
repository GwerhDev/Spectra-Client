import ContentList from "../../components/Admin/ContentList/ContentList";
import { useSelector } from 'react-redux';

const ContentListPage = () => {
  const currentUser = useSelector(state => state.currentUser);

  return (
    currentUser?.role === 'admin' &&
    <ContentList />
  )
}

export default ContentListPage;