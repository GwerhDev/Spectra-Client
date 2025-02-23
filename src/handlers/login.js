import { useDispatch } from 'react-redux';
import { setOption } from '../middlewares/redux/actions';
import OptionCanvas from '../functions';

export function HandleOnClickValue(e){
    const dispatch = useDispatch()
    return (
        dispatch(setOption(e.target.id)),
        OptionCanvas(e.target.id)
    )}