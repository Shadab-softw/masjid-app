/* eslint-disable prettier/prettier */
import React from 'react';
import {FlatList, StyleSheet, View, Text, Image} from 'react-native';
import CONSTANT from '../../constants';
import {Icon} from 'react-native-elements';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const data = [
  {
    id: 1,
    image: CONSTANT.App.screenImages.blue_masjid,
    title: 'Event Name',
    date: '12 Aug',
    time: '10:20 PM - 3:00 AM',
    action: 'Register',
    screenName: CONSTANT.App.screenNames.eventDetail,
  },
  {
    id: 2,
    image: CONSTANT.App.screenImages.blue_masjid,
    title: 'Event Name',
    date: '12 Aug',
    time: '10:20 PM - 3:00 AM',
    action: 'Register',
    screenName: CONSTANT.App.screenNames.eventDetail,
  },
  {
    id: 3,
    image: CONSTANT.App.screenImages.blue_masjid,
    title: 'Event Name',
    date: '12 Aug',
    time: '10:20 PM - 3:00 AM',
    action: 'Register',
    screenName: CONSTANT.App.screenNames.eventDetail,
  },
  {
    id: 4,
    image: CONSTANT.App.screenImages.blue_masjid,
    title: 'Event Name',
    date: '12 Aug',
    time: '10:20 PM - 3:00 AM',
    action: 'Register',
    screenName: CONSTANT.App.screenNames.eventDetail,
  },
];

const DataList = [
  {
    id: 1,
    image: require('../../assets/images/video.png'),
    title: 'Event Name',
    date: '12 Aug',
    time: '10:20 PM - 3:00 AM',
    action: 'Watch Now',
    screenName: CONSTANT.App.screenNames.liveStream,
  },
  {
    id: 2,
    image: require('../../assets/images/naat.png'),
    title: 'Event Name',
    date: '12 Aug',
    time: '10:20 PM - 3:00 AM',
    action: 'Watch Now',
    screenName: CONSTANT.App.screenNames.liveStream,
  },
];

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: 15,
    borderRadius: 10,
    height: 115,
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});
export const ListComp = ({showData, onPress, navigation}) => {
  // const onHandler=(item)=>{
  //     console.log("item",item)

  // }
  return (
    <>
      <FlatList
        data={showData ? DataList : data}
        renderItem={({item}) => {
          return (
            <ScrollView>
              <TouchableOpacity
                style={styles.container}
                onPress={() => navigation.navigate(item.screenName)}>
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
                  <Text style={{fontSize: 20, color: '#A7C829', marginTop: 10}}>
                    {item.action}
                  </Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          );
        }}
        keyExtractor={(item, index) => item.key}
      />
    </>
  );
};
