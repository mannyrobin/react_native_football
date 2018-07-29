import React, { Component } from 'react';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import AppNavigation from './components/navigation/AppNavigation';

export default class App extends Component {

      componentDidMount() {
        const config = {
            apiKey: 'AIzaSyCcakTGid7qSMtgUi91_T0yFjlXAzAAAVI',
            authDomain: 'bet-masters.firebaseapp.com',
            databaseURL: 'https://bet-masters.firebaseio.com',
            projectId: 'bet-masters',
            storageBucket: 'bet-masters.appspot.com',
            messagingSenderId: '951196383769'
        };
        firebase.initializeApp(config);
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <AppNavigation />
            </Provider>
        );
    }
}
