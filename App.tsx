import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';

import {store, persistor} from './src/reduxSaga/store';
import Main from './src/app/index';

import {PersistGate} from 'redux-persist/integration/react';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);

LogBox.ignoreAllLogs();

const App = () => {
  
  console.log('statusBarHeight: ', StatusBar.currentHeight);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar
          barStyle="light-content"
          animated={true}
          backgroundColor="black"

          // hidden={true}
        />
        <Main />
      </PersistGate>
    </Provider>
  );
};

export default App;
