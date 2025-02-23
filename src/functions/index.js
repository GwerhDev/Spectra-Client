/* -------------------CSS------------------- */

const defaultValue = { 
    style: {
        transform: '', 
        opacity: '', 
        filter: '', 
        scale: '', 
        overflowY: '',
        transitionDuration: '',
        transformOrigin: '',
        transformStyle: '',
        transitionTimingFunction: '',
        transformBox: '',
        transitionDelay: '',
        transitionProperty: '',
    },
    contains
};

function contains() {
    return;
}

export const $d = (e) => {
    return document.querySelector(e) || defaultValue
};

export const $gId = (e) => {
    return document.getElementById(e) || defaultValue
};

export const BodyCss= () => {
    return (
        $d('body').style.overflowY="auto"
    )
}

export function OptionProfile(option){
    $d(`#${option}Icon`).style.opacity='1'
    $d(`#${option}Icon`).style.filter='grayscale(.2)'
    $d(`#${option}Icon`).style.filter='drop-shadow(0px 0px 8px rgb(255, 255, 255))'
}

