/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  Linking,
} from 'react-native';
import CONSTANT from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomInput from '../../component/InputFileds';
import CustomButton from '../../component/CustomButton';

import { BackgroundImage } from 'react-native-elements/dist/config';

import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { AntDesigns } from '../../constants/Icons';
import Share from 'react-native-share';
import files from './FileBase64';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { start } from 'react-native-compass-heading';
import DateTimeFormat from '../../component/Common/DateTimeFormat';
import ImageLoad from 'react-native-image-placeholder';

const EventDetailScreen = ({ navigation, route }) => {
  const [eventDetail, setEventDetail] = useState(null);
  const [eventDesc, setEventDesc] = useState(null);
  const { eventId } = route.params;
  const toDataURL = url =>
    fetch(url)
      .then(response => response.blob())
      .then(
        blob =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          }),
      );

  const myCustomShare = async () => {
    const shareOption = {
      message: `*${eventDetail?.name?.text}* ${'\n\n'} ${eventDesc} ${'\n'} ${eventDetail.url
        }`,

      // url: `eventDetail?.logo?.original?.url`,
    };
    try {
      const shareResponse = await Share.open(shareOption);
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    getEventDetail();
    getEventDesc();

    toDataURL(eventDetail?.logo?.original?.url).then(dataUrl => {
      console.log('RESULT:', dataUrl);
    });
  }, [eventId]);
  const getEventDetail = async () => {
    try {
      const responseJson = await fetch(
        `https://www.eventbriteapi.com/v3/events/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${CONSTANT.Api.TOKEN}`,
          },
        },
      );
      const result = await responseJson.json();

      setEventDetail(result);
    } catch (err) {
      console.log(err);
    }
  };
  const getEventDesc = async () => {
    try {
      const responseJson = await fetch(
        `https://www.eventbriteapi.com/v3/events/${eventId}/description`,
        {
          method: 'get',
          headers: {
            Authorization: `Bearer ${CONSTANT.Api.TOKEN}`,
          },
        },
      );
      const result = await responseJson.json();
      setEventDesc(result?.description.replace(/(<([^>]+)>)/gi, ''));

      // return result?.description;
      // setEventDetail(result);
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  return (
    <>
      <BackgroundImage
        source={CONSTANT.App.screenImages.bg_Image}
        style={{ flex: 1 }}>
        <>
          <ScrollView
            vertical={true}
            // contentContainerStyle={{}}
            showsVerticalScrollIndicator={false}
          // style={{top: -16}}
          >
            <View>
              {eventDetail?.logo?.original?.url ? (
                <ImageLoad
                  loadingStyle={{ size: 'large', color: 'blue' }}
                  source={{
                    uri: eventDetail?.logo?.original?.url,
                  }}
                  style={styles.banner}
                />
              ) : (
                <View
                  style={{
                    width: '100%',
                    height: 331,
                    display: 'flex',

                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Entypo
                    name="image"
                    size={32}
                    color="#f4f4f4"
                    style={{ marginTop: 40 }}
                  />
                </View>
              )}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  bottom: 250,
                }}>
                <TouchableOpacity
                  style={styles.box}
                  onPress={() => navigation.goBack()}>
                  <Entypo name="chevron-left" size={25} color="#ffffff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.box1} onPress={myCustomShare}>
                  <AntDesigns name="sharealt" size={22} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </View>
            {!eventDetail ? (
              <ActivityIndicator
                style={{ marginTop: 60 }}
                color="#a7c829"
                size="large"
              />
            ) : (
              <>
                <Text style={styles.title}>{eventDetail?.name?.text}  </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    top: 15,

                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      color: '#9D9D9D',
                      left: 20,
                    }}>
                    <AntDesign
                      name="clockcircleo"
                      style={{
                        color: '#9d9d9d',
                        fontSize: 12,
                        lineHeight: 14.5,
                        // fontWeight: '500',
                        top: 3,
                      }}
                    />

                    <DateTimeFormat
                      startDate={eventDetail?.start?.local}
                      endDate={eventDetail?.end?.local}
                    />
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      right: 15,
                    }}></View>
                </View>
                <View style={{ paddingBottom: 40 }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 16,
                      // fontWeight: '100',
                      lineHeight: 20,
                      margin: 20,
                      marginTop: 35,
                    }}>
                    {eventDesc}
                  </Text>
                  <CustomButton
                    title={'Register'}
                    onPress={() => Linking.openURL(eventDetail.url)}
                    style={{
                      width: '90%',
                      marginLeft: 20,
                      borderWidth: 1,
                      backgroundColor: '#A7C829',
                      // marginTop: 20,
                    }}
                  />
                </View>
              </>
            )}
          </ScrollView>
        </>
      </BackgroundImage>
    </>
  );
};
export default EventDetailScreen;

const styles = StyleSheet.create({
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    backgroundColor: 'rgba(1, 4, 33, 1)',
    height: 355,
    paddingTop: 20,
    overflow: 'hidden',
    width: '100%',
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: 'rgba(1, 4, 33, 1)',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    overflow: 'hidden',
    top: 2,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  panelHandle: {
    width: 60,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#9D9D9D',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 23,
    height: 35,
    top: -25,
    color: '#fff',
  },
  panelSubtitle: {
    fontSize: 13,
    color: '#fff',
    top: -25,

    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    // fontWeight: 'bold',
    color: 'white',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    // fontWeight: '500',
    display: 'flex',
    flexWrap: 'wrap',
    marginHorizontal: 20,
  },
  banner: {
    width: '100%',
    height: 310,
  },
  box: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: 'rgba(91, 91, 91, .6)',
    alignItems: 'center',
    justifyContent: 'center',
    left: 20,
  },
  box1: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: 'rgba(91, 91, 91, .6)',
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
  },
});
