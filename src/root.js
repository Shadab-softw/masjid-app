import React from 'react';
import {Text, View} from 'react-native';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {NavigationApp} from './navigation/navigation';
import rootReducer from './store';
// import './firebaseConfig'
const store = createStore(rootReducer, applyMiddleware(thunk));
console.disableYellowBox = true;
window.store=store;
const Root = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationApp />
      </SafeAreaProvider>
    </Provider>
  );
};

export default Root;
