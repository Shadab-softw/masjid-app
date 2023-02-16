/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */

import React, { useEffect, useState, useMemo, useReducer } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { AppStackNavigator, AuthNavigator, SplashNavigator } from './index';
import CONSTANT from '../constants';
import { ForgotPassScreen } from '../screen';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';
import { AuthContext } from '../context/authContext';
import { UserContext } from '../context/userContext';
import { useAuth } from '../hook/useAuth';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

export const NavigationApp = () => {

  const { auth, state } = useAuth();
  const RootStack = createStackNavigator()
  // console.log("aaaaaaaaa", auth)
  // console.log("bbbbbbb", state)
  const [initialRoute, setInitialRoute] = useState('Home');

  useEffect(async()=>{
    messaging().setBackgroundMessageHandler(async remoteMessage => {
     Alert.alert('Message handled in the background!', JSON.stringify(remoteMessage));
     console.log('Message handled in the background!', JSON.stringify(remoteMessage));
     
     navigation.navigate(CONSTANT.App.screenNames.Chat, { imamId: remoteMessage.data.sender_id})
 
 
   });
   
     messaging().onMessage(async remoteMessage => {
      //  Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage)); //open 
 
       console.log('A new FCM message arrived!', JSON.stringify(remoteMessage)); //open 
       // navigation.navigate(CONSTANT.App.screenNames.Chat)
 
     });
     messaging().onNotificationOpenedApp(async remoteMessage => {
 
       console.log('onNotificationOpenedApp!', JSON.stringify(remoteMessage));
       Alert.alert('onNotificationOpenedApp!', JSON.stringify(remoteMessage));
       navigation.navigate(CONSTANT.App.screenNames.Chat, { imamId: remoteMessage.data.sender_id})
 
 
     });
   
     messaging().getInitialNotification().then(async remoteMessage =>{ //when app closed
       Alert.alert(
         'Notification caused app to open from quit state:',
         JSON.stringify(remoteMessage),
       )
       if (remoteMessage) {
         console.log(
           'Notification caused app to open from quit state:',
           remoteMessage
         );
         navigation.navigate(CONSTANT.App.screenNames.Chat, { imamId: remoteMessage.data.sender_id}); // e.g. "Settings"
       }
       setLoading(false);
 
 
     })
   },[])
 
 
  function renderScrenn() {
    if (state.loading) {
      return <RootStack.Screen name={'Login'} component={SplashNavigator} />;
    }

    return state.user
      ? (
        <RootStack.Screen  name={"Home"}>
          {
            () => (
              <UserContext.Provider value={state.user}>
                <AppStackNavigator />
              </UserContext.Provider>
            )
          }

        </RootStack.Screen>
      ) : (
        <RootStack.Screen name={'AuthStack'} component={AuthNavigator} />
      )

  }

  return (


    <AuthContext.Provider value={auth}>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            animationEnabled: false,
          }}
        >
          {renderScrenn()}
        </RootStack.Navigator>
      </NavigationContainer>


    </AuthContext.Provider>


  )

}

// export default NavigationApp;