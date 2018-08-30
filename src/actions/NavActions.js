import { NavigationActions } from 'react-navigation';

export const reduxNav = (routeName) =>
    dispatch => dispatch(NavigationActions.navigate({ routeName }));

export const reduxNavPop = () =>
    dispatch => dispatch(NavigationActions.back());
