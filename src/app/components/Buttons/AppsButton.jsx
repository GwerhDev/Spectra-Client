import s from './AppsButton.module.css';
import appMenuIcon from '../../../assets/images/svg/appmenu-icon.svg';
import { $d, $gId } from '../../../functions';

export const AppsButton = () => {
  document.addEventListener('mouseup', function (e) {
    var effectLogo = $gId('effect-logo');
    var container1 = $gId('app-option-1');
    var container2 = $gId('app-option-2');
    var container3 = $gId('app-option-3');
    if (!$d("#logo-button").contains(e.target) && !$d("#apps-container").contains(e.target)) {
      $d("#logo-button").style.backgroundColor = "transparent";
      $d("#apps-container").style.display = "none";
      effectLogo.style.width = '100px';
      container1.style.transform = 'translateX(-210px)';
      container2.style.transform = 'translateX(-210px)';
      container3.style.transform = 'translateX(-210px)';
      container1.style.scale = '0';
      container2.style.scale = '0';
      container3.style.scale = '0';
    }
    return;
  });

  function handleClick() {
    var container1 = $gId('app-option-1');
    var container2 = $gId('app-option-2');
    var container3 = $gId('app-option-3');
    $d("#logo-button").style.backgroundColor = "#171717";
    $d("#apps-container").style.display = "flex";
    container1.style.transform = 'translateX(0)'
    container2.style.transform = 'translateX(0)'
    container3.style.transform = 'translateX(0)'
    container1.style.scale = '1'
    container2.style.scale = '1'
    container3.style.scale = '1'
  };

  return (
    <button className={s.container} id="apps-button" onClick={handleClick}>
      <img src={appMenuIcon} alt="" />
    </button>
  )
}
