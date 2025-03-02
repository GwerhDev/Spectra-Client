import s from "./LoginNhexa.module.css";
import laruinahubIcon from "../../../assets/images/svg/spectra-logo.svg";
import { URL_CLIENT, URL_NHEXA_ACCOUNTS } from "../../../middlewares/config";

export default function LoginNhexa() {
  return (
    <div className={s.container}>
      <a className={s.button} href={`${URL_NHEXA_ACCOUNTS}/login?callback=${encodeURIComponent(URL_CLIENT)}`}>
        <span className={s.spanIcon}>
          <img
            src={laruinahubIcon}
            height="20px"
            className={s.img}
            alt=""
          />
        </span>
        <span className={s.spanText}>
          NHEXA
        </span>
      </a>
    </div>
  );
}
