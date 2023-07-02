import React from 'react';
import Main from './src/screen/Main';
import store from './src/redux/store';
import {Provider} from 'react-redux';

const App = () => {
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
};

export default App;
