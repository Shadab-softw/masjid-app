/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';

import CONSTANT from '../../constants';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { getChatApi } from '../../services/chatApi';
import { useAuth } from '../../hook/useAuth';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { changeScreen } from './action';import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    backgroundColor: ' rgba(0, 6, 16, 1)',
    height: 80,
    justifyContent: 'space-around',
    alignItems: 'center',
    // borderTopLeftRadius:30,
    // borderTopRightRadius:30,
    paddingBottom: 20,
    paddingVertical: 20,
  },
});

const CustomTabBar = ({state, descriptors, navigation}) => {
  useEffect(async()=>{
    messaging().setBackgroundMessageHandler(async remoteMessage => {
     navigation.navigate(CONSTANT.App.screenNames.Chat, { imamId: remoteMessage.data.sender_id})
 
 
   });
   
     messaging().onMessage(async remoteMessage => {
 
       console.log('A new FCM message arrived!', JSON.stringify(remoteMessage)); //open;
       // navigation.navigate(CONSTANT.App.screenNames.Chat)
 
     });
     messaging().onNotificationOpenedApp(async remoteMessage => {
       navigation.navigate(CONSTANT.App.screenNames.Chat, { imamId: remoteMessage.data.sender_id})
     });
   
     messaging().getInitialNotification().then(async remoteMessage =>{ //when app closed
      //  Alert.alert(
      //    'Notification caused app to open from quit state:',
      //    JSON.stringify(remoteMessage),
      //  )
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
  return (
    <View style={styles.tab}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        {
          /* const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                        const icon = options. */
        }
        const isFocused = state.index === index;
        let Icon = CONSTANT.App.staticImages.home;
        let tabLable = 'Home';

        if (route.name === 'home') {
          Icon = isFocused
            ? CONSTANT.App.staticImages.homeA
            : CONSTANT.App.staticImages.home;
          tabLable = 'Home';
        } else if (route.name === 'dashboard') {
          Icon = CONSTANT.App.staticImages.dashboard;
          tabLable = 'Donate';
        } else if (route.name === 'prayer') {
          Icon = isFocused
            ? CONSTANT.App.staticImages.prayerA
            : CONSTANT.App.staticImages.prayer;
          tabLable = 'Prayer';
        } else if (route.name === 'event') {
          Icon = isFocused
            ? CONSTANT.App.staticImages.eventsA
            : CONSTANT.App.staticImages.events;
          tabLable = 'Event';
        } else if (route.name === 'more') {
          Icon = isFocused
            ? CONSTANT.App.staticImages.moreA
            : CONSTANT.App.staticImages.more;

          tabLable = 'More';
        }

        const onPress = () => {
          if (route.name === 'home') {
            return navigation.navigate(CONSTANT.App.tabMenu.homeTAb, {
              screen: CONSTANT.App.screenNames.home,
              initial: false,
            });
          } else if (route.name === 'dashboard') {
            navigation.navigate(CONSTANT.App.tabMenu.dashTab);
          } else if (route.name === 'prayer') {
            return navigation.navigate(CONSTANT.App.tabMenu.prayerTab);
          } else if (route.name === 'event') {
            return navigation.navigate(CONSTANT.App.tabMenu.eventTab, {
              screen: CONSTANT.App.screenNames.event,
              initial: false,
            });
          } else if (route.name === 'more') {
            return navigation.navigate(CONSTANT.App.tabMenu.moreTab, {
              screen: CONSTANT.App.screenNames.MoreScreen,
              initial: false,
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              width: 45,
              height: 45,
            }}
            key={route.key}>
            <Image
              source={Icon}
              style={{
                height: '40%',
                width: '40%',
              }}
            />
            <Text
              style={{color: isFocused ? '#A7C829' : '#9D9D9D', fontSize: 12}}>
              {tabLable}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
