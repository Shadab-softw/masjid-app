/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */

import React, { useContext, useState, useEffect } from 'react';
import {
  ImageBackground,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Linking,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import CustomHeader from '../../component/CustomHeader';
import CONSTANT from '../../constants';
import { Button, Icon, Overlay } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomInput from '../../component/InputFileds';
import { CheckBox } from 'react-native-elements';
import CustomButton from '../../component/CustomButton';
import { ListComp } from '../../component/List';
import { useDispatch } from 'react-redux';
import { UpEventListComp } from '../../component/List/EventList';
import { BackgroundImage } from 'react-native-elements/dist/config';
import Carousel from 'react-native-looped-carousel';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Share from 'react-native-share';
import BannerImgComp from '../../component/Common/Banner';
import { AuthContext } from '../../context/authContext';
import ReadMoreComp from './ReadMore';
import Tts from 'react-native-tts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useIsFocused } from '@react-navigation/native';
import { PrayerTimeComp } from '../../component/PrayerTime';
import ReadMoreDesc from './ReadMoreDesc';
import HijriDate from '../../component/HijriDate';

// import {Button, Overlay} from 'react-native-elements';

const { width } = Dimensions.get('window');
// const height=width*100/100;  //60%
const height = 200;

const Data = [
  {
    id: 1,
    name: 'Prayer Timing',
    Icon_Name: 'clock',
    bgColor: '#A7C829',
    type: 'feather',
    screenNAme: CONSTANT.App.tabMenu.prayerTab,
  },
  {
    id: 2,
    name: 'Events',
    Icon_Name: 'calendar',
    bgColor: '#20BBD4',
    type: 'feather',
    screenNAme: CONSTANT.App.tabMenu.eventTab,
  },
  {
    id: 3,
    name: 'Donate',
    Icon_Name: 'dollar-sign',
    bgColor: '#DFBB2B',
    type: 'feather',
    screenNAme: CONSTANT.App.tabMenu.dashTab,
  },
  {
    id: 4,
    name: 'Ask Imam',
    Icon_Name: 'help-circle',
    bgColor: '#A758EB',
    type: 'feather',
    screenNAme: 'ask_Imam',
  },
  {
    id: 5,
    name: 'Services',
    Icon_Name: 'server',
    bgColor: '#5E5E5E',
    type: 'font-awesome',
    // screenNAme: CONSTANT.App.screenNames.services,
    screenNAme: CONSTANT.App.tabMenu.serviceTab,
  },
];
const announceData = [
  {
    id: 1,
    desc: "  Hello folks! We are going to conduct a session on Scrum and it's process. Details will be posted soon.",
  },
  {
    id: 2,
    desc: "  Hello folks! We are going to conduct a session on Scrum and it's process. Details will be posted soon.",
  },
  {
    id: 3,
    desc: "  Hello folks! We are going to conduct a session on Scrum and it's process. Details will be posted soon.",
  },
];
const BannerImg = [
  CONSTANT.App.screenImages.banner,
  CONSTANT.App.screenImages.banner,
  CONSTANT.App.screenImages.banner,
  CONSTANT.App.screenImages.banner,
  CONSTANT.App.screenImages.banner,
];

const HomeScreen = ({ navigation }) => {
  const { width, height } = Dimensions.get('window');
  const { logout } = useContext(AuthContext);
  const [prayerTime, setPrayerTime] = useState([]);
  const [verseData, setVerseData] = useState();
  const [serviceData, setServiceData] = useState();
  const [layoutStyle1, setLayoutStyle1] = React.useState({
    width: '100%',
    height: 320,
  });
  const [visible, setVisible] = useState(false);
  const [play, setPlay] = useState(false);
  const isFocused = useIsFocused();
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [currentMonth, setCurrentMonth] = useState(8);
  const [announce, setAnnounce] = useState([]);
  const [locationStatus, setLocationStatus] = useState('');


  useEffect(() => {
    let latitude, longitude;

    Geolocation.getCurrentPosition(
      info => {
        const { coords } = info;

        latitude = coords.latitude;
        longitude = coords.longitude;

        setCurrentLatitude(latitude);
        setCurrentLongitude(longitude);
      },
      error => console.log(error),
      {
        enableHighAccuracy: false,
        // timeout: 2000,
        maximumAge: 3600000,
      },
    );
    if (!isFocused) {
      Tts.stop();
    }
  }, [isFocused, Geolocation, currentMonth]);
  const getAnnouncement = async () => {
    try {
      // let result = await fetch(CONSTANT.Api.Announcement, {
      let result = await fetch('http://app.altawheedjc.org/api/post?category_id=2', {
        method: 'post',
      });

      const resJson = await result.json();
      // console.log("resJson", resJson)
      if (resJson) {
        // console.log('new', resJson.post);

        setAnnounce(resJson.post);
      }
    }
    catch (err) {
      console.log('getAnnouncement', err);
    }
  };

  const DailyVerse = async () => {
    try {
      // let response = await fetch(CONSTANT.Api.DailyVerse,
      let response = await fetch('http://app.altawheedjc.org/api/daily-verse',
        {
          method: 'GET',
          headers: {
            'X-API-Key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk',
          },
        },
      );

      let responseJson = await response.json();

      setVerseData(responseJson?.data);


      return responseJson;
    } catch (error) {
      console.error(error);
    }
  };

  const getPostServices = async () => {
    try {
      // http://community.sadathussain.com/api/post?category_id=1
      const result = await fetch('http://app.altawheedjc.org/api/post?category_id=1', {
        method: 'post',
      });
      const resJson = await result.json();
      setServiceData(resJson.post);
    }
    catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAnnouncement();
    DailyVerse();
    getPostServices();
  }, []);



  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const [checked, setChecked] = useState(true);
  const [monthCheck, setMonthCheck] = useState(false);
  const [layoutStyle, setLayoutStyle] = React.useState({
    width: '100%',
    height: 190,
  });
  const myCustomShare = async () => {
    const shareOption = {
      message: verseData?.eng_verse,
    };
    try {
      const shareResponse = await Share.open(shareOption);
    } catch (error) {
      console.log('Error', error);
    }
  };
  const [active, setActive] = useState(0);
  const onPlay = () => {
    setPlay(true);
    Tts.speak(
      verseData?.eng_verse,
      {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 0.6,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      },
    );
  };
  const onStop = () => {
    setPlay(false);
    Tts.stop();
  };
  const removeHtml = text => {
    const regex = /(<([^>]+)>)/gi;
    return text?.replace(regex, '');
  };

  const handleTabMenu = (name, screenName) => {
    if (name == 'Donate') {
      Linking.openURL('https://www.iatspayments.com/saaura/PA7849312A6546B5AB');
    } else if (name == 'Ask Imam') {
      // console.log('serviceData>>>>',JSON.stringify(serviceData,null,2));
      if (serviceData) {
        let isPresent = serviceData.map(item => {
          if (item.title.toLowerCase().includes('ask imam')) {
            return item;
          }
        });
        // console.log('isPresent>>>>',JSON.stringify(isPresent,null,2));
        if (isPresent) {
          navigation.navigate(screenName, {
            data: isPresent,
          });
        }
      }
    } else if (name == 'Services') {
      navigation.navigate(screenName, {
        routed: 'fromHome',
      });
    } else {
      navigation.navigate(screenName);
    }
  };

  return (
    <BackgroundImage
      source={CONSTANT.App.screenImages.bg_Image}
      style={{ flex: 1, paddingHorizontal: 15 }}>
      <CustomHeader
        home
        image={CONSTANT.App.screenImages.logo}
        icon={CONSTANT.App.screenImages.bell}
        onPress={() => getAnnouncement()}
        OnLongPress={async () => {
          try {
            await logout();
          } catch (err) {
            console.log(err);
          }
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }}>
        <View style={{ padding: 10 }}>
          <HijriDate />
          <View style={[styles.showAll, { paddingHorizontal: 10 }]}>
            <Text style={styles.text}>Verse of the day</Text>
          </View>
          <View style={styles.verseCard}>
            <Text
              style={{
                color: '#fff',
                fontSize: 17,
                // width: '100%',
                // fontWeight: '300',
                lineHeight: 20,
                // fontStyle: 'normal',
                // top: 10,
              }}>
              {/* {verseData?.eng_verse} */}


            </Text>
            <Text
              style={{
                color: '#9D9D9D',
                top: 10,
                fontSize: 17,
                // fontWeight: '500',
                lineHeight: 17,
              }}>
              {/* {verseData?.eng_title} */}

            </Text>
            <ReadMoreComp />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                top: 20,
                marginBottom: 10,
              }}>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <TouchableOpacity onPress={play ? onStop : onPlay}>
                  {play ? (
                    <Ionicons
                      name="volume-high-outline"
                      style={{ fontSize: 25, color: '#a7c829' }}
                    />
                  ) : (
                    <Ionicons
                      name="volume-mute-outline"
                      style={{ fontSize: 25, color: '#a7c829' }}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={play ? onStop : onPlay}>
                  <Text
                    style={{
                      color: '#a7c829',
                      left: 5,
                      width: 70,
                      fontSize: 17,
                    }}>
                    Listen
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={styles.box1} onPress={myCustomShare}>
                  <AntDesign name="sharealt" size={22} color="#a7c829" />
                </TouchableOpacity>
              </View>
            </View>

          </View>

          <View
            style={{
              marginTop: 20,
              marginRight: 3,
              overflow: 'hidden',
            }}>
            <BannerImgComp />

            <View style={{ height: 110, marginTop: 25, marginLeft: -5 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {Data.map(item => {
                  return (
                    <View key={item.id}>
                      <TouchableOpacity
                        onPress={() => handleTabMenu(item.name, item.screenNAme)}
                        style={{
                          width: 55,
                          height: 55,
                          backgroundColor: item.bgColor,
                          borderRadius: 20,
                          alignItems: 'center',
                          justifyContent: 'center',
                          left: 10,
                          marginLeft: 3,
                          //   marginTop: '-10%',
                        }}
                        key={item.id}>
                        <Icon
                          name={item.Icon_Name}
                          type={item.type}
                          size={22}
                          color="#FFFFFF"
                        />
                      </TouchableOpacity>
                      <View
                        style={{
                          width: 70,
                          marginTop: 5,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginLeft: 3,
                        }}>
                        <Text style={{
                          color: '#FFFFFF',
                          // fontWeight: '400'
                        }}>
                          {/* {item.name} */}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>

          </View>
          <View
            style={{
              width: '100%',
              height: 140,
              borderRadius: 15,
              padding: 10,
              marginTop: 12,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginRight: 93,
                top: 8,
              }}>
              <Image
                source={CONSTANT.App.screenImages.speakar}
                style={{ width: 22, height: 22, bottom: 5 }}
              />

              <Text
                style={{
                  fontSize: 20,
                  // fontWeight: '500',
                  lineHeight: 19,
                  color: '#A7C829',
                  // bottom: 3,
                  left: 4,
                  width: '100%',
                }}>
                Announcement
              </Text>
            </View>
            <View style={{ overflow: 'hidden' }}>
              <View>
                <Text
                  style={{
                    top: 75,
                    textAlign: 'right',
                    color: '#A8C829',
                    // fontWeight: '700',
                    fontSize: 18,
                    height: 17,
                    right: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(CONSTANT.App.screenNames.Announce)
                    }
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Text
                      style={{
                        color: '#A8C829',
                        // fontWeight: '600',
                        fontSize: 16,
                        // bottom: 10,
                        // height: 17,
                      }}>
                      See All
                    </Text>
                  </TouchableOpacity>
                </Text>
              </View>
              {announce.length > 0 &&
                <Carousel
                  //   delay={2000}
                  style={[layoutStyle, { overflow: 'hidden' }]}
                  autoplay={false}
                  //   pageInfo
                  pagingEnabled
                  bullets={true}
                  chosenBulletStyle={{
                    backgroundColor: 'gray',
                    color: 'white',
                    fontSize: 20,
                    width: 14,
                    height: 14,
                  }}
                  contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 'auto',
                  }}
                  bulletStyle={{
                    backgroundColor: '#b3afaf',
                    borderWidth: 0,
                    color: 'white',
                    height: 14,

                    width: 14,
                  }}
                  bulletsContainerStyle={{
                    marginRight: 160,
                    marginBottom: 95,
                    borderWidth: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    borderStyle: 'solid',
                    borderColor: 'rgba(157, 157, 157, 0.2)',
                    backgroundColor: 'rgba(157, 157, 157, 0.2)',
                    width: '20%',
                    height: '10%',
                    marginLeft: '4%',
                    borderRadius: 20,
                  }}>
                  {announce?.map((item) => {
                    return (
                      <View
                        key={item.title}
                        style={[
                          layoutStyle,
                          {
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            overflow: 'hidden',
                          },
                        ]}>
                        <View>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate(
                                CONSTANT.App.screenNames.AnnounceDetail,
                                {
                                  announceTitle: item.title,
                                  description: removeHtml(item.description),
                                }
                              )
                            }>
                            <View>

                              <ReadMoreDesc text={removeHtml(item?.description)} />

                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  }
                  )}
                </Carousel>
              }
            </View>
          </View>

          <View style={[styles.showAll, { paddingHorizontal: 10 }]}>
            <Text style={styles.text}>Today's - Salah Time</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(CONSTANT.App.tabMenu.prayerTab, {
                  currentLatitude,
                  currentLongitude,
                  currentMonth,
                  setCurrentMonth,
                })
              }>
              <Text style={{ color: '#A7C829', fontSize: 18 }}>See all</Text>
            </TouchableOpacity>
          </View>

          <PrayerTimeComp
            currentLatitude={currentLatitude}
            currentLongitude={currentLongitude}
            currentMonth={currentMonth}
          />

          <View style={{ marginTop: 20, marginLeft: 10 }}>
            <Text
              style={{
                fontSize: 24,
                // fontWeight: '800',
                lineHeight: 4,
                color: '#ffff',
                paddingTop: 25,

                // top: '4%',
              }}>
              Donate Us
            </Text>
          </View>
          <View style={{ marginTop: 5 }}>
            <Text
              style={{
                color: '#9D9D9D',
                alignItems: 'stretch',
                fontSize: 14,
                lineHeight: 17,
                marginLeft: 10,
                marginBottom: 20,
              }}>
              Lorem Ipsum is simply dummy text of the printing
            </Text>
          </View>

          <CustomButton
            variant={'filled'}
            title={'Donate now'}
            style={{ marginTop: -6 }}
            onPress={() => Linking.openURL('https://www.iatspayments.com/saaura/PA7849312A6546B5AB')}
          />

          <View
            style={[
              styles.showAll,
              { paddingBottom: -5, marginTop: 35, paddingHorizontal: 10 },
            ]}>
            <Text
              style={{
                fontSize: 24,
                // fontWeight: '800',
                lineHeight: 24,
                color: '#ffff',
                // top: '4%',
              }}>
              Upcoming Events
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(CONSTANT.App.tabMenu.eventTab)
              }>
              <Text style={{ color: '#A7C829', fontSize: 18 }}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            verticle={true}
            style={{ marginTop: 2, marginleft: 10, zIndex: -1 }}
            showsVerticalScrollIndicator={false}>
            <UpEventListComp
              navigation={navigation}
              limits={3}
            // handleRefresh={onRefreshHandler}
            />
          </ScrollView>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              // top: 35,
              // marginTop: -90,
              paddingBottom: 18,
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                fontSize: 24,
                // fontWeight: '800',
                lineHeight: 24,
                color: '#ffff',
                // top: '4%',
              }}>
              Live Stream
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(CONSTANT.App.screenNames.liveStream)
            }
            style={{
              width: '100%',
              height: 250,
              backgroundColor: '#1a1d2e',
              marginTop: 10,
              borderRadius: 15,
              // marginTop: 30,
            }}>
            <View style={{ width: '100%', height: 190 }}>
              <Image
                source={require('../../assets/images/video.png')}
                style={{ width: '100%' }}
                resizeMode="stretch"
              />

              <View style={{ position: 'absolute', top: '40%', left: '41%' }}>
                <Image source={require('../../assets/images/playBtn.png')} />
              </View>
            </View>

            <View style={{ marginLeft: 10 }}>
              <Text style={{ marginLeft: 5, color: '#FFFFFF', fontSize: 17 }}>
                Speech | Ikhlaak E Hasna
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginTop: 10,
                  }}>
                  <Icon name="clock" type="evilicon" color="#9D9D9D" />
                  <Text style={{ marginLeft: 5, color: '#9D9D9D' }}>
                    standard 10 min ago
                  </Text>
                  <Text style={{ color: '#9D9D9D', marginLeft: 5 }}>|</Text>
                  <Text
                    style={{
                      // color: '#9D9D9D',
                      marginLeft: 5,
                      color: 'rgba(221, 75, 57, 1)',
                    }}>
                    Live
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(CONSTANT.App.screenNames.liveStream)
                  }>
                  <Text
                    style={{
                      color: '#A8C829',
                      // fontWeight: '600',
                      fontSize: 16,
                      // bottom: 10,
                      // height: 17,
                      marginRight: 10,
                    }}>
                    Watch Now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </BackgroundImage>
  );
};

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
    height: 400,
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 10,
  },
  verseCard: {
    width: '100%',
    height: 'auto',
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 10,
  },
  qibla: {
    width: '100%',
    height: 360,
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    // paddingTop: 20,
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
export default HomeScreen;
