/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import CONSTANT from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { BgImage } from '../../component/ImageContainer';
import { BackgroundImage } from 'react-native-elements/dist/config';

import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { AntDesigns } from '../../constants/Icons';
import Share from 'react-native-share';

const AnnounceDetail = ({ navigation, route }) => {
  const { description, announceTitle } = route.params;
  const myCustomShare = async () => {
    const shareOption = {
      message: description
    };
    try {
      const shareResponse = await Share.open(shareOption);
    } catch (error) {
      console.log('Error', error);
    }
  };
  return (
    <BackgroundImage
      source={CONSTANT.App.screenImages.bg_Image}
      style={{ flex: 1 }}>
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            // bottom: 250,
            top: 57,
          }}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" size={25} color="#ffffff" />
          </TouchableOpacity>
          <Text style={{
            color: '#fff', fontSize: 24,
            //  fontWeight: '600'
          }}>
            Details
          </Text>
          <TouchableOpacity style={styles.box1} onPress={myCustomShare}>
            <AntDesigns name="sharealt" size={22} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.title}>{announceTitle}</Text>
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
            left: 30,
            top: 75,
          }}>
          <AntDesign
            name="clockcircleo"
            style={{
              color: '#9d9d9d',
              fontSize: 12,
              lineHeight: 14.5,
              // fontWeight: '500',
            }}
          />
          <Text
            style={{
              color: '#9d9d9d',
              fontSize: 12,
              lineHeight: 14.5,
              // fontWeight: '500',
              left: 10,
            }}>
            3 hour ago
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            color: '#fff',
            fontSize: 16,
            // fontWeight: '400',
            lineHeight: 25,
            backgroundColor: 'rgba(98,98,98,.3)',
            marginLeft: 20,
            marginRight: 20,
            top: 100,
            padding: 14,
          }}>
          {description}
        </Text>
      </View>
    </BackgroundImage>
  );
};
export default AnnounceDetail;

const styles = StyleSheet.create({
  title: {
    color: '#a7c829',
    fontSize: 22,
    // fontWeight: '600',
    top: 80,
    left: 24,
    right: 279,
    bottom: 748,
  },
  banner: {
    width: '100%',
    height: 310,
  },
  box: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: 'rgba(98,98,98,.3)',
    alignItems: 'center',
    justifyContent: 'center',
    left: 20,
  },
  box1: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: 'rgba(98,98,98,.3)',
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
  },
});
