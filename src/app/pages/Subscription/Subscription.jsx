import { useSelector } from "react-redux";
import { MySubscription } from "../../components/MySubscription/MySubscription";

const Subscription = () => {
  const currentUser = useSelector(state => state.currentUser);

  return (
    currentUser &&
    <MySubscription />
  )
}

export default Subscription;