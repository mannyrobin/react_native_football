import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import AppNavigation from './components/navigation/AppNavigation';

firebase.initializeApp({
    apiKey: 'AIzaSyCcakTGid7qSMtgUi91_T0yFjlXAzAAAVI',
    authDomain: 'bet-masters.firebaseapp.com',
    databaseURL: 'https://bet-masters.firebaseio.com',
    projectId: 'bet-masters',
    storageBucket: 'gs://bet-masters.appspot.com',
    messagingSenderId: '951196383769'
});

export default class App extends Component {

    componentDidMount() {
        this.handleNotifications();
    }

    componentWillUnmount() {
        this.notificationDisplayedListener();
        this.notificationListener();
    }

    handleNotifications() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const enabled = firebase.messaging().hasPermission();
                if (enabled) {
                    console.log('has permissions');

                    const FCM = firebase.messaging();

                    FCM.getToken().then(token => {
                        firebase.database().ref(`/usersDb/${user.uid}`).update({ notificationToken: token });
                    });

                    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
                        // Process your notification as required
                        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
                        console.log('displayed', notification);
                    });
                    this.notificationListener = firebase.notifications().onNotification((notification) => {
                        // Process your notification as required
                        //I think this is called when receiving an notification while app is opened
                        console.log('received', notification);
                    });
                } else {
                    firebase.messaging().requestPermission()
                        .then((result) => {
                            console.log('accepted permisions + ', result);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            }
        });
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
