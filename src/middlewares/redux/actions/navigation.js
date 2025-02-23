import { SET_BACK_ROUTE, SET_NAVIGATION_DASHBOARD, SET_NAVIGATION_FAVORITES, SET_NAVIGATION_ACCOUNT, SET_NAVIGATION_SUBSCRIPTION } from "../../misc";

export function setBackRoute(route) {
  return {
    type: SET_BACK_ROUTE,
    payload: route
  }
};

export function resetBackRoute() {
  return {
    type: SET_BACK_ROUTE,
    payload: null
  }
};

export function setNavigationAccount(option) {
  return {
    type: SET_NAVIGATION_ACCOUNT,
    payload: option
  } 
};

export function setNavigationFavorites(option) {
  return {
    type: SET_NAVIGATION_FAVORITES,
    payload: option
  } 
};

export function setNavigationSubscription(option) {
  return {
    type: SET_NAVIGATION_SUBSCRIPTION,
    payload: option
  } 
};


export function setNavigationDashboard(option) {
  return {
    type: SET_NAVIGATION_DASHBOARD,
    payload: option
  }
};