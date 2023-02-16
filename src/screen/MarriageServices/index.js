/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  Linking
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import { CheckBox } from 'react-native-elements';

import { BgImage } from '../../component/ImageContainer';
import CONSTANT from '../../constants';
import CustomInput from '../../component/InputFileds';
import Textarea from '../../component/Textarea';
import CustomButton from '../../component/CustomButton';

const MarriageServicesScreen = ({ navigation, route }) => {
  const { data } = route.params
  console.log("dattttta", data)
  const [maleChecked, setMaleChecked] = useState(false);
  const [femaleChecked, setFemaleChecked] = useState(false);
  const [checked, setChecked] = useState(false);
  const supportedURL = "https://google.com";
  const regex = /(<([^>]+)>)/gi

  return (
    <BgImage>
      <View style={styles.container}>
        <View style={styles.topContain}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" size={22} color="#ffffff" />
          </TouchableOpacity>
          <Text
            style={{
              color: '#fff',
              fontSize: 25,
              // fontWeight: '600',
              left: 40,
              lineHeight: 30,
            }}>
            Marriage Services
          </Text>
        </View>
        <ScrollView
          vertical={true}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          style={{ top: 2 }}>
          <Image
            source={{ uri: data[4].thumbnail }}
            style={{ width: '100%', height: 200 }}
          />
          <View style={{ width: '100%', paddingHorizontal: 20 }}>
            <Text style={styles.heading}>{data[4].title}</Text>
          </View>
          <View style={{ width: '100%' }}>

            <Text style={{
              color: '#fff',
              fontSize: 14,
              alignSelf: 'auto',
              marginTop: 10
              // width:'96%',
              // width:'100%'

            }}> {data[4].description.replace(regex, '')}</Text>


          </View>
          <CustomButton
            title={'go to '}
            variant={'filled'}
            style={{ marginTop: 20 }}
            onPress={() => Linking.openURL('https://www.aticjc.com/services/marriage-services/')}
          />

        </ScrollView>

      </View>
    </BgImage>
  );
};

export default MarriageServicesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',

    overflow: 'hidden',
  },
  inContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    top: 35,
    overflow: 'hidden',
    borderRadius: 10,
  },
  inContainer1: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    top: 40,
    overflow: 'hidden',
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingTop: 20,
  },
  topContain: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // top: 10,
    height: 120,

    overflow: 'hidden',
  },
  box: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxC: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  boxwrap: {
    height: 82,
    width: 68,
    backgroundColor: '#1a1d2e',
    borderRadius: 10,

    padding: 1,
  },
  box1: {
    borderRadius: 10,
    height: 80,
    width: 66,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  rowData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  img: {
    fontSize: 20,
    color: '#9D9D9D',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 17,
    // fontWeight: '400',
    lineHeight: 20,
    width: '100%',
    left: -15,
    top: 10,
    // height: 67,
  },
  title1: {
    color: 'rgba(157, 157, 157, 1)',
    fontSize: 15,
    // fontWeight: '400',
    lineHeight: 20,
    width: '100%',
    left: -15,
    top: 10,
    // height: 67,
  },
  heading: {
    color: '#fff',
    fontSize: 22,
    // fontWeight: '600',
    lineHeight: 20,
    width: '100%',
    left: -15,
    top: 10,
    paddingVertical: 10,
    // height: 67,
  },
  subHeading: {
    color: '#f4f5f4',
    fontSize: 15,
    // fontWeight: '500',
    lineHeight: 20,
    width: '100%',
    left: -15,
    // top: 10,
    paddingVertical: 20,
    // height: 67,
  },
  heading1: {
    color: '#fff',
    fontSize: 22,
    // fontWeight: '700',
    lineHeight: 20,
    width: '100%',
    left: -15,
    top: 10,
    paddingVertical: 10,
    // height: 67,
  },
});
