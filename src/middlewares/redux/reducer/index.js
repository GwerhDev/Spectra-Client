import { Navigation } from "../../../interfaces/Navigation";
import { Content } from "../../../interfaces/Content";
import {
    GET_INFO,
    GET_MEDIA,
    RESET_MEDIA,
    RESET_VISOR,
    OPTION,
    RESET_OPTION,
    GET_FAVORITES,
    GET_YT_SUBSCRIBERS,
    CURRENT_USER,
    GET_USER_DATA,
    GET_CATEGORIES,
    GET_GENRES,
    GET_MEDIATYPES,
    GET_SEARCH,
    GET_USERS,
    ERROR,
    GET_FULL_DETAIL,
    GET_PRODUCERS,
    GET_USER_PLAN,
    RESET_DETAILS_MEDIA,
    IS_LOGGED,
    SET_BACK_ROUTE,
    SET_NAVIGATION_DASHBOARD,
    SET_NAVIGATION_ACCOUNT,
    SET_NAVIGATION_FAVORITES,
    SET_NAVIGATION_SUBSCRIPTION,
    SET_EDITION,
    SET_PLAYER,
    SET_CONTENT_CATEGORIES,
    SET_CONTENT_GENRES,
    SET_CONTENT_MEDIATYPES,
    RESET_TOAST,
    ADD_FAVORITES,
    SET_CONTENT_PRODUCERS,
    UPDATE_CONTENT,
    CREATE_CONTENT,
} from "../../misc";
import { Player } from "../../../interfaces/Player";
import { Toast } from "../../../interfaces/Toast";


const initialState = {
    /*----------------Admin----------------*/
    YTSub: false,
    activePlan: false,

    /*----------------Auth----------------*/
    currentUser: null,
    isLogged: null,
    option: '',

    /*----------------Content----------------*/
    player: new Player(),
    toast: new Toast(),
    dbMediatypes: [],
    dbGenres: [],
    dbCategories: [],
    dbProducers: [],
    favorites: [],
    userList: [],
    mediaByCategory: [],
    contentList: [],
    infoDetailViewer: new Content(),
    fullDetail: {},
    error: "",
    /*------------Filter&Search------------*/
    searchedMedia: [],
    /*------------Navigation------------*/
    navigation: new Navigation(),
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case RESET_TOAST:
            return {
                ...state,
                toast: new Toast()
            };

        case SET_PLAYER:
            return {
                ...state,
                player: action.payload
            };

        case SET_EDITION:
            return {
                ...state,
                navigation: {
                    ...state.navigation,
                    editionActive: action.payload
                }
            };

        case SET_NAVIGATION_ACCOUNT:
            return {
                ...state,
                navigation: {
                    ...state.navigation,
                    account: {
                        option: action.payload
                    }
                }
            };

        case SET_NAVIGATION_FAVORITES:
            return {
                ...state,
                navigation: {
                    ...state.navigation,
                    favorites: {
                        option: action.payload
                    }
                }
            };

        case SET_NAVIGATION_SUBSCRIPTION:
            return {
                ...state,
                navigation: {
                    ...state.navigation,
                    subscription: {
                        option: action.payload
                    }
                }
            };

        case SET_NAVIGATION_DASHBOARD:
            return {
                ...state,
                navigation: {
                    ...state.navigation,
                    dashboard: {
                        option: action.payload
                    },
                }
            };

        case SET_BACK_ROUTE:
            return {
                ...state,
                navigation: {
                    ...state.navigation,
                    backRoute: action.payload,
                }
            };

        case IS_LOGGED:
            return {
                ...state,
                isLogged: action.payload
            };

        case ERROR:
            return {
                ...state,
                error: action.payload
            };

        case GET_USER_PLAN:
            return {
                ...state,
                activePlan: action.payload
            };

        case GET_FULL_DETAIL:
            return {
                ...state,
                fullDetail: action.payload
            };

        case CREATE_CONTENT:
            return {
                ...state,
                toast: action.payload.toast
            };

        case UPDATE_CONTENT:
            return {
                ...state,
                toast: action.payload.toast
            };

        case GET_USERS:
            return {
                ...state,
                userList: action.payload
            };

        case GET_PRODUCERS:
            return {
                ...state,
                dbProducers: action.payload
            };

        case GET_SEARCH:
            return {
                ...state,
                searchedMedia: action.payload
            };

        case GET_CATEGORIES:
            return {
                ...state,
                dbCategories: action.payload.categories,
                mediaByCategory: action.payload.contentByCategory
            };

        case GET_GENRES:
            return {
                ...state,
                dbGenres: action.payload
            };

        case GET_MEDIATYPES:
            return {
                ...state,
                dbMediatypes: action.payload
            };

        case SET_CONTENT_CATEGORIES:
            return {
                ...state,
                infoDetailViewer: {
                    ...state.infoDetailViewer,
                    categories: action.payload
                }
            };

        case SET_CONTENT_GENRES:
            return {
                ...state,
                infoDetailViewer: {
                    ...state.infoDetailViewer,
                    genres: action.payload
                }
            };

        case SET_CONTENT_MEDIATYPES:
            return {
                ...state,
                infoDetailViewer: {
                    ...state.infoDetailViewer,
                    mediatypes: action.payload
                }
            };

        case SET_CONTENT_PRODUCERS:
            return {
                ...state,
                infoDetailViewer: {
                    ...state.infoDetailViewer,
                    producers: action.payload
                }
            };

        /*----------------YT----------------*/
        case GET_YT_SUBSCRIBERS:
            return {
                ...state,
                YTSub: action.payload
            };

        /*----------------Auth----------------*/
        case CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload.userData,
                toast: action.payload.toast,
            };

        case GET_USER_DATA:
            return {
                ...state,
                currentUser: action.payload.userData,
                toast: action.payload.toast,
            };

        case OPTION:
            return {
                ...state,
                option: action.payload
            };

        case RESET_OPTION:
            return {
                ...state,
                option: ''
            };

        /*----------------Media----------------*/
        case GET_FAVORITES:
            return {
                ...state,
                favorites: action.payload
            };
        case ADD_FAVORITES:
            return {
                ...state,
                favorites: action.payload.favorites,
                toast: action.payload.toast,
            };

        case GET_MEDIA:
            return {
                ...state,
                contentList: action.payload.contentList,
            };

        case GET_INFO:
            return {
                ...state,
                infoDetailViewer: action.payload
            };

        case RESET_DETAILS_MEDIA:
            return {
                ...state,
                infoDetailViewer: new Content()
            };

        case RESET_MEDIA:
            return {
                ...state,
                infoDetailViewer: new Content(),
            };

        case RESET_VISOR:
            return {
                ...state,
                nextVisor: false
            };

        default:
            return { ...state };
    }
}