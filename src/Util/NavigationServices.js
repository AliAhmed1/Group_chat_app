import { StackActions, CommonActions } from "@react-navigation/native";

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(StackActions.push(routeName, params));
  //_navigator.navigate(routeName, params);
}

function navigate2(routeName, params) {
  _navigator.navigate(routeName, params);
}

function replace(routeName, params) {
  _navigator.dispatch(StackActions.replace(routeName, params));
}

function push(routeName, params) {
  _navigator.dispatch(StackActions.push(routeName, params));
}

function pop(number = 1) {
  const popAction = StackActions.pop(number);
  _navigator.dispatch(popAction);
}

function popToTop() {
  _navigator.dispatch(StackActions.popToTop());
}

function getNavigator() {
  return _navigator;
}

function reset(routeName) {
  // _navigator.dispatch(
  //   StackActions.reset({
  //     index: 0,
  //     actions: [NavigationActions.navigate({ routeName })],
  //   }),
  // );

  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name: routeName }],
  });
  _navigator.dispatch(resetAction);
}

function getCurrentRoute() {
  //const nav = _navigator.state.nav;
  //console.log("nav", _navigator);
  /*
  if (Array.isArray(nav.routes) && nav.routes.length > 0) {
    return getCurrentRoute(nav.routes[nav.index]);
  } else {
    return nav.routeName;
  }
*/
  /*
  while (route.routes) {
    route = route.routes[route.index];
  }
  return route.routeName;
  */
}

// add other navigation functions that you need and export them

export default {
  replace,
  push,
  pop,
  setTopLevelNavigator,
  getCurrentRoute,
  getNavigator,
  navigate,
  reset,
  popToTop,
  navigate2,
};
