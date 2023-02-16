/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { BgImage } from '../../component/ImageContainer';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Feather from 'react-native-vector-icons/dist/Feather';
import HijriDatePickerAndroid from 'react-native-hijri-date-picker-android';
import { PrayerTimeComp } from '../../component/PrayerTime';
import { useIsFocused } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import PushNotification from 'react-native-push-notification';

const PrayerScreen = ({ route }) => {
  const [currentMonth, setCurrMonth] = useState((new Date().getMonth() + 1));
  const [currentDate, setCurrentDate] = useState(new Date());
  const [longitude, setLongitue] = useState('');
  const [latitude, setLatitue] = useState('');

  const [hijriDate, setHijriDate] = useState('');
  const [hijriMonth, setHijriMonth] = useState('');
  const [hijriYear, setHijriYear] = useState('');
  const [activHijri, setActivHijri] = useState('01-01-1400');

  // const [currentMonth, setCurrMonth] = useState('')

  const date = new Date();
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();

  if (dd < 10) { dd = '0' + dd; }
  if (mm < 10) { mm = '0' + mm; }

  const formattedToday = dd + '-' + mm + '-' + yyyy;

  const getHijriDate = async () => {
    try {
      const response = await fetch(`http://api.aladhan.com/v1/gToH?date=${formattedToday}`);
      const json = await response.json();
      // setData(json.data);
      setHijriDate(json.data.hijri.day);
      setHijriMonth(json.data.hijri.month.en);
      setHijriYear(json.data.hijri.year);
      setActivHijri(`${json.data.hijri.day}-${json.data.hijri.month.number > 10 ? json.data.hijri.month.number : '0' + json.data.hijri.month.number}-${json.data.hijri.year}`);
      // console.log('hijri response>>>',JSON.stringify(json));
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
      console.log({ hijriDate, hijriMonth, hijriYear });
    }
  };

  useEffect(() => {
    let latitude, longitude;

    Geolocation.getCurrentPosition(
      info => {
        const { coords } = info;

        latitude = coords.latitude;
        longitude = coords.longitude;

        setLatitue(latitude);
        setLongitue(longitude);
      },
      error => console.log(error),
      {
        enableHighAccuracy: false,
        // timeout: 2000,
        maximumAge: 3600000,
      },
    );

  }, [Geolocation, currentMonth]);
  useEffect(() => {
    var date = new Date();
    setCurrMonth((date.getMonth() + 1));
    // setNotification();
    // PushNotification.getChannels(function (channel_ids) {
    //   console.log("channel_ids",channel_ids); // ['channel_id_1']
    // });
    getHijriDate();
  }, []);
  const setNotification = () => {
    // Notifications.schduleNotification(new Date(Date.now() + 5 * 1000));
  };

  // console.log(route.params)
  const calendar = () => {

    let options = {
      date: new Date(),
      minDate: new Date(new Date().getTime() - 1 * 30 * 24 * 60 * 60 * 1000),
      maxDate: new Date(new Date().getTime() + 1 * 30 * 24 * 60 * 60 * 1000),
    };
    let stringOptions = {
      date: activHijri,
      minDate: '01-01-1400',
      maxDate: '29-12-1500',
    };
    //mode:"no_arrows" hide the arrows at the bar of the calendar
    //weekDayLabels, override the default day labels at the calendar
    let moreOptions = {
      date: activHijri,
      minDate: '01-01-1400',
      maxDate: '29-12-1500',
      mode: 'no_arrows',
      weekDayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    };
    //accepts option  dates with date objects or strings in the following format ['dd-MM-yyyy']
    HijriDatePickerAndroid.open(stringOptions).then(function (result) {
      if (result.action == HijriDatePickerAndroid.dismissedAction) {
        console.warn('Dismissed');
      } else {
        let { year, day, month } = result;
        console.warn(
          'Hijri Date: ' + day + '/' + (month + 1) + '/' + year + '/',
        );
      }
    });

    //convert string Hijri date ['dd-MM-yyyy'] to a gregorian timestamp
    HijriDatePickerAndroid.convertHijriDateToGregorianDate('12-7-1438').then(
      function (result) {
        console.warn('Gregorian Timestamp' + JSON.stringify(result));
      },
    );

    //convert gregorian date object to hijri {year,month,day}
    HijriDatePickerAndroid.convertGregorianDateToHijriDate(new Date()).then(
      function ({ year, day, month }) {
        console.warn('Hijri Date: ' + day + '/' + month + 1 + '/' + year + '/');
      },
    );
  };


  const rightHandler = () => {
    console.log(currentDate);
    let nextDate = new Date(+currentDate);
    let dateValue = nextDate.getDate() + 1;
    console.log("Setting the 'date' part to " + dateValue);
    nextDate.setDate(dateValue);
    console.log('result date>>', nextDate)
    setCurrentDate(nextDate);
  };
  const leftHandler = () => {

    if (currentMonth > 0) {
      setCurrMonth(currentMonth - 1);
      if (currentMonth < 1 || currentMonth === 1) {
        setCurrMonth(12);
      }

    }
    console.log(currentMonth);





  };

  return (
    <BgImage>
      <View style={styles.container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            top: 20,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 22,
              height: 27,
              // fontWeight: '500',
              lineHeight: 26,
            }}>
            Salah Time
          </Text>

          <TouchableOpacity onPress={calendar}>
            <AntDesign
              name="calendar"
              style={{ color: '#a7c829', fontSize: 22 }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            top: 60,
          }}>
          <TouchableOpacity
            style={styles.box}
          // onPress={}
          >
            <Entypo name="chevron-left" size={25} color="#ffffff" onPress={() => leftHandler()} />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                // fontWeight: '400',
                textAlign: 'center',
                lineHeight: 20,
              }}>
              {currentDate.toLocaleDateString()}
            </Text>
            <Text
              style={{
                color: '#9d9d9d',
                fontSize: 16,
                // fontWeight: '400',
                lineHeight: 20,
                textAlign: 'center',
                top: 2,
              }}>
              {hijriDate + ' ' + hijriMonth + ' ' + hijriYear}
            </Text>
          </View>
          <TouchableOpacity style={styles.box1}>
            <Entypo name="chevron-right" size={22} color="#ffffff" onPress={() => rightHandler()} />
          </TouchableOpacity>
        </View>
        <PrayerTimeComp
          currentLatitude={latitude}
          currentLongitude={longitude}
          currentMonth={currentMonth}
          textDesign={{ marginTop: 90 }}
        />
        {/* <Text style={{color:'#fff'}}>{activHijri}</Text> */}

        {/*
          <View style={styles.calender}>
            <View style={styles.rowData}>
              <Text style={{fontSize: 15, color: '#9D9D9D'}}>Namaz</Text>
              <Text style={{fontSize: 15, color: '#9D9D9D'}}>Athaan Time</Text>
              <Text style={{fontSize: 15, color: '#9D9D9D'}}>Iqamah Time</Text>
            </View>
            <View style={styles.horizoLine}></View>

            <View style={styles.rowData}>
              <Text style={styles.calanderText}>Fajr</Text>
              <Text style={styles.calanderText}>09:09</Text>
              <Text style={styles.calanderText}>06:00 AM</Text>
            </View>
            <View style={styles.rowData}>
              <Text style={{color: 'white', fontSize: 15, marginRight: 20}}>
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
              <Text style={[styles.calanderText,{marginRight:65}]}>23:55</Text>
              <Text style={styles.calanderText}>06:10 AM</Text>
            </View>
            <View style={styles.rowData}>
              <Text style={{fontSize: 16, color: '#A7C829'}}>Dhuhr</Text>
              <Text style={{fontSize: 16, color: '#A7C829', paddingRight: 11}}>
                12:00
              </Text>
              <Text style={{fontSize: 17, color: '#A7C829', paddingLeft: 8}}>
                06:00 AM
              </Text>
            </View>
            <View style={styles.rowData}>
              <Text style={styles.calanderText}>Asr</Text>
              <Text style={styles.calanderText}>12:99</Text>
              <Text style={styles.calanderText}>06:00 AM</Text>
            </View>
            <View style={styles.rowData}>
              <Text style={styles.calanderText}>Maghrib</Text>
              <Text style={{color: 'white', paddingRight: 38, fontSize: 16}}>
                12:00
              </Text>
              <Text style={styles.calanderText}>06:00 AM</Text>
            </View>
            <View style={styles.rowData}>
              <Text style={styles.calanderText}>Isha</Text>
              <Text style={{color: 'white', fontSize: 16, paddingRight: 10}}>
                23.89
              </Text>
              <Text style={styles.calanderText}>06:00 AM</Text>
            </View>
            <View style={styles.horizoLine}></View>
            <View style={[styles.rowData, {marginBottom: 15}]}>
              <Text style={styles.calanderText}>Qiyam</Text>
              <Text style={styles.calanderText}></Text>
              <Text style={styles.calanderText}>01:32 AM</Text>
            </View>
            <View style={[styles.rowData, {marginBottom: 15}]}>
              <Text style={styles.calanderText}>Sunset</Text>
              <Text style={{color: 'white', fontSize: 16, paddingRight: 34}}>
                04:32 AM
              </Text>
              <Text style={styles.calanderText}>04:32 AM</Text>
            </View>
          </View> */}
      </View>
    </BgImage>
  );
};

export default PrayerScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  showAll: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    // left: 20,
  },
  box1: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    // right: 20,
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
    height: 400,
    marginTop: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,

    borderRadius: 10,
  },
  verseCard: {
    width: '100%',
    height: 220,
    marginTop: 20,
    backgroundColor: '#515151',
    padding: 20,
    borderRadius: 10,
  },
  calanderText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
  rowData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  ribbon: {
    width: '100%',
    marginTop: 10,
    backgroundColor: '#515151',
    padding: 10,
    borderRadius: 10,
  },
});
