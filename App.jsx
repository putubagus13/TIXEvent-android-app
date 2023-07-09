import React from 'react';
import Main from './src/screen/Main';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';

import PushNotification from 'react-native-push-notification';
import {setToken} from './src/redux/reducers/deviceToken';

PushNotification.configure({
    onRegister: function (token) {
        console.log('TOKEN:', token);
        store.dispatch(setToken(token));
    },
});

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Main />
            </PersistGate>
        </Provider>
    );
};

export default App;
