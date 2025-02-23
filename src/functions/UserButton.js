import { $d, $gId } from ".";

const container0 = $gId('optionProfileBtn0');
const container1 = $gId('optionProfileBtn1');
const container2 = $gId('optionProfileBtn2');
const container3 = $gId('optionProfileBtn3');
const container4 = $gId('optionProfileBtn4');
const container5 = $gId('optionProfileBtn5');
const container6 = $gId('optionProfileBtn6');
const containerUl = $d('.liProfileMenuDisplay');

export function userButtonEnter() {
    $d(`#profile-button`).style.backgroundColor = '#171717';
    $d(`#profile-button`).style.width = '100%';
    $d(`#username`).style.width = '100px';
}

export function userButtonLeave() {
    document.addEventListener('mouseup', function (e) {
        if (!container0?.contains(e.target) &&
            !container1?.contains(e.target) &&
            !container2?.contains(e.target) &&
            !container3?.contains(e.target) &&
            !container4?.contains(e.target) &&
            !container5?.contains(e.target) &&
            !container6?.contains(e.target) &&
            !containerUl?.contains(e.target)) {
            $d(`#profile-button`).style.backgroundColor = 'transparent'
            $d(`#optionProfileBtn0`).style.transform = 'translateX(200px)'
            $d(`#optionProfileBtn1`).style.transform = 'translateX(200px)'
            $d(`#optionProfileBtn2`).style.transform = 'translateX(200px)'
            $d(`#optionProfileBtn3`).style.transform = 'translateX(200px)'
            $d(`#optionProfileBtn4`).style.transform = 'translateX(200px)'
            $d(`#optionProfileBtn5`).style.transform = 'translateX(200px)'
            $d(`#optionProfileBtn6`).style.transform = 'translateX(200px)'
            $d(`#optionProfileBtn0`).style.scale = '0'
            $d(`#optionProfileBtn1`).style.scale = '0'
            $d(`#optionProfileBtn2`).style.scale = '0'
            $d(`#optionProfileBtn3`).style.scale = '0'
            $d(`#optionProfileBtn4`).style.scale = '0'
            $d(`#optionProfileBtn5`).style.scale = '0'
            $d(`#optionProfileBtn6`).style.scale = '0'
            $d(`.liProfileMenuDisplay`).style.display = 'none'
            $d(`#ul-options-profile-menu`).style.width = '0';
            $d(`#username`).style.width = '0'
            $d(`#apps-button`).style.scale = '1'
            $d(`#apps-button`).style.opacity = '1'
            $d(`#profile-button`).style.paddingLeft = '0'
        }
    })
}

export function userButtonClick() {
    $d(`#profile-button`).style.backgroundColor = '#171717';
    $d(`#optionProfileBtn0`).style.transform = 'translateX(0)';
    $d(`#optionProfileBtn1`).style.transform = 'translateX(0)';
    $d(`#optionProfileBtn2`).style.transform = 'translateX(0)';
    $d(`#optionProfileBtn3`).style.transform = 'translateX(0)';
    $d(`#optionProfileBtn4`).style.transform = 'translateX(0)';
    $d(`#optionProfileBtn5`).style.transform = 'translateX(0)';
    $d(`#optionProfileBtn6`).style.transform = 'translateX(0)';
    $d(`#optionProfileBtn0`).style.scale = '1';
    $d(`#optionProfileBtn1`).style.scale = '1';
    $d(`#optionProfileBtn2`).style.scale = '1';
    $d(`#optionProfileBtn3`).style.scale = '1';
    $d(`#optionProfileBtn4`).style.scale = '1';
    $d(`#optionProfileBtn5`).style.scale = '1';
    $d(`#optionProfileBtn6`).style.scale = '1';
    $d(`#profile-button`).style.paddingLeft = '25px';
    $d(`.liProfileMenuDisplay`).style.display = 'block';
    $d(`#ul-options-profile-menu`).style.width = '195px';
    $d(`#profile-button`).style.opacity = '100%';
    $d(`#username`).style.width = '100px';
    $d(`#apps-button`).style.opacity = '0'
    $d(`#apps-button`).style.scale = '0'
}
