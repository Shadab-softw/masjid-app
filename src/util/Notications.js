/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import CONSTANT from '../constants';

const navigation = useNavigation()

class Notifications {
    constructor() {
        
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                // console.log('TOKEN:', token);
            },
            onNotification: function (notification) {
                console.log('NOTIFICATION:', notification);
                notification.finish(PushNotificationIOS.FetchResult.NoData);
                navigation.navigate(CONSTANT.App.screenNames.Chat)
            },
            senderID: '530539756345',
            popInitialNotification: true,
            requestPermissions: true,
            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: false,
                sound: false,
            },
        });

        // PushNotification.createChannel(
        //   {
        //     channelId: 'reminders', // (required)
        //     channelName: 'Task reminder notifications', // (required)
        //     channelDescription: 'Reminder for any tasks',
        //   },
        //   () => {},
        // );
        // PushNotification.createChannel(
        //     {
        //         channelId: "reminders", // (required)
        //         channelName: "Azan", // (required)
        //         channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        //         playSound: true, // (optional) default: true
        //         soundName: "adhan", // (optional) See `soundName` parameter of `localNotification` function
        //         importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        //         vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        //     },
        //     (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        // );
        // PushNotification.getScheduledLocalNotifications(rn => {
        //     console.log('SN --- ', rn);
        // });
    }

    schduleNotification(date,dtate1, azan, message) {
        // console.log("date",date)
        PushNotification.localNotificationSchedule({
            channelId: 'reminders',
            title: azan,
            message: message,
            soundName: "adhan",
            sound: "adhan.mp3",
            date,
            userInfo:{dtate1}
        });
    }
}

export default new Notifications();