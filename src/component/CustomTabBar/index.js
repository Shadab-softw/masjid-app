/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import React, {useEffect,useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
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
  const [loading,setLoading] = useState(true);

  useEffect(async()=>{
    messaging().setBackgroundMessageHandler(async remoteMessage => {
    //  Alert.alert('Message handled in the background!', JSON.stringify(remoteMessage));
    //  console.log('Message handled in the background!', JSON.stringify(remoteMessage));
     
     navigation.navigate(CONSTANT.App.screenNames.Chat, { imamId: remoteMessage.data.sender_id})
 
 
   });
   
     messaging().onMessage(async remoteMessage => {
      //  Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage)); //open 
 
       console.log('A new FCM message arrived!', JSON.stringify(remoteMessage)); //open;
       // navigation.navigate(CONSTANT.App.screenNames.Chat)
 
     });
     messaging().onNotificationOpenedApp(async remoteMessage => {
 
      //  console.log('onNotificationOpenedApp!', JSON.stringify(remoteMessage));
      //  Alert.alert('onNotificationOpenedApp!', JSON.stringify(remoteMessage));
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
         {/* console.log("route>>>",JSON.stringify(route,null,2)); */}
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
        } else if (route.name === 'Prayer Timings') {
          Icon = isFocused
            ? CONSTANT.App.staticImages.prayerA
            : CONSTANT.App.staticImages.prayer;
          tabLable = 'Prayer Timings';
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
        } else if (route.name === 'ask_Imam') {
          Icon = isFocused
            ? CONSTANT.App.staticImages.moreA
            : CONSTANT.App.staticImages.more;

          tabLable = 'imamAsk';
        } else if (route.name === 'service') {
          Icon = isFocused
            ? CONSTANT.App.staticImages.moreA
            : CONSTANT.App.staticImages.more;

          tabLable = 'service';
        } else if (route.name === 'new_Muslim') {
          Icon = isFocused
            ? CONSTANT.App.staticImages.moreA
            : CONSTANT.App.staticImages.more;

          tabLable = 'new_Muslim';
        } else if (route.name === 'weekend_School') {
          Icon = isFocused
            ? CONSTANT.App.staticImages.moreA
            : CONSTANT.App.staticImages.more;

          tabLable = 'weekend_School';
        } else if (route.name === 'marriage_Service') {
          Icon = isFocused
            ? CONSTANT.App.staticImages.moreA
            : CONSTANT.App.staticImages.more;

          tabLable = 'marriage_Service';
        } else if (route.name === 'ramdan_Service') {
          Icon = isFocused
            ? CONSTANT.App.staticImages.moreA
            : CONSTANT.App.staticImages.more;

          tabLable = 'ramdan_Service';
        } else if (route.name === 'funeral_Service') {
          Icon = isFocused
            ? CONSTANT.App.staticImages.moreA
            : CONSTANT.App.staticImages.more;

          tabLable = 'funeral_Service';
        } else if (route.name === 'news_letter') {
          Icon = isFocused
            ? CONSTANT.App.staticImages.moreA
            : CONSTANT.App.staticImages.more;

          tabLable = 'news_letter';
        } else if (route.name === 'general') {
          Icon = isFocused
            ? CONSTANT.App.staticImages.moreA
            : CONSTANT.App.staticImages.more;

          tabLable = 'general';
        } else if (route.name === 'consult_tab') {
          Icon = isFocused
            ? CONSTANT.App.staticImages.moreA
            : CONSTANT.App.staticImages.more;

          tabLable = 'consult_tab';
        }

        const onPress = () => {
          if (route.name === 'home') {
            return navigation.navigate(CONSTANT.App.tabMenu.homeTAb, {
              screen: CONSTANT.App.screenNames.home,
              initial: false,
            });
          } else if (route.name === 'dashboard') {
            {/* navigation.navigate(CONSTANT.App.tabMenu.dashTab); */}
             Linking.openURL('https://www.iatspayments.com/saaura/PA7849312A6546B5AB');
          } else if (route.name === 'Prayer Timings') {
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
          } else if (route.name === 'ask_Imam') {
            return navigation.navigate(CONSTANT.App.tabMenu.askImamTab, {
              screen: CONSTANT.App.screenNames.AskImamScreen,
              initial: false,
            });
          } else if (route.name === 'service') {
            return navigation.navigate(CONSTANT.App.tabMenu.serviceTab, {
              screen: CONSTANT.App.screenNames.services,
              initial: false,
            });
          } else if (route.name === 'new_Muslim') {
            return navigation.navigate(CONSTANT.App.tabMenu.newMuslimTab, {
              screen: CONSTANT.App.screenNames.NewMuslimScreen,
              initial: false,
            });
          } else if (route.name === 'weekend_School') {
            return navigation.navigate(CONSTANT.App.tabMenu.weekSchoolTab, {
              screen: CONSTANT.App.screenNames.WeekendSchoolScreen,
              initial: false,
            });
          } else if (route.name === 'marriage_Service') {
            return navigation.navigate(CONSTANT.App.tabMenu.marriageTab, {
              screen: CONSTANT.App.screenNames.MarriageServicesScreen,
              initial: false,
            });
          } else if (route.name === 'ramdan_Service') {
            return navigation.navigate(CONSTANT.App.tabMenu.ramzanTab, {
              screen: CONSTANT.App.screenNames.Ramdan,
              initial: false,
            });
          } else if (route.name === 'funeral_Service') {
            return navigation.navigate(CONSTANT.App.tabMenu.funeralTab, {
              screen: CONSTANT.App.screenNames.FuneralServicesScreen,
              initial: false,
            });
          } else if (route.name === 'news_letter') {
            return navigation.navigate(CONSTANT.App.tabMenu.newsLetterTab, {
              screen: CONSTANT.App.screenNames.NewsLetterScreen,
              initial: false,
            });
          } else if (route.name === 'general') {
            return navigation.navigate(CONSTANT.App.tabMenu.generalTab, {
              screen: CONSTANT.App.screenNames.GeneralAssemblyScreen,
              initial: false,
            });
          } else if (route.name === 'consult_tab') {
            return navigation.navigate(CONSTANT.App.tabMenu.consultTab, {
              screen: CONSTANT.App.screenNames.CunsultationScreen,
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
// {/* {profileimg} */}
        if(tabLable == "imamAsk" || tabLable == "service" || tabLable == "new_Muslim" || tabLable == "weekend_School" || tabLable == 'marriage_Service' || tabLable == 'ramdan_Service' || tabLable == 'funeral_Service' || tabLable == 'news_letter' || tabLable == 'general' || tabLable == 'consult_tab'){
          return (null);
        } else{
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
              style={{color: isFocused ? '#A7C829' : '#9D9D9D', fontSize: 12,textAlign:'center'}}>
              {tabLable}
            </Text>
          </TouchableOpacity>
        );
        }
       
      })}
    </View>
  );
};

export default CustomTabBar;
