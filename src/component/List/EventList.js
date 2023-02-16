/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import CONSTANT from '../../constants';
import {Icon} from 'react-native-elements';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import DateTimeFormat from '../Common/DateTimeFormat';

const feauredData = [
  {
    id: 1,
    image: CONSTANT.App.screenImages.base,
    title: 'Eid ul Adha 2021 | Gro...',
    date: '12 Aug',
    time: '10:20 PM - 3:00 AM',
    action: 'Register',
  },
  {
    id: 2,
    image: CONSTANT.App.screenImages.blue_masjid,
    title: 'Event Name',
    date: '12 Aug',
    time: '10:20 PM - 3:00 AM',
    action: 'Register',
  },
  {
    id: 3,
    image: CONSTANT.App.screenImages.blue_masjid,
    title: 'Event Name',
    date: '12 Aug',
    time: '10:20 PM - 3:00 AM',
    action: 'Register',
  },
  {
    id: 4,
    image: CONSTANT.App.screenImages.blue_masjid,
    title: 'Event Name',
    date: '12 Aug',
    time: '10:20 PM - 3:00 AM',
    action: 'Register',
  },
  {
    id: 4,
    image: CONSTANT.App.screenImages.blue_masjid,
    title: 'Event Name',
    date: '12 Aug',
    time: '10:20 PM - 3:00 AM',
    action: 'Register',
  },
  {
    id: 4,
    image: CONSTANT.App.screenImages.blue_masjid,
    title: 'Event Name',
    date: '12 Aug',
    time: '10:20 PM - 3:00 AM',
    action: 'Register',
  },
  {
    id: 4,
    image: CONSTANT.App.screenImages.blue_masjid,
    title: 'Event Name',
    date: '12 Aug',
    time: '10:20 PM - 3:00 AM',
    action: 'Register',
  },
];
const DataList = [
  {
    id: 1,
    image: require('../../assets/images/video.png'),
    title: 'Speech | Ikhlaak E Hasna',
    date: '10 min ago',
    time: '1 hour 23 min',
    action: 'Watch Now',
  },
  {
    id: 2,
    image: require('../../assets/images/naat.png'),
    title: 'Kids naat',
    date: '10 min ago',
    time: '1 hour 23 min',
    action: 'Watch Now',
  },
];

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: 28,
    borderRadius: 10,
    height: 115,
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});
export const UpEventListComp = ({
  showData,
  navigation,
  handleRefresh,
  limits,
}) => {
  const [eventList, setEventList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!eventList) {
      getOrginazation();
    }
  }, [limits]);
  const getOrginazation = async () => {
    try {
      const responseJson = await fetch(
        'https://www.eventbriteapi.com/v3/users/me/organizations/',
        {
          method: 'get',
          headers: {
            Authorization: `Bearer ${CONSTANT.Api.TOKEN}`,
          },
        },
      );

      const result = await responseJson.json();
      if (result?.organizations[0]?.id) {
        const responseJsonList = await fetch(
          `https://www.eventbriteapi.com/v3/organizations/${
            result?.organizations[0]?.id
          }/events?order_by=start_asc${limits ? '&page_size=' + limits : ''}`,
          {
            method: 'get',
            headers: {
              Authorization: `Bearer ${CONSTANT.Api.TOKEN}`,
            },
          },
        );
        const resultList = await responseJsonList.json();
        setEventList(resultList);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!eventList ? (
        <ActivityIndicator
          style={{marginBottom: 10, marginTop: 15}}
          color="#a7c829"
          size="large"
        />
      ) : (
        <ScrollView
          vertical={true}
          contentContainerStyle={{paddingBottom: 150}}>
          <FlatList
            data={eventList?.events}
            onRefresh={() => {
              // alert('he');
            }}
            refreshing={false}
            renderItem={({item}) => {
              // console.log('>>><<<', item.id);
              return (
                <View>
                  <TouchableOpacity
                    style={styles.container}
                    onPress={() => {
                      navigation.navigate(
                        CONSTANT.App.screenNames.eventDetail,
                        {
                          eventId: item.id,
                        },
                      );
                    }}>
                    {item.logo?.url ? (
                      <Image
                        source={{
                          uri: item.logo?.url,
                        }}
                        style={{width: '30%', height: '100%'}}
                      />
                    ) : (
                      <View
                        style={{
                          width: '30%',
                          height: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Entypo name="image" size={22} color="#fff" />
                      </View>
                    )}

                    <View style={{display:'flex', flexDirection:'column', width: '70%', height: '100%', padding: 10}}>
                      <Text style={styles.title} numberOfLines={1}>
                        {item.name.text}
                      </Text>
                      <View
                        style={{
                          display:'flex',
                          flexDirection: 'row',
                          // flexWrap: 'wrap',
                          // justifyContent: 'flex-start',
                          marginTop: 10,
                        }}>
                        <Icon name="clock" type="evilicon" color="#9D9D9D" />
                        <DateTimeFormat
                          startDate={item?.start?.local}
                          endDate={item?.end?.local}
                        />
                      </View>
                      <Text
                        style={{fontSize: 20, color: '#A7C829', marginTop: 15}}>
                        Register
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(item, index) => item.key}
          />
        </ScrollView>
      )}
    </>
  );
};

export const FeaturedEventListComp = ({
  showData,
  navigation,
  handleRefresh,
}) => {
  // const onHandler=(item)=>{
  //     console.log("item",item)

  // }
  return (
    <>
      <FlatList
        data={showData ? DataList : feauredData}
        onRefresh={() => {
          alert('he');
        }}
        refreshing={false}
        renderItem={({item}) => {
          return (
            <View>
              <ScrollView vertical={true}>
                <TouchableOpacity
                  style={styles.container}
                  onPress={() => {
                    navigation.navigate(CONSTANT.App.screenNames.eventDetail);
                  }}>
                  <Image
                    source={item.image}
                    style={{width: '30%', height: '100%'}}
                  />

                  <View style={{width: '70%', height: '100%', padding: 10}}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        marginTop: 10,
                      }}>
                      <Icon name="clock" type="evilicon" color="#9D9D9D" />
                      <Text style={{marginLeft: 5, color: '#9D9D9D'}}>
                        {item.date}
                      </Text>
                      <Text style={{color: '#9D9D9D', marginLeft: 5}}>|</Text>
                      <Text style={{color: '#9D9D9D', marginLeft: 5}}>
                        {item.time}
                      </Text>
                    </View>
                    <Text
                      style={{fontSize: 20, color: '#A7C829', marginTop: 10}}>
                      {item.action}
                    </Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </View>
          );
        }}
        keyExtractor={(item, index) => item.key}
      />
    </>
  );
};
