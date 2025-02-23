import s from './Loader.module.css';
import { motion } from 'framer-motion';

export const Loader = (props) => {
  const { message, width } = props;

  return (
    <motion.div
      className={s.container} 
      style={{ width }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <span className={s.loader} style={{ width }}></span>
      {
        message && <p className={s.message}>{message}</p>
      }
    </motion.div>
  )
}
