import { useSelector } from "react-redux";
import { MyFavorites } from "../../components/MyFavorites/MyFavorites";

const Favorites = () => {
  const currentUser = useSelector(state => state.currentUser);

  return (
    currentUser &&
    <MyFavorites />
  )
}

export default Favorites;