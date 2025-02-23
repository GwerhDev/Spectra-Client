import { useSelector } from "react-redux";
import { MyAccount } from "../../components/MyAccount/MyAccount";

const Profile = () => {
  const currentUser = useSelector(state => state.currentUser);

  return (
    currentUser &&
    <MyAccount />
  )
}

export default Profile;