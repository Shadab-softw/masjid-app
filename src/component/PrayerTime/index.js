/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { View, Text, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/dist/Feather';
import CONSTANT from '../../constants';
import classifyPoint from 'robust-point-in-polygon';
import ReactNativeAN from 'react-native-alarm-notification';
import PushNotification from 'react-native-push-notification';
import Notifications from '../../util/Notications';

const PrayerTimeComp = ({ currentLongitude, currentLatitude, currentMonth, textDesign }) => {
  const [worldPrayerTime, setWorldPrayerTime] = useState([]);
  const [salahTimimg, setSalahTiming] = useState([]);
  const [todaySalah, setTotaySalah] = useState(null);
  const [localPrayerTime, setLocalPrayerTime] = useState([]);

  const [allAlarms, setAllAlarms] = useState([]);
  const [count, setCount] = useState(0);
  let lastId = 0;

  // console.log('salahn', salahTimimg);
  useEffect(() => {
    getWorldPraytime();
    getLocalPraytime();

  }, [getWorldPraytime, currentLongitude, currentLatitude, currentMonth]);



  useEffect(async () => {
    try {
      PushNotification.getScheduledLocalNotifications(rn => {
        // console.log('SN --- ', rn);
      });
      PushNotification.removeAllDeliveredNotifications();
      PushNotification.cancelAllLocalNotifications();
      let dstetime = new Date(Date() + 10 * 1000);
      // Notifications.schduleNotification(dstetime, '', 'key', 'Neend se behtar namaz h!');

    } catch (ex) {
      console.log('Error', ex);
    }

  }, []);


  useEffect(async () => {
    // console.log("todaySalah",salahTimimg)
    if (salahTimimg) {
      salahTimimg.map((item, index) => {
        lastId++;
        let date = item.date.gregorian.date;

        let dateA = date.split('-');
        // console.log("date",dateA[2]+"/"+dateA[1]+"/"+dateA[0])
        let finalDate = dateA[2] + '/' + dateA[1] + '/' + dateA[0];
        let timestamp = item.date.timestamp;
        Object.keys(item.timings).forEach((key) => {
          if (key !== 'Imsak' && key !== 'Sunrise' && key !== 'Sunset' && key !== 'Midnight') {
            let time = item.timings[key].split(' ');
            let datetime = date + ' ' + time[0] + ':00';
            // console.log("key",key, date + " " + time[0]+":00")
            // setAzan(timestamp, time[0], key, finalDate)
          }
        });
        // console.log("item", date)
      });
    }

  }, [todaySalah]);

  const setAzan = async (date, time, key, dtate1) => {
    let today = new Date().getTime();
    // console.log("time",time)
    time = time.split(':');

    dtate1 = dtate1 + ' ' + time[0] + ':' + time[1] + ':00';
    // console.log("time",dtate1)
    let dstetime = new Date(dtate1);
    // dstetime.setHours(timeHm[0])
    // dstetime.setMinutes(timeHm[1])
    // dstetime.setSeconds(1)
    // console.log("setAzan",dstetime)
    // let timeHm = time.split(":")
    // console.log("dstetime", dstetime.getTime())
    const fireDate = dstetime;
    if (dstetime.getTime() > today) {
      // console.log("setAzan", fireDate, dtate1)
      PushNotification.getScheduledLocalNotifications((data) => {
        if (data.length > 0) {
          data.map((item) => {
            if (item.data.dtate1 !== dtate1) {
              // Notifications.schduleNotification(fireDate, dtate1, key, 'Neend se behtar namaz h!');
            }
          });
        } else {

          // Notifications.schduleNotification(fireDate, dtate1, key, 'Neend se behtar namaz h!');
        }
        //

      });

    }

    //ReactNativeAN.parseDate(new Date(Date.now() +5* 30000));     // set the fire date for 1 second from now
    // console.log("setAzan", fireDate)
    // if (lastId === 1) {
    // console.log("fireDate", fireDate)

    // const alarmNotifData = {
    //   title: key + " Adhan time",
    //   message: "Adhan time",
    //   channel: "my_channel_id",
    //   small_icon: "ic_launcher",
    //   sound_name: 'adhan.mp3',
    //   schedule_type: 'once',
    //   has_button: true,
    //   auto_cancel: true,
    //   data: {foo: "bar"},
    // };
    // const alarm = await ReactNativeAN.scheduleAlarm({...alarmNotifData, fire_date: fireDate});

    // }
  };

  const getWorldPraytime = async () => {
    var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    var checkLocation = classifyPoint(CONSTANT.App.BOUNDRIES, [currentLongitude, currentLatitude]);
    // console.log("checkLocation", checkLocation)
    let lat = currentLatitude;
    let lng = currentLongitude;
    if (checkLocation === 0 || checkLocation === -1) {
      lat = '40.7337316';//40.7337316,-74.0710915
      lng = '-74.0710915';
    }
    try {
      // console.log('world time>>>>',`http://api.aladhan.com/v1/calendar?latitude=${lat}&longitude=${lng}&method=2&month=${currentMonth}&year=2022`)
      const result = await fetch(`http://api.aladhan.com/v1/calendar?latitude=${lat}&longitude=${lng}&method=2&month=${currentMonth}&year=2022`, {
        method: 'get',
      });
      const response = await result.json();
      if (response.code === 200) {
        let date = new Date();
        let ddate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        let today = ddate + ' ' + (mS[currentMonth - 1]) + ' ' + date.getFullYear();
        // console.log('today>>>>',today)
        let find = response.data.find(x => x.date.readable === today);
        // console.log('response.data>>>>', JSON.stringify(response.data,null,2));
        setSalahTiming(response.data);
        if (find) {
          setTotaySalah(find.timings);
        }
        response.data.map(item => {
          setWorldPrayerTime(item.timings);
        });
      }
    }
    catch (err) {
      console.log(err.message);
    }
  };
  // local prayer timing
  const getLocalPraytime = async () => {
    try {
      // const result = await fetch("https://community.sadathussain.com/api/salah-timing", {
      const result = await fetch('http://app.altawheedjc.org/api/salah-timing', {
        method: 'get',
      });
      const response = await result.json();
      // console.log('ssss>>>>',response.data);
      setLocalPrayerTime(response.data);
    }
    catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <View style={[styles.calender, textDesign]}>
        <View style={styles.rowData}>
          <Text style={{ fontSize: 15, color: '#9D9D9D' }}>Salaah</Text>
          <Text style={{ fontSize: 15, color: '#9D9D9D' }}>Athaan Time</Text>
        </View>
        <View style={styles.horizoLine} />

        <View style={styles.rowData}>
          <Text style={styles.calanderText}>Fajr</Text>
          <Text style={styles.calanderText}>
            {/* /{worldPrayerTime.Fajr} */}
            {/* {todaySalah?.Fajr} */}
            {localPrayerTime.fajr_azaan_time}
          </Text>
        </View>
        {/* <View style={styles.rowData}>
          <Text style={{ color: 'white', fontSize: 15, marginRight: 20 }}>
            Sunrise
            <Feather
              name="sun"
              style={{
                position: 'absolute',
                color: '#9D9D9D',
                width: 15.58,
                height: 15.58,
                left: 23,
              }}
            />
          </Text>
          <Text style={styles.calanderText}>{todaySalah?.Sunrise}</Text>
        </View> */}
        <View style={styles.rowData}>
          {/* '#A7C829' */}
          <Text style={{ fontSize: 16, color: '#fff' }}>Dhuhr</Text>
          <Text style={{ fontSize: 16, color: '#fff' }}>
            {/* {worldPrayerTime.Dhuhr} */}
            {/* {todaySalah?.Dhuhr} */}
            {localPrayerTime.zuhar_azaan_time}
          </Text>
        </View>
        <View style={styles.rowData}>
          <Text style={styles.calanderText}>Asr</Text>
          <Text style={styles.calanderText}>
            {/* {worldPrayerTime.Asr} */}
            {/* {todaySalah?.Asr} */}
            {localPrayerTime.asar_azaan_time}
          </Text>

        </View>
        <View style={styles.rowData}>
          <Text style={styles.calanderText}>Maghrib</Text>
          <Text style={{ color: 'white', fontSize: 16 }}>
            {/* {worldPrayerTime.Maghrib} */}
            {/* {todaySalah?.Maghrib} */}
            {localPrayerTime.magrib_azaan_time}
          </Text>
        </View>
        <View style={styles.rowData}>
          <Text style={styles.calanderText}>Isha</Text>
          <Text style={{ color: 'white', fontSize: 16 }}>
            {/* {worldPrayerTime.Isha} */}
            {/* {todaySalah?.Isha} */}
            {localPrayerTime.isha_azaan_time}

          </Text>
        </View>
        <View style={styles.horizoLine} />
        {/* <View style={[styles.rowData, { marginBottom: 15 }]}>
          <Text style={styles.calanderText}>Sunset</Text>
          <Text style={styles.calanderText}>{todaySalah?.Sunset}</Text>
        </View> */}
      </View>
    </>

  );
};


export { PrayerTimeComp };

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    top: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  today: {
    padding: 13,
  },
  horizoLine: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: '#9D9D9D',
    marginTop: 10,
  },
  styleIcon: {
    width: 80,
    height: 80,
  },
  showAll: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  paginText: {
    color: '#888',
  },
  textActive: {
    color: '#FFFFFF',
  },
  text: {
    // fontWeight: '600',
    fontSize: 20,
    color: '#FFFFFF',
    opacity: 0.9,
    lineHeight: 24,
    // fontStyle: 'normal',
  },
  calender: {
    width: '100%',
    height: 300,
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,

    borderRadius: 10,
  },
  verseCard: {
    width: '100%',
    height: 220,
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 10,
  },
  calanderText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  rowData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  ribbon: {
    width: '100%',
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 10,
    borderRadius: 10,
  },
  paypal: {
    width: '100%',
    height: 50,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
  },
});
