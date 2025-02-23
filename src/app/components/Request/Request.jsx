import s from './Request.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetOption } from '../../../middlewares/redux/actions';
import { toTop } from '../../../functions/toTop';


export const Request = (props) => {
  const { title, route, icon } = props;
  const dispatch = useDispatch();

  function handleOption() {
    toTop();
    dispatch(resetOption());
    return;
  }

  return (
    <div className={s.reqContainer}>
      <Link to={route}>
        <button className={s.crearPost} onClick={handleOption}>
          <img src={icon} alt="" height={"50px"}/>
          {title}
        </button>
      </Link>
    </div>
  )
}