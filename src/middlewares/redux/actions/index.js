import { NEXT_VISOR, RESET_VISOR, OPTION, RESET_OPTION, RESET_IDYT } from '../../misc';

/*-----------------Auth----------------*/
export function setOption(e) {
    return ({
        type: OPTION,
        payload: e
    });
};

export function resetOption() {
    return ({
        type: RESET_OPTION
    });
};

/*----------------Media----------------*/

export function resetIdYT() {
    return {
        type: RESET_IDYT
    };
};

export function getNextVisor(index) {
    return {
        type: NEXT_VISOR,
        payload: index
    };
};

export function getResetVisor() {
    return {
        type: RESET_VISOR
    };
};
